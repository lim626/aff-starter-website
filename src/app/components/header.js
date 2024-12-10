"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";

export default function Header() {
  const router = useRouter();

  return (
    <div className="flex">
      <div className="flex w-full h-[130px] px-8 justify-between items-center  bg-[#0C0834]">
        <img
          src="./img/logo.png"
          width="200"
          height="73"
          alt="Logo"
          className="object-contain"></img>

        <div className="flex">
          <nav class="space-x-2 text-[1.3vw] flex items-center text-white">
            <a
              href="#"
              className="hover:bg-white hover:text-[#0C0834] px-3 py-4 rounded transition">
              Home
            </a>
            <a
              href="#"
              className="hover:bg-white hover:text-[#0C0834] px-3 py-4 rounded transition">
              Managed Services
            </a>
            <a
              href="/affilu"
              className="hover:bg-white hover:text-[#0C0834] px-3 py-4 rounded transition">
              Affilu by Aff-Starter
            </a>
            <a
              href="#"
              className="hover:bg-white hover:text-[#0C0834] px-3 py-4 rounded transition">
              QuestTracker
            </a>
            <a
              href="#"
              className="hover:bg-white hover:text-[#0C0834] px-3 py-4 rounded transition">
              Pricing
            </a>
            <a
              href="#"
              className="hover:bg-white hover:text-[#0C0834] px-3 py-4 rounded transition">
              Contact Us
            </a>
          </nav>
          <Button className="bg-[#D0098D] rounded-[30px] text-[25px] normal-case ml-4 font-normal flex">
            Schedule a Call
            <img src="./img/phone.png" width={25} className="ml-3 mt-2"></img>
          </Button>
        </div>
      </div>
    </div>
  );
}
