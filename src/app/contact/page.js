"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Carousel, IconButton } from "@material-tailwind/react";
import Footer from "../components/footer";

export default function Contact() {
  return (
    <main className="flex w-full flex-col min-h-screen">
      <div className="relative h-[600px] sm:h-[700px] md:h-[800px] w-full">
        <Image
          src="/img/contact/m-bg.png"
          alt="iGaming Business Background Mobile"
          width={1920}
          height={1080}
          className="w-full h-full brightness-110 md:hidden"
          priority
        />
        <Image
          src="/img/contact/bg.png"
          alt="iGaming Business Background Desktop"
          width={1920}
          height={1080}
          className="w-full h-full brightness-110 hidden md:block"
          priority
        />
        <div className="absolute inset-0 ">
          <div className="container mx-auto px-4 h-full flex flex-col md:justify-center mt-16 md:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}

              className="max-w-2xl text-left md:text-left text-center mx-auto md:mx-0"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Let's Take Your iGaming Business to the Next Level
              </h1>
              <p className="text-[22px] md:text-2xl text-white mb-8 mt-16 md:my-16">
                Get in touch with our expert team to discuss how we can help you achieve your goals.
              </p>
              <div className="flex justify-center md:justify-start">


                <Button size="lg" className="rounded-full text-black bg-white mt-16 md:mt-0">
                  Schedule a Free Consultation
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-4xl  font-bold max-w-4xl mx-auto">
              At Aff-Starter, we're passionate about supporting iGaming brands like yours. Whether you need affiliate management, CRM solutions, or social media expertise, our team is here to help.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:px-[10%] px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-cyan-400 rounded-3xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-2">Lloyd Slade</h3>
              <p className="text-lg font-semibold mb-2">CEO / CMO</p>
              <a href="mailto:lloyd@aff-starter.com" className="text-blue-900 hover:text-blue-700">
                lloyd@aff-starter.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-purple-500 rounded-3xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-2 text-white">Anna Maria Pistika</h3>
              <p className="text-lg font-semibold mb-2 text-white">Casino Operations Director</p>
              <a href="mailto:anna@aff-starter.com" className="text-blue-100 hover:text-blue-200">
                anna@aff-starter.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-purple-500 rounded-3xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-2 text-white">Emma Slade</h3>
              <p className="text-lg font-semibold mb-2 text-white">Projects Director</p>
              <a href="mailto:emma@aff-starter.com" className="text-blue-100 hover:text-blue-200">
                emma@aff-starter.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-cyan-400 rounded-3xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-2">Stavros Dafnomilis</h3>
              <p className="text-lg font-semibold mb-2">Director of Casino Management</p>
              <a href="mailto:stavros@aff-starter.com" className="text-blue-900 hover:text-blue-700">
                stavros@aff-starter.com
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative  px-4  contact md:py-32 pt-64 pb-12"  style={{
          // backgroundImage: "url('/img/pricing/services.png')",
          backgroundSize: "100% 100%",
          paddingTop: "10.25%",
        }}>

      
       
          <div className="container mx-auto max-w-2xl relative z-10 px-4 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-8 shadow-xl"
            >
              <h2 className="text-3xl font-bold text-center mb-8">Schedule a Consultation</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input 
                    type="text" 
                    label="Name" 
                    className="!border-t-blue-gray-200 focus:!border-cyan-400 focus:!border-t-0 focus:!outline-none"
                    labelProps={{
                      className: "!text-blue-gray-400"
                    }}
                  />
                  
                  <Input 
                    type="email" 
                    label="Email" 
                    className="!border-t-blue-gray-200 focus:!border-cyan-400 focus:!border-t-0 focus:!outline-none"
                    labelProps={{
                      className: "!text-blue-gray-400"
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input 
                    type="text" 
                    label="Company Name"
                    className="!border-t-blue-gray-200 focus:!border-cyan-400 focus:!border-t-0 focus:!outline-none"
                    labelProps={{
                      className: "!text-blue-gray-400"
                    }}
                  />
                  
                  <select className="w-full h-10 border-b border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-cyan-400 focus:outline-0">
                    <option value="" disabled selected>Service</option>
                    <option value="affiliate">Affiliate Management</option>
                    <option value="crm">CRM Solutions</option>
                    <option value="social">Social Media</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <textarea 
                  placeholder="Message"
                  rows="4"
                  className="w-full border-b border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-cyan-400 focus:outline-0 resize-none"
                ></textarea>

                <div className="flex justify-center">
                  <Button 
                    className="rounded-full bg-cyan-400 px-8"
                    size="lg"
                  >
                    Send
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>


      <div className="">
        <Footer></Footer>
      </div>
    </main>
  );
}
