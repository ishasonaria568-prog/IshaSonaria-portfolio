import React from 'react';

export interface ToolItem {
  name: string;
  svg: React.ReactNode;
}

export const TOOLS: ToolItem[] = [
  {
    name: 'Wazuh SIEM',
    svg: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="w-[clamp(40px,4.6vw,62px)] h-auto">
        <rect x="6" y="6" width="36" height="36" rx="8" fill="#1b2a4a" stroke="#00a3e0" strokeWidth="2.5" />
        <path d="M14 18l6 14 4-8 4 8 6-14" fill="none" stroke="#00d4ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="14" r="2.5" fill="#c6f23a" />
      </svg>
    ),
  },
  {
    name: 'Wireshark',
    svg: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="w-[clamp(40px,4.6vw,62px)] h-auto">
        <path fill="#1a5fb4" d="M8 38c6-2 10-10 12-22 5 10 12 18 20 22-8-4-15-18-16-28-5 12-11 24-16 28z" />
        <path fill="#3584e4" d="M18 24c3 4 8 9 14 11-5-6-9-15-10-21-2 4-3 7-4 10z" />
        <circle cx="24" cy="38" r="3" fill="#62a0ea" />
      </svg>
    ),
  },
  {
    name: 'Nmap',
    svg: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="w-[clamp(40px,4.6vw,62px)] h-auto">
        <circle cx="24" cy="24" r="18" fill="#121824" stroke="#4e9a06" strokeWidth="2.5" />
        <circle cx="24" cy="24" r="12" fill="none" stroke="#73d216" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="24" cy="24" r="6" fill="none" stroke="#8ae234" strokeWidth="1.5" />
        <line x1="24" y1="24" x2="36" y2="15" stroke="#c6f23a" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="34" cy="17" r="2.5" fill="#ff4d4d" />
      </svg>
    ),
  },
  {
    name: 'Burp Suite',
    svg: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="w-[clamp(40px,4.6vw,62px)] h-auto">
        <rect x="6" y="6" width="36" height="36" rx="8" fill="#ff6633" />
        <path d="M15 14h10c3 0 5 1.5 5 4s-2 3.5-5 3.5H15zm0 11h11c3.5 0 5.5 1.5 5.5 4.5S29.5 34 26 34H15z" fill="#ffffff" />
        <path d="M19 18h5c1 0 2 .5 2 1.5s-1 1.5-2 1.5h-5zm0 9h6c1.2 0 2.2.5 2.2 1.8s-1 1.7-2.2 1.7h-6z" fill="#ff6633" />
      </svg>
    ),
  },
  {
    name: 'Metasploit',
    svg: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="w-[clamp(40px,4.6vw,62px)] h-auto">
        <rect x="6" y="6" width="36" height="36" rx="8" fill="#1b3a5c" stroke="#2a75d3" strokeWidth="2" />
        <path d="M14 34V14l10 11 10-11v20" fill="none" stroke="#2980b9" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 34V18l10 10 10-10v16" fill="none" stroke="#5dade2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Kali Linux',
    svg: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="w-[clamp(40px,4.6vw,62px)] h-auto">
        <circle cx="24" cy="24" r="19" fill="#0f141c" stroke="#2582ff" strokeWidth="2" />
        <path d="M16 33c4-2 7-6 9-11 3 3 8 5 11 4-2-4-5-8-9-9-1 4-4 9-11 16z" fill="#2582ff" />
        <path d="M14 26c3 1 7-1 10-5-4 1-8 2-10 5z" fill="#70aeff" />
      </svg>
    ),
  },
  {
    name: 'Python',
    svg: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="w-[clamp(40px,4.6vw,62px)] h-auto">
        <path
          fill="#3776ab"
          d="M23.6 5c-6.8 0-6.4 2.9-6.4 2.9l.01 3h6.5v.9H14.5S9 11.2 9 18.2s4.8 6.7 4.8 6.7h2.9v-4.1s-.2-4.8 4.7-4.8h8.2s4.6-.1 4.6-4.5-4.1-6.5-8.6-6.5zm-3.6 2.8a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6z"
        />
        <path
          fill="#ffd43b"
          d="M24.4 43c6.8 0 6.4-2.9 6.4-2.9l-.01-3h-6.5v-.9h9.2s5.5.6 5.5-6.4-4.8-6.7-4.8-6.7h-2.9v4.1s.2 4.8-4.7 4.8h-8.2s-4.6.1-4.6 4.5 4.1 6.5 8.6 6.5zm3.6-2.8a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6z"
        />
      </svg>
    ),
  },
  {
    name: 'Go',
    svg: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="w-[clamp(40px,4.6vw,62px)] h-auto">
        <rect x="6" y="6" width="36" height="36" rx="8" fill="#00add8" />
        <text x="24" y="31" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="21" fill="#fff" textAnchor="middle">
          GO
        </text>
      </svg>
    ),
  },
  {
    name: 'Bash',
    svg: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="w-[clamp(40px,4.6vw,62px)] h-auto">
        <rect x="6" y="8" width="36" height="32" rx="6" fill="#293138" stroke="#4eb822" strokeWidth="2" />
        <path d="M14 19l5 5-5 5M22 29h8" stroke="#4eb822" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    name: 'Docker',
    svg: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="w-[clamp(40px,4.6vw,62px)] h-auto">
        <rect x="15" y="16" width="5" height="4" fill="#0db7ed" />
        <rect x="21" y="16" width="5" height="4" fill="#0db7ed" />
        <rect x="27" y="16" width="5" height="4" fill="#0db7ed" />
        <rect x="21" y="11" width="5" height="4" fill="#0db7ed" />
        <rect x="27" y="11" width="5" height="4" fill="#0db7ed" />
        <rect x="9" y="21" width="5" height="4" fill="#0db7ed" />
        <rect x="15" y="21" width="5" height="4" fill="#0db7ed" />
        <rect x="21" y="21" width="5" height="4" fill="#0db7ed" />
        <rect x="27" y="21" width="5" height="4" fill="#0db7ed" />
        <path d="M37 22c2-1 3-3 3-3s-2-1-4 0c-1-1-3-1-4 0v3c-3 0-14 0-18 4-4 4-4 8-4 8s4 2 11 2c12 0 16-6 17-10 3 0 5-2 5-4z" fill="#0db7ed" />
      </svg>
    ),
  },
  {
    name: 'Nuclei',
    svg: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="w-[clamp(40px,4.6vw,62px)] h-auto">
        <rect x="6" y="6" width="36" height="36" rx="8" fill="#111827" stroke="#8b5cff" strokeWidth="2" />
        <circle cx="24" cy="24" r="6" fill="#8b5cff" />
        <ellipse cx="24" cy="24" rx="14" ry="5" fill="none" stroke="#a78bfa" strokeWidth="1.8" transform="rotate(30 24 24)" />
        <ellipse cx="24" cy="24" rx="14" ry="5" fill="none" stroke="#c4b5fd" strokeWidth="1.8" transform="rotate(-30 24 24)" />
      </svg>
    ),
  },
  {
    name: 'Nikto',
    svg: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="w-[clamp(40px,4.6vw,62px)] h-auto">
        <circle cx="24" cy="24" r="18" fill="#8b0000" stroke="#ff4d4d" strokeWidth="2" />
        <path d="M16 16l16 16M32 16L16 32" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="24" cy="24" r="4" fill="#ffd700" />
      </svg>
    ),
  },
  {
    name: 'SQLmap',
    svg: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="w-[clamp(40px,4.6vw,62px)] h-auto">
        <rect x="6" y="6" width="36" height="36" rx="8" fill="#800020" stroke="#ff3b30" strokeWidth="2" />
        <text x="24" y="24" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="13" fill="#fff" textAnchor="middle">
          SQL
        </text>
        <path d="M14 29h20M14 33h14" stroke="#ffcc00" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'TryHackMe',
    svg: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="w-[clamp(40px,4.6vw,62px)] h-auto">
        <rect x="6" y="6" width="36" height="36" rx="8" fill="#1f242d" stroke="#c6f23a" strokeWidth="2" />
        <path d="M14 18h20M24 18v16" stroke="#c6f23a" strokeWidth="4" strokeLinecap="round" />
        <circle cx="34" cy="30" r="3" fill="#ff4fa0" />
      </svg>
    ),
  },
];

export interface SkillCategory {
  number: string;
  title: string;
  tags: string;
}

export const SKILLS: SkillCategory[] = [
  {
    number: '01',
    title: 'Networking & Security',
    tags: 'TCP/IP, OSI Model, DNS, DHCP, HTTP/HTTPS, SSH, FTP, Subnetting, Port Scanning, Routing Analysis',
  },
  {
    number: '02',
    title: 'SOC & Threat Defense',
    tags: 'Wazuh SIEM, Alert Triage, Incident Response, Network Traffic Analysis, Digital Forensics, Email Forensics, VAPT, IOC Extraction, OSINT',
  },
  {
    number: '03',
    title: 'Security Tools',
    tags: 'Wireshark, Nmap, Burp Suite, Metasploit, SQLmap, Nikto, Nuclei, WPScan, Hydra, Kali Linux',
  },
  {
    number: '04',
    title: 'Programming & Scripting',
    tags: 'Python, Go, Bash, PowerShell, C, C++, Java, JavaScript, PHP',
  },
  {
    number: '05',
    title: 'Hands-on CTF & Labs',
    tags: 'TryHackMe Top 2% Globally, 100+ Completed Labs (SOC L1 Alert Triage, Network Exploitation, Web Security, Linux PrivEsc), Rank 1 Leagues',
  },
  {
    number: '06',
    title: 'Certifications & Credentials',
    tags: 'CSFP (Cyber Security Fundamentals Program — Grand Master, ID-VRS-008), Hackviser CORE (HV-CORE-HO4ESOYZ)',
  },
  {
    number: '07',
    title: 'Core CS & Investigation',
    tags: 'Computer Forensics, Operating Systems, Packet Inspection, System Hardening, Log Analysis & Anomaly Detection',
  },
];

export type ProjectCategory = 'All' | 'Network & Recon' | 'Threat Defense & Forensics' | 'Web & Security';

export interface ProjectItem {
  number: string;
  name: string;
  stack: string;
  summary: string;
  details: string;
  repo: string;
  liveUrl?: string;
  accent: string;
  category: 'Network & Recon' | 'Threat Defense & Forensics' | 'Web & Security';
  stars?: number;
  license?: string;
  updatedAgo?: string;
  screens: React.ReactNode[];
}

export interface GitHubRepoItem {
  name: string;
  repo: string;
  description: string;
  language: 'Python' | 'TypeScript' | 'JavaScript' | 'Go';
  stars: number;
  license?: string;
  updatedAgo: string;
  isPublic: boolean;
  liveUrl?: string;
  category: 'Network & Recon' | 'Threat Defense & Forensics' | 'Web & Security';
}

/**
 * All 11 GitHub Repositories directly transcribed from the user's GitHub profile.
 */
export const GITHUB_REPOS: GitHubRepoItem[] = [
  {
    name: 'pingx-cli',
    repo: 'pingx-cli',
    description: 'PINGX — A lightweight Python based ICMP ping utility for network reachability testing, response time measurement, packet loss analysis, and IPv4/IPv6 support. Built by Isha Sonaria.',
    language: 'Python',
    stars: 0,
    updatedAgo: '2 days ago',
    isPublic: true,
    category: 'Network & Recon',
  },
  {
    name: 'websentry',
    repo: 'websentry',
    description: 'WebSentry is a Python based, CLI only web server security scanner inspired by Nikto. It performs HTTP header analysis, server fingerprinting, SSL/TLS checks, HTTP method detection, sensitive file discovery, and vulnerability checks.',
    language: 'Python',
    stars: 0,
    updatedAgo: '3 days ago',
    isPublic: true,
    category: 'Threat Defense & Forensics',
  },
  {
    name: 'pathhawk',
    repo: 'pathhawk',
    description: 'A powerful Python based CLI web asset discovery and reconnaissance tool featuring directory and file enumeration, DNS subdomain discovery, recursive scanning, HTTP filtering, and JSON/CSV/HTML reporting.',
    language: 'Python',
    stars: 0,
    license: 'MIT License',
    updatedAgo: '4 days ago',
    isPublic: true,
    category: 'Network & Recon',
  },
  {
    name: 'augur-recon-2.0',
    repo: 'augur-recon-2.0',
    description: 'AI Augmented Attack Surface Intelligence — A professional network reconnaissance tool featuring TCP/UDP port scanning, service detection, DNS enumeration, TLS certificate inspection, and scan history.',
    language: 'TypeScript',
    stars: 0,
    updatedAgo: 'last week',
    isPublic: true,
    category: 'Network & Recon',
  },
  {
    name: 'isha-sonaria-portfolio',
    repo: 'isha-sonaria-portfolio',
    description: 'Interactive high-performance cybersecurity portfolio featuring dark theme SOC aesthetic, Three.js WebGL effects, kinetic typography, and TryHackMe metrics showcase.',
    language: 'TypeScript',
    stars: 0,
    updatedAgo: 'last week',
    isPublic: true,
    category: 'Web & Security',
  },
  {
    name: 'phishguard-ml',
    repo: 'phishguard-ml',
    description: 'Machine learning based phishing URL detection tool built with Python, FastAPI, React, and Random Forest. Analyzes URL features to identify potentially malicious links with explainable risk scoring.',
    language: 'TypeScript',
    stars: 2,
    updatedAgo: '2 weeks ago',
    isPublic: true,
    liveUrl: 'https://phishguard-ml-six.vercel.app',
    category: 'Threat Defense & Forensics',
  },
  {
    name: 'netsentry-cli',
    repo: 'netsentry-cli',
    description: 'Python based CLI network discovery and security assessment tool for Kali Linux. Features host discovery, TCP port scanning, service identification, network inventory, and security reporting.',
    language: 'Python',
    stars: 1,
    license: 'MIT License',
    updatedAgo: '2 weeks ago',
    isPublic: true,
    category: 'Network & Recon',
  },
  {
    name: 'pdf-fortress',
    repo: 'pdf-fortress',
    description: 'PDF Fortress — A Python based PDF security tool with both CLI and GUI interfaces for document analysis, password protection, output verification, and secure PDF handling.',
    language: 'TypeScript',
    stars: 1,
    license: 'Other',
    updatedAgo: 'Oct 7',
    isPublic: true,
    liveUrl: 'https://pdf-fortress.vercel.app',
    category: 'Threat Defense & Forensics',
  },
  {
    name: 'SubScope',
    repo: 'SubScope',
    description: 'Python based CLI tool for automated subdomain enumeration and reconnaissance, featuring multithreaded scanning, DNS resolution, HTTP/HTTPS probing, and structured result reporting for authorized security audits.',
    language: 'Python',
    stars: 1,
    license: 'MIT License',
    updatedAgo: 'Oct 3',
    isPublic: true,
    category: 'Network & Recon',
  },
  {
    name: 'college-voting-portal-secure',
    repo: 'college-voting-portal-secure',
    description: 'Secure college voting portal designed with authentication, role based access control (RBAC), cryptographic audit trails, and anti-tamper security controls to protect online voting workflows.',
    language: 'TypeScript',
    stars: 2,
    updatedAgo: 'Aug 27',
    isPublic: true,
    category: 'Web & Security',
  },
  {
    name: 'email-header-forensics',
    repo: 'email-header-forensics',
    description: 'Digital forensics tool for analyzing email headers to trace email sources, verify SPF/DKIM/DMARC records, detect spoofing indicators, and investigate suspicious mail routes.',
    language: 'JavaScript',
    stars: 2,
    updatedAgo: 'Aug 26',
    isPublic: true,
    liveUrl: 'https://email-header-forensics.vercel.app',
    category: 'Threat Defense & Forensics',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    number: '01',
    name: 'PhishGuard ML',
    stack: 'Python · FastAPI · scikit-learn · React · SQLite · Docker',
    summary: 'Offline phishing URL detector using Random Forest and 16 static lexical/structural URL features.',
    details: 'Classifies URLs as Safe, Suspicious, or Phishing; supports batch scans with CSV/JSON export and scan history. Packaged as a FastAPI + React application with SQLite storage and Docker; requires zero external API keys.',
    repo: 'phishguard-ml',
    liveUrl: 'https://phishguard-ml-six.vercel.app',
    accent: '#00d4ff',
    category: 'Threat Defense & Forensics',
    stars: 2,
    updatedAgo: '2 weeks ago',
    screens: [
      <div key="s1" className="u">
        <div className="nb" />
        <div className="t">PHISHGUARD ML</div>
        <div className="sb">URL Security Scanner</div>
        <div className="bg-[#121c2e] p-3 rounded-lg border border-[#233554] my-2">
          <div className="text-[10px] text-[#8892b0] truncate">https://secure-login-verify-account.com</div>
        </div>
        <div className="c my-2 border-l-4 border-[#ff4d4d] bg-[#2d1218] p-2 rounded">
          <div className="text-[12px] font-bold text-[#ff6b6b] flex items-center justify-between">
            <span>VERDICT</span>
            <span className="bg-[#ff4d4d] text-white text-[9px] px-1.5 py-0.5 rounded font-black">PHISHING</span>
          </div>
          <div className="text-[10px] text-[#ffb4b4] mt-1">Confidence: 98.4% (Random Forest)</div>
        </div>
        <div className="g2 mt-2">
          <div className="c">
            <em>Entropy</em>
            <div className="n text-[#ff6b6b]">4.82</div>
          </div>
          <div className="c">
            <em>Hyphens</em>
            <div className="n text-[#ffcc00]">3 found</div>
          </div>
          <div className="c">
            <em>HTTPS Token</em>
            <div className="n text-[#ff6b6b]">Spoofed</div>
          </div>
          <div className="c">
            <em>Status</em>
            <div className="n text-[#00d4ff]">Offline</div>
          </div>
        </div>
      </div>,

      <div key="s2" className="u">
        <div className="nb" />
        <div className="t">BATCH SCAN</div>
        <div className="sb">Scan History &amp; Export</div>
        <div className="space-y-1.5 my-2">
          <div className="c ln py-1.5">
            <span className="truncate max-w-[120px] text-[11px]">paypal-update.xyz</span>
            <span className="text-[10px] bg-[#ff4d4d]/20 text-[#ff6b6b] px-1 rounded font-bold">Phish (99%)</span>
          </div>
          <div className="c ln py-1.5">
            <span className="truncate max-w-[120px] text-[11px]">github.com</span>
            <span className="text-[10px] bg-[#4ade80]/20 text-[#4ade80] px-1 rounded font-bold">Safe (0%)</span>
          </div>
          <div className="c ln py-1.5">
            <span className="truncate max-w-[120px] text-[11px]">acc-billing-srv.net</span>
            <span className="text-[10px] bg-[#fbbf24]/20 text-[#fbbf24] px-1 rounded font-bold">Suspicious</span>
          </div>
          <div className="c ln py-1.5">
            <span className="truncate max-w-[120px] text-[11px]">drive.google.com</span>
            <span className="text-[10px] bg-[#4ade80]/20 text-[#4ade80] px-1 rounded font-bold">Safe (0%)</span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] bg-[#1a2333] p-2 rounded">
          <span className="text-[#a0aec0]">Export Format</span>
          <span className="text-[#00d4ff] font-semibold">CSV / JSON ↗</span>
        </div>
      </div>,

      <div key="s3" className="u">
        <div className="nb" />
        <div className="t">ML TELEMETRY</div>
        <div className="sb">16 Static Heuristics</div>
        <div className="space-y-2 mt-2">
          <div className="c">
            <div className="ln text-[11px]">
              <span>Domain URL Length</span>
              <em>Weight 0.28</em>
            </div>
            <div className="pb mt-1"><i style={{ width: '85%', background: '#00d4ff' }} /></div>
          </div>
          <div className="c">
            <div className="ln text-[11px]">
              <span>IP Address as Hostname</span>
              <em>Weight 0.24</em>
            </div>
            <div className="pb mt-1"><i style={{ width: '74%', background: '#8b5cff' }} /></div>
          </div>
          <div className="c">
            <div className="ln text-[11px]">
              <span>Suspicious TLD Rank</span>
              <em>Weight 0.19</em>
            </div>
            <div className="pb mt-1"><i style={{ width: '60%', background: '#c6f23a' }} /></div>
          </div>
          <div className="c">
            <div className="ln text-[11px]">
              <span>Subdomain Depth (&gt;3)</span>
              <em>Weight 0.15</em>
            </div>
            <div className="pb mt-1"><i style={{ width: '48%', background: '#ff9a3d' }} /></div>
          </div>
        </div>
      </div>,
    ],
  },
  {
    number: '02',
    name: 'Email Header Forensics',
    stack: 'Go · JavaScript · REST API · Local Forensics',
    summary: 'High-speed Go parser extracting authentication records, sender domains, and mail-routing hops.',
    details: 'Detects SPF, DKIM, and DMARC failures and Reply-To domain mismatches. Classifies IPv4/IPv6 hops with an automated 0–100 risk score and JSON report export; runs completely offline for local digital forensics.',
    repo: 'email-header-forensics',
    liveUrl: 'https://email-header-forensics.vercel.app',
    accent: '#8b5cff',
    category: 'Threat Defense & Forensics',
    stars: 2,
    updatedAgo: 'Aug 26',
    screens: [
      <div key="s1" className="u">
        <div className="nb" />
        <div className="t">HEADER FORENSICS</div>
        <div className="sb">Authentication Verification</div>
        <div className="space-y-2 my-2">
          <div className="c flex items-center justify-between p-2 rounded bg-[#181b2a]">
            <div>
              <div className="text-[12px] font-bold">SPF Record</div>
              <div className="text-[10px] text-[#718096]">ip4:198.51.100.24</div>
            </div>
            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-[#ff4d4d]/20 text-[#ff6b6b]">SOFTFAIL</span>
          </div>
          <div className="c flex items-center justify-between p-2 rounded bg-[#181b2a]">
            <div>
              <div className="text-[12px] font-bold">DKIM Signature</div>
              <div className="text-[10px] text-[#718096]">s=202601; d=sender.org</div>
            </div>
            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-[#4ade80]/20 text-[#4ade80]">PASS</span>
          </div>
          <div className="c flex items-center justify-between p-2 rounded bg-[#181b2a]">
            <div>
              <div className="text-[12px] font-bold">DMARC Policy</div>
              <div className="text-[10px] text-[#718096]">p=reject; sp=reject</div>
            </div>
            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-[#ff4d4d]/20 text-[#ff6b6b]">FAIL</span>
          </div>
        </div>
        <div className="c p-2 rounded bg-[#2e1320] border-l-2 border-[#ff4fa0] text-[10px] text-[#ff99cb]">
          <b>Reply-To Mismatch:</b> From &lt;support@bank.com&gt; differs from Reply-To &lt;harvest@evil.ru&gt;
        </div>
      </div>,

      <div key="s2" className="u">
        <div className="nb" />
        <div className="t">RELAY HOPS</div>
        <div className="sb">Transit Latency &amp; Route</div>
        <div className="space-y-2 mt-2">
          <div className="c p-2 rounded bg-[#131622] border-l-2 border-[#00d4ff]">
            <div className="flex justify-between text-[11px] font-bold">
              <span>Hop 1: Origin Client</span>
              <span className="text-[#a0aec0]">0ms</span>
            </div>
            <div className="text-[10px] text-[#718096]">203.0.113.195 (IPv4)</div>
          </div>
          <div className="c p-2 rounded bg-[#131622] border-l-2 border-[#8b5cff]">
            <div className="flex justify-between text-[11px] font-bold">
              <span>Hop 2: Mail Relay MTA</span>
              <span className="text-[#a0aec0]">+124ms</span>
            </div>
            <div className="text-[10px] text-[#718096]">mail.mx-gateway.net</div>
          </div>
          <div className="c p-2 rounded bg-[#131622] border-l-2 border-[#c6f23a]">
            <div className="flex justify-between text-[11px] font-bold">
              <span>Hop 3: Destination Ingress</span>
              <span className="text-[#a0aec0]">+88ms</span>
            </div>
            <div className="text-[10px] text-[#718096]">mx.targetcorp.com</div>
          </div>
        </div>
      </div>,

      <div key="s3" className="u">
        <div className="nb" />
        <div className="t">RISK ASSESSMENT</div>
        <div className="sb">0–100 Forensic Score</div>
        <div className="text-center my-3">
          <div className="k text-[#ff4d4d]">84</div>
          <div className="text-[12px] font-bold text-[#ff6b6b]">HIGH RISK THREAT</div>
        </div>
        <div className="c ln text-[11px]">
          <span>Auth Violations</span>
          <em>+45 pts</em>
        </div>
        <div className="c ln text-[11px]">
          <span>Header Spoofing</span>
          <em>+25 pts</em>
        </div>
        <div className="c ln text-[11px]">
          <span>Suspicious Relay ASN</span>
          <em>+14 pts</em>
        </div>
        <div className="mt-3 text-center">
          <span className="text-[11px] bg-[#8b5cff] text-white px-3 py-1 rounded font-bold">Download JSON Report</span>
        </div>
      </div>,
    ],
  },
  {
    number: '03',
    name: 'pingx-cli',
    stack: 'Python · ICMP · IPv4/IPv6 · Raw Sockets · CLI',
    summary: 'Lightweight Python ICMP ping utility for network reachability testing, response time measurement, and packet loss analysis.',
    details: 'Supports dual-stack IPv4 and IPv6 probing, microsecond-accurate RTT calculations, jitter analysis, custom payload sizing, and continuous network degradation metrics.',
    repo: 'pingx-cli',
    accent: '#38bdf8',
    category: 'Network & Recon',
    stars: 0,
    updatedAgo: '2 days ago',
    screens: [
      <div key="s1" className="u">
        <div className="nb" />
        <div className="t font-mono text-[#38bdf8]">PINGX CLI</div>
        <div className="sb font-mono">ICMP Reachability Probe</div>
        <div className="bg-[#0c121d] p-2.5 rounded font-mono text-[9px] text-[#94a3b8] space-y-1 my-2 border border-[#1e293b]">
          <div className="text-[#38bdf8] font-bold">$ pingx 8.8.8.8 -c 4 --jitter</div>
          <div>[+] PING 8.8.8.8 (56 data bytes)</div>
          <div className="text-[#4ade80]">64 bytes: icmp_seq=1 ttl=118 time=14.2ms</div>
          <div className="text-[#4ade80]">64 bytes: icmp_seq=2 ttl=118 time=13.8ms</div>
          <div className="text-[#4ade80]">64 bytes: icmp_seq=3 ttl=118 time=14.5ms</div>
          <div className="text-[#38bdf8]">--- 8.8.8.8 ping statistics ---</div>
          <div className="text-white">4 packets transmitted, 0% packet loss</div>
        </div>
        <div className="g2 mt-2">
          <div className="c">
            <em>Min RTT</em>
            <div className="n text-[#4ade80]">13.8ms</div>
          </div>
          <div className="c">
            <em>Avg RTT</em>
            <div className="n text-[#38bdf8]">14.1ms</div>
          </div>
        </div>
      </div>,
      <div key="s2" className="u">
        <div className="nb" />
        <div className="t">PACKET METRICS</div>
        <div className="sb">Loss &amp; Jitter Telemetry</div>
        <div className="space-y-2 mt-2">
          <div className="c">
            <div className="ln text-[11px]">
              <span>Packet Success Rate</span>
              <em className="text-[#4ade80]">100%</em>
            </div>
            <div className="pb mt-1"><i style={{ width: '100%', background: '#4ade80' }} /></div>
          </div>
          <div className="c">
            <div className="ln text-[11px]">
              <span>IPv6 Compatibility</span>
              <em className="text-[#38bdf8]">Ready</em>
            </div>
            <div className="pb mt-1"><i style={{ width: '100%', background: '#38bdf8' }} /></div>
          </div>
          <div className="c">
            <div className="ln text-[11px]">
              <span>Jitter Deviation</span>
              <em className="text-[#c6f23a]">0.32 ms</em>
            </div>
            <div className="pb mt-1"><i style={{ width: '25%', background: '#c6f23a' }} /></div>
          </div>
        </div>
      </div>,
      <div key="s3" className="u">
        <div className="nb" />
        <div className="t">DIAGNOSTICS</div>
        <div className="sb">Network Route Health</div>
        <div className="c p-2 rounded bg-[#0f172a] border-l-2 border-[#38bdf8] my-2 text-[10px]">
          <span className="font-bold text-white">Default Gateway:</span> 192.168.1.1 (0.8ms)
        </div>
        <div className="c p-2 rounded bg-[#0f172a] border-l-2 border-[#4ade80] my-2 text-[10px]">
          <span className="font-bold text-white">DNS Target:</span> 1.1.1.1 (Resolved)
        </div>
        <div className="mt-3 text-center">
          <span className="text-[11px] bg-[#38bdf8] text-black px-3 py-1 rounded font-bold">Active Probe Idle</span>
        </div>
      </div>,
    ],
  },
  {
    number: '04',
    name: 'WebSentry',
    stack: 'Python · Nikto-inspired · SSL/TLS · HTTP Security · CLI',
    summary: 'CLI web server security scanner performing HTTP header audit, server fingerprinting, and sensitive file probing.',
    details: 'Scans targets for missing security headers (CSP, HSTS, X-Frame-Options), dangerous HTTP methods (PUT, DELETE, TRACE), misconfigured SSL/TLS ciphers, and exposed sensitive directories (.env, .git, backup zips).',
    repo: 'websentry',
    accent: '#ef4444',
    category: 'Threat Defense & Forensics',
    stars: 0,
    updatedAgo: '3 days ago',
    screens: [
      <div key="s1" className="u">
        <div className="nb" />
        <div className="t font-mono text-[#ef4444]">WEBSENTRY</div>
        <div className="sb font-mono">Nikto-Style Vulnerability Audit</div>
        <div className="bg-[#180b0e] p-2.5 rounded font-mono text-[9px] text-[#fca5a5] space-y-1 my-2 border border-[#450a0a]">
          <div className="text-[#f87171] font-bold">$ websentry -u https://testserver.local</div>
          <div>[*] Server: Apache/2.4.41 (Ubuntu)</div>
          <div className="text-[#ef4444]">[!] Missing Header: X-Frame-Options</div>
          <div className="text-[#ef4444]">[!] Missing Header: Strict-Transport-Security</div>
          <div className="text-[#fbbf24]">[+] Exposed: /.git/HEAD found (200 OK)</div>
          <div className="text-[#4ade80]">[✓] Scan complete: 4 issues flagged</div>
        </div>
      </div>,
      <div key="s2" className="u">
        <div className="nb" />
        <div className="t">HEADER AUDIT</div>
        <div className="sb">Defensive Posture Check</div>
        <div className="space-y-1.5 my-2 text-[10px]">
          <div className="c flex justify-between p-1.5 rounded bg-[#1f1014]">
            <span>Content-Security-Policy</span>
            <span className="text-[#ef4444] font-bold">MISSING</span>
          </div>
          <div className="c flex justify-between p-1.5 rounded bg-[#1f1014]">
            <span>X-Content-Type-Options</span>
            <span className="text-[#4ade80] font-bold">nosniff</span>
          </div>
          <div className="c flex justify-between p-1.5 rounded bg-[#1f1014]">
            <span>HSTS Preload</span>
            <span className="text-[#ef4444] font-bold">MISSING</span>
          </div>
          <div className="c flex justify-between p-1.5 rounded bg-[#1f1014]">
            <span>Server Banner Leak</span>
            <span className="text-[#fbbf24] font-bold">Apache/2.4</span>
          </div>
        </div>
      </div>,
      <div key="s3" className="u">
        <div className="nb" />
        <div className="t">PROBE SUMMARY</div>
        <div className="sb">Vulnerability Severity</div>
        <div className="g2 my-2">
          <div className="c">
            <em>High</em>
            <div className="n text-[#ef4444]">2</div>
          </div>
          <div className="c">
            <em>Medium</em>
            <div className="n text-[#fbbf24]">2</div>
          </div>
          <div className="c">
            <em>Low</em>
            <div className="n text-[#38bdf8]">5</div>
          </div>
          <div className="c">
            <em>Passed</em>
            <div className="n text-[#4ade80]">14</div>
          </div>
        </div>
        <div className="mt-2 text-center text-[10px] text-[#fca5a5]">Report saved: websentry_audit.json</div>
      </div>,
    ],
  },
  {
    number: '05',
    name: 'PathHawk',
    stack: 'Python · MIT License · Recon · DNS · Multi-thread · CLI',
    summary: 'Fast Python CLI web asset discovery and reconnaissance tool for directory, file, and DNS subdomain discovery.',
    details: 'Features high-speed wordlist fuzzing, recursive directory scanning, DNS wildcard filtering, HTTP status categorization, and exports comprehensive HTML, CSV, and JSON audit artifacts.',
    repo: 'pathhawk',
    accent: '#f59e0b',
    category: 'Network & Recon',
    stars: 0,
    license: 'MIT License',
    updatedAgo: '4 days ago',
    screens: [
      <div key="s1" className="u">
        <div className="nb" />
        <div className="t font-mono text-[#f59e0b]">PATHHAWK CLI</div>
        <div className="sb font-mono">Web Asset Discovery</div>
        <div className="bg-[#1c1407] p-2.5 rounded font-mono text-[9px] text-[#fcd34d] space-y-1 my-2 border border-[#78350f]">
          <div className="text-[#fbbf24] font-bold">$ pathhawk -u https://corp.net -w paths.txt</div>
          <div>[*] Fuzzing 4,820 routes with 25 threads</div>
          <div className="text-[#4ade80]">[200 OK] /admin/login.php (Size: 3,420)</div>
          <div className="text-[#4ade80]">[200 OK] /api/v1/health (Size: 84)</div>
          <div className="text-[#f87171]">[403 FORB] /server-status</div>
          <div className="text-[#38bdf8]">[301 REDIR] /console -&gt; /console/login</div>
        </div>
      </div>,
      <div key="s2" className="u">
        <div className="nb" />
        <div className="t">ASSET DISCOVERY</div>
        <div className="sb">Discovered Endpoints</div>
        <div className="space-y-1.5 my-2 font-mono text-[10px]">
          <div className="c ln py-1">
            <span className="text-[#fef3c7]">/backup.tar.gz</span>
            <span className="text-[#ef4444] font-bold">200 OK (LEAK)</span>
          </div>
          <div className="c ln py-1">
            <span className="text-[#fef3c7]">/swagger-ui.html</span>
            <span className="text-[#fbbf24] font-bold">200 OK (DOCS)</span>
          </div>
          <div className="c ln py-1">
            <span className="text-[#fef3c7]">/.env.example</span>
            <span className="text-[#4ade80] font-bold">200 OK</span>
          </div>
        </div>
      </div>,
      <div key="s3" className="u">
        <div className="nb" />
        <div className="t">RECON METRICS</div>
        <div className="sb">Scan Performance</div>
        <div className="g2 my-2">
          <div className="c">
            <em>Req/sec</em>
            <div className="n text-[#f59e0b]">480</div>
          </div>
          <div className="c">
            <em>Endpoints</em>
            <div className="n text-[#4ade80]">38</div>
          </div>
        </div>
        <div className="c text-[10px] text-center bg-[#291e0a] p-1.5 rounded text-[#fde68a]">
          Exported: pathhawk-report.html
        </div>
      </div>,
    ],
  },
  {
    number: '06',
    name: 'Augur Recon 2.0',
    stack: 'TypeScript · Attack Surface AI · Port Scanning · DNS · TLS',
    summary: 'AI Augmented Attack Surface Intelligence tool with TCP/UDP port scanning, service detection, and TLS inspection.',
    details: 'Integrates automated service banner recognition, DNS zone transfer checks, TLS certificate expiry tracking, and persistent scan telemetry to map modern enterprise perimeters with high accuracy.',
    repo: 'augur-recon-2.0',
    accent: '#a855f7',
    category: 'Network & Recon',
    stars: 0,
    updatedAgo: 'last week',
    screens: [
      <div key="s1" className="u">
        <div className="nb" />
        <div className="t text-[#a855f7]">AUGUR RECON 2.0</div>
        <div className="sb">Attack Surface Intelligence</div>
        <div className="bg-[#170e28] p-2.5 rounded font-mono text-[9px] text-[#e9d5ff] space-y-1 my-2 border border-[#581c87]">
          <div className="text-[#c084fc] font-bold">&gt; augur scan --target enterprise.io</div>
          <div>[+] DNS Records: 14 resolved</div>
          <div>[+] Port 443/TCP: Open (nginx 1.24)</div>
          <div>[+] Port 8443/TCP: Open (K8s API)</div>
          <div className="text-[#4ade80]">[✓] TLS Cert: Valid (CN=*.enterprise.io)</div>
        </div>
      </div>,
      <div key="s2" className="u">
        <div className="nb" />
        <div className="t">PORT MATRIX</div>
        <div className="sb">Service Fingerprints</div>
        <div className="space-y-1.5 my-2 text-[10px]">
          <div className="c flex justify-between p-1.5 rounded bg-[#201335]">
            <span className="font-mono">80/TCP HTTP</span>
            <span className="text-[#38bdf8]">Redirect 301</span>
          </div>
          <div className="c flex justify-between p-1.5 rounded bg-[#201335]">
            <span className="font-mono">443/TCP HTTPS</span>
            <span className="text-[#4ade80]">TLS 1.3 Active</span>
          </div>
          <div className="c flex justify-between p-1.5 rounded bg-[#201335]">
            <span className="font-mono">22/TCP SSH</span>
            <span className="text-[#fbbf24]">OpenSSH 8.9</span>
          </div>
        </div>
      </div>,
      <div key="s3" className="u">
        <div className="nb" />
        <div className="t">RISK RADAR</div>
        <div className="sb">Attack Surface Exposure</div>
        <div className="g2 my-2">
          <div className="c">
            <em>Exposed Services</em>
            <div className="n text-[#a855f7]">6</div>
          </div>
          <div className="c">
            <em>TLS Rating</em>
            <div className="n text-[#4ade80]">A+</div>
          </div>
        </div>
        <div className="mt-2 text-center text-[10px] text-[#d8b4fe]">AI Risk Profile: LOW RISK</div>
      </div>,
    ],
  },
  {
    number: '07',
    name: 'NetSentry CLI',
    stack: 'Python · MIT License · Kali Linux · Host Discovery · Port Scanning',
    summary: 'Python-based CLI network discovery and security assessment tool engineered specifically for Kali Linux.',
    details: 'Automates ARP/ICMP subnet sweeps, multithreaded TCP syn-scanning, service banner identification, and device inventory logging to streamline field network audits.',
    repo: 'netsentry-cli',
    accent: '#10b981',
    category: 'Network & Recon',
    stars: 1,
    license: 'MIT License',
    updatedAgo: '2 weeks ago',
    screens: [
      <div key="s1" className="u">
        <div className="nb" />
        <div className="t font-mono text-[#10b981]">NETSENTRY CLI</div>
        <div className="sb font-mono">Kali Linux Network Discovery</div>
        <div className="bg-[#061e16] p-2.5 rounded font-mono text-[9px] text-[#a7f3d0] space-y-1 my-2 border border-[#065f46]">
          <div className="text-[#34d399] font-bold"># netsentry --discover 192.168.1.0/24</div>
          <div>[*] ARP Sweep initiated...</div>
          <div className="text-[#6ee7b7]">[+] 192.168.1.1 (Gateway Router)</div>
          <div className="text-[#6ee7b7]">[+] 192.168.1.45 (Ubuntu Server)</div>
          <div className="text-[#6ee7b7]">[+] 192.168.1.102 (IoT Camera)</div>
          <div className="text-white">Active Hosts: 12 alive</div>
        </div>
      </div>,
      <div key="s2" className="u">
        <div className="nb" />
        <div className="t">NETWORK INVENTORY</div>
        <div className="sb">Discovered Device Matrix</div>
        <div className="space-y-1.5 my-2 text-[10px]">
          <div className="c flex justify-between p-1.5 rounded bg-[#09291e]">
            <span>192.168.1.1</span>
            <span className="text-[#34d399] font-mono">00:1A:2B:3C:4D:5E</span>
          </div>
          <div className="c flex justify-between p-1.5 rounded bg-[#09291e]">
            <span>192.168.1.45</span>
            <span className="text-[#34d399] font-mono">SSH, HTTP, MySQL</span>
          </div>
          <div className="c flex justify-between p-1.5 rounded bg-[#09291e]">
            <span>192.168.1.102</span>
            <span className="text-[#fbbf24] font-mono">RTSP (Port 554)</span>
          </div>
        </div>
      </div>,
      <div key="s3" className="u">
        <div className="nb" />
        <div className="t">AUDIT STATS</div>
        <div className="sb">Kali Toolchain Telemetry</div>
        <div className="g2 my-2">
          <div className="c">
            <em>Live Hosts</em>
            <div className="n text-[#10b981]">12</div>
          </div>
          <div className="c">
            <em>Open Ports</em>
            <div className="n text-[#38bdf8]">28</div>
          </div>
        </div>
        <div className="mt-2 text-center text-[10px] text-[#6ee7b7]">Output: netsentry-report.json</div>
      </div>,
    ],
  },
  {
    number: '08',
    name: 'SubScope',
    stack: 'Python · MIT License · Multithreading · CLI · Attack Surface',
    summary: 'Multithreaded CLI for rapid subdomain enumeration, DNS resolution, and HTTP/HTTPS verification.',
    details: 'Performs concurrent DNS queries across target domains, resolves active CNAME/A records, flags open web services, and generates structured CSV and terminal tables for comprehensive attack-surface mapping.',
    repo: 'SubScope',
    accent: '#c6f23a',
    category: 'Network & Recon',
    stars: 1,
    license: 'MIT License',
    updatedAgo: 'Oct 3',
    screens: [
      <div key="s1" className="u">
        <div className="nb" />
        <div className="t font-mono text-[#c6f23a]">SUBSCOPE CLI</div>
        <div className="sb font-mono">v1.2.0 Multithreaded Engine</div>
        <div className="bg-[#0b0e14] p-2.5 rounded font-mono text-[9px] text-[#a0aec0] space-y-1 my-2 border border-[#1b2333]">
          <div className="text-[#c6f23a] font-bold">$ subscope -d target.com -t 40</div>
          <div>[*] Resolving nameservers...</div>
          <div>[*] Thread pool spawned: 40 workers</div>
          <div className="text-[#38bdf8]">[+] api.target.com -&gt; 104.21.5.12</div>
          <div className="text-[#38bdf8]">[+] portal.target.com -&gt; 172.67.18.9</div>
          <div className="text-[#4ade80]">[✓] 124 subdomains discovered</div>
        </div>
        <div className="c">
          <div className="ln text-[11px]">
            <span>Scan Progress</span>
            <em className="text-[#c6f23a]">100%</em>
          </div>
          <div className="pb mt-1"><i style={{ width: '100%', background: '#c6f23a' }} /></div>
        </div>
      </div>,

      <div key="s2" className="u">
        <div className="nb" />
        <div className="t">ASSET DISCOVERY</div>
        <div className="sb">Resolved Attack Surface</div>
        <div className="space-y-1.5 my-2 font-mono text-[10px]">
          <div className="c ln py-1">
            <span className="text-[#e2e8f0]">api.target.com</span>
            <span className="text-[#4ade80] font-bold">200 OK</span>
          </div>
          <div className="c ln py-1">
            <span className="text-[#e2e8f0]">admin-stage.target.com</span>
            <span className="text-[#f87171] font-bold">403 FORBIDDEN</span>
          </div>
          <div className="c ln py-1">
            <span className="text-[#e2e8f0]">cdn.target.com</span>
            <span className="text-[#38bdf8] font-bold">301 REDIR</span>
          </div>
          <div className="c ln py-1">
            <span className="text-[#e2e8f0]">dev-test.target.com</span>
            <span className="text-[#fbbf24] font-bold">503 SERV</span>
          </div>
        </div>
        <div className="c text-[10px] text-[#94a3b8] p-1.5 rounded bg-[#131926]">
          CNAME: target.cdn.cloudflare.net resolved
        </div>
      </div>,

      <div key="s3" className="u">
        <div className="nb" />
        <div className="t">SURFACE METRICS</div>
        <div className="sb">Recon Telemetry</div>
        <div className="g2 my-2">
          <div className="c">
            <em>Discovered</em>
            <div className="n text-[#c6f23a]">124</div>
          </div>
          <div className="c">
            <em>Live Hosts</em>
            <div className="n text-[#38bdf8]">89</div>
          </div>
          <div className="c">
            <em>HTTP 200</em>
            <div className="n text-[#4ade80]">56</div>
          </div>
          <div className="c">
            <em>WAF Detected</em>
            <div className="n text-[#fbbf24]">12</div>
          </div>
        </div>
        <div className="c text-[11px] text-center bg-[#1e293b] p-2 rounded text-[#c6f23a] font-semibold">
          Saved to surface-report.csv
        </div>
      </div>,
    ],
  },
  {
    number: '09',
    name: 'PDF Fortress',
    stack: 'Python · TypeScript · AES-256 · Document Cryptography · GUI/CLI',
    summary: 'CLI and GUI security utility for robust PDF document encryption and password protection.',
    details: 'Enforces AES-256 permission restrictions, scrubs sensitive metadata (author, GPS, editing history), and verifies generated documents against extraction attacks to confirm full cryptographic integrity.',
    repo: 'pdf-fortress',
    liveUrl: 'https://pdf-fortress.vercel.app',
    accent: '#ff2fc0',
    category: 'Threat Defense & Forensics',
    stars: 1,
    license: 'Other',
    updatedAgo: 'Oct 7',
    screens: [
      <div key="s1" className="u">
        <div className="nb" />
        <div className="t">PDF FORTRESS</div>
        <div className="sb">AES-256 Encryption Engine</div>
        <div className="space-y-1.5 my-2">
          <div className="c ln text-[11px]">
            <span>Cipher</span>
            <em className="text-[#ff2fc0] font-bold">AES-256 bit</em>
          </div>
          <div className="c ln text-[11px]">
            <span>User Password</span>
            <em className="text-[#a0aec0]">••••••••••••</em>
          </div>
          <div className="c ln text-[11px]">
            <span>Owner Master Key</span>
            <em className="text-[#a0aec0]">••••••••••••••••</em>
          </div>
          <div className="c ln text-[11px]">
            <span>Printing Rights</span>
            <span className="tg" />
          </div>
          <div className="c ln text-[11px]">
            <span>Copy Content Rights</span>
            <span className="tg" />
          </div>
        </div>
      </div>,

      <div key="s2" className="u">
        <div className="nb" />
        <div className="t">SANITIZER</div>
        <div className="sb">Privacy &amp; EXIF Scrubbing</div>
        <div className="space-y-2 my-2 text-[10px]">
          <div className="c p-1.5 rounded bg-[#1a1424] flex items-center justify-between">
            <span>Author / Creator Tag</span>
            <span className="text-[#4ade80] font-bold">SCRUBBED</span>
          </div>
          <div className="c p-1.5 rounded bg-[#1a1424] flex items-center justify-between">
            <span>Creation &amp; Mod Date</span>
            <span className="text-[#4ade80] font-bold">NORMALIZED</span>
          </div>
          <div className="c p-1.5 rounded bg-[#1a1424] flex items-center justify-between">
            <span>PDF Producer String</span>
            <span className="text-[#4ade80] font-bold">REMOVED</span>
          </div>
          <div className="c p-1.5 rounded bg-[#1a1424] flex items-center justify-between">
            <span>Embedded Thumbnails</span>
            <span className="text-[#4ade80] font-bold">PURGED</span>
          </div>
        </div>
      </div>,

      <div key="s3" className="u">
        <div className="nb" />
        <div className="t">VERIFICATION</div>
        <div className="sb">Security Validation</div>
        <div className="c bg-[#221020] border-l-4 border-[#ff2fc0] p-2.5 rounded my-2">
          <div className="text-[12px] font-bold text-[#ff75d8]">CRYPTOGRAPHIC INTEGRITY</div>
          <div className="text-[10px] text-[#e2e8f0] mt-1">Extraction Test: Blocked (0 bytes leaked)</div>
        </div>
        <div className="c font-mono text-[9px] text-[#94a3b8] break-all p-2 bg-[#120f18] rounded">
          SHA-256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
        </div>
        <div className="mt-3 text-center">
          <span className="text-[11px] bg-[#ff2fc0] text-white px-3 py-1 rounded font-bold">Protected PDF Ready</span>
        </div>
      </div>,
    ],
  },
  {
    number: '10',
    name: 'College Voting Portal Secure',
    stack: 'TypeScript · React · RBAC · Cryptographic Auditing · Session Guard',
    summary: 'Secure college voting portal designed with authentication, role-based access control, and cryptographic vote auditing.',
    details: 'Enforces student identity verification, one-vote-per-student cryptographic constraints, voter privacy preservation, and immutable election audit logs resistant to ballot manipulation.',
    repo: 'college-voting-portal-secure',
    accent: '#06b6d4',
    category: 'Web & Security',
    stars: 2,
    updatedAgo: 'Aug 27',
    screens: [
      <div key="s1" className="u">
        <div className="nb" />
        <div className="t text-[#06b6d4]">SECURE VOTE PORTAL</div>
        <div className="sb">Authenticated Ballot Entry</div>
        <div className="space-y-2 my-2 text-[10px]">
          <div className="c p-2 rounded bg-[#0e2229]">
            <div className="font-bold text-white flex justify-between">
              <span>Student ID 2026-CS-83</span>
              <span className="text-[#06b6d4]">Verified</span>
            </div>
            <div className="text-[#94a3b8] mt-0.5">Faculty Election 2026 · Ballot #892</div>
          </div>
          <div className="c p-2 rounded bg-[#0e2229] border border-[#0891b2]/40">
            <div className="font-bold text-[#67e8f9]">Cryptographic Receipt:</div>
            <div className="font-mono text-[8px] text-[#a5f3fc] break-all mt-1">
              0x9f82c03bb8a9e2d4f828a1...
            </div>
          </div>
        </div>
      </div>,
      <div key="s2" className="u">
        <div className="nb" />
        <div className="t">ACCESS CONTROL</div>
        <div className="sb">Role-Based Permissions (RBAC)</div>
        <div className="space-y-1.5 my-2 text-[10px]">
          <div className="c flex justify-between p-1.5 rounded bg-[#082f3a]">
            <span>Student Role</span>
            <span className="text-[#4ade80]">Cast Vote Only</span>
          </div>
          <div className="c flex justify-between p-1.5 rounded bg-[#082f3a]">
            <span>Election Officer</span>
            <span className="text-[#38bdf8]">Tally Audit</span>
          </div>
          <div className="c flex justify-between p-1.5 rounded bg-[#082f3a]">
            <span>Super Admin</span>
            <span className="text-[#f87171]">Lockdown / Freeze</span>
          </div>
        </div>
      </div>,
      <div key="s3" className="u">
        <div className="nb" />
        <div className="t">AUDIT INTEGRITY</div>
        <div className="sb">Zero Tampering Verification</div>
        <div className="g2 my-2">
          <div className="c">
            <em>Valid Ballots</em>
            <div className="n text-[#06b6d4]">1,420</div>
          </div>
          <div className="c">
            <em>Anomalies</em>
            <div className="n text-[#4ade80]">0</div>
          </div>
        </div>
        <div className="mt-2 text-center text-[10px] text-[#a5f3fc]">Merkle Root Validated</div>
      </div>,
    ],
  },
  {
    number: '11',
    name: 'Isha Sonaria Portfolio',
    stack: 'TypeScript · React · Tailwind CSS · Three.js · Kinetic Motion',
    summary: 'High-performance interactive cybersecurity portfolio website with SOC dark aesthetic and TryHackMe metrics.',
    details: 'Custom engineered with dynamic scroll pinning, word-by-word reveal highlights, dual-track tools marquee, mobile-first responsive cards, and 100% accessible dark theme presentation.',
    repo: 'isha-sonaria-portfolio',
    accent: '#8b5cf6',
    category: 'Web & Security',
    stars: 0,
    updatedAgo: 'last week',
    screens: [
      <div key="s1" className="u">
        <div className="nb" />
        <div className="t text-[#8b5cf6]">PORTFOLIO CORE</div>
        <div className="sb">Cybersecurity Showcase</div>
        <div className="p-2 rounded bg-[#1d1633] my-2 text-[10px] space-y-1.5">
          <div className="font-bold text-white">Isha Sonaria</div>
          <div className="text-[#c4b5fd]">SOC Analyst &amp; Threat Defense Specialist</div>
          <div className="text-[9px] text-[#a78bfa]">TryHackMe Top 2% Globally · 100+ Labs</div>
        </div>
      </div>,
      <div key="s2" className="u">
        <div className="nb" />
        <div className="t">DESIGN SYSTEM</div>
        <div className="sb">Kinetic Typography &amp; Motion</div>
        <div className="space-y-1.5 my-2 text-[10px]">
          <div className="c flex justify-between p-1.5 rounded bg-[#271d47]">
            <span>Anton Kinetic Font</span>
            <span className="text-[#a78bfa]">Responsive clamp</span>
          </div>
          <div className="c flex justify-between p-1.5 rounded bg-[#271d47]">
            <span>Pinning Engine</span>
            <span className="text-[#4ade80]">Circular Wipe</span>
          </div>
          <div className="c flex justify-between p-1.5 rounded bg-[#271d47]">
            <span>Tools Marquee</span>
            <span className="text-[#38bdf8]">Dual Infinite</span>
          </div>
        </div>
      </div>,
      <div key="s3" className="u">
        <div className="nb" />
        <div className="t">PERFORMANCE</div>
        <div className="sb">Lighthouse &amp; Accessibility</div>
        <div className="g2 my-2">
          <div className="c">
            <em>Performance</em>
            <div className="n text-[#4ade80]">99</div>
          </div>
          <div className="c">
            <em>Accessibility</em>
            <div className="n text-[#4ade80]">100</div>
          </div>
        </div>
        <div className="mt-2 text-center text-[10px] text-[#c4b5fd]">Zero Slop · Production Ready</div>
      </div>,
    ],
  },
];
