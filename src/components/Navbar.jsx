import React, { useState, useEffect } from "react";
import logo from "../assets/avatar.png";
import { XMarkIcon, Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "Projects", path: "projects" },
    { name: "Contact", path: "contact" },
];

const Navbar = () => {
    const [toggle, setToggle] = useState(false);

    // Smooth scrolling function
    const handleScroll = (id) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 70, // Adjusted for navbar height
                behavior: "smooth",
            });
        }
        setToggle(false); // Close menu on mobile after selection
    };

    return (
        <nav className="fixed z-50 w-full bg-white dark:bg-slate-900 shadow-md">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <motion.img
                    src={logo}
                    alt="Avatar"
                    className="rounded-full w-[60px] h-[60px] transition-transform duration-300 hover:scale-110"
                />
                <ul className="list-none sm:flex hidden items-center space-x-8">
                    {navLinks.map((nav) => (
                        <motion.li
                            key={nav.name}
                            className="font-medium cursor-pointer text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 relative group"
                            onClick={() => handleScroll(nav.path)}
                        >
                            {nav.name}
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                        </motion.li>
                    ))}
                    <li>
                        <a href="https://resume.io/r/l605UVqBi" className="inline-block">
                            <motion.button
                                className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-full hover:shadow-lg transition-transform duration-300 hover:scale-105"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Resume <ArrowRight className="ml-2" />
                            </motion.button>
                        </a>
                    </li>
                </ul>
                <div className="sm:hidden flex items-center">
                    <button onClick={() => setToggle((prev) => !prev)}>
                        {toggle ? (
                            <XMarkIcon className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                        ) : (
                            <Bars3BottomRightIcon className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                        )}
                    </button>
                    <AnimatePresence>
                        {toggle && (
                            <motion.div
                                className="absolute top-20 right-4 bg-slate-900 rounded-lg shadow-lg p-4"
                                initial={{ opacity: 0, x: "100%" }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: "100%" }}
                                transition={{ duration: 0.3 }}
                            >
                                <ul className="list-none flex flex-col items-center space-y-4">
                                    {navLinks.map((nav) => (
                                        <motion.li
                                            key={nav.name}
                                            className="font-medium cursor-pointer text-gray-200 hover:text-blue-400"
                                            onClick={() => handleScroll(nav.path)}
                                        >
                                            {nav.name}
                                        </motion.li>
                                    ))}
                                    <li>
                                        <a href="https://resume.io/r/l605UVqBi" className="inline-block">
                                            <motion.button
                                                className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-full hover:shadow-lg transition-transform duration-300 hover:scale-105"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Resume <ArrowRight className="ml-2" />
                                            </motion.button>
                                        </a>
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
