"use client"; // jika kamu pakai App Router (Next.js 13+)

import { useState } from "react";
import { IconRenderer } from "./IconRenderer";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#home", label: "home" },
    { href: "#about", label: "about" },
    { href: "#menu", label: "menu" },
    { href: "#review", label: "review" },
    { href: "#book", label: "book" },
  ];

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`md:hidden text-3xl p-2 transition-transform duration-300 ${
          isMenuOpen ? "rotate-90" : ""
        }`}
        aria-label="Toggle Menu"
      >
        {isMenuOpen ? (
          <IconRenderer lib="fa" name="FaTimes" className="text-main" />
        ) : (
          <IconRenderer lib="fa" name="FaBars" className="text-main" />
        )}
      </button>

      <nav
        id="navbar"
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row md:items-center 
          md:space-x-4 absolute md:static top-full left-0 
          w-full md:w-auto bg-background md:bg-transparent shadow-md md:shadow-none mt-0 md:mt-0 px-6 md:px-0 py-4 md:py-0 
          ${isMenuOpen ? "scale-y-100" : "scale-y-0"} md:scale-y-100`
        }
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-[1.4rem] text-main capitalize hover:text-accent transition duration-300 text-center md:text-left md:mr-8 md-mt-2"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </>
  );
}
