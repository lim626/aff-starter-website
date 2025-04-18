"use client";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
  Menu,
  MenuList,
  MenuHandler,
  MenuItem,
} from "@material-tailwind/react";

import { Bars3Icon } from "@heroicons/react/24/outline";
export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navbarHeight = 120; // Set your navbar height here
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    // window.addEventListener(
    //   "resize",
    //   () => window.innerWidth >= 960 && setOpenNav(false)
    // );
  }, []);

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;
      if (currentScrollY > navbarHeight) {
        setIsVisible(false); // Hide navbar on scroll down
      } else {
        setIsVisible(true); // Show navbar on scroll up
      }

      setLastScrollY(currentScrollY);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <Navbar
      style={{ zIndex: 100, boxShadow: "0 2px 20px rgba(255,255,255,0.7)" }}
      className={` border-0 top-0 p-0 w-full left-0 w-full transition-transform duration-1000 ${
        isVisible ? "translate-y-0 " : `-translate-y-[${navbarHeight}px] fixed`
      } shadow`}
      // Ensure the navbar has a set height
    >
      <div
        className={`flex w-full ${
          isVisible ? "lg:h-[110px] h-[60px]" : "h-[60px]"
        }  px-8 justify-between items-center  bg-[#0C0834]`}>
        <img
          src="./img/logo.png"
          width="120"
          height="63"
          alt="Logo"
          className="object-contain" onClick={() => router.push('/')}></img>

        <div className="flex hidden lg:flex">
          <nav class=" text-[1.3vw] flex items-center text-white">
            <a
              href="/"
              className="hover:bg-white hover:text-[#0C0834] px-[10px] py-2 rounded transition">
              Home
            </a>
            {/* {pathname === "/" && (
              <a
                href="#managed-services"
                className="hover:bg-white hover:text-[#0C0834] px-[10px] py-2 rounded transition">
                Managed Services
              </a>
            )} */}
            <a
              href="/service"
              className="hover:bg-white hover:text-[#0C0834] px-[10px] py-2 rounded transition">
              Managed Services
            </a>
            {/* {pathname === "/" && (
              <a
                href="#quest-tracker"
                className="hover:bg-white hover:text-[#0C0834] px-[10px] py-2 rounded transition">
                QuestTracker
              </a>
            )} */}
            <a
              href="/pricing"
              className="hover:bg-white hover:text-[#0C0834] px-[10px] py-2 rounded transition">
              Pricing
            </a>
            <a
              href="/simulation"
              className="hover:bg-white hover:text-[#0C0834] px-[10px] py-2 rounded transition">
              Simulation Tool
            </a>
            <a
              href="/contact"
              className="hover:bg-white hover:text-[#0C0834] px-[10px] py-2 rounded transition">
              Contact Us
            </a>
          </nav>
          <div className="flex items-center py-8">
            {" "}
            <Button className="bg-[#D0098D] rounded-[30px] text-[20px] normal-case ml-4 font-normal flex ">
              <a href="https://calendar.app.google/9RhX95NA3kyXy2F46" target="_blank"> Schedule a Call</a>
             
              <img src="./img/phone.png" width={20} className="ml-3 mt-1"></img>
            </Button>
          </div>
        </div>
        <Menu placement="bottom-end">
          <MenuHandler>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}>
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </MenuHandler>
          <MenuList>
            <MenuItem className="hover:bg-[#0C0834] hover:text-white">
              <a href="/">Home</a>
            </MenuItem>
            {/* <MenuItem className="hover:bg-[#0C0834] hover:text-white">
              <a href="#managed-services">Managed Services</a>
            </MenuItem> */}
            <MenuItem className="hover:bg-[#0C0834] hover:text-white">
              <a href="/service">Managed Services</a>
            </MenuItem>
            {/* <MenuItem className="hover:bg-[#0C0834] hover:text-white">
              <a href="#quest-tracker">QuestTracker</a>
            </MenuItem> */}
            <MenuItem className="hover:bg-[#0C0834] hover:text-white">
              <a href="/pricing">Pricing</a>
            </MenuItem>
            <MenuItem className="hover:bg-[#0C0834] hover:text-white">
              <a href="/simulation">Simulation Tool</a>
            </MenuItem>
            <MenuItem className="hover:bg-[#0C0834] hover:text-white">
             <a href="https://calendar.app.google/9RhX95NA3kyXy2F46">Schedule a call</a> 
            </MenuItem>
            <MenuItem className="hover:bg-[#0C0834] hover:text-white">
              <a href="/contact">Contact US</a>
            </MenuItem>

            
          </MenuList>
        </Menu>

      </div>
    </Navbar>
  );
}
