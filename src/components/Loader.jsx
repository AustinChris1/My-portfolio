import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/avatar.png";

const Loader = () => {
  // Animation variants for the main container
  const containerVariants = {
    initial: {
      opacity: 0,
      scale: 0.9
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  // Shimmer effect for skeleton items
  const shimmerVariants = {
    initial: {
      backgroundPosition: "-200px 0"
    },
    animate: {
      backgroundPosition: "200px 0",
      transition: {
        duration: 1.5,
        ease: "linear",
        repeat: Infinity
      }
    }
  };

  // Floating animation for the avatar
  const avatarVariants = {
    initial: {
      scale: 0,
      rotate: -180
    },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.68, -0.55, 0.265, 1.55]
      }
    }
  };

  // Pulse animation for the loading dots
  const dotVariants = {
    initial: {
      scale: 0.8,
      opacity: 0.5
    },
    animate: {
      scale: 1.2,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  // Staggered item animation
  const itemVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.9
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-slate-900 dark:to-blue-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-3/4 h-3/4 bg-gradient-to-tl from-purple-400/10 to-blue-400/10 rounded-full"
          animate={{
            rotate: -360,
            scale: [1, 0.9, 1]
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </div>

      <motion.div
        className="flex flex-col items-center gap-8 w-full max-w-2xl p-8 relative z-10"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Avatar with glow effect */}
        <motion.div
          className="relative"
          variants={avatarVariants}
        >
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              style={{
                backgroundImage: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                backgroundSize: "200px 100%",
                backgroundRepeat: "no-repeat"
              }}
            />
            <motion.img
              src={logo}
              alt="Avatar"
              className="rounded-full w-[50px] h-[50px] transition-transform duration-300 hover:scale-110"
            />

          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
          {/* Rotating ring */}
          <motion.div
            className="absolute inset-0 border-4 border-transparent border-t-blue-400 border-r-purple-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Loading text with shimmer */}
        <motion.div
          className="relative h-8 w-3/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg overflow-hidden"
          variants={itemVariants}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent"
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            style={{
              backgroundImage: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
              backgroundSize: "200px 100%",
              backgroundRepeat: "no-repeat"
            }}
          />
        </motion.div>

        {/* Subtext */}
        <motion.div
          className="relative h-5 w-1/2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-md overflow-hidden"
          variants={itemVariants}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent"
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            style={{
              backgroundImage: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
              backgroundSize: "200px 100%",
              backgroundRepeat: "no-repeat"
            }}
          />
        </motion.div>

        {/* Content blocks with staggered shimmer */}
        <motion.div
          className="space-y-4 w-full"
          variants={itemVariants}
        >
          {[
            { width: "w-full", delay: 0 },
            { width: "w-4/5", delay: 0.2 },
            { width: "w-full", delay: 0.4 },
            { width: "w-3/5", delay: 0.6 }
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`relative h-16 ${item.width} bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-xl overflow-hidden shadow-sm`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + item.delay, duration: 0.5 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent"
                animate={{
                  backgroundPosition: ["200px 0", "-200px 0"]
                }}
                transition={{
                  duration: 1.8,
                  ease: "linear",
                  repeat: Infinity,
                  delay: item.delay
                }}
                style={{
                  backgroundImage: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  backgroundSize: "200px 100%",
                  backgroundRepeat: "no-repeat"
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Loading dots indicator */}
        <motion.div
          className="flex items-center gap-2 mt-4"
          variants={itemVariants}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              variants={dotVariants}
              animate="animate"
              transition={{
                delay: index * 0.2,
                duration: 0.6,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </motion.div>

        {/* Loading text */}
        <motion.p
          className="text-gray-600 dark:text-gray-400 font-medium text-lg"
          variants={itemVariants}
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Loading your experience...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Loader;