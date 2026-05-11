import React, { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Twitter,
  Github,
  Linkedin,
  Mail,
  Check,
  ArrowUpRight,
  Copy,
} from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    href: "https://x.com/AustinChris_",
    icon: Twitter,
    label: "Twitter / X",
    handle: "@AustinChris_",
  },
  {
    href: "https://github.com/AustinChris1",
    icon: Github,
    label: "GitHub",
    handle: "AustinChris1",
  },
  {
    href: "https://linkedin.com/in/austinchris1",
    icon: Linkedin,
    label: "LinkedIn",
    handle: "austinchris1",
  },
];

const Contact = () => {
  const [emailCopied, setEmailCopied] = useState(false);
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);

  const handleEmailCopy = () => {
    navigator.clipboard.writeText("austinchrisiwu@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2500);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const root = sectionRef.current;
      if (!root) return;
      const words = headlineRef.current?.querySelectorAll(".ct-word");
      if (words?.length) {
        gsap.set(words, { yPercent: 110, opacity: 0 });
        gsap.to(words, {
          yPercent: 0,
          opacity: 1,
          stagger: 0.04,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-ink-950 text-white overflow-hidden"
    >
      {/* Glow accents */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(900px 600px at 10% 20%, rgba(200,255,62,0.08), transparent), radial-gradient(900px 500px at 90% 90%, rgba(125,211,252,0.07), transparent)",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 md:px-12 py-28">
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="overflow-hidden mb-4">
            <span className="inline-block text-xs uppercase tracking-widest2 text-accent-lime font-mono">
              /03 — Contact
            </span>
          </div>
          <h2
            ref={headlineRef}
            className="font-display text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9]"
          >
            <span className="mask-line block">
              {"Have an idea?".split(" ").map((w, i) => (
                <span
                  key={i}
                  className="ct-word inline-block"
                  style={{ marginRight: "0.25em" }}
                >
                  {w}
                </span>
              ))}
            </span>
            <span className="mask-line block bg-gradient-to-r from-accent-lime via-white to-accent-sky bg-clip-text text-transparent">
              {"Let's build it.".split(" ").map((w, i) => (
                <span
                  key={`b-${i}`}
                  className="ct-word inline-block"
                  style={{ marginRight: "0.25em" }}
                >
                  {w}
                </span>
              ))}
            </span>
          </h2>
          <p className="mt-8 text-base md:text-lg text-white/55 max-w-2xl mx-auto leading-relaxed">
            Open to full-stack engineering, embedded/IoT, and ambitious side
            projects. If you're shipping something interesting, I'd love to hear
            about it.
          </p>
        </div>

        {/* Email card */}
        <div className="max-w-3xl mx-auto mb-20">
          <button
            onClick={handleEmailCopy}
            className="group relative w-full text-left p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-accent-lime/50 transition-all duration-500 backdrop-blur-md overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-lime/[0.04] to-accent-sky/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-accent-lime text-ink-950 flex items-center justify-center shrink-0">
                  <Mail size={26} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest2 text-white/50 mb-2">
                    Email
                  </div>
                  <div className="font-display text-2xl md:text-4xl font-bold text-white break-all">
                    austinchrisiwu@gmail.com
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest2 text-white/70 group-hover:bg-accent-lime group-hover:text-ink-950 group-hover:border-accent-lime transition-all duration-500">
                {emailCopied ? (
                  <>
                    <Check size={14} /> Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} /> Copy
                  </>
                )}
              </div>
            </div>
            <AnimatePresence>
              {emailCopied && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-lime text-ink-950 text-[10px] uppercase tracking-widest2 font-medium"
                >
                  <Check size={12} />
                  Copied to clipboard
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Socials */}
        <div className="max-w-4xl mx-auto">
          <div className="text-xs uppercase tracking-widest2 text-white/50 mb-6 text-center">
            Find me elsewhere
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {socialLinks.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/30 transition-all duration-500 flex items-center justify-between"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent-lime group-hover:text-ink-950 group-hover:border-accent-lime transition-all duration-500">
                    <s.icon size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">
                      {s.label}
                    </div>
                    <div className="text-xs text-white/50">{s.handle}</div>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-accent-lime group-hover:rotate-45 transition-all duration-500" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-10 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40 uppercase tracking-widest2">
            <span>© {new Date().getFullYear()} Austin-Chris · B.Eng (EEE)</span>
            <span>Crafted with React, Three.js, GSAP & passion</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
