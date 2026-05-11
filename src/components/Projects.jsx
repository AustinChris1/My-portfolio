import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Play,
  Pause,
  ArrowUpRight,
} from "lucide-react";
import ReactPaginate from "react-paginate";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
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
import schoolFinder3 from "../assets/schoolfinder3.png";
import schoolFinder4 from "../assets/schoolfinder4.png";
import schoolFinder5 from "../assets/schoolfinder5.png";
import schoolFinder6 from "../assets/schoolfinder6.png";
import solSweep1 from "../assets/SolSweep1.png";
import solSweep2 from "../assets/SolSweep2.png";
import mysite from "../assets/mysite.png";
import Agrosense1 from "../assets/Agrosense1.jpeg";
import Agrosense2 from "../assets/Agrosense2.jpeg";
import Agrosense3 from "../assets/Agrosense3.png";
import Agrosense4 from "../assets/Agrosense4.png";
import Agrosense5 from "../assets/Agrosense5.png";
import FamilyAnchor1 from "../assets/familyanchor1.png";
import FamilyAnchor2 from "../assets/familyanchor2.png";
import FamilyAnchor3 from "../assets/familyanchor3.png";
import Lms1 from "../assets/Lms1.png";
import Lms2 from "../assets/Lms2.png";
import Lms3 from "../assets/Lms3.png";
import Lms4 from "../assets/Lms4.png";
import Lms5 from "../assets/Lms5.png";
import Lms6 from "../assets/Lms6.png";
import Lms7 from "../assets/Lms7.png";

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    images: [Agrosense1, Agrosense2, Agrosense3, Agrosense4, Agrosense5],
    title: "AgroSense360",
    description:
      "Smart Crop Health Monitoring and Advisory Using AI and IoT Based Multilingual Rover System",
    tech: ["React", "TailwindCSS", "Firebase", "ESP32", "Arduino", "Python"],
    link: "https://schoolfinderabj.web.app/",
    github: "#",
    category: "IoT & Hardware",
  },
  {
    images: [Lms1, Lms2, Lms3, Lms4, Lms5, Lms6, Lms7],
    title: "FirstDigit Academy (LMS)",
    description:
      "A full-featured Learning Management System for FirstDigit Academy, enabling course management, student enrollment, progress tracking, and interactive learning experiences.",
    tech: ["React", "TailwindCSS", "Laravel", "MySQL"],
    link: "https://acad.firstdigit.com.ng",
    github: "#",
    category: "Web Development",
  },
  {
    images: [FamilyAnchor1, FamilyAnchor2, FamilyAnchor3],
    title: "Family Anchor",
    description:
      "A web platform that connects families with local resources, support services, and community events to strengthen family bonds and well-being.",
    tech: ["React", "TailwindCSS"],
    link: "https://familyanchor.org/",
    github: "#",
    category: "Web Development",
  },
  {
    images: [firstSmartMart1, firstSmartMart2],
    title: "FirstSmart Mart",
    description: "A recent fully working e-commerce website made for first digits",
    tech: ["React", "TailwindCSS", "Laravel", "MySQL"],
    link: "https://spx.firstdigit.com.ng",
    github: "#",
    category: "E-commerce",
  },
  {
    images: [
      schoolFinder1,
      schoolFinder2,
      schoolFinder3,
      schoolFinder4,
      schoolFinder5,
      schoolFinder6,
    ],
    title: "School Finder",
    description:
      "A website used to Find the Perfect School (Nursery, Primary, Secondary, Tertiary) for your kid in Abuja and Nigeria as a whole.",
    tech: ["React", "TailwindCSS", "Laravel", "MySQL"],
    link: "https://schoolfinderabuja.com/",
    github: "https://github.com/AustinChris1/SchoolFinder",
    category: "Education",
  },
  {
    images: [solSweep1, solSweep2],
    title: "Solana Token Sweeper",
    description:
      "A program that automatically detects and swaps all non-SOL tokens in a given wallet to SOL on the Solana blockchain.",
    tech: ["React", "TailwindCSS", "Javascript", "Vercel"],
    link: "https://solanasweep.vercel.app/",
    github: "https://github.com/AustinChris1/SolSweep",
    category: "Blockchain",
  },
  {
    images: [attendance],
    title: "Attendance System",
    description:
      "An RFID-based attendance system for tracking student or employee presence with real-time analytics and automated reporting.",
    tech: ["React", "Firebase", "ESP32CAM"],
    link: "https://face-access-1.web.app/",
    github: "https://github.com/AustinChris1/AttendanceSystem",
    category: "IoT & Hardware",
  },
  {
    images: [firstdigit],
    title: "First Digit Website",
    description:
      "A modern platform website focusing on helping users stay connected in the digital world with advanced features.",
    tech: ["React", "PHP", "MySQL", "TailwindCSS"],
    link: "https://www.firstdigit.com.ng/",
    github: "#",
    category: "Web Development",
  },
  {
    images: [emergency],
    title: "Emergency Dashboard",
    description:
      "A real-time emergency response dashboard for monitoring critical situations with live data visualization and alert systems.",
    tech: ["React", "TailwindCSS", "PHP", "MySQL"],
    link: "#",
    github: "https://github.com/AustinChris1/EmergencySystem",
    category: "Data Analytics",
  },
  {
    images: [firebase],
    title: "ESP32 Firebase Integration",
    description:
      "An ESP32 project that listens to Firebase real-time updates to control lights and monitor room temperature with graphical data.",
    tech: ["ESP32", "Firebase", "Arduino", "IoT"],
    link: "https://esp-test-43661.web.app/#",
    github: "#",
    category: "IoT & Hardware",
  },
  {
    images: [student_wall],
    title: "Motoko Student Wall",
    description:
      "A decentralized student forum built with Motoko for the Internet Computer ecosystem with blockchain-based interactions.",
    tech: ["Motoko", "Internet Computer", "JS"],
    link: "https://7vjgk-cqaaa-aaaal-ackqq-cai.icp0.io/",
    github: "#",
    category: "Blockchain",
  },
  {
    images: [crest],
    title: "Crest E-commerce",
    description:
      "A full-featured e-commerce platform for fashion retail with cryptocurrency payment integration and modern UI/UX.",
    tech: ["HTML", "Bootstrap", "JS", "PHP", "MySQL", "Crypto"],
    link: "#",
    github: "https://github.com/AustinChris1/Crest-E-commerce-Website",
    category: "E-commerce",
  },
  {
    images: [exchange],
    title: "Markov Exchange",
    description: "A platform for selling cryptocurrency (USDT) in exchange for NGN.",
    tech: ["HTML", "CSS", "JS", "PHP", "MySQL", "BSCscan", "Crypto"],
    link: "#",
    github: "https://github.com/AustinChris1/Send-Crypto-Receive-NGN",
    category: "Blockchain",
  },
  {
    images: [resistor_color_code],
    title: "Resistor Color Code Checker",
    description:
      "A simple C++ program that determines a resistor's value based on its color bands.",
    tech: ["C++"],
    link: "#",
    github: "https://github.com/AustinChris1/Resistor-color-code-checker",
    category: "IoT & Hardware",
  },
  {
    images: [mysite],
    title: "My First Fullstack website",
    description:
      "A learning website built when I was learning PHP and MySQL with a referral system, blog, affiliate marketing mining system, chat, and admin dashboard.",
    tech: ["PHP", "MySQL", "Bootstrap"],
    link: "#",
    github: "https://github.com/AustinChris1/portfolio",
    category: "Web Development",
  },
];

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [autoPlay, setAutoPlay] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const projectsPerPage = 6;
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  const categories = [
    "All",
    "Web Development",
    "IoT & Hardware",
    "Education",
    "Data Analytics",
    "Blockchain",
    "E-commerce",
  ];

  const filteredProjects = projectsData.filter(
    (project) => filter === "All" || project.category === filter
  );

  const pageCount = Math.ceil(filteredProjects.length / projectsPerPage);
  const offset = currentPage * projectsPerPage;
  const currentProjects = filteredProjects.slice(offset, offset + projectsPerPage);

  useEffect(() => {
    setCurrentPage(0);
  }, [filter]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    document.getElementById("projects")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Heading entrance reveal
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words = headingRef.current?.querySelectorAll(".pj-word");
      if (!words?.length) return;
      gsap.set(words, { yPercent: 110, opacity: 0 });
      gsap.to(words, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-ink-950 text-white overflow-hidden"
    >
      {/* Soft glow accents */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(800px 500px at 90% 0%, rgba(200,255,62,0.06), transparent), radial-gradient(800px 500px at 0% 100%, rgba(125,211,252,0.05), transparent)",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 md:px-12 py-28">
        {/* Section header */}
        <div className="flex items-end justify-between flex-wrap gap-6 mb-8">
          <div>
            <div className="overflow-hidden mb-2">
              <span className="inline-block text-xs uppercase tracking-widest2 text-accent-lime font-mono">
                /02 — Selected work
              </span>
            </div>
            <h2
              ref={headingRef}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9]"
            >
              <span className="mask-line block">
                {"Things I've".split(" ").map((w, i) => (
                  <span
                    key={i}
                    className="pj-word inline-block"
                    style={{ marginRight: "0.25em" }}
                  >
                    {w}
                  </span>
                ))}
              </span>
              <span className="mask-line block text-white/40">
                {"shipped lately.".split(" ").map((w, i) => (
                  <span
                    key={`b-${i}`}
                    className="pj-word inline-block"
                    style={{ marginRight: "0.25em" }}
                  >
                    {w}
                  </span>
                ))}
              </span>
            </h2>
          </div>
          <p className="max-w-md text-white/50 text-base md:text-lg leading-relaxed">
            From IoT rovers to LMS platforms, e-commerce to blockchain tooling.
            Every project shipped, every line written.
          </p>
        </div>

        {/* Filters + autoplay */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest2 border transition-all duration-300 ${
                  filter === category
                    ? "bg-accent-lime text-ink-950 border-accent-lime"
                    : "bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white"
                }`}
                whileTap={{ scale: 0.97 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <motion.button
            onClick={() => setAutoPlay(!autoPlay)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest2 text-white/60 border border-white/10 rounded-full hover:bg-white/5 transition"
            whileTap={{ scale: 0.97 }}
          >
            {autoPlay ? <Pause size={14} /> : <Play size={14} />}
            {autoPlay ? "Pause" : "Auto-play"}
          </motion.button>
        </div>

        {/* Projects Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          key={`${filter}-${currentPage}`}
        >
          <AnimatePresence mode="wait">
            {currentProjects.map((project, index) => (
              <ProjectCard
                key={`${project.title}-${currentPage}`}
                project={project}
                index={index}
                autoPlay={autoPlay}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {pageCount > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mt-16"
          >
            <ReactPaginate
              previousLabel={
                <span className="flex items-center gap-1">
                  <ChevronLeft size={16} />
                  Prev
                </span>
              }
              nextLabel={
                <span className="flex items-center gap-1">
                  Next
                  <ChevronRight size={16} />
                </span>
              }
              breakLabel="…"
              pageCount={pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              forcePage={currentPage}
              containerClassName="flex items-center gap-1 text-sm"
              pageClassName="w-10 h-10"
              pageLinkClassName="w-full h-full flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/5 transition"
              previousClassName=""
              previousLinkClassName="flex items-center gap-1 px-4 h-10 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition uppercase tracking-widest2 text-xs"
              nextClassName=""
              nextLinkClassName="flex items-center gap-1 px-4 h-10 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition uppercase tracking-widest2 text-xs"
              breakClassName="w-10 h-10"
              breakLinkClassName="w-full h-full flex items-center justify-center text-white/40"
              activeClassName=""
              activeLinkClassName="!bg-accent-lime !text-ink-950 hover:!bg-accent-lime"
              disabledClassName="opacity-30 cursor-not-allowed"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index, autoPlay }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

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
    setCurrentImageIndex(
      (prev) => (prev - 1 + project.images.length) % project.images.length
    );
  };

  return (
    <motion.article
      className="group relative bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden hover:border-white/25 transition-colors duration-500"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.06 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image area */}
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-900">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={project.images[currentImageIndex]}
            alt={`${project.title} - ${currentImageIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: isHovered ? 1.06 : 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />

        {project.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-ink-950/60 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-ink-950/60 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition z-10"
              aria-label="Next image"
            >
              <ChevronRight size={16} />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {project.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentImageIndex
                      ? "bg-accent-lime w-6"
                      : "bg-white/30 w-1.5 hover:bg-white/60"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}

        <span className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink-950/70 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-widest2 text-white/80">
          <span className="w-1 h-1 rounded-full bg-accent-lime" />
          {project.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl font-bold text-white group-hover:text-accent-lime transition-colors duration-500">
            {project.title}
          </h3>
          {project.link && project.link !== "#" && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 mt-1 text-white/50 hover:text-accent-lime transition"
              aria-label={`Open ${project.title}`}
            >
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45 duration-500" />
            </a>
          )}
        </div>

        <p className="text-sm text-white/60 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="px-2.5 py-1 text-[10px] uppercase tracking-widest2 rounded-full bg-white/[0.04] border border-white/10 text-white/60"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-2">
          {project.link && project.link !== "#" ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-ink-950 text-xs uppercase tracking-widest2 hover:bg-accent-lime transition-colors duration-500"
            >
              <ExternalLink size={14} />
              Live
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white/40 text-xs uppercase tracking-widest2 border border-white/10 cursor-not-allowed">
              Offline
            </span>
          )}
          {project.github && project.github !== "#" && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition"
              aria-label="GitHub repo"
            >
              <Github size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default Projects;
