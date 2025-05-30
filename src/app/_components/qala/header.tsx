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
      className={`fixed top-0 left-0 right-0 z-[1000] bg-white shadow-md px-[9%] py-4 flex items-center justify-between
        transition-transform duration-500 ease-in-out ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}
    >
      {/* Logo */}
      <a
        href="#"
        className="text-[2.3rem] text-main font-semibold flex items-center capitalize"
      >
        qala{" "}
        <IconRenderer
          lib="fa"
          name="FaCoffee"
          className="text-main ml-4 mt-2"
          size={35}
        />
      </a>

      {/* Navbar */}
      <Navbar />

      {/* Book Button */}

      {session?.user.name ? 
       <>
        <a onClick={session?.user?.role == "1" ? handleDashboard : handleLogout} className="relative hidden md:inline-block px-6 py-2 text-main group items-center cursor-pointer">
          <span className="absolute inset-0 border-2 border-main rounded transition-all duration-500 group-hover:border-dashed group-hover:scale-x-110">
            <IconRenderer
              lib="fa"
              name="FaRegUserCircle"
              size={20}
              className="h-9 ml-2"
            />
          </span>
          <span className="relative ml-4">
            {session?.user?.role == "1" ? "console" : `${session?.user?.name}`}
          </span>
        </a>
        </>
       : 
        <>
          <a
          href={'/auth/sign-in'}
          className="relative hidden md:inline-block px-6 py-2 text-main group cursor-pointer"
          >
          <span className="absolute inset-0 border-2 border-main rounded transition-all duration-500 group-hover:border-dashed group-hover:scale-x-110"></span>
          <span className="relative z-10">Sign In or Up</span>
          </a>
        </>
      }
    </header>
  );
};
