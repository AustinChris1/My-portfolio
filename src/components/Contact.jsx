import React from "react";
import { motion } from "framer-motion";
import { Twitter, Github, Linkedin } from "lucide-react";

const Contact = () => {
  return (
    <motion.div
      id="contact"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
      className="text-slate-900 dark:bg-slate-900 dark:text-white pt-10 flex flex-col items-center justify-center w-full h-full"
    >
      <motion.h1
        className="font-bold text-[25px] text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } }}
      >
        Contact
      </motion.h1>

      <motion.a
        href="mailto:austinchrisiwu@gmail.com"
        className="text-center w-fit mx-auto p-6"
        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      >
        austinchrisiwu@gmail.com
      </motion.a>

      <motion.div className="flex flex-row justify-center gap-10 pb-10">
        {[ 
          { href: "https://x.com/AustinChris_", icon: <Twitter />, delay: 0.2 },
          { href: "https://github.com/AustinChris1", icon: <Github />, delay: 0.4 },
          { href: "https://linkedin.com/in/austinchris1", icon: <Linkedin />, delay: 0.6 }
        ].map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: item.delay } }}
            whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
          >
            <motion.div className="w-8 h-8 text-slate-900 dark:text-white hover:text-gray-500">
              {item.icon}
            </motion.div>
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Contact;
