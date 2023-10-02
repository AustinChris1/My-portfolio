import React from "react";
import me from "../assets/me.jpeg";
const Hero = () => {
  return (
    <>
      <div className="text-slate-900 dark:bg-slate-900 dark:text-white pt-20 flex flex-col justify-center w-full m-0 h-full">
        <img
          src={me}
          alt="Austin"
          className="md:w-40 mt-5 md:h-48 rounded-lg mx-auto w-40 h-48"
        />
        <div className="text-center">
          <p className="text-[20px] font-medium pt-5">Hi👋🏼, I'm Austin-Chris</p>
          <p className="text-[40px] font-medium font pt-5">
            Building websites and all sorts of cool stuff
          </p>
          <p className="text-[20px] font-thin pt-10">
            I'm a software engineer based in Nigeria. I specialize in building
            (and occasionally designing) exceptional digital experiences.
            Currently, I'm focused on building accessible, human-centered
            products on the Internet Computer.
          </p>
        </div>
        <a href="https://x.com/AustinChris_" target="_blank" className="mx-auto">
        <button className="m-10 w-48 h-12 mx-auto inline-block items-center text-sm text-gray-900 rounded-lg hover:brightness-110 hover:animate-pulse bg-gradient-to-r from-[#1c4587] to-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200">
          Connect with me
        </button>
        </a>
      </div>
        <hr className="font-bold text-[20px]"/>
    </>
  );
};

export default Hero;
