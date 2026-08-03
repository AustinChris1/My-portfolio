import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const focusAreas = [
  {
    title: "Full-stack product",
    body: "React, Laravel, and Firebase systems that ship: LMS, e-commerce, directories, and client platforms.",
  },
  {
    title: "Embedded & IoT",
    body: "ESP32, Arduino, and sensor stacks wired to real dashboards for agriculture, access control, and attendance.",
  },
  {
    title: "Onchain tooling",
    body: "Auth, trading systems, Solana utilities, and hackathon products across Zcash, Solana, ICP, EVM and 0G.",
  },
];

const About = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heading = headingRef.current;
      if (!heading) return;
      // Whole-block fade, not per-word masks (those were clipping mid-sentence)
      gsap.fromTo(
        heading,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-ink-950 text-white border-b border-white/10"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(700px 400px at 0% 50%, rgba(200,255,62,0.06), transparent), radial-gradient(700px 400px at 100% 0%, rgba(125,211,252,0.05), transparent)",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 md:px-12 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <div className="mb-4">
              <span className="inline-block text-xs uppercase tracking-widest2 text-accent-lime font-mono">
                /02 · About
              </span>
            </div>
            <h2
              ref={headingRef}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
            >
              <span className="block text-white">Engineer who</span>
              <span className="block text-white/45">builds both</span>
              <span className="block text-white">sides of the wire.</span>
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-2xl">
              I&apos;m Austin-Chris, a B.Eng (EEE) trained full-stack developer and
              embedded systems engineer. I ship web products and the hardware that
              talks to them, from Nigeria-scale platforms to privacy-preserving
              blockchain primitives and field IoT.
            </p>
            <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-2xl">
              Open to full-stack roles, embedded/IoT builds, and ambitious
              side projects. If the problem spans silicon to UI, or needs to go
              onchain, that&apos;s where I do my best work.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {focusAreas.map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors duration-500"
                >
                  <h3 className="font-display text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-ink-950 text-xs uppercase tracking-widest2 font-medium hover:bg-accent-lime transition-colors duration-500"
              >
                See all work
                <span className="transition-transform duration-500 group-hover:translate-x-0.5">
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
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white text-xs uppercase tracking-widest2 hover:bg-white/5 transition-all duration-500"
              >
                Contact
                <span className="transition-transform duration-500 group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
