import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";

// Import images
import crest from "../assets/crest.png";
import exchange from "../assets/Exchange.png";
import mysite from "../assets/mysite.png";
import resistor_color_code from "../assets/resistor_color_code.png";
import student_wall from "../assets/student_wall.png";
import attendance from "../assets/attendance.png";
import firstdigit from "../assets/firstdigit.png";
import emergency from "../assets/emergency.png";
import firebase from "../assets/firebase.png";
import firstSmartMart1 from "../assets/firstSmartMart1.png";
import firstSmartMart2 from "../assets/firstSmartMart2.png";
import schoolFinder1 from "../assets/schoolFinder1.png";
import schoolFinder2 from "../assets/schoolFinder2.png";

// Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  hover: { scale: 1.05, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)", transition: { duration: 0.3 } },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

// Project Data
const projectsData = [
  { src: attendance, alt: "Attendance System", title: "Attendance System", description: "An RFID-based attendance system for tracking student or employee presence.", link: "https://face-access-1.web.app/" },
  { src: firstdigit, alt: "First Digit", title: "First Digit Website", description: "A website for First Digit Communications, focusing on helping you stay connected and lively in the modern world.", link: "https://www.firstdigit.com.ng/" },
  { src: emergency, alt: "Emergency Dashboard", title: "Emergency Dashboard", description: "A real-time emergency response dashboard for monitoring critical situations.", link: "https://github.com/AustinChris1/EmergencySystem" },
  { src: firebase, alt: "ESP32 Firebase Project", title: "ESP32 Firebase Integration", description: "An ESP32 project that listens to Firebase real-time updates to control lights and monitor room temperature and pressure with graphical representation.", link: "https://esp-test-43661.web.app/#" },
  { src: student_wall, alt: "Motoko Student Wall", title: "Motoko Student Wall", description: "A student forum built with Motoko for the Internet Computer ecosystem.", link: "https://7vjgk-cqaaa-aaaal-ackqq-cai.icp0.io/" },
  { src: crest, alt: "E-commerce", title: "Crest E-commerce", description: "An E-commerce website for buying clothes with payment options in NGN and USDT.", link: "https://github.com/AustinChris1/Crest-E-commerce-Website" },
  { src: exchange, alt: "Exchange", title: "Markov Exchange", description: "A platform for selling cryptocurrency (USDT) in exchange for NGN.", link: "https://github.com/AustinChris1/Send-Crypto-Receive-NGN" },
  { src: mysite, alt: "Portfolio Site", title: "Spectra Web-X", description: "A PHP and MySQL-based site with a referral system, mining, chat, and admin dashboard.", link: "https://github.com/AustinChris1/portfolio" },
  { src: resistor_color_code, alt: "Resistor Color Code Checker", title: "Resistor Color Code Checker", description: "A C++ program that determines a resistor's value based on its color bands.", link: "https://github.com/AustinChris1/Resistor-color-code-checker" },
];

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projectsData.slice(indexOfFirstProject, indexOfLastProject);

  const totalPages = Math.ceil(projectsData.length / projectsPerPage);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      id="projects"
      className="text-white bg-slate-900 dark:bg-white dark:text-slate-900 flex flex-col justify-center w-full pt-20 pb-10"
    >
      {/* Section Title */}
      <motion.h1 className="font-bold text-[30px] text-center mb-2">Projects</motion.h1>
      <motion.p className="text-center font-light text-lg mb-8">Check out some of my projects</motion.p>

      {/* Projects Grid */}
      <div className="flex flex-wrap justify-center gap-8 px-4">
        {currentProjects.map((project, index) => (
          <motion.a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-80 p-4 bg-white rounded-lg shadow-md"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <img className="w-full h-50 object-cover rounded-t-lg" alt={project.alt} src={project.src} />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <motion.button
                className="text-gray-900 rounded-full bg-gradient-to-r from-blue-600 to-blue-200 px-4 py-2 font-medium"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Learn More
              </motion.button>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 gap-4">
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-lg font-semibold">Page {currentPage} of {totalPages}</span>
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default Projects;
