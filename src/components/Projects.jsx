import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github, Play, Pause } from "lucide-react";
import crest from "../assets/crest.png";
import exchange from "../assets/Exchange.png";
import resistor_color_code from "../assets/resistor_color_code.png";
import student_wall from "../assets/student_wall.png";
import attendance from "../assets/attendance.png";
import firstdigit from "../assets/firstdigit.png";
import emergency from "../assets/emergency.png";
import firebase from "../assets/firebase.png";
import firstSmartMart1 from "../assets/firstSmartMart1.png";
import firstSmartMart2 from "../assets/firstSmartMart2.png";
import schoolFinder1 from "../assets/schoolfinder1.png";
import schoolFinder2 from "../assets/schoolfinder2.png";
import mysite from "../assets/mysite.png";

const projectsData = [
  {
    images: [
      firstSmartMart1,
      firstSmartMart2,
    ],
    title: "FirstSmart Mart",
    description: "A recent fully working e-commerce website made for first digits",
    tech: ["React", "TailwindCSS", "Laravel", "MySQL"],
    link: "https://spx.firstdigit.com.ng",
    github: "#",
    category: "E-commerce"
  },
  {
    images: [
      schoolFinder1,
      schoolFinder2,
    ],
    title: "School Finder",
    description: "A website used to Find the Perfect Secondary School for your kid in Abuja and Nigeria as a whole",
    tech: ["React", "TailwindCSS", "JSON"],
    link: "https://schoolfinderr.web.app/",
    github: "#",
    category: "Education"
  },
  {
    images: [
      attendance,
    ],
    title: "Attendance System",
    description: "An RFID-based attendance system for tracking student or employee presence with real-time analytics and automated reporting.",
    tech: ["React", "Firebase", "ESP32CAM"],
    link: "https://face-access-1.web.app/",
    github: "https://github.com/AustinChris1/AttendanceSystem",
    category: "IoT & Hardware"
  },
  {
    images: [
      firstdigit,
    ],
    title: "First Digit Website",
    description: "A modern communication platform website focusing on helping users stay connected in the digital world with advanced features.",
    tech: ["React", "PHP", "MySQL", "TailwindCSS"],
    link: "https://www.firstdigit.com.ng/",
    github: "#",
    category: "Web Development"
  },
  {
    images: [
      emergency,
    ],
    title: "Emergency Dashboard",
    description: "A real-time emergency response dashboard for monitoring critical situations with live data visualization and alert systems.",
    tech: ["React", "D3.js", "WebSocket", "Python"],
    link: "#",
    github: "https://github.com/AustinChris1/EmergencySystem",
    category: "Data Analytics"
  },
  {
    images: [
      firebase,
    ],
    title: "ESP32 Firebase Integration",
    description: "An ESP32 project that listens to Firebase real-time updates to control lights and monitor room temperature with graphical data.",
    tech: ["ESP32", "Firebase", "C++", "IoT"],
    link: "https://esp-test-43661.web.app/#",
    github: "#",
    category: "IoT & Hardware"
  },
  {
    images: [
      student_wall,
    ],
    title: "Motoko Student Wall",
    description: "A decentralized student forum built with Motoko for the Internet Computer ecosystem with blockchain-based interactions.",
    tech: ["Motoko", "Internet Computer", "Blockchain"],
    link: "https://7vjgk-cqaaa-aaaal-ackqq-cai.icp0.io/",
    github: "#",
    category: "Blockchain"
  },
  {
    images: [
      crest,
    ],
    title: "Crest E-commerce",
    description: "A full-featured e-commerce platform for fashion retail with cryptocurrency payment integration and modern UI/UX.",
    tech: ["HTML", "Bootstrap", "JS", "PHP", "MySQL", "Crypto"],
    link: "#",
    github: "https://github.com/AustinChris1/Crest-E-commerce-Website",
    category: "E-commerce"
  },
  {
    images: [
      exchange,
    ],
    title: "Markov Exchange",
    description: "A platform for selling cryptocurrency (USDT) in exchange for NGN.",
    tech: ["HTML", "CSS", "JS", "PHP", "MySQL", "BSCscan", "Crypto"],
    link: "#",
    github: "https://github.com/AustinChris1/Send-Crypto-Receive-NGN",
    category: "Blockchain"
  },
  {
    images: [
      resistor_color_code,
    ],
    title: "Resistor Color Code Checker",
    description: "A simple C++ program that determines a resistor's value based on its color bands.",
    tech: ["C++"],
    link: "#",
    github: "https://github.com/AustinChris1/Resistor-color-code-checker",
    category: "IoT & Hardware"
  },
  {
    images: [
      mysite,
    ],
    title: "My First Fullstack website",
    description: "A learning website built when I was learning PHP and MySQL with a referral system, blog, affliliate marketing mining system, chat, and admin dashboard.",
    tech: ["PHP", "MySQL", "Bootstrap"],
    link: "#",
    github: "https://github.com/AustinChris1/portfolio",
    category: "Web Development"
  },

];

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [autoPlay, setAutoPlay] = useState(true);

  const categories = ["All", "Web Development", "IoT & Hardware", "Education", "Data Analytics", "Blockchain", "E-commerce"];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      id="projects"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-400 rounded-full opacity-30"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          variants={titleVariants}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              background: "linear-gradient(45deg, #00ff88, #ff6b35, #4dabf7, #00ff88)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            My Projects
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            variants={titleVariants}
          >
            Explore my portfolio of innovative solutions spanning web development,
            IoT systems, and cutting-edge technologies
          </motion.p>
        </motion.div>

        <motion.div
          variants={filterVariants}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${filter === category
                ? "bg-gradient-to-r from-green-500 to-blue-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Auto-play toggle */}
        <motion.div
          className="flex justify-center mb-8"
          variants={filterVariants}
        >
          <motion.button
            onClick={() => setAutoPlay(!autoPlay)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-full text-gray-300 hover:bg-gray-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {autoPlay ? <Pause size={16} /> : <Play size={16} />}
            {autoPlay ? "Pause Auto-play" : "Enable Auto-play"}
          </motion.button>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {projectsData.map((project, index) => {
              const isVisible = filter === "All" || project.category === filter;
              return (
                <ProjectCard
                  key={project.title} 
                  project={project}
                  index={index}
                  autoPlay={autoPlay}
                  isVisible={isVisible} 
                />
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Individual Project Card Component
const ProjectCard = ({ project, index, autoPlay, isVisible }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Logic to handle auto-play
  useEffect(() => {
    clearInterval(intervalRef.current);

    if (autoPlay && !isHovered && project.images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      }, 3000);
    }
    return () => clearInterval(intervalRef.current);
  }, [autoPlay, isHovered, project.images.length]);

  const nextImage = (e) => {
    e.stopPropagation();
    clearInterval(intervalRef.current);
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    clearInterval(intervalRef.current);
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (autoPlay) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      }, 3000);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          layout 
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="group relative bg-gray-800 rounded-2xl overflow-hidden shadow-2xl"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          whileHover={{
            y: -10,
            scale: 1.02,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
        >
          <div className="relative h-64 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={project.images[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>

            {project.images.length > 1 && (
              <>
                <motion.button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.8)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft size={20} />
                </motion.button>
                <motion.button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.8)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight size={20} />
                </motion.button>
              </>
            )}

            {project.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                {project.images.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            )}

            <motion.div
              className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {project.category}
            </motion.div>
          </div>

          <div className="p-6">
            <motion.h3
              className="text-2xl font-bold mb-3 text-white group-hover:text-green-400 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
            >
              {project.title}
            </motion.h3>

            <motion.p
              className="text-gray-300 mb-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              {project.description}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.6 }}
            >
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.7 }}
            >
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-full font-semibold flex-1 justify-center"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,255,136,0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={16} />
                Live Demo
              </motion.a>

              {project.github && project.github !== "#" && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-gray-700 text-white p-2 rounded-full"
                  whileHover={{ scale: 1.05, backgroundColor: "#4b5563" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={16} />
                </motion.a>
              )}
            </motion.div>
          </div>

          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Projects;