import React from "react";
import { Twitter, Github, Linkedin } from "lucide-react";
const Contact = () => {
  return (
    <div
      id="contact"
      className="text-slate-900 dark:bg-slate-900 dark:text-white pt-10 m-0 flex flex-col justify-center w-full h-full"
    >
      <h1 className="font-bold text-[25px] text-center">Contact</h1>

      <a href="mailto:austinchrisiwu@gmail.com" className="text-center w-fit mx-auto p-6">
        austinchrisiwu@gmail.com
      </a>
      <div className="flex flex-row justify-center gap-10 pb-10">
        <a href="https://x.com/AustinChris_">
          <Twitter className="w-8 h-8 text-slate-900 dark:text-white hover:text-gray-500" />
        </a>{" "}
        <a href="https://github.com/AustinChris1">
          <Github className="w-8 h-8 text-slate-900 dark:text-white hover:text-gray-500" />
        </a>
        <a href="https://linkedin.com/in/austin-chris-ba4473227">
          <Linkedin className="w-8 h-8 text-slate-900 dark:text-white hover:text-gray-500" />
        </a>
      </div>
    </div>
  );
};

export default Contact;
