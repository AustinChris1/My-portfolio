import React, { useEffect, useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import avatar from "../assets/avatar.png";
import Agrosense2 from "../assets/Agrosense2.jpeg";
import siwz1 from "../assets/siwz1.png";
import SyncTradeBot1 from "../assets/SyncTradeBot1.png";
import OGReceipts1 from "../assets/OGReceipts1.png";

gsap.registerPlugin(ScrollTrigger);

const useIsoLayout = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* -------------------------------------------------------------------------- */
/*                          Three.js ambient backdrop                          */
/* -------------------------------------------------------------------------- */

function ThreeBackdrop({ progressRef }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    // Skip WebGL when user prefers reduced motion or no WebGL
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const mount = mountRef.current;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x050505, 14, 80);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.set(0, 0, 22);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const key = new THREE.DirectionalLight(0xc8ff3e, 1.5);
    key.position.set(8, 10, 6);
    scene.add(key);
    const rim = new THREE.PointLight(0x7dd3fc, 1.6, 80);
    rim.position.set(-12, -4, 6);
    scene.add(rim);
    const rim2 = new THREE.PointLight(0xff6b35, 0.9, 60);
    rim2.position.set(10, -6, 4);
    scene.add(rim2);

    const artifact = new THREE.Group();
    const ringMat = (color, opacity = 0.85) =>
      new THREE.MeshPhysicalMaterial({
        color,
        metalness: 0.85,
        roughness: 0.25,
        clearcoat: 1,
        clearcoatRoughness: 0.15,
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
      });

    for (let i = 0; i < 6; i++) {
      const r = 4 + i * 0.95;
      const torus = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.07 + i * 0.02, 32, 256),
        ringMat(i % 2 === 0 ? 0xc8ff3e : 0x7dd3fc, 0.8 - i * 0.05)
      );
      torus.rotation.x = Math.PI / 2 + i * 0.04;
      torus.rotation.y = i * 0.18;
      artifact.add(torus);
    }

    const orb = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.6, 1),
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.95,
        roughness: 0.12,
        emissive: 0x0a0a0c,
      })
    );
    artifact.add(orb);
    scene.add(artifact);

    const starCount = 1500;
    const starGeom = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const radius = 25 + Math.random() * 35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = radius * Math.cos(phi);
    }
    starGeom.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(
      starGeom,
      new THREE.PointsMaterial({
        size: 0.06,
        color: 0xffffff,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      })
    );
    scene.add(stars);

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMouseMove);
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const tick = () => {
      const t = performance.now() * 0.001;
      const p = progressRef.current ?? 0;

      artifact.rotation.y = t * 0.18 + p * Math.PI;
      artifact.rotation.x = Math.sin(t * 0.25) * 0.15 + p * 0.4;
      artifact.position.y = -p * 4;
      artifact.position.z = -p * 8;
      orb.rotation.y = t * 0.6;
      orb.rotation.x = t * 0.4;

      stars.rotation.y = t * 0.02;

      camera.position.x += (mouse.x * 1.4 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 0.9 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
    };
  }, [progressRef]);

  return <div ref={mountRef} className="absolute inset-0" />;
}

/* -------------------------------------------------------------------------- */
/*                              Split text helper                              */
/* -------------------------------------------------------------------------- */

function SplitWords({ text, className = "", wordClass = "" }) {
  return (
    <span className={`mask-line ${className}`}>
      {text.split(" ").map((w, i) => (
        <span
          key={i}
          className={`split-word inline-block ${wordClass}`}
          style={{ marginRight: "0.25em" }}
        >
          {w}
        </span>
      ))}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Opening                                    */
/* -------------------------------------------------------------------------- */

function Opening() {
  const rootRef = useRef(null);

  useIsoLayout(() => {
    const ctx = gsap.context(() => {
      const root = rootRef.current;
      if (!root) return;

      // Initial state
      gsap.set(root.querySelector(".op-eyebrow"), { y: 30, opacity: 0 });
      gsap.set(root.querySelector(".op-avatar"), { scale: 0.6, opacity: 0, y: 30 });
      gsap.set(root.querySelectorAll(".op-title .split-word"), {
        yPercent: 110,
        opacity: 0,
      });
      gsap.set(root.querySelector(".op-greet"), { y: 20, opacity: 0 });
      gsap.set(root.querySelector(".op-subtitle"), { y: 30, opacity: 0 });
      gsap.set(root.querySelector(".op-copy"), { y: 30, opacity: 0 });
      gsap.set(root.querySelectorAll(".op-cta"), { y: 30, opacity: 0 });
      gsap.set(root.querySelector(".op-cue"), { opacity: 0, y: 20 });

      // Intro timeline
      const tl = gsap.timeline({ delay: 0.2 });
      tl.to(root.querySelector(".op-eyebrow"), {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      })
        .to(
          root.querySelector(".op-avatar"),
          { scale: 1, opacity: 1, y: 0, duration: 1, ease: "expo.out" },
          "-=0.4"
        )
        .to(
          root.querySelector(".op-greet"),
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.6"
        )
        .to(
          root.querySelectorAll(".op-title .split-word"),
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.04,
            duration: 0.9,
            ease: "expo.out",
          },
          "-=0.4"
        )
        .to(
          root.querySelector(".op-subtitle"),
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.5"
        )
        .to(
          root.querySelector(".op-copy"),
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.45"
        )
        .to(
          root.querySelectorAll(".op-cta"),
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.35"
        )
        .to(
          root.querySelector(".op-cue"),
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        );

      // Fade & rise out as user scrolls past hero
      gsap.to(root.querySelector(".op-content"), {
        yPercent: -25,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative w-full min-h-screen flex items-center justify-center px-6 pt-28 pb-28 md:pt-32 md:pb-32"
    >
      <div className="op-content relative z-10 flex flex-col items-center text-center w-full max-w-5xl">
        {/* Avatar: glow sits outside the clip, image is a true circle */}
        <div className="op-avatar relative mb-6 md:mb-8">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-48 md:h-48 rounded-full bg-accent-lime/25 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[7.25rem] h-[7.25rem] md:w-[8.25rem] md:h-[8.25rem] rounded-full bg-gradient-to-br from-accent-lime/50 via-white/20 to-accent-sky/50 blur-sm"
            aria-hidden
          />
          <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden ring-2 ring-white/25 shadow-[0_0_0_4px_rgba(5,5,5,0.85)] bg-ink-900">
            <img
              src={avatar}
              alt="Austin-Chris"
              className="block w-full h-full object-cover object-center"
              draggable={false}
            />
          </div>
        </div>

        {/* Greeting */}
        <p className="op-greet flex items-center justify-center gap-3 text-base md:text-lg text-white/70 mb-4 md:mb-5">
          Hello
          <motion.span
            className="inline-block"
            animate={{ rotate: [0, 18, -8, 18, 0] }}
            transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
          >
            👋🏼
          </motion.span>
          I'm Austin-Chris
        </p>

        {/* Title: solid lime first line so it never vanishes behind gradient/clip quirks */}
        <h1 className="op-title font-display font-bold leading-[0.92] text-[11vw] sm:text-[9vw] md:text-[7.5vw] lg:text-[6.5vw] text-white">
          <span className="block text-accent-lime">
            <SplitWords text="Full-Stack" />
          </span>
          <span className="block">
            <SplitWords text="Developer" />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="op-subtitle font-display text-xl md:text-3xl lg:text-4xl text-white/80 mt-3 md:mt-4 leading-tight">
          <span className="block">& Embedded Systems Engineer</span>
        </p>

        {/* Copy */}
        <p className="op-copy mt-6 md:mt-8 max-w-2xl text-sm md:text-base lg:text-lg text-white/55 leading-relaxed">
          B.Eng (EEE) trained engineer crafting innovative digital solutions that
          seamlessly integrate cutting-edge web technologies with sophisticated
          embedded systems architecture.
        </p>

        {/* CTAs */}
        <div className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("projects")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="op-cta group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-ink-950 font-medium text-sm uppercase tracking-widest2 hover:bg-accent-lime transition-colors duration-500"
          >
            View work
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="op-cta group inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-white/20 text-white text-sm uppercase tracking-widest2 hover:bg-white/5 transition-all duration-500"
          >
            Get in touch
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>

      {/* Scroll cue lives on the section, not inside the content stack */}
      <div className="op-cue absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/40 text-[10px] uppercase tracking-widest2 pointer-events-none">
        <span>Scroll to explore</span>
        <span className="relative h-10 w-[1px] bg-white/20 overflow-hidden">
          <span className="absolute top-0 left-0 w-full h-1/2 bg-accent-lime [animation:slide_2.4s_ease-in-out_infinite]" />
        </span>
      </div>

      <style>{`
        @keyframes slide {
          0%   { transform: translateY(-100%); }
          50%  { transform: translateY(100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Story Panel                                  */
/* -------------------------------------------------------------------------- */

function StoryPanel({ index, total, eyebrow, title, copy, metric, image, align = "left" }) {
  const sectionRef = useRef(null);

  useIsoLayout(() => {
    const ctx = gsap.context(() => {
      const root = sectionRef.current;
      if (!root) return;
      const panel = root.querySelector(".panel-frame");
      const img = root.querySelector(".panel-img");
      const titleWords = root.querySelectorAll(".panel-title .split-word");
      const eyebrowEl = root.querySelector(".panel-eyebrow");
      const idxEl = root.querySelector(".panel-idx");
      const copyEl = root.querySelector(".panel-copy");
      const metricEl = root.querySelector(".panel-metric");

      gsap.set(panel, { clipPath: "inset(100% 0% 0% 0% round 28px)" });
      gsap.set(img, { scale: 1.4, yPercent: 8 });
      gsap.set(titleWords, { yPercent: 110, opacity: 0 });
      gsap.set([eyebrowEl, idxEl], { y: 30, opacity: 0 });
      gsap.set([copyEl, metricEl].filter(Boolean), { y: 30, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          end: "top 10%",
          scrub: 1.1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(panel, {
        clipPath: "inset(0% 0% 0% 0% round 28px)",
        ease: "power2.inOut",
        duration: 1,
      })
        .to(img, { scale: 1, yPercent: 0, ease: "power2.out", duration: 1 }, 0)
        .to(
          [idxEl, eyebrowEl],
          { y: 0, opacity: 1, stagger: 0.05, duration: 0.6, ease: "power3.out" },
          0.2
        )
        .to(
          titleWords,
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.7,
            ease: "power3.out",
          },
          0.25
        )
        .to(
          [copyEl, metricEl].filter(Boolean),
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power3.out" },
          0.5
        );

      // Image parallax inside panel as user keeps scrolling
      gsap.to(img, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const isLeft = align === "left";

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100vh] flex items-center justify-center px-6 md:px-12 py-24 md:py-32"
    >
      <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Image panel */}
        <div className={`lg:col-span-7 ${isLeft ? "lg:order-1" : "lg:order-2"}`}>
          <div
            className="panel-frame unravel-panel relative aspect-[16/10] w-full bg-ink-900 ring-1 ring-white/10"
            style={{ borderRadius: "28px" }}
          >
            <img
              src={image}
              alt={title.replace(/\n/g, " ")}
              className="panel-img w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/10 to-transparent pointer-events-none" />
            <div className="absolute inset-0 ring-1 ring-white/5 rounded-[28px] pointer-events-none" />
          </div>
        </div>

        {/* Text */}
        <div className={`lg:col-span-5 ${isLeft ? "lg:order-2" : "lg:order-1"}`}>
          <div className="overflow-hidden mb-3">
            <span className="panel-idx inline-block text-xs font-mono uppercase tracking-widest2 text-accent-lime">
              {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
          <div className="overflow-hidden mb-6">
            <span className="panel-eyebrow inline-block text-sm uppercase tracking-widest2 text-white/55">
              {eyebrow}
            </span>
          </div>

          <h2 className="panel-title font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] text-white">
            {title.split("\n").map((line, i) => (
              <SplitWords key={i} text={line} className="block" />
            ))}
          </h2>

          {copy && (
            <p className="panel-copy mt-8 text-base md:text-lg text-white/60 leading-relaxed max-w-xl">
              {copy}
            </p>
          )}

          {metric && (
            <p className="panel-metric mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest2 text-accent-lime">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              {metric}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Marquee                                    */
/* -------------------------------------------------------------------------- */

const techStack = [
  "React",
  "TypeScript",
  "Tailwind",
  "Three.js",
  "GSAP",
  "Laravel",
  "MySQL",
  "Firebase",
  "ESP32",
  "Arduino",
  "Solana",
  "Internet Computer",
  "Python",
  "C++",
];

function Marquee() {
  return (
    <section className="relative w-full py-14 border-y border-white/10 bg-ink-950/70 backdrop-blur-md overflow-hidden">
      <div className="marquee-track whitespace-nowrap font-display text-5xl md:text-7xl text-white/80">
        {[...techStack, ...techStack].map((t, i) => (
          <span key={i} className="inline-flex items-center mx-8">
            {t}
            <span className="mx-8 text-accent-lime">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Stats                                     */
/* -------------------------------------------------------------------------- */

function Stats() {
  const ref = useRef(null);
  const numRefs = useRef([]);

  const stats = [
    { value: 20, suffix: "+", label: "Projects shipped" },
    { value: 5, suffix: "yrs+", label: "Building software" },
    { value: 3, suffix: "", label: "Core domains" },
    { value: 12, suffix: "+", label: "Stack specialties" },
  ];

  useIsoLayout(() => {
    const ctx = gsap.context(() => {
      numRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = stats[i].value;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          onUpdate() {
            el.textContent = Math.round(obj.v).toString();
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full py-28 px-6 md:px-12 border-b border-white/10"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col">
            <div className="font-display text-5xl md:text-7xl text-white font-bold leading-none flex items-baseline">
              <span ref={(el) => (numRefs.current[i] = el)}>0</span>
              <span className="text-accent-lime ml-2 text-2xl md:text-4xl">
                {s.suffix}
              </span>
            </div>
            <div className="mt-3 text-xs md:text-sm uppercase tracking-widest2 text-white/45">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Hero                                      */
/* -------------------------------------------------------------------------- */

/* Flagship case studies only; full archive lives in Projects */
const panels = [
  {
    eyebrow: "Smart agriculture · IoT + AI",
    title: "Crops that\nspeak data.",
    copy: "AgroSense360 is a multilingual rover that monitors crop health with AI vision and IoT sensors, then advises farmers in their native language. Hardware, firmware, and web in one stack.",
    metric: "End-to-end · ESP32 + React + Firebase",
    image: Agrosense2,
  },
  {
    eyebrow: "Privacy blockchain · ZecHub Hackathon",
    title: "Privacy-first\nZK authentication.",
    copy: "Sign In With Zcash is the auth primitive Zcash didn't have: non-custodial, drop-in, built on what wallets already do. Paired with ZBooks for shielded-team accounting and payroll.",
    metric: "Hackathon build · Next.js + ZIPs",
    image: siwz1,
    align: "right",
  },
  {
    eyebrow: "Onchain trading systems",
    title: "Signals with\nreal confluence.",
    copy: "Theia fuses exchange flows, insider wallets, liquidations, unlocks, and multi-timeframe analysis into one confluence-scored signal, then optionally executes on your exchange account.",
    metric: "Event-driven · Node.js + market data",
    image: SyncTradeBot1,
  },
  {
    eyebrow: "0G Zero Cup 2026 Hackathon",
    title: "Predictions you\ncan't fake.",
    copy: "0G Receipts locks AI football forecasts to sealed inference and on-chain timestamps before kickoff. Permanent, public, and auditable so wins can't be cherry-picked.",
    metric: "TEE + 0G Storage · Next.js",
    image: OGReceipts1,
    align: "right",
  },
];

const Hero = () => {
  const heroRef = useRef(null);
  const progressRef = useRef(0);
  const stickyRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const r = heroRef.current.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-r.top, 0), total);
      progressRef.current = total > 0 ? scrolled / total : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Refresh ScrollTrigger when images settle
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const t1 = setTimeout(refresh, 200);
    const t2 = setTimeout(refresh, 1200);
    const t3 = setTimeout(refresh, 2500);
    window.addEventListener("load", refresh);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("load", refresh);
    };
  }, []);

  // Three.js backdrop fades out as user scrolls past the hero
  useIsoLayout(() => {
    if (!stickyRef.current || !heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(stickyRef.current, {
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      id="hero"
      ref={heroRef}
      className="relative w-full bg-ink-950 text-white"
    >
      {/* Sticky backdrop - flow element, takes 100vh, sticks while parent is in view */}
      <div
        ref={stickyRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0 pointer-events-none"
      >
        <ThreeBackdrop progressRef={progressRef} />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/30 via-ink-950/10 to-ink-950/85 z-[1]" />
        <div
          className="absolute inset-0 z-[2] opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(1200px 600px at 70% 0%, rgba(200,255,62,0.10), transparent), radial-gradient(800px 500px at 0% 100%, rgba(125,211,252,0.08), transparent)",
          }}
        />
      </div>

      {/* Content overlays the sticky backdrop via negative margin */}
      <div
        className="relative z-10"
        style={{ marginTop: "-100vh" }}
      >
        <Opening />

        <div className="relative w-full px-6 md:px-12 py-10 max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-white/45 text-xs uppercase tracking-widest2 border-t border-white/10">
          <span>/01 · Flagship work</span>
          <span>Four case studies · full archive below</span>
        </div>

        {panels.map((p, i) => (
          <StoryPanel
            key={p.title}
            index={i + 1}
            total={panels.length}
            eyebrow={p.eyebrow}
            title={p.title}
            copy={p.copy}
            metric={p.metric}
            image={p.image}
            align={p.align}
          />
        ))}

        {/* Bridge into full archive */}
        <div className="relative w-full px-6 md:px-12 py-16 max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-t border-white/10">
          <div>
            <p className="text-xs uppercase tracking-widest2 text-accent-lime font-mono mb-3">
              Full archive
            </p>
            <p className="font-display text-2xl md:text-3xl font-bold text-white max-w-xl leading-tight">
              Every project I&apos;ve shipped: web, IoT, blockchain, and hardware.
            </p>
          </div>
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("projects")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-white/20 text-white text-sm uppercase tracking-widest2 hover:bg-white hover:text-ink-950 transition-all duration-500 shrink-0"
          >
            Browse all work
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        <Marquee />
        <Stats />
      </div>
    </div>
  );
};

export default Hero;
