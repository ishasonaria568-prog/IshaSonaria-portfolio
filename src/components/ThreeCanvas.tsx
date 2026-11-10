import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { clamp } from '../utils/portfolioLogic';

interface ThreeCanvasProps {
  mousePosRef: React.RefObject<{ x: number; y: number }>;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ mousePosRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const testGl = document.createElement('canvas').getContext('webgl2');
        if (!testGl) return true;
        const ext = testGl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : testGl.RENDERER;
        const gpu = String(testGl.getParameter(param));
        testGl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, window.innerWidth, 0, -window.innerHeight, -2000, 2000);

    // Procedural Studio Environment
    const ec = document.createElement('canvas');
    ec.width = 512;
    ec.height = 256;
    const ctx = ec.getContext('2d');
    if (ctx) {
      const gr = ctx.createLinearGradient(0, 0, 0, 256);
      gr.addColorStop(0, '#ffffff');
      gr.addColorStop(0.45, '#7c5cff');
      gr.addColorStop(0.7, '#ff4fa0');
      gr.addColorStop(1, '#1a1030');
      ctx.fillStyle = gr;
      ctx.fillRect(0, 0, 512, 256);

      ctx.fillStyle = '#ffd9a0';
      ctx.fillRect(60, 70, 90, 40);
      ctx.fillStyle = '#7fe0ff';
      ctx.fillRect(320, 50, 120, 50);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(200, 20, 60, 30);
    }
    const envTexture = new THREE.CanvasTexture(ec);
    envTexture.mapping = THREE.EquirectangularReflectionMapping;
    envTexture.colorSpace = THREE.SRGBColorSpace;

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromEquirectangular(envTexture).texture;
    pmremGenerator.dispose();

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dl = new THREE.DirectionalLight(0xffffff, 1.2);
    dl.position.set(300, -300, 800);
    scene.add(dl);

    const dl2 = new THREE.DirectionalLight(0xfff0e6, 0.8);
    dl2.position.set(-300, 300, 800);
    scene.add(dl2);

    const M = (c: number, m = 0.5, r = 0.3) =>
      new THREE.MeshStandardMaterial({
        color: c,
        metalness: m,
        roughness: r,
        envMapIntensity: 1.3,
      });

    const createRoundedShape = (w: number, h: number, r: number) => {
      const s = new THREE.Shape();
      const x = -w / 2;
      const y = -h / 2;
      s.moveTo(x + r, y);
      s.lineTo(x + w - r, y);
      s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0);
      s.lineTo(x + w, y + h - r);
      s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2);
      s.lineTo(x + r, y + h);
      s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI);
      s.lineTo(x, y + r);
      s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
      return s;
    };

    // 3D Model Generators
    const createPhone = () => {
      const g = new THREE.Group();
      const b = new THREE.Mesh(
        new THREE.ExtrudeGeometry(createRoundedShape(1.7, 3.5, 0.3), {
          depth: 0.14,
          bevelEnabled: true,
          bevelThickness: 0.05,
          bevelSize: 0.05,
          bevelSegments: 5,
          curveSegments: 20,
        }),
        M(0x15162a, 0.9, 0.18)
      );
      b.position.z = -0.07;
      g.add(b);

      const k = document.createElement('canvas');
      k.width = 316;
      k.height = 676;
      const c = k.getContext('2d');
      if (c) {
        c.fillStyle = '#07070c';
        c.fillRect(0, 0, 316, 676);
        const gg = c.createLinearGradient(0, 0, 316, 0);
        gg.addColorStop(0, '#ff3d9a');
        gg.addColorStop(0.55, '#8b5cff');
        gg.addColorStop(1, '#ff9a3d');

        const rb = (X: number, Y: number, W: number, H: number, r: number, fill: string | CanvasGradient) => {
          c.fillStyle = fill;
          c.beginPath();
          if (c.roundRect) {
            c.roundRect(X, Y, W, H, r);
          } else {
            c.rect(X, Y, W, H);
          }
          c.fill();
        };

        rb(112, 16, 92, 18, 9, '#1c1c28');
        rb(26, 90, 180, 34, 17, '#fff');
        rb(26, 138, 120, 18, 9, '#555a70');
        rb(26, 190, 264, 170, 26, gg);
        rb(26, 376, 124, 110, 22, '#1d1e2c');
        rb(166, 376, 124, 110, 22, '#1d1e2c');
        rb(26, 506, 264, 56, 28, gg);
        rb(26, 582, 264, 40, 20, '#1d1e2c');
      }

      const t = new THREE.CanvasTexture(k);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;

      const sg = new THREE.ShapeGeometry(createRoundedShape(1.58, 3.38, 0.23), 20);
      const p = sg.attributes.position;
      const uv = sg.attributes.uv;
      for (let i = 0; i < p.count; i++) {
        uv.setXY(i, (p.getX(i) + 0.79) / 1.58, (p.getY(i) + 1.69) / 3.38);
      }

      const s = new THREE.Mesh(sg, new THREE.MeshBasicMaterial({ map: t }));
      s.position.z = 0.145;
      g.add(s);
      g.userData.h = 3.6;
      return g;
    };

    const createFlower = () => {
      const g = new THREE.Group();
      const pm = M(0xc77bff, 0.3, 0.2);
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        const m = new THREE.Mesh(new THREE.SphereGeometry(0.42, 32, 24), pm);
        m.position.set(Math.cos(a) * 0.62, Math.sin(a) * 0.62, 0);
        g.add(m);
      }
      g.add(new THREE.Mesh(new THREE.SphereGeometry(0.38, 32, 24), M(0xffd54a, 0.2, 0.25)));
      g.userData.h = 2.1;
      return g;
    };

    const createAvatar = () => {
      const g = new THREE.Group();
      const B = new THREE.Group();
      g.add(B);
      B.position.y = 0.2;
      g.userData.h = 4.4;

      const mat = (color: number, roughness = 0.5, metalness = 0, envMapIntensity = 0.6) =>
        new THREE.MeshStandardMaterial({ color, roughness, metalness, envMapIntensity });

      const skin = mat(0xd99c71, 0.5);
      const skin2 = mat(0xc88660, 0.55);
      const hair = mat(0x16110f, 0.38, 0.1, 0.8);
      hair.side = THREE.DoubleSide;
      const shirt = mat(0x6a4cff, 0.6);
      const shirt2 = mat(0x4b32d6, 0.6);
      const white = mat(0xffffff, 0.25, 0, 0.5);
      const iris = mat(0x3a2418, 0.3);
      const dark = mat(0x080606, 0.3);
      const lip = mat(0x7b2f2a, 0.4);
      const metal = mat(0xdfe3ee, 0.2, 0.95, 1.4);
      const brow = mat(0x120d0b, 0.5);

      const S = (w = 24, h = 16) => new THREE.SphereGeometry(1, w, h);
      const put = (
        geo: THREE.BufferGeometry,
        m: THREE.Material,
        x: number,
        y: number,
        z: number,
        sx: number,
        sy: number,
        sz: number,
        par: THREE.Group
      ) => {
        const o = new THREE.Mesh(geo, m);
        o.position.set(x, y, z);
        o.scale.set(sx, sy, sz);
        par.add(o);
        return o;
      };

      // Neck & Torso
      put(new THREE.CylinderGeometry(0.34, 0.42, 0.7, 32), skin2, 0, -0.5, 0, 1, 1, 1, B);
      const T = new THREE.Group();
      B.add(T);
      put(S(48, 32), shirt, 0, -1.5, -0.05, 1.45, 0.85, 0.8, T);
      const col = put(new THREE.TorusGeometry(0.43, 0.09, 16, 48), shirt2, 0, -0.7, 0.02, 1, 1, 1, T);
      col.rotation.x = Math.PI / 2;

      // Flutter logo on shirt
      const k = document.createElement('canvas');
      k.width = 128;
      k.height = 128;
      const c = k.getContext('2d');
      if (c) {
        const poly = (f: string, pts: [number, number][]) => {
          c.fillStyle = f;
          c.beginPath();
          pts.forEach(([px, py], i) => (i ? c.lineTo(px, py) : c.moveTo(px, py)));
          c.closePath();
          c.fill();
        };
        poly('#54c5f8', [
          [78, 8],
          [118, 8],
          [44, 82],
          [24, 62],
        ]);
        poly('#54c5f8', [
          [78, 56],
          [118, 56],
          [84, 90],
          [64, 70],
        ]);
        poly('#0d47a1', [
          [44, 100],
          [64, 80],
          [84, 100],
          [64, 120],
        ]);
        poly('#1565c0', [
          [64, 120],
          [84, 100],
          [118, 100],
          [88, 122],
        ]);
      }
      const lt = new THREE.CanvasTexture(k);
      lt.colorSpace = THREE.SRGBColorSpace;
      put(new THREE.PlaneGeometry(0.6, 0.6), new THREE.MeshBasicMaterial({ map: lt, transparent: true }), 0, -1.38, 0.753, 1, 1, 1, T);

      // Head
      const H = new THREE.Group();
      B.add(H);
      H.position.set(0, -0.3, 0);

      const hp = (geo: THREE.BufferGeometry, m: THREE.Material, x: number, y: number, z: number, sx: number, sy: number, sz: number) =>
        put(geo, m, x, y + 0.3, z, sx, sy, sz, H);

      hp(S(64, 48), skin, 0, 0.6, 0, 1, 1.08, 0.98);
      hp(S(48, 32), skin, 0, -0.02, 0.2, 0.64, 0.5, 0.58);

      [-1, 1].forEach((s) => {
        hp(S(), skin, s * 1.01, 0.55, -0.02, 0.2, 0.34, 0.2);
        hp(S(16, 12), skin2, s * 1.07, 0.55, 0.03, 0.07, 0.2, 0.1);
        const r = hp(new THREE.TorusGeometry(0.09, 0.02, 12, 32), metal, s * 1.05, 0.28, 0.04, 1, 1, 1);
        r.rotation.y = Math.PI / 2;
      });

      // Eyes & Brows
      const eyes: THREE.Group[] = [];
      const brows: THREE.Mesh[] = [];
      [-1, 1].forEach((s) => {
        const e = new THREE.Group();
        e.position.set(s * 0.36, 0.96, 0.8);
        H.add(e);

        put(S(32, 24), white, 0, 0, 0, 0.21, 0.235, 0.15, e);
        put(S(24, 16), iris, 0, 0, 0.12, 0.125, 0.125, 0.07, e);
        put(S(16, 12), dark, 0, 0, 0.15, 0.07, 0.07, 0.05, e);
        put(S(12, 8), white, 0.045, 0.05, 0.19, 0.035, 0.035, 0.03, e);
        eyes.push(e);

        const b = hp(S(20, 12), brow, s * 0.38, 0.98, 0.84, 0.27, 0.07, 0.11);
        b.rotation.z = -s * 0.12;
        brows.push(b);
      });

      hp(S(24, 16), skin2, 0, 0.4, 0.97, 0.15, 0.14, 0.16);

      // Smile CatmullRom Curve
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 10; i++) {
        const x = -0.3 + (0.6 * i) / 10;
        const y = 0.2 - 0.15 * (1 - (x / 0.3) * (x / 0.3));
        const z = 0.98 * Math.sqrt(Math.max(0, 1 - x * x - ((y - 0.6) / 1.08) * ((y - 0.6) / 1.08))) + 0.02;
        pts.push(new THREE.Vector3(x, y + 0.3, z));
      }
      H.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 32, 0.034, 10, false), lip));

      // Hair
      const cap = hp(new THREE.SphereGeometry(1, 48, 32, 0, Math.PI * 2, 0, Math.PI * 0.5), hair, 0, 0.6, -0.02, 1.05, 1.13, 1.04);
      cap.rotation.x = -0.6;

      const hairSpikes: [number, number, number, number][] = [
        [0, 62, 0.7, 0.2],
        [30, 66, 0.6, 0.18],
        [-30, 66, 0.6, 0.18],
        [60, 56, 0.5, 0.17],
        [-60, 56, 0.5, 0.17],
        [0, 80, 0.6, 0.2],
        [95, 45, 0.45, 0.15],
        [-95, 45, 0.45, 0.15],
        [150, 50, 0.45, 0.16],
        [-150, 50, 0.45, 0.16],
        [180, 60, 0.5, 0.17],
        [20, 40, 0.4, 0.15],
        [-20, 40, 0.4, 0.15],
      ];

      hairSpikes.forEach(([az, el, len, rad]) => {
        const a = (az * Math.PI) / 180;
        const e = (el * Math.PI) / 180;
        let dx = Math.cos(e) * Math.sin(a);
        let dy = Math.sin(e);
        let dz = Math.cos(e) * Math.cos(a) + 0.3;
        const n = Math.hypot(dx, dy, dz);
        dx /= n;
        dy /= n;
        dz /= n;

        const o = hp(
          new THREE.ConeGeometry(rad, len, 12),
          hair,
          dx * 1.0 + dx * len * 0.45,
          0.6 + dy * 1.07 + dy * len * 0.45,
          dz * 0.99 + dz * len * 0.45,
          1,
          1,
          1
        );
        o.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx, dy, dz));
      });

      g.userData.tick = (t: number, mx: number, my: number) => {
        H.rotation.y = mx * 0.55 + Math.sin(t * 0.7) * 0.06;
        H.rotation.x = my * 0.3 + Math.sin(t * 1.1) * 0.02;
        T.rotation.y = mx * 0.18;
        B.position.y = 0.2 + Math.sin(t * 1.6) * 0.025;
        const ph = t % 4.3;
        const bl = ph < 0.16 ? Math.sin((Math.PI * ph) / 0.16) : 0;
        eyes.forEach((e) => {
          e.rotation.set(my * 0.4, mx * 0.5, 0);
          e.scale.y = 1 - 0.92 * bl;
        });
        brows.forEach((b) => {
          b.position.y = 1.28 + 0.025 * bl;
        });
      };

      document.body.classList.add('ok');
      return g;
    };

    const generators: Record<string, () => THREE.Object3D> = {
      phone: createPhone,
      flower: createFlower,
      avatar: createAvatar,
      knot: () => {
        const m = new THREE.Mesh(new THREE.TorusKnotGeometry(0.7, 0.27, 180, 24), M(0xdfe6ff, 1, 0.12));
        m.userData.h = 2.4;
        return m;
      },
      knot2: () => {
        const m = new THREE.Mesh(new THREE.TorusKnotGeometry(0.7, 0.27, 180, 24), M(0xffc247, 0.9, 0.18));
        m.userData.h = 2.4;
        return m;
      },
      cube: () => {
        const m = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.3, 1.3), M(0x4a6bff, 0.6, 0.2));
        m.userData.h = 1.9;
        return m;
      },
      ring: () => {
        const m = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.34, 28, 64), M(0xff3b4e, 0.4, 0.2));
        m.userData.h = 2;
        return m;
      },
      blob: () => {
        const m = new THREE.Mesh(new THREE.IcosahedronGeometry(0.95, 3), M(0xb35cff, 0.5, 0.18));
        m.userData.h = 1.9;
        return m;
      },
    };

    // Find all [data-3d] placeholder elements in DOM
    const domElements = Array.from(document.querySelectorAll<HTMLElement>('[data-3d]'));
    const items = domElements
      .map((el) => {
        const type = el.dataset['3d'];
        if (!type || !generators[type]) return null;
        const mesh = generators[type]();
        scene.add(mesh);
        const section = el.closest('section, header');
        return {
          el,
          mesh,
          type,
          isPhone: ['phone', 'avatar'].includes(type),
          nextSection: section && section.nextElementSibling,
          par: Number(el.dataset.par) || 0,
        };
      })
      .filter(Boolean) as {
      el: HTMLElement;
      mesh: THREE.Object3D;
      type: string;
      isPhone: boolean;
      nextSection: Element | null;
      par: number;
    }[];

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.left = 0;
      camera.right = w;
      camera.top = 0;
      camera.bottom = -h;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    let animationId = 0;
    const t0 = performance.now();

    const animate = () => {
      const t = (performance.now() - t0) / 1000;
      const mouse = mousePosRef.current || { x: 0, y: 0 };
      const H = window.innerHeight;

      items.forEach((item, i) => {
        const rect = item.el.getBoundingClientRect();
        let f = 1;
        if (item.nextSection && item.nextSection.classList.contains('sheet')) {
          f = clamp((item.nextSection.getBoundingClientRect().top - rect.top) / rect.height, 0, 1);
        }

        const isVisible = rect.bottom > -300 && rect.top < H + 300 && f > 0.02;
        item.mesh.visible = isVisible;
        if (!isVisible) return;

        const px = item.isPhone ? rect.height : Math.max(rect.width, rect.height);
        const inT = item.isPhone ? 1 - Math.pow(1 - clamp(t / 1.3, 0, 1), 3) : 1;
        const scaleVal = (px / (item.mesh.userData.h || 2)) * f * inT;

        item.mesh.position.set(
          rect.left + rect.width / 2,
          -(rect.top + rect.height / 2) + Math.sin(t * 1.3 + i) * 6,
          0
        );
        item.mesh.scale.setScalar(Math.max(scaleVal, 0.001));

        if (item.isPhone) {
          if (item.type === 'avatar') {
            item.mesh.rotation.set(0, 0, 0);
            if (item.mesh.userData.tick) {
              item.mesh.userData.tick(t, mouse.x, mouse.y);
            }
          } else {
            item.mesh.rotation.y = -0.35 + mouse.x * 0.9 + Math.sin(t * 0.8) * 0.3;
            item.mesh.rotation.x = mouse.y * 0.35;
            item.mesh.rotation.z = -0.08;
          }
        } else {
          item.mesh.rotation.y = t * 0.6 + i;
          item.mesh.rotation.x = t * 0.4 + mouse.x;
        }
      });

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      items.forEach((item) => scene.remove(item.mesh));
    };
  }, [mousePosRef]);

  return <canvas id="gl" ref={canvasRef} aria-hidden="true" />;
};
