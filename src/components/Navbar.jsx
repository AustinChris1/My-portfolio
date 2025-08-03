import React, { useState, useEffect } from "react";
import {X, Menu, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/avatar.png";

const navLinks = [
    { name: "Projects", path: "projects" },
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
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const menuVariants = {
        closed: {
            opacity: 0,
            scale: 0.8,
            y: -20,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        },
        open: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: [0.68, -0.55, 0.265, 1.55],
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        closed: {
            opacity: 0,
            x: 30,
            transition: {
                duration: 0.2
            }
        },
        open: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };

    const overlayVariants = {
        closed: {
            opacity: 0,
            transition: {
                duration: 0.3
            }
        },
        open: {
            opacity: 1,
            transition: {
                duration: 0.3
            }
        }
    };

    const hamburgerVariants = {
        closed: {
            rotate: 0,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        },
        open: {
            rotate: 180,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    return (
        <>
            <nav className={`fixed z-50 w-full transition-all duration-500 ${
                isScrolled 
                    ? "bg-white/80 dark:bg-gray-900/80 py-2 shadow-lg backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-700/20" 
                    : "py-4 bg-transparent"
            }`}>
                <div className="container mx-auto px-4 flex items-center justify-between">
                    {/* Logo */}
                    <motion.img
                    src={logo}
                    alt="Avatar"
                    className="rounded-full w-[50px] h-[50px] transition-transform duration-300 hover:scale-110"
                />

                    {/* Desktop Menu */}
                    <ul className="hidden sm:flex items-center space-x-8">
                        {navLinks.map((nav) => (
                            <motion.li
                                key={nav.name}
                                className="font-medium cursor-pointer text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 relative group transition-colors duration-300"
                                onClick={() => scrollToSection(nav.path)}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {nav.name}
                                <motion.span 
                                    className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600 to-purple-600 origin-left"
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.li>
                        ))}
                        <li>
                            <motion.button
                                className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2.5 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10 flex items-center">
                                    Resume <ArrowRight className="ml-2 w-4 h-4" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </motion.button>
                        </li>
                    </ul>
                    
                    {/* Mobile Menu Button */}
                    <div className="sm:hidden flex items-center">
                        <motion.button 
                            onClick={() => setToggle(!toggle)} 
                            aria-label="Toggle Menu"
                            className="relative z-50 p-2 rounded-full bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-colors duration-300"
                            variants={hamburgerVariants}
                            animate={toggle ? "open" : "closed"}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <AnimatePresence mode="wait">
                                {toggle ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {toggle && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 sm:hidden"
                            variants={overlayVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            onClick={() => setToggle(false)}
                        />
                        
                        <motion.div
                            className="fixed top-20 right-4 left-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/20 dark:border-gray-700/20 z-40 sm:hidden overflow-hidden"
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600"></div>
                            
                            <div className="p-6">
                                <motion.ul 
                                    className="flex flex-col space-y-4"
                                    variants={menuVariants}
                                    initial="closed"
                                    animate="open"
                                >
                                    {navLinks.map((nav, index) => (
                                        <motion.li
                                            key={nav.name}
                                            variants={itemVariants}
                                            className="group"
                                        >
                                            <motion.div
                                                className="font-medium cursor-pointer text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-3 px-4 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-300 flex items-center justify-between"
                                                onClick={() => scrollToSection(nav.path)}
                                                whileHover={{ x: 8, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <span className="text-lg">{nav.name}</span>
                                                <motion.div
                                                    className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    whileHover={{ rotate: 90 }}
                                                >
                                                    <ArrowRight className="w-3 h-3 text-white" />
                                                </motion.div>
                                            </motion.div>
                                        </motion.li>
                                    ))}
                                    
                                    <motion.li variants={itemVariants} className="pt-4">
                                        <motion.button
                                            className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setToggle(false)}
                                        >
                                            <span className="relative z-10 flex items-center text-lg">
                                                View Resume <ArrowRight className="ml-2 w-5 h-5" />
                                            </span>
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                                                initial={{ x: "-100%" }}
                                                whileHover={{ x: 0 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </motion.button>
                                    </motion.li>
                                </motion.ul>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;