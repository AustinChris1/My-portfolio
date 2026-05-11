import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    let value = 0;
    const tick = () => {
      // Asymptote toward 100; settles around ~95 unless app unmounts loader sooner
      value += Math.max(0.4, (98 - value) * 0.015);
      setProgress(Math.min(99, value));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink-950 text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Faint grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Center mark */}
      <div className="relative flex flex-col items-center gap-12">
        <div className="relative">
          <motion.div
            className="w-20 h-20 rounded-full border border-white/15"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border border-accent-lime/40"
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-2xl font-bold tracking-tight text-white">
              A
              <span className="text-accent-lime">.</span>
            </span>
          </div>
        </div>

        <div className="text-center">
          <div className="font-display text-3xl md:text-4xl font-bold mb-2">
            Austin<span className="text-accent-lime">.</span>
          </div>
          <div className="text-[10px] uppercase tracking-widest2 text-white/50">
            Loading experience
          </div>
        </div>

        <div className="w-64 md:w-80">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest2 text-white/50 mb-2 font-mono">
            <span>0</span>
            <span>{Math.floor(progress).toString().padStart(2, "0")}</span>
            <span>100</span>
          </div>
          <div className="h-px w-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-accent-lime transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
