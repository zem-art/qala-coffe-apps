'use client'
import { useState } from "react";
import { IconRenderer } from "./IconRenderer";
import Navbar from "./navbar";

export const Header = () => {

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-white shadow-md px-[9%] py-4 flex items-center justify-between">

      {/* Logo */}
      <a
        href="#"
        className="text-[2.3rem] text-main font-semibold flex items-center "
      >
        qala <IconRenderer lib="fa" name="FaCoffee" className="text-main ml-4 mt-2" size={35}/>
      </a>

      {/* Navbar */}
      <Navbar />

      {/* Book Button */}
      <a
        href="#"
        className="relative hidden md:inline-block px-6 py-2 text-main group"
      >
        <span
          className="absolute inset-0 border-2 border-main rounded transition-all duration-500 group-hover:border-dashed group-hover:scale-x-110"
        ></span>
        <span className="relative z-10">Book A Table</span>
      </a>
    </header>
  );
};
