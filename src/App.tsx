import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AVATAR_IMAGE_SRC } from './assets/avatarData';
import { ThreeCanvas } from './components/ThreeCanvas';
import {
  TOOLS,
  SKILLS,
  PROJECTS,
  type ProjectCategory,
} from './data/portfolioData';

import {
  clamp,
  calculatePinProgress,
  calculateWordOpacity,
  calculateMarqueeOffset,
  createMarqueeTrackItems,
  formatMailtoLink,
  validateContactForm,
  filterProjects,
  calculateCardDeckEffect,
  DEFAULT_CONTACT_EMAIL,
} from './utils/portfolioLogic';

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<string | null>(null);

  const mousePosRef = useRef({ x: 0, y: 0 });
  const lastScrollYRef = useRef(0);

  // DOM Refs for scroll-driven animations
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const avatarImgRef = useRef<HTMLImageElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const hfRef = useRef<HTMLElement>(null);
  const sttRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const floatingPillRef = useRef<HTMLAnchorElement>(null);

  // Duplicated tool arrays for seamless infinite auto-scrolling
  const marqueeRow1 = useMemo(() => createMarqueeTrackItems(TOOLS, 4), []);
  const marqueeRow2 = useMemo(() => createMarqueeTrackItems([...TOOLS].reverse(), 4), []);

  const filteredProjects = useMemo(
    () => filterProjects(PROJECTS, selectedCategory),
    [selectedCategory]
  );


  // About text word split for progressive highlight
  const aboutWordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = {
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      };
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // IntersectionObserver for blur-in reveals (.rv)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = document.querySelectorAll('.rv');

    if (prefersReducedMotion) {
      elements.forEach((el) => el.classList.add('in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Frame loop for high-frequency scroll & mouse tracking
  useEffect(() => {
    let animId = 0;
    const t0 = performance.now();

    const loop = () => {
      const H = window.innerHeight;
      const W = window.innerWidth;
      const sy = window.scrollY;
      const t = (performance.now() - t0) / 1000;
      const { x: mx, y: my } = mousePosRef.current;
      const isMobile = W <= 820;

      // 1. Hero H1 Stagger and sticky pin
      const h1 = h1Ref.current;
      if (h1) {
        const w0 = h1.offsetWidth;
        const h0 = h1.offsetHeight;
        const p = clamp(sy / (H * 0.85), 0, 1);
        const e = 1 - Math.pow(1 - p, 3);
        const s0 = Math.min(1, (W * 0.92) / (w0 || 1));
        const s1 = Math.min(s0, (W < 600 ? 96 : 132) / (w0 || 1));
        const x = ((W - w0 * s0) / 2) * (1 - e) + W * 0.05 * e - mx * 14 * (1 - e);
        const y = (H * 0.38 - (h0 * s0) / 2) * (1 - e) + 15 * e - my * 8 * (1 - e);
        h1.style.transform = `translate(${x}px, ${y}px) scale(${s0 + (s1 - s0) * e})`;

        const chars = h1.querySelectorAll<HTMLElement>('.ch');
        chars.forEach((c, idx) => {
          c.style.transform = `translateY(${Math.sin(p * Math.PI) * Math.sin(idx * 0.9 + t * 3) * 14}px)`;
        });
      }

      // 2. 3D Avatar Image mouse-tilt and floating translation
      const av = avatarImgRef.current;
      if (av) {
        const p = clamp(sy / (H * 0.85), 0, 1);
        const e = 1 - Math.pow(1 - p, 3);
        const aw = av.offsetWidth;
        const iv = clamp((t - 0.2) / 0.6, 0, 1);
        const ib = isMobile ? 0.72 : (1 + 2.7 * Math.pow(iv - 1, 3) + 1.7 * Math.pow(iv - 1, 2));
        const fa = 1 - clamp((p - 0.3) / 0.45, 0, 1);
        av.style.opacity = `${fa * iv}`;
        av.style.visibility = fa > 0.01 ? 'visible' : 'hidden';

        const ax = (W - aw) / 2 - mx * 10;
        const ay = H * (W < 600 ? 0.22 : 0.16) + Math.sin(t * 1.4) * 8 - e * H * 0.3;
        av.style.transform = `translate(${ax}px, ${ay}px) scale(${(1 - 0.35 * e) * ib}) perspective(900px) rotateY(${mx * 22}deg) rotateX(${-my * 14}deg)`;
      }

      // 3. Experience cards horizontal drift
      const driftElements = document.querySelectorAll<HTMLElement>('[data-dr]');
      driftElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const factor = Number(el.dataset.dr) || 1;
        const offset = (H / 2 - (rect.top + rect.height / 2)) * 0.1 * factor;
        el.style.transform = `translateX(${offset}px)`;
      });

      // 4. Stacking project cards smooth scale, depth, and brightness dimming
      const cards = document.querySelectorAll<HTMLElement>('.stk .pj');
      if (cards.length > 0 && !isMobile) {
        cards.forEach((card, idx) => {
          const rect = card.getBoundingClientRect();
          const nextCard = cards[idx + 1];
          const nextTop = nextCard ? nextCard.getBoundingClientRect().top : undefined;
          const { scale, brightness } = calculateCardDeckEffect(rect.top, rect.height, nextTop);
          card.style.transform = `scale(${scale})`;
          card.style.filter = `brightness(${brightness})`;
        });
      } else if (isMobile && cards.length > 0) {
        cards.forEach((card) => {
          card.style.transform = '';
          card.style.filter = '';
        });
      }

      // 5. About Section Pin & Word Reveal

      const pin = pinRef.current;
      const hf = hfRef.current;
      const stt = sttRef.current;
      if (pin && hf) {
        let p = 1;
        if (!isMobile) {
          const rect = pin.getBoundingClientRect();
          p = calculatePinProgress(rect.top, rect.height, H);
        }

        // Circular wipe clip path
        const cr = p * 140;
        hf.style.clipPath = `circle(${cr}% at 50% 50%)`;

        // Sequential word opacity highlight
        const words = aboutWordsRef.current;
        const totalWords = words.length;
        words.forEach((span, i) => {
          if (span) {
            span.style.opacity = `${calculateWordOpacity(p, i, totalWords)}`;
          }
        });

        // Stats badges pop-in
        if (stt) {
          const sp = clamp((p - 0.6) / 0.35, 0, 1);
          stt.style.opacity = `${sp}`;
          stt.style.transform = `translateY(${(1 - sp) * 20}px)`;
        }

        // 3D Anchor parallax in about section
        const anchors = pin.querySelectorAll<HTMLElement>('.fl');
        anchors.forEach((el) => {
          if (isMobile) return;
          const par = Number(el.dataset.par) || 0;
          el.style.transform = `translate(${(p - 0.5) * 60 * par}px, ${(0.5 - p) * 120}px)`;
        });
      }

      // 6. Navigation bar & floating pill visibility
      const nav = navRef.current;
      const fp = floatingPillRef.current;
      const maxScroll = document.body.scrollHeight - H;
      const dy = sy - lastScrollYRef.current;
      const isPastHero = sy > H * 0.7;
      const isNearBottom = sy > maxScroll - 350;

      if (nav) {
        if (sy > 80 && dy > 4) {
          nav.style.opacity = '0';
          nav.style.pointerEvents = 'none';
        } else if (dy < -6 || sy <= 80) {
          nav.style.opacity = '1';
          nav.style.pointerEvents = 'auto';
        }
      }

      if (fp) {
        const showFloating = isPastHero && dy > 0 && !isNearBottom;
        const hideFloating = dy < -6 || !isPastHero || isNearBottom;
        if (showFloating) {
          fp.style.opacity = '1';
          fp.style.pointerEvents = 'auto';
        } else if (hideFloating) {
          fp.style.opacity = '0';
          fp.style.pointerEvents = 'none';
        }
      }

      lastScrollYRef.current = sy;

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData.name, formData.email, formData.message);
    if (!validation.isValid) {
      setFormStatus(validation.error || 'Please fill in all fields');
      return;
    }

    setFormStatus('Opening email client…');
    const mailto = formatMailtoLink(DEFAULT_CONTACT_EMAIL, formData.name, formData.email, formData.message);
    window.location.href = mailto;

    setTimeout(() => {
      setFormStatus(`Thank you! Message drafted to ${DEFAULT_CONTACT_EMAIL}`);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  // Split about paragraphs into words for progressive opacity reveal
  const renderAboutWords = (text: string) => {
    const words = text.split(' ');
    return words.map((w, idx) => (
      <React.Fragment key={idx}>
        <span
          ref={(el) => {
            if (el && !aboutWordsRef.current.includes(el)) {
              aboutWordsRef.current.push(el);
            }
          }}
          className="transition-opacity duration-150"
        >
          {w}
        </span>{' '}
      </React.Fragment>
    ));
  };

  return (
    <div className="relative min-h-screen bg-[#050507] text-[#f5f6fa] overflow-x-clip selection:bg-[#00d4ff] selection:text-black">
      {/* 3D WebGL Canvas Layer */}
      <ThreeCanvas mousePosRef={mousePosRef} />

      {/* Top Navigation */}
      <nav id="nv" ref={navRef} aria-label="Main Navigation">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#exp">Experience</a>
        <a href="#contact">Contact</a>
        <a
          href="/assets/aistudio/ISResume_96235500_96235500.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume (CV)
        </a>
      </nav>

      {/* Floating Header "Contact me" Pill */}
      <a className="pill" id="fp" ref={floatingPillRef} href="#contact">
        Contact me
      </a>

      {/* Hero Section */}
      <header className="hero" id="top">
        <div className="hrow">
          <p>
            SOC Analyst &amp; Cybersecurity Specialist passionate about threat defense, Wazuh SIEM monitoring, vulnerability assessment, and digital forensics.
          </p>
        </div>
      </header>

      {/* Hero Animated Fixed H1 */}
      <h1 id="h1" className="hn" ref={h1Ref} aria-label="Hi, I'm Isha Sonaria">
        <span className="wd">
          {'HI,'.split('').map((char, i) => (
            <span key={i} className="ch" style={{ animationDelay: `${i * 45}ms` }}>
              {char}
            </span>
          ))}
        </span>
        <span className="wd">
          {"I'M".split('').map((char, i) => (
            <span key={i} className="ch" style={{ animationDelay: `${(3 + i) * 45}ms` }}>
              {char}
            </span>
          ))}
        </span>
        <span className="wd">
          {'ISHA'.split('').map((char, i) => (
            <span key={i} className="ch" style={{ animationDelay: `${(6 + i) * 45}ms` }}>
              {char}
            </span>
          ))}
        </span>
        <span className="wd">
          {'SONARIA'.split('').map((char, i) => (
            <span key={i} className="ch" style={{ animationDelay: `${(10 + i) * 45}ms` }}>
              {char}
            </span>
          ))}
        </span>
      </h1>

      {/* 3D Avatar Image */}
      <img id="av" ref={avatarImgRef} className="av" alt="Cybersecurity Analyst 3D character" src={AVATAR_IMAGE_SRC} />

      {/* Fast Tech Brand Highlights */}
      <div className="logos" aria-hidden="true">
        <span>Wazuh SIEM</span>
        <span>Wireshark</span>
        <span>Nmap</span>
        <span>TryHackMe Top 2%</span>
        <span>Burp Suite</span>
        <span>Digital Forensics</span>
      </div>

      {/* Two-row Tool Marquee Gallery with Auto-Scrolling */}
      <div className="gal" id="gal" aria-label="Cybersecurity Tools and Technologies">
        <div className="rw rw-left" id="r1">
          {marqueeRow1.map((t, idx) => (
            <div key={`${t.name}-r1-${idx}`} className="tl">
              {t.svg}
              <span>{t.name}</span>
            </div>
          ))}
        </div>
        <div className="rw rw-right" id="r2">
          {marqueeRow2.map((t, idx) => (
            <div key={`${t.name}-r2-${idx}`} className="tl">
              {t.svg}
              <span>{t.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* About Section with Sticky Scroll Pinning */}
      <section className="sheet dk" id="about" style={{ zIndex: 2 }}>
        <div className="pin" id="pin" ref={pinRef}>
          <div className="st">
            <div className="hd" id="hd">
              About me
              <b id="hf" ref={hfRef} aria-hidden="true">
                About me
              </b>
            </div>

            <div className="txt" id="tx">
              <p className="l">
                {renderAboutWords(
                  'BCA graduate with an 8.30/10 CGPA and hands-on training in SOC operations, network security, ethical hacking, digital forensics, and vulnerability assessment.'
                )}
              </p>
              <p>
                {renderAboutWords(
                  'Experienced with Wazuh SIEM, Wireshark, Nmap, Burp Suite, Nuclei, Nikto, and Kali Linux for security monitoring, network analysis, reconnaissance, and incident triage. Proven track record building custom security tools, including an ML-based phishing URL detector, email header forensics analyzer, reconnaissance CLI, and PDF security utility.'
                )}
              </p>
              <p>
                {renderAboutWords(
                  'Top 2% TryHackMe practitioner with 100+ completed labs spanning SOC L1 alert triage, network exploitation, web security, and Linux privilege escalation. Seeking an entry-level SOC Analyst or Cybersecurity Analyst role to apply practical security defense in production enterprise environments.'
                )}
              </p>
            </div>

            {/* Stats Badges */}
            <div className="stats" id="stt" ref={sttRef}>
              <div>
                <b>Top 2%</b>
                <span>TryHackMe globally</span>
              </div>
              <div>
                <b>100+</b>
                <span>labs &amp; streak</span>
              </div>
              <div>
                <b>8.30 / 10</b>
                <span>BCA · Sem 1 Rank 1</span>
              </div>
              <div>
                <b>CSFP</b>
                <span>Grand Master Certified</span>
              </div>
            </div>

            {/* 3D Floating Shape Anchor Placeholders */}
            <div className="fl" data-3d="knot" data-par="-1" style={{ left: '2vw', top: '14vh' }} />
            <div className="fl" data-3d="cube" data-par="1" style={{ right: '2vw', top: '12vh' }} />
            <div className="fl" data-3d="flower" data-par="1" style={{ left: '2.5vw', bottom: '10vh' }} />
            <div className="fl" data-3d="ring" data-par="-1" style={{ right: '2.5vw', bottom: '12vh' }} />
          </div>
        </div>
      </section>

      {/* Skills Section (Light Sheet) */}
      <section className="sheet lt" id="skills" style={{ zIndex: 3 }}>
        <div className="w">
          <h2 className="big rv">Skills</h2>
          <div id="sk" style={{ marginTop: '50px' }}>
            {SKILLS.map((sk) => (
              <div key={sk.number} className="row rv">
                <div className="n">{sk.number}</div>
                <h3>{sk.title}</h3>
                <p>{sk.tags}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section (Stacked Sticky Cards & GitHub Repository Explorer) */}
      <section className="sheet dk" id="projects" style={{ zIndex: 4 }}>
        <div className="w">
          <div className="text-center mb-8">
            <h2 className="big rv" style={{ marginBottom: '12px' }}>
              Projects
            </h2>
            <p className="text-[#a0aec0] text-sm md:text-base font-medium max-w-xl mx-auto">
              11 Open-Source Cybersecurity Tools, Reconnaissance CLIs, Forensics Analyzers &amp; Security Platforms
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="cat-filter-wrap">
            {(
              [
                { label: 'All Projects', cat: 'All', count: PROJECTS.length },
                {
                  label: 'Network & Recon',
                  cat: 'Network & Recon',
                  count: PROJECTS.filter((p) => p.category === 'Network & Recon').length,
                },
                {
                  label: 'Threat Defense & Forensics',
                  cat: 'Threat Defense & Forensics',
                  count: PROJECTS.filter((p) => p.category === 'Threat Defense & Forensics').length,
                },
                {
                  label: 'Web & Security',
                  cat: 'Web & Security',
                  count: PROJECTS.filter((p) => p.category === 'Web & Security').length,
                },
              ] as const
            ).map((item) => (
              <button
                key={item.cat}
                type="button"
                className={`cat-pill ${selectedCategory === item.cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(item.cat as ProjectCategory)}
              >
                <span>{item.label}</span>
                <span className="cnt">{item.count}</span>
              </button>
            ))}
          </div>

          {/* Stacking Sticky Project Showcase Deck */}
          <div className="stk" id="pj">
            {filteredProjects.map((pj, idx) => (
              <article
                key={`${selectedCategory}-${pj.name}`}
                className="pj pj-enter"
                style={{ ['--i' as string]: idx }}
              >
                <div className="ph">
                  <div>
                    <span className="n">{pj.number}</span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <small>{pj.category}</small>
                        {typeof pj.stars === 'number' && pj.stars > 0 && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#e3b341]/15 text-[#e3b341] border border-[#e3b341]/30 flex items-center gap-1">
                            <span>★</span>
                            <span>{pj.stars}</span>
                          </span>
                        )}
                        {pj.license && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-[#94a3b8]">
                            {pj.license}
                          </span>
                        )}
                      </div>
                      <strong className="block mt-0.5">{pj.name}</strong>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap justify-end">
                    {pj.liveUrl && (
                      <a
                        className="out bg-[#00d4ff]/10 border-[#00d4ff]/40 text-[#00d4ff] hover:bg-[#00d4ff] hover:text-black transition-colors"
                        href={pj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live Demo ↗
                      </a>
                    )}
                    <a
                      className="out"
                      href={`https://github.com/ishasonaria568-prog/${pj.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub ↗
                    </a>
                  </div>
                </div>

                {/* 3 Mobile Screens Mockup */}
                <div className="mk" style={{ ['--a' as string]: pj.accent }}>
                  {pj.screens.map((screen, sIdx) => (
                    <div key={sIdx} className="f">
                      {screen}
                    </div>
                  ))}
                </div>

                {/* Project Details Footer */}
                <div className="pd">
                  <p>
                    <b>{pj.summary}</b> {pj.details}
                  </p>
                  <p>
                    {pj.stack}
                    <br />
                    <span className="inline-flex flex-wrap gap-4 mt-1 items-center">
                      <a
                        href={`https://github.com/ishasonaria568-prog/${pj.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#8b5cff] hover:underline font-mono text-xs"
                      >
                        github.com/ishasonaria568-prog/{pj.repo}
                      </a>
                      {pj.updatedAgo && (
                        <span className="text-xs text-[#64748b]">· Updated {pj.updatedAgo}</span>
                      )}
                      {pj.liveUrl && (
                        <a
                          href={pj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#00d4ff] hover:underline text-xs"
                        >
                          {pj.liveUrl.replace('https://', '')}
                        </a>
                      )}
                    </span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Practical Training Section */}
      <section className="sheet dk" id="exp" style={{ zIndex: 5 }}>
        <div className="w">
          <div className="hd2">
            <h2 className="big rv">Experience</h2>
            <span className="emo" aria-hidden="true">
              🛡️
            </span>
          </div>

          <div className="bub">
            <div className="bx f" data-dr="1">
              <h3>SOC Operations Trainee</h3>
              <div className="o text-[#00d4ff]">VRSecurity (Cyber Security Fundamentals Program)</div>
              <div className="d">Apr 2026 – Sep 2026</div>
              <ul>
                <li>
                  Monitored real-time enterprise security events in Wazuh SIEM; prioritized, investigated, and escalated malicious network anomalies.
                </li>
                <li>
                  Ran comprehensive network reconnaissance with Nmap, Nikto, Nuclei, and Wireshark to discover exposed ports, unpatched services, and security vulnerabilities.
                </li>
                <li>
                  Executed alert triage, analyzed packet captures, evaluated indicators of compromise (IOCs), and practiced structured incident response playbooks.
                </li>
              </ul>
            </div>
          </div>

          <div className="bub">
            <div className="bx f" data-dr="-1">
              <h3>Cybersecurity Lab Practitioner &amp; CTF Competitor</h3>
              <div className="o text-[#c6f23a]">TryHackMe · Top 2% Globally</div>
              <div className="d">Continuous Practice · 2026</div>
              <ul>
                <li>
                  Completed 100+ simulated security labs focusing on SOC L1 alert triage, network exploitation, web security, and Linux privilege escalation.
                </li>
                <li>
                  Achieved Rank 1 in Bronze, Silver, and Gold competitive leagues; earned 20+ specialized badges with a 100+ day continuous learning streak.
                </li>
                <li>
                  Conducted packet inspection with Wireshark, exploited web application flaws (OWASP Top 10), and documented actionable remediation notes.
                </li>
              </ul>
            </div>
          </div>

          <div className="sub rv">Education &amp; Certifications</div>

          <div className="bub">
            <div className="bx" data-dr="1">
              <div className="d">2023 – 2026</div>
              <h3 style={{ fontSize: '26px' }}>Bachelor of Computer Applications (BCA)</h3>
              <div className="o">Bhakta Kavi Narsinh Mehta University</div>
              <p style={{ margin: '8px 0 0' }}>CGPA 8.30 / 10 · Sem 1 Rank 1</p>
            </div>

            <div className="bx" data-dr="-1">
              <div className="d">Sep 2026</div>
              <h3 style={{ fontSize: '26px' }}>Cyber Security Fundamentals Program (CSFP)</h3>
              <div className="o">VRSecurity · GRAND MASTER</div>
              <p style={{ margin: '8px 0 0' }}>Credential ID: ID-VRS-008</p>
            </div>
          </div>

          <div className="bub">
            <div className="bx" data-dr="-1">
              <div className="d">Jul 2026</div>
              <h3 style={{ fontSize: '26px' }}>Certified Cybersecurity Foundations (CORE)</h3>
              <div className="o">Hackviser</div>
              <p style={{ margin: '8px 0 0' }}>Credential ID: HV-CORE-HO4ESOYZ</p>
            </div>

            <div className="bx" data-dr="1">
              <div className="d">2026 · Global Ranking</div>
              <h3 style={{ fontSize: '26px' }}>TryHackMe Competitive Cybersecurity Standing</h3>
              <div className="o">TryHackMe Profile: CipherGhost24</div>
              <p style={{ margin: '8px 0 0' }}>Top 2% Globally · 100+ Completed Labs · 20+ Badges</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section (Light Sheet) */}
      <section className="sheet lt" id="contact" style={{ zIndex: 6 }}>
        <div className="w ct">
          <div style={{ position: 'relative' }}>
            <h2 className="rv">Let’s get in touch</h2>
            <a className="m" href={`mailto:${DEFAULT_CONTACT_EMAIL}`}>
              {DEFAULT_CONTACT_EMAIL}
            </a>
            <a className="m" href="tel:+917096495430">
              +91 7096495430
            </a>
            <p style={{ margin: '10px 0 0', opacity: 0.75 }}>Veraval, Gujarat, India</p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-semibold">
              <a
                href="/assets/aistudio/ISResume_96235500_96235500.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-[#1b2a4a] text-[#00d4ff] border border-[#00a3e0]/40 hover:bg-[#253966] transition-colors"
              >
                📄 Resume (PDF) ↗
              </a>
              <a
                href="https://linkedin.com/in/isha-sonaria"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8b5cff] hover:underline"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com/ishasonaria568-prog"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8b5cff] hover:underline"
              >
                GitHub ↗
              </a>
              <a
                href="https://tryhackme.com/p/CipherGhost24"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8b5cff] hover:underline"
              >
                TryHackMe ↗
              </a>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <form id="f" onSubmit={handleFormSubmit}>
              <input
                id="fn"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                required
                aria-label="Your name"
              />
              <input
                id="fe"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Your email"
                required
                aria-label="Your email"
              />
              <textarea
                id="fm"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Your message regarding SOC analyst roles or project inquiries"
                required
                aria-label="Your message"
              />
              <div className="flex items-center gap-4">
                <button className="pill" type="submit" style={{ justifySelf: 'start' }}>
                  Send message
                </button>
                {formStatus && (
                  <span className="text-sm font-semibold text-[#8b5cff] animate-fade-in">{formStatus}</span>
                )}
              </div>
            </form>
            <div className="fl" data-3d="blob" data-par="-1" style={{ right: '-2vw', top: '-170px', width: 'min(15vw,150px)' }} />
          </div>

          <div
            className="fl"
            data-3d="knot2"
            data-par="1"
            style={{
              left: 'auto',
              right: '4vw',
              marginTop: '-30px',
              width: 'min(13vw,130px)',
              position: 'absolute',
            }}
          />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="sheet dk ft" style={{ zIndex: 7 }}>
        <div className="w">
          <div className="nm">Isha Sonaria</div>

          {/* Graphical SVG Ornament */}
          <svg viewBox="0 0 900 90" aria-hidden="true">
            <circle cx="45" cy="45" r="40" fill="#eceef7" />
            <rect x="110" y="5" width="80" height="80" rx="22" fill="#c6f23a" />
            <path d="M220 85a40 40 0 0 1 80 0z" fill="#8b5cff" />
            <path d="M330 85 370 5 410 85z" fill="#ff9a3d" />
            <circle cx="480" cy="45" r="40" fill="none" stroke="#00d4ff" strokeWidth="22" />
            <path d="M540 85V5a80 80 0 0 1 80 80z" fill="#eceef7" />
            <rect x="650" y="32" width="80" height="26" rx="13" fill="#8b5cff" />
            <rect x="677" y="5" width="26" height="80" rx="13" fill="#8b5cff" />
            <path d="M780 45 820 5 860 45 820 85z" fill="#ff2fc0" />
          </svg>

          <div className="cols">
            <div>
              <small>Profiles</small>
              <a href="https://linkedin.com/in/isha-sonaria" target="_blank" rel="noopener noreferrer">
                LinkedIn (in/isha-sonaria)
              </a>
              <a href="https://github.com/ishasonaria568-prog" target="_blank" rel="noopener noreferrer">
                GitHub (ishasonaria568-prog)
              </a>
              <a href="https://tryhackme.com/p/CipherGhost24" target="_blank" rel="noopener noreferrer">
                TryHackMe (CipherGhost24)
              </a>
            </div>
            <div>
              <small>Direct Contact</small>
              <a href={`mailto:${DEFAULT_CONTACT_EMAIL}`}>{DEFAULT_CONTACT_EMAIL}</a>
              <a href="tel:+917096495430">+91 7096495430</a>
              <span>Veraval, Gujarat, India</span>
            </div>
          </div>

          <p style={{ color: '#9ea3bd', fontSize: '13px', marginTop: '30px' }}>
            © 2026 Isha Sonaria · SOC Analyst &amp; Cybersecurity Specialist · Veraval, Gujarat, India
          </p>
        </div>
      </footer>
    </div>
  );
}
