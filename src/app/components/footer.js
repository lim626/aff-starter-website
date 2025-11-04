"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";

export default function Footer() {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full  px-[10%] md:pt-32 pt-12 center pb-16 bg-[#7338B8]">
      <div className="md:grid grid-cols-2 md:justify-between gap-12 hidden">
        <div className="text-white flex flex-col">
            <p className="font-semibold text-4xl font-['regular']" style={{ fontFamily: 'Poppins, sans-serif' }}>CONTACT WITH US</p>
            <p className="mt-8 font-['regular'] text-[24px]"  style={{ fontFamily: 'Poppins, sans-serif' }}>
              Elevate Your Journey with Aff-Starter! Schedule a FREE Consultation
              and Discovery Session Today!
            </p>

            <a 
              href="https://t.me/AffStarter" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#6DE0F6] text-[24px] font-bold font-['regular'] hover:text-white cursor-pointer mt-4"  style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Telegram: @AffStarter
            </a>

            <a 
            href="https://wa.me/35679081137" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[18px] font-bold  hover:text-white cursor-pointer text-[#6DE0F6]  text-[24px]"  style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Phone: +35679081137
          </a>

            <a 
              href="mailto:lloyd@aff-starter.com" 
              className="text-[#6DE0F6] text-[24px] font-bold hover:text-white cursor-pointer" style={{ fontFamily: 'Poppins, sans-serif' }}>
            
              Email: lloyd&#64;aff-starter.com
            </a>

            
        </div>


        <div className="flex flex-col justify-end items-center">

          <div >
              <img
                src="./img/logo.png"
                width="300"
                height="85"
                alt="Logo"
                className="object-contain" onClick={() => router.push("/")}></img>
              <span className="text-4xl  text-white font-bold flex mt-8"  style={{ fontFamily: 'Poppins, sans-serif' }}>
                Need
                <p className="text-[#6DE0F6] ml-2 border-b border-b-[4px] pb-2 border-[#D0098D]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  support?
                </p>
              </span>

              <p className="text-white mt-4 text-xl text-start"  style={{ fontFamily: 'Poppins, sans-serif' }}>Let us know if you have a question.</p>
              <div className="mt-8">
                  <Button style={{ fontFamily: 'Poppins, sans-serif' }} className="bg-[#F14902] py-2 rounded-[30px] text-[30px] normal-case  font-normal flex justify-center items-center">
                  <a href="/contact" > Contact us</a>   
                </Button>
              </div>

          </div>
          
        </div>



      </div>
      <span className="text-[30px] flex justify-start items-center  text-white font-bold md:flex mt-16 hidden text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
      &#64;2024 Aff-Starter by
        <p className="text-[#6DE0F6] mx-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Lim, Sam, Nathan</p>
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
        <p className="font-bold text-[27px] text-white mt-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Contact Us</p>
        <p className=" text-[18px] text-[#59DEEB] mt-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Elevate Your Journey with Aff-Starter!
        </p>
        <span className=" text-[18px] text-white mt-4 text-center px-4 " style={{ fontFamily: 'Poppins, sans-serif' }}>
          Schedule a <span className="text-[#59DEEB]  " style={{ fontFamily: 'Poppins, sans-serif' }}>FREE</span> Consultation
          and Discovery Session Today!
        </span>
        <p className=" text-[18px] text-white mt-4" style={{ fontFamily: 'Poppins, sans-serif' }}>+35679081137</p>
        <p className=" text-[18px] text-white mt-4 font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>lloyd&#64;aff-starter.com</p>
    </div>
    </div>
  );
}
