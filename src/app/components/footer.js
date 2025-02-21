"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";

export default function Footer() {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full  px-[10%] md:pt-32 pt-12 center pb-16 bg-[#0C0834]">
      <div className="md:grid grid-cols-3 gap-12 hidden">
        <div className="flex flex-col">
          <img
            src="./img/logo.png"
            width="180"
            height="85"
            alt="Logo"
            className="object-contain" onClick={() => router.push("/")}></img>
          <span className="text-4xl  text-white font-bold flex mt-8">
            Need
            <p className="text-[#6DE0F6] ml-2 border-b border-b-[4px] pb-2 border-[#D0098D]">
              support?
            </p>
          </span>

          <p className="text-white mt-4">Let us know if you have a question.</p>
          <div className="mt-8">
              <Button className="bg-[#D0098D] py-2 rounded-[30px] text-[20px] normal-case  font-normal flex justify-center items-center">
              <a href="/contact" > Contact us</a>   
            </Button>
          </div>
        </div>

        {/* <div className="text-white">
          <p className="font-semibold text-2xl">LOCATION</p>
          <p className="mt-8">Aff-Starter</p>
          <p className="mt-2">Address Line1</p>
          <p className="mt-2">Address Line2</p>
          <p className="mt-2">Address Line3</p>
          <p className="mt-2">Monday - Saturday:8AM - 4PM</p>
        </div> */}

        <div className="text-white flex flex-col">
          <p className="font-semibold text-2xl">CONTACT WITH US</p>
          <p className="mt-8">
            Eleate Your Journey with Aff-Starter! Schedule a FREE Consultation
            and Discovery Session Today!
          </p>
          <a 
          href="https://wa.me/35679081137" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[18px] mt-4  hover:text-white cursor-pointer text-[#6DE0F6]"
        >
          Phone: +35679081137
        </a>

          <a 
            href="mailto:lloyd@aff-starter.com" 
            className="text-[#6DE0F6] text-[18px] font-bold font-['regular'] hover:text-white cursor-pointer"
          >
            Email: lloyd@aff-starter.com
          </a>
        </div>
      </div>
      <span className="text-[22px]  text-gray-300 font-bold md:flex mt-16 hidden font-['regular'] text-center">
        @2024 Aff-Starter by
        <p className="text-[#6DE0F6] mx-2">Lim, Sam, Nathan</p>
      </span>

      <div className="md:hidden flex flex-col items-center">
        <img
          src="./img/logo.png"
          width="180"
          height="85"
          alt="Logo"
          className="object-contain"></img>
        {/* <p className="font-bold text-[27px] text-white mt-8">Location</p>
        <p className=" text-[18px] text-white mt-4">Address line</p>
        <p className=" text-[18px] text-white ">Address line</p>
        <p className=" text-[18px] text-white ">Address line</p> */}
        <p className="font-bold text-[27px] text-white mt-4">Contact Us</p>
        <p className=" text-[18px] text-[#59DEEB] mt-4">
          Elevate Your Journey with Aff-Starter!
        </p>
        <span className=" text-[18px] text-white mt-4 text-center px-4 ">
          Schedule a <span className="text-[#59DEEB]  ">FREE</span> Consultation
          and Discovery Session Today!
        </span>
        <p className=" text-[18px] text-white mt-4">+35679081137</p>
        <p className=" text-[18px] text-white mt-4">lloyd@aff-starter.com</p>
      </div>
    </div>
  );
}
