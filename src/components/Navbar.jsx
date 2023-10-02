import React from "react";
import { useState } from "react";
import logo from "../assets/avatar.png";
import { XMarkIcon, Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import { ArrowRight } from "lucide-react";
const navLinks = [
  {
    name: "Projects",
    path: "projects",
    type: "link",
  },
  {
    name: "Contact",
    path: "contact",
    type: "link",
  },
];

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="navbar fixed z-50 items-center text-slate-900 bg-white dark:bg-slate-900 dark:text-white justify-center flex w-full m-0 mt-0">
      <img src={logo} alt="Avatar" className="rounded-full w-[80px] h-[80px]" />
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.name}
            className={`font-poppins font-normal cursor-pointer text-[16-px] ${
              index === navLinks.length - 1 ? "mr-0" : "mr-10"
            } text-white`}
          >
            <a href={`#${nav.path}`}>{nav.name}</a>
          </li>
        ))}
        <li className=" font-normal cursor-pointer text-[16-px] ml-10 mr-10">
          <a href="" className="mx-auto inline-block items-center ">
            <button className="flex flex-row justify-evenly text-gray-900 rounded-lg hover:brightness-110 hover:animate-pulse bg-gradient-to-r from-[#1c4587] w-28 h-8 mx-auto inline-block items-center text-sm rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              Resume <ArrowRight />
            </button>
          </a>
        </li>
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        {toggle ? (
          <button onClick={() => setToggle((prev) => !prev)}>
            <XMarkIcon className="w-8 h-8 text-slate-900 dark:text-white hover:text-gray-500" />
          </button>
        ) : (
          <button onClick={() => setToggle((prev) => !prev)}>
            <Bars3BottomRightIcon className="w-8 h-8 text-slate-900 dark:text-white  hover:text-gray-500" />
          </button>
        )}
        <div
          className={`${
            toggle ? "flex" : "hidden"
          } p-6 bg-slate-900 absolute top-20 right-0 mx-4 my-2 min-w[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex flex-col justify-end items-center flex-1">
            {navLinks.map((nav, index) => (
              <li
                key={nav.name}
                className={`font-poppins font-normal cursor-pointer text-[16-px] ${
                  index === navLinks.length - 1 ? "mb-0" : "mb-4"
                } text-white`}
              >
                <a href={`#${nav.path}`}>{nav.name}</a>
              </li>
            ))}
            <li className=" font-normal cursor-pointer text-[16-px] mt-5 mb-5">
              <a href="" className="mx-auto inline-block items-center"></a>
              <button className="flex flex-row justify-evenly text-gray-900 rounded-lg hover:brightness-110 hover:animate-pulse bg-gradient-to-r from-[#1c4587] w-28 h-8 mx-auto inline-block items-center text-sm rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                Resume <ArrowRight />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
