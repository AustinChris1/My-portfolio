import React from "react";
import logo from "../assets/avatar.png";
import { motion } from "framer-motion";

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1, staggerChildren: 0.2 } },
    };

    const imageVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } },
    };

    const textVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } },
    };

    const buttonVariants = {
        hover: { scale: 1.05, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", transition: { duration: 0.3 } },
        tap: { scale: 0.95 },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-slate-900 dark:bg-slate-900 dark:text-white pt-20 flex flex-col items-center justify-center w-full h-full"
        >
            <motion.img
                src={logo}
                alt="Austin"
                loading="lazy"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-lg"
                variants={imageVariants}
                whileHover={{
                    scale: 1.2,
                    rotate: [0, 5, -5, 0],
                    boxShadow: "0px 0px 20px rgba(0, 162, 255, 0.8)",
                    transition: { duration: 0.5, ease: "easeInOut" }
                }}
                whileTap={{ scale: 0.95 }}
            />

            <motion.div className="text-center mt-6 space-y-4">
                <motion.p className="text-lg md:text-xl font-semibold flex items-center justify-center gap-1" variants={textVariants}>
                    Hi
                    <motion.span 
                        className="inline-block" 
                        animate={{ rotate: [0, 20, 0, -20, 0] }} 
                        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    >
                        👋🏼
                    </motion.span>
                    , I'm Austin-Chris
                </motion.p>

                <motion.h1 className="text-3xl md:text-5xl font-bold leading-tight" variants={textVariants}>
                    Full-Stack Developer & Embedded Systems Engineer
                </motion.h1>

                <motion.p className="text-base md:text-lg font-light max-w-2xl mx-auto px-4" variants={textVariants}>
                    I design and build dynamic web applications, powerful APIs, and embedded systems that bridge the gap between software and hardware.
                </motion.p>
            </motion.div>

            <a href="https://x.com/AustinChris_" target="_blank" rel="noopener noreferrer" className="mt-6">
                <motion.button
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-200 text-white text-lg font-medium shadow-md hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    Connect with me
                </motion.button>
            </a>

            <motion.hr className="w-3/4 border-t border-gray-300 mt-12" variants={textVariants} />
        </motion.div>
    );
};

export default Hero;
