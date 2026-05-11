import React, { useState, useEffect } from "react";
import { X, Menu, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Work", path: "projects" },
  { name: "Contact", path: "contact" },
];

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 70,
        behavior: "smooth",
      });
    }
    setToggle(false);
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed z-50 w-full transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-ink-950/70 backdrop-blur-xl border-b border-white/5"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Wordmark */}
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group flex items-center gap-3"
            whileHover={{ opacity: 0.85 }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-lime opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-lime"></span>
            </span>
            <span className="font-display text-lg md:text-xl font-bold tracking-tight text-white">
              Austin<span className="text-accent-lime">.</span>
            </span>
          </motion.a>

          {/* Desktop Menu */}
          <ul className="hidden sm:flex items-center gap-2">
            {navLinks.map((nav) => (
              <li key={nav.name}>
                <motion.button
                  onClick={() => scrollToSection(nav.path)}
                  className="relative group px-4 py-2 text-sm uppercase tracking-widest2 text-white/70 hover:text-white transition-colors"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {nav.name}
                  <span className="absolute left-4 right-4 bottom-1 h-px bg-accent-lime origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </motion.button>
              </li>
            ))}
            <li>
              <motion.a
                href="https://resume.io/r/l605UVqBi"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 inline-flex items-center gap-2 bg-white text-ink-950 px-5 py-2.5 rounded-full text-sm font-medium uppercase tracking-widest2 hover:bg-accent-lime transition-colors duration-500"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                Resume
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <motion.button
              onClick={() => setToggle(!toggle)}
              aria-label="Toggle Menu"
              className="relative z-50 p-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {toggle ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    <X className="w-5 h-5 text-white" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    <Menu className="w-5 h-5 text-white" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {toggle && (
          <>
            <motion.div
              className="fixed inset-0 bg-ink-950/70 backdrop-blur-xl z-40 sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setToggle(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-full sm:hidden z-40 flex flex-col justify-between p-8 pt-28"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: [0.77, 0, 0.175, 1], duration: 0.6 }}
            >
              <ul className="flex flex-col gap-2">
                {navLinks.map((nav, i) => (
                  <motion.li
                    key={nav.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                  >
                    <button
                      className="w-full flex items-center justify-between py-5 border-b border-white/10 group"
                      onClick={() => scrollToSection(nav.path)}
                    >
                      <span className="font-display text-4xl font-bold text-white group-hover:text-accent-lime transition-colors">
                        {nav.name}
                      </span>
                      <ArrowUpRight className="w-6 h-6 text-white/60 group-hover:text-accent-lime group-hover:rotate-45 transition-all duration-500" />
                    </button>
                  </motion.li>
                ))}
              </ul>
              <motion.a
                href="https://resume.io/r/l605UVqBi"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setToggle(false)}
                className="mt-8 inline-flex items-center justify-between bg-white text-ink-950 px-6 py-5 rounded-2xl font-medium uppercase tracking-widest2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
              >
                View Resume
                <ArrowUpRight className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
