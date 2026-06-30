'use client'
import { useState, useEffect } from "react";
import { IconRenderer } from "../IconRenderer";
import Navbar from "./navbar";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export const Header = () => {
  const router = useRouter()
  const { data: session, status } = useSession();
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const handleLogout = async () => {
    if(window.confirm('Are you sure you want to log out ?.')){
      signOut({ callbackUrl: '/' })
    }
  }

  const handleDashboard = async () => {
    console.log('jalann')
    router.push('/admin/dashboard')
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false); // scroll down → hide
      } else {
        setShowHeader(true); // scroll up → show
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-500 ease-in-out ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between w-full">
        {/* Logo */}
        <a
          href="/"
          className="text-[2rem] md:text-[2.3rem] text-main font-bold flex items-center capitalize tracking-tight"
        >
          qala{" "}
          <IconRenderer
            lib="fa"
            name="FaCoffee"
            className="text-main ml-3"
            size={30}
          />
        </a>

        {/* Navbar */}
        <Navbar />

        {/* Action Button */}
        <div className="hidden md:flex items-center">
          {session?.user?.name ? 
          (
            <button onClick={session?.user?.role == "1" ? handleDashboard : handleLogout} className="flex items-center px-5 py-2.5 bg-gray-100 text-main font-medium rounded-xl hover:bg-gray-200 transition-colors">
              <IconRenderer
                  lib="fa"
                  name="FaRegUserCircle"
                  size={20}
                  className="mr-2"
                />
                {session?.user?.role == "1" ? "Console" : session?.user?.name}
            </button>
          ) : (
            <a
              href={'/auth/sign-in'}
              className="px-6 py-2.5 bg-main text-white font-medium rounded-xl hover:bg-[#82481f] transition-all shadow-md hover:shadow-lg active:scale-95"
              >
              Masuk / Daftar
            </a>
          )}
        </div>
      </div>
    </header>
  );
};
