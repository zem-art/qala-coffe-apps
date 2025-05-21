'use client'
import { useState } from "react";
import { IconRenderer } from "./IconRenderer";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-white shadow-md px-[9%] py-8 flex items-center justify-between">
      {/* Menu button (mobile) */}
      <div
        id="menu-btn"
        className="fas fa-bars text-[3rem] text-main cursor-pointer block md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <IconRenderer lib="fa" name="FaBars" className="text-main" />
      </div>

      {/* Logo */}
      <a
        href="#"
        className="text-[2.3rem] text-main font-semibold flex items-center"
      >
        coffee <IconRenderer lib="fa" name="FaCoffee" className="text-primary ml-2" />
      </a>

      {/* Navbar */}
      <nav
        id="navbar"
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row md:items-center md:space-x-4 absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none mt-4 md:mt-0 px-6 md:px-0 py-4 md:py-0`}
      >
        <a href="#home" className="text-[1.7rem] text-main mb-2 md:mb-0">
          home
        </a>
      </nav>

      {/* Book Button */}
      <a
        href="#"
        className="hidden md:inline-block bg-red px-6 py-2 rounded hover:opacity-90 transition"
      >
        button
      </a>
    </header>
  );
};
