import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Twitter, Github, Linkedin, Mail, Check, ArrowRight, Sparkles } from "lucide-react";

const Contact = () => {
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [isEmailHovered, setIsEmailHovered] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });

  // Track mouse position for 3D effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleEmailCopy = () => {
    navigator.clipboard.writeText('austinchrisiwu@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 3000);
  };

  const socialLinks = [
    { 
      href: "https://x.com/AustinChris_", 
      icon: Twitter, 
      label: "Twitter",
      color: "from-blue-400 to-blue-600",
      glowColor: "rgba(59, 130, 246, 0.4)",
      description: "Follow my tech journey"
    },
    { 
      href: "https://github.com/AustinChris1", 
      icon: Github, 
      label: "GitHub",
      color: "from-gray-400 to-gray-600",
      glowColor: "rgba(107, 114, 128, 0.4)",
      description: "Explore my code"
    },
    { 
      href: "https://linkedin.com/in/austinchris1", 
      icon: Linkedin, 
      label: "LinkedIn",
      color: "from-blue-500 to-blue-700",
      glowColor: "rgba(59, 130, 246, 0.4)",
      description: "Connect professionally"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        staggerChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -60, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const emailVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -20 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 120
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      id="contact"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden flex items-center justify-center"
    >
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              background: `linear-gradient(45deg, 
                ${i % 3 === 0 ? '#00ff88' : i % 3 === 1 ? '#ff6b35' : '#4dabf7'}, 
                ${i % 3 === 0 ? '#4dabf7' : i % 3 === 1 ? '#00ff88' : '#ff6b35'})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              scale: [1, Math.random() * 2 + 0.5, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}

        {/* Geometric patterns */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute border border-green-400/10"
            style={{
              width: 60 + i * 20,
              height: 60 + i * 20,
              left: `${10 + i * 10}%`,
              top: `${15 + (i % 4) * 20}%`,
              borderRadius: i % 2 === 0 ? '50%' : '0%'
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 25 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        {/* Header Section */}
        <motion.div 
          variants={titleVariants}
          className="mb-20"
        >
          <motion.div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="text-green-400 mr-4" size={32} />
            </motion.div>
            <motion.h1 
              className="text-6xl md:text-8xl font-bold"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                background: "linear-gradient(45deg, #00ff88, #ff6b35, #4dabf7, #9775fa, #00ff88)",
                backgroundSize: "400% 400%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              Let's Connect
            </motion.h1>
            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="text-blue-400 ml-4" size={32} />
            </motion.div>
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            variants={titleVariants}
          >
            Ready to bring your ideas to life? Let's collaborate and create something extraordinary together.
          </motion.p>
        </motion.div>

        {/* Email Section */}
        <motion.div 
          variants={emailVariants}
          className="mb-20"
        >
          <motion.div
            className="group relative inline-block"
            onMouseEnter={() => setIsEmailHovered(true)}
            onMouseLeave={() => setIsEmailHovered(false)}
          >
            <motion.div
              className="relative bg-gray-800/30 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-gray-700/50 shadow-2xl cursor-pointer"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.current.y * 3}deg) rotateY(${mousePosition.current.x * 3}deg)`
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(0,255,136,0.2)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={handleEmailCopy}
            >
              {/* Glowing border effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={isEmailHovered ? { 
                  background: ["linear-gradient(0deg, rgba(0,255,136,0.2), rgba(77,171,247,0.2))",
                             "linear-gradient(90deg, rgba(77,171,247,0.2), rgba(255,107,53,0.2))",
                             "linear-gradient(180deg, rgba(255,107,53,0.2), rgba(0,255,136,0.2))",
                             "linear-gradient(270deg, rgba(0,255,136,0.2), rgba(77,171,247,0.2))"]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <div className="relative z-10 flex flex-col items-center">
                <motion.div
                  className="p-4 rounded-2xl bg-gradient-to-r from-green-500 to-blue-500 mb-6"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Mail size={32} className="text-white" />
                </motion.div>

                <motion.h2 
                  className="text-2xl md:text-3xl font-bold mb-4 text-gray-200"
                  animate={isEmailHovered ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  Email Me
                </motion.h2>

                <motion.p 
                  className="text-3xl md:text-4xl font-mono bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4"
                  animate={isEmailHovered ? { 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  austinchrisiwu@gmail.com
                </motion.p>

              </div>

              {/* Success notification */}
              <AnimatePresence>
                {emailCopied && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0, y: -20 }}
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2"
                  >
                    <Check size={16} />
                    Email copied!
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Social Media Links */}
        <motion.div variants={emailVariants}>
          <motion.h3 
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            variants={titleVariants}
          >
            Follow My Journey
          </motion.h3>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                variants={socialVariants}
                whileHover={{ 
                  scale: 1.15, 
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => setHoveredSocial(index)}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                <motion.div
                  className="relative"
                  animate={hoveredSocial === index ? {
                    y: [-5, 5, -5],
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Glowing background */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                    style={{ 
                      background: `linear-gradient(45deg, ${social.color.replace('from-', '').replace(' to-', ', ')})` 
                    }}
                    animate={hoveredSocial === index ? {
                      scale: [1, 1.2, 1],
                    } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />

                  <motion.div
                    className={`relative p-3 md:p-4 rounded-3xl bg-gradient-to-r ${social.color} shadow-xl backdrop-blur-sm`}
                    style={{
                      boxShadow: hoveredSocial === index 
                        ? `0 20px 40px ${social.glowColor}` 
                        : "0 10px 20px rgba(0,0,0,0.3)"
                    }}
                  >
                    <social.icon size={36} className="text-white mb-2" />
                    <div className="text-center">
                      <h4 className="text-lg font-bold text-white mb-1">{social.label}</h4>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Enhanced tooltip */}
                <AnimatePresence>
                  {hoveredSocial === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.8 }}
                      className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm whitespace-nowrap border border-gray-700 shadow-xl"
                    >
                      Visit my {social.label}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="mt-20 pt-8 border-t border-gray-700/30"
          variants={titleVariants}
        >
          <motion.p 
            className="text-gray-400 text-lg"
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            © 2025 Austin-Chris. Crafted with passion and innovation.
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;