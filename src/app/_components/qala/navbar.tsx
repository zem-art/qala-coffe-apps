"use client"; // jika kamu pakai App Router (Next.js 13+)
import { useState } from "react";
import { IconRenderer } from "../IconRenderer";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isMenuPage = pathname === '/menu';

  const navLinks = [
    { href: "#home", label: "home" },
    { href: "#about", label: "about" },
    { href: "menu/list", label: "menu" },
    { href: "#review", label: "review" },
    { href: "#book", label: "book" },
  ];

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`md:hidden text-2xl p-2 transition-transform duration-300 ${
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
          isMenuOpen ? "flex shadow-xl pb-6 border-b border-gray-100" : "hidden"
        } md:flex flex-col md:flex-row md:items-center 
          gap-4 md:gap-8 absolute md:static top-full left-0 
          w-full md:w-auto bg-white/95 backdrop-blur-lg md:bg-transparent px-6 md:px-0 py-6 md:py-0 transition-all origin-top`}
      >
        {navLinks.map((link) => {
          const href = isMenuPage ? link.href : `/${link.href}`;
          return (
            <a
              key={link.href}
              href={href}
              className="text-base md:text-[1.1rem] font-medium text-gray-700 capitalize hover:text-main transition-colors text-center md:text-left"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          );
        })}
        {/* Mobile Action Button */}
        <a
          href={'/auth/sign-in'}
          className="md:hidden mt-4 px-6 py-3 bg-main text-white font-medium rounded-xl hover:bg-[#82481f] text-center shadow-md transition-all active:scale-95"
          onClick={() => setIsMenuOpen(false)}
        >
          Masuk / Daftar
        </a>
      </nav>
    </>
  );
}
