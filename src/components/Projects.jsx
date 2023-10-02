import { ArrowRight } from "lucide-react";
import React from "react";
import crest from "../assets/crest.png";
import exchange from "../assets/Exchange.png";
import mysite from "../assets/mysite.png";
import resistor_color_code from "../assets/resistor_color_code.png";
import student_wall from "../assets/student_wall.png";

const Projects = () => {
  return (
    <>
      <div
        id="projects"
        className="text-white bg-slate-900 dark:bg-white dark:text-slate-900 flex flex-col justify-center w-full m-0 pt-10"
      >
        <h1 className="font-bold text-[25px] text-center">Projects</h1>
        <p className="text-center font-thin text-md">
          Check out some of my projects
        </p>
        <div className="flex text-slate-900 dark:text-slate-900 flex-row justify-evenly flex-wrap gap-5 pt-10 pb-10">

          <a href="https://github.com/AustinChris1/Crest-E-commerce-Website" target="_blank" className="w-80 p-4 bg-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <img
              className="w-full h-50 object-cover rounded-t-lg"
              alt="E-commerce"
              src={crest}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">Crest E-commerce</h2>
              <p className="text-gray-600">
                An E-commerce website that allows buying of goods (clothings)
                and accepts payment with NGN and USDT.
              </p>
              <div className="flex justify-between items-center mt-4">
                <button className="text-gray-900 rounded-lg hover:brightness-110 hover:animate-pulse bg-gradient-to-r from-[#1c4587] to-gray-200 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                  Learn More
                </button>
              </div>
            </div>
          </a>

          <a href="https://github.com/AustinChris1/Send-Crypto-Receive-NGN" target="_blank" className="w-80 p-4 bg-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <img
              className="w-full h-50 object-cover rounded-t-lg"
              alt="Exchange"
              src={exchange}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">Markov Exchange</h2>
              <p className="text-gray-600">
                A website that allows selling of cryptocurreny (USDT) to NGN.
              </p>
              <div className="flex justify-between items-center mt-4">
                <button className="text-gray-900 rounded-lg hover:brightness-110 hover:animate-pulse bg-gradient-to-r from-[#1c4587] to-gray-200 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                  Learn More
                </button>
              </div>
            </div>
          </a>

          <a href="https://github.com/AustinChris1/portfolio" target="_blank" className="w-80 p-4 bg-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <img
              className="w-full h-50 object-cover rounded-t-lg"
              alt="learning"
              src={mysite}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">Spectra Web-X</h2>
              <p className="text-gray-600">
                A website I used to master PHP and mySQL. It has features like
                Refferal system, Mining system, Chat system, Registration and
                login system, Admin dashboard for efficient control etc.
              </p>
              <div className="flex justify-between items-center mt-4">
                <button className="text-gray-900 rounded-lg hover:brightness-110 hover:animate-pulse bg-gradient-to-r from-[#1c4587] to-gray-200 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                  Learn More
                </button>
              </div>
            </div>
          </a>

          <a href="https://github.com/AustinChris1/Resistor-color-code-checker" target="_blank" className="w-80 p-4 bg-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <img
              className="w-full h-50 object-cover rounded-t-lg"
              alt="Resistor color code"
              src={resistor_color_code}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">Resistor color code checker</h2>
              <p className="text-gray-600">
                A C++ code that reads the value of a resistor after inputting
                the color.
              </p>
              <div className="flex justify-between items-center mt-4">
                <button className="text-gray-900 rounded-lg hover:brightness-110 hover:animate-pulse bg-gradient-to-r from-[#1c4587] to-gray-200 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                  Learn More
                </button>
              </div>
            </div>
          </a>

          <a href="https://7vjgk-cqaaa-aaaal-ackqq-cai.icp0.io/" target="_blank" className="w-80 p-4 bg-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <img
              className="w-full h-50 object-cover rounded-t-lg"
              alt="Motoko Student Wall"
              src={student_wall}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">Motoko Student Wall</h2>
              <p className="text-gray-600">
                A student wall built using Motoko of the Internet Computer
                Ecosystem for a Dapp contest.
              </p>
              <div className="flex justify-between items-center mt-4">
                <button className="text-gray-900 rounded-lg hover:brightness-110 hover:animate-pulse bg-gradient-to-r from-[#1c4587] to-gray-200 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                  Learn More
                </button>
              </div>
            </div>
          </a>
        </div>
        <a href="https://github.com/AustinChris1" target="_blank" className="flex mx-auto justify-center w-fit mb-10">
          <button className="w-50 h-12 flex gap-3 cursor-pointer text-white font-semibold bg-gradient-to-r from-gray-800 to-black px-7 py-3 rounded-full border border-gray-600 hover:scale-105 duration-200 hover:text-gray-500 hover:border-gray-800 hover:from-black hover:to-gray-900">
            <svg
              viewBox="0 0 24 24"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#FFFFFF"
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              ></path>
            </svg>
            View Github <ArrowRight />
          </button>
        </a>
      </div>
    </>
  );
};

export default Projects;
