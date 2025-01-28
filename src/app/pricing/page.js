"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Carousel, IconButton } from "@material-tailwind/react";
import Footer from "../components/footer";

export default function Home() {
  return (
    <main className="flex w-full flex-col min-h-screen ">
      <div
        className="hidden md:flex flex-col items-center justify-center w-full bg-top bg-no-repeat relative"
        style={{
          backgroundImage: "url('/img/pricing/bg-plan.png')",
          backgroundSize: "100% 100%",
          paddingTop: "56.25%", // For a 16:9 aspect ratio. Adjust this value based on your image's aspect ratio
        }}>
        <div className="absolute inset-0 flex flex-col items-end justify-center w-full">
          <p className="text-white md:text-6xl text-4xl font-bold md:w-[50%] md:pr-10">
            Flexible plans tailored to meet the needs of your iGaming brand.
          </p>
          <p className="text-white md:text-3xl text-xl md:w-[50%] mt-10 md:pr-10 px-4">
            At Aff-Starter, we offer comprehensive affiliate, CRM, and social
            media management solutions designed to deliver results. Whether
            you're a start-up or an established casino, our transparent pricing
            structure ensures you only pay for what you need.
          </p>
        </div>
      </div>

      <div className="md:hidden flex flex-col items-center bg-cover justify-center  w-full bg-top bg-no-repeat relative">
        <img src="/img/pricing/m-plan.png" className="w-full " />
          <div className="mt-16 text-center absolute top-0 left-0 z-10">
            <p className="text-white  text-2xl font-bold px-4">
              Flexible plans tailored to meet the needs of your iGaming brand.
            </p>
            <p className="text-white md:text-3xl text-[16px] md:w-[50%] mt-10 md:pr-10 px-8">
              At Aff-Starter, we offer comprehensive affiliate, CRM, and social
              media management solutions designed to deliver results. Whether
              you're a start-up or an established casino, our transparent pricing
              structure ensures you only pay for what you need.
            </p>
          </div>
        </div>


      <div className="flex flex-col items-center text-center px-4 my-10 w-full md:px-[15%]">
        <p className="md:text-6xl text-3xl font-bold text-black">
          Affiliate Management Pricing
        </p>
        <p className="text-xl md:text-3xl  text-black text-center md:mt-10 px-2 md:px-0 mt-4">
          We provide expert affiliate management services to help you drive
          high-quality traffic and conversions. Choose from flexible plans to
          match your business size and goals:
        </p>
        <div
          className="md:grid hidden grid-cols-4 gap-4 w-full mt-10"
          // style={{
          //   backgroundImage: "url('/img/pricing/affiliate.png')",
          //   backgroundSize: "cover",
          //   backgroundOrigin: "border-box",
          //   backgroundClip: "border-box",
          // }}
        >
          <div
            className="flex flex-col items-center  py-[50px] px-[20px]  bg-cover bg-center bg-no-repeat relative"
            style={{
              backgroundImage: "url('/img/pricing/pricing1.png')",
              backgroundSize: "100% 100%",
            }}>
            <p className="text-black text-3xl font-bold">Pay-as-You-Go</p>
            <p className="text-black text-center text-[14px] mt-4">
              No long-term commitment—ideal for flexibility.
            </p>

            <img
              src="./img/curve.png"
              className="my-2"
              width="80%"
              style={{
                zIndex: 1,
              }}></img>

            <p className="text-black text-center text-[14px] mt-4 px-2 underline">
              Full affiliate management Deal negotiation Retention optimisation
            </p>
            <span className="text-black text-center font-bold text-[30px] mt-4">
              €4,500
              <span className="text-[14px]">p/m</span>
            </span>
          </div>

          <div
            className="flex flex-col items-center   py-[60px] px-[20px]  bg-cover bg-center bg-no-repeat relative"
            style={{
              backgroundImage: "url('/img/pricing/pricing2.png')",
              backgroundSize: "100% 100%",
            }}>
            <p className="text-white text-3xl font-bold">Aff-Starter Plan</p>

            <img
              src="./img/curve.png"
              className="mb-2 mt-6"
              width="80%"
              style={{
                zIndex: 1,
              }}></img>

            <p className="text-white text-center text-[14px] mt-4 px-2 underline">
              Core affiliate management and deal negotiation services.
            </p>
            <span className="text-white text-center font-bold text-[30px] mt-4">
              €3,500
              <span className="text-[14px]">p/m</span>
            </span>
          </div>

          <div
            className="flex flex-col items-center  py-[50px] px-[20px]  bg-cover bg-center bg-no-repeat relative"
            style={{
              backgroundImage: "url('/img/pricing/pricing1.png')",
              backgroundSize: "100% 100%",
            }}>
            <p className="text-black text-3xl font-bold">Aff-Driver Plan</p>

            <img
              src="./img/curve.png"
              className="my-2 mt-4"
              width="80%"
              style={{
                zIndex: 1,
              }}></img>

            <p className="text-black text-center text-[14px] mt-4 px-2 underline">
              All Aff-Starter services plus social media management and basic
              content creation.
            </p>
            <span className="text-black text-center font-bold text-[30px] mt-4">
              €4,500
              <span className="text-[14px]">p/m</span>
            </span>
          </div>

          <div
            className="flex flex-col items-center   py-[60px] px-[20px]  bg-cover bg-center bg-no-repeat relative"
            style={{
              backgroundImage: "url('/img/pricing/pricing2.png')",
              backgroundSize: "100% 100%",
            }}>
            <span className="text-white text-3xl font-bold">
              Aff-Driver
              <span className="text-[#FF6D00] text-xl font-bold">+</span>
              Plan
            </span>

            <img
              src="./img/curve.png"
              className="mb-2 mt-6"
              width="80%"
              style={{
                zIndex: 1,
              }}></img>

            <p className="text-white text-center text-[14px] mt-4 px-2 underline">
              All Aff-Driver services with enhanced optimisation and deal
              negotiation.
            </p>
            <span className="text-white text-center font-bold text-[30px] mt-4">
              €6,500
              <span className="text-[14px]">p/m</span>
            </span>
          </div>
        </div>

        <Carousel
                className="rounded-xl mt-8 md:hidden"
                prevArrow={({ handlePrev }) => (
                  <IconButton
                    variant="text"
                    color="white"
                    size="md"
                    onClick={handlePrev}
                    className="!absolute top-2/4 left-4 -translate-y-2/4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-6 w-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                      />
                    </svg>
                  </IconButton>
                )}
                nextArrow={({ handleNext }) => (
                  <IconButton
                    variant="text"
                    color="white"
                    size="md"
                    onClick={handleNext}
                    className="!absolute top-2/4 !right-4 -translate-y-2/4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-6 w-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </IconButton>
                )}
                navigation={({ setActiveIndex, activeIndex, length }) => (
                  <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2 ">
                    {new Array(length).fill("").map((_, i) => (
                      <span
                        key={i}
                        className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                          activeIndex === i
                            ? "w-4 bg-white "
                            : "w-4 bg-white bg-opacity-20"
                        }`}
                        onClick={() => setActiveIndex(i)}
                      />
                    ))}
                  </div>
                )}>
          <div
            className="flex flex-col items-center py-[50px] px-[20px]  bg-cover bg-center bg-no-repeat relative"
            style={{
              backgroundImage: "url('/img/pricing/pricing1.png')",
              backgroundSize: "100% 100%",
            }}>
            <p className="text-black text-3xl font-bold">Pay-as-You-Go</p>
            <p className="text-black text-center text-[14px] mt-4">
              No long-term commitment—ideal for flexibility.
            </p>

            <img
              src="./img/curve.png"
              className="my-2"
              width="80%"
              style={{
                zIndex: 1,
              }}></img>

            <p className="text-black text-center text-[14px] mt-4 px-2 underline">
              Full affiliate management Deal negotiation Retention optimisation
            </p>
            <span className="text-black text-center font-bold text-[30px] mt-4">
              €4,500
              <span className="text-[14px]">p/m</span>
            </span>
          </div>

          <div
            className="flex flex-col items-center py-[60px] px-[20px]  bg-cover bg-center bg-no-repeat relative"
            style={{
              backgroundImage: "url('/img/pricing/pricing2.png')",
              backgroundSize: "100% 100%",
            }}>
            <p className="text-white text-3xl font-bold">Aff-Starter Plan</p>

            <img
              src="./img/curve.png"
              className="mb-2 mt-6"
              width="80%"
              style={{
                zIndex: 1,
              }}></img>

            <p className="text-white text-center text-[14px] mt-4 px-2 underline">
              Core affiliate management and deal negotiation services.
            </p>
            <span className="text-white text-center font-bold text-[30px] mt-4">
              €3,500
              <span className="text-[14px]">p/m</span>
            </span>
          </div>

          <div
            className="flex flex-col items-center py-[50px] px-[20px]  bg-cover bg-center bg-no-repeat relative"
            style={{
              backgroundImage: "url('/img/pricing/pricing1.png')",
              backgroundSize: "100% 100%",
            }}>
            <p className="text-black text-3xl font-bold">Aff-Driver Plan</p>

            <img
              src="./img/curve.png"
              className="my-2 mt-4"
              width="80%"
              style={{
                zIndex: 1,
              }}></img>

            <p className="text-black text-center text-[14px] mt-4 px-2 underline">
              All Aff-Starter services plus social media management and basic
              content creation.
            </p>
            <span className="text-black text-center font-bold text-[30px] mt-4">
              €4,500
              <span className="text-[14px]">p/m</span>
            </span>
          </div>

          <div
            className="flex flex-col items-center py-[60px] px-[20px]  bg-cover bg-center bg-no-repeat relative"
            style={{
              backgroundImage: "url('/img/pricing/pricing2.png')",
              backgroundSize: "100% 100%",
            }}>
            <span className="text-white text-3xl font-bold">
              Aff-Driver
              <span className="text-[#FF6D00] text-xl font-bold">+</span>
              Plan
            </span>

            <img
              src="./img/curve.png"
              className="mb-2 mt-6"
              width="80%"
              style={{
                zIndex: 1,
              }}></img>

            <p className="text-white text-center text-[14px] mt-4 px-2 underline">
              All Aff-Driver services with enhanced optimisation and deal
              negotiation.
            </p>
            <span className="text-white text-center font-bold text-[30px] mt-4">
              €6,500
              <span className="text-[14px]">p/m</span>
            </span>
          </div>
        </Carousel>
      </div>

      
      <div
        className="flex flex-col pricing-service  w-full bg-top bg-no-repeat relative my-6 pt-[30px] md:pb-[250px] pb-[100px]"
        style={{
          // backgroundImage: "url('/img/pricing/services.png')",
          backgroundSize: "100% 100%",
          paddingTop: "10.25%",
        }}>
        <div className=" flex flex-col items-end  md:px-[15%] px-4 text-center w-full mt-6">
          <p className="text-white md:text-6xl  text-2xl font-bold md:w-full md:pr-10">
            Specialised Management and Support Services
          </p>
          <p className="text-white md:text-3xl text-[14px] md:w-full mt-10 md:pr-10 px-4">
            Enhance player engagement and retention with our scalable CRM
            solutions:arent pricing structure ensures you only pay for what you
            need.
          </p>
          <div
            className="md:grid hidden grid-cols-4 gap-4 w-full mt-24 "
          >
            <div
              className="flex flex-col items-center  py-[50px] px-[20px] min-h-[500px] bg-cover bg-center bg-no-repeat relative"
              style={{
                backgroundImage: "url('/img/pricing/pricing1.png')",
                backgroundSize: "100% 100%",
              }}>
              <p className="text-black text-3xl font-bold">CRM Management</p>
              <p className="text-black text-center text-[14px] mt-4">
                Enhance player engagement and retention with our scalable CRM solutions:
              </p>

              <img
                src="./img/curve.png"
                className="my-2"
                width="80%"
                style={{
                  zIndex: 1,
                }}></img>

              <p className="text-black text-center text-[14px] mt-4 px-2 underline">
                 Dedicated CRM manager Advanced optimisation tools Comprehensive retention
              </p>
              <span className="text-black text-center font-bold text-[30px] mt-4">
                <span className="text-[14px] ">From</span>€2,500
                <span className="text-[14px]">p/m</span>
              </span>
            </div>

            <div
              className="flex flex-col items-center min-h-[500px]  py-[30px] px-[20px]  bg-cover bg-center bg-no-repeat relative"
              style={{
                backgroundImage: "url('/img/pricing/pricing2.png')",
                backgroundSize: "100% 100%",
              }}>
              <p className="text-white text-3xl font-bold">Social Media Management</p>
              <p className="text-white text-center text-[14px] mt-4">
                Build your brand's presence &  connect with your audience through strategic social media campaigns:
              </p>
              
              <img
                src="./img/curve.png"
                className="mb-2 mt-6"
                width="80%"
                style={{
                  zIndex: 1,
                }}></img>

              <p className="text-white text-center text-[14px] mt-4 px-2 underline">
              Dedicated social media manager Content creation and campaign management Performance tracking and detailed reporting
              </p>
              <span className="text-white text-center font-bold text-[30px] mt-4">
                <span className="text-[14px] ">From</span>€2,500
                <span className="text-[14px]">p/m</span>
              </span>
            </div>

            <div
              className="flex flex-col items-center min-h-[500px] py-[50px] px-[20px]  bg-cover bg-center bg-no-repeat relative"
              style={{
                backgroundImage: "url('/img/pricing/pricing1.png')",
                backgroundSize: "100% 100%",
              }}>
              <p className="text-black text-3xl font-bold">Customer Service & VIP Management</p>
              <p className="text-black text-center text-[14px] mt-4">
               Boost player satisfaction with our multilingual, 24/7 support solutions:
              </p>

              <img
                src="./img/curve.png"
                className="my-2"
                width="80%"
                style={{
                  zIndex: 1,
                }}></img>

              <p className="text-black text-center text-[14px] mt-4 px-2 underline">
                 VIP management Comprehensive player support
              </p>

              <p className="text-black text-center text-3xl mt-4 font-bold ">
              POC
              </p>
              <p className="text-black text-center text-xl  font-bold ">
                (Price on Consultation)
              </p>
            </div>


            <div
              className="flex flex-col items-center min-h-[500px]  py-[60px] px-[20px]  bg-cover bg-center bg-no-repeat relative"
              style={{
                backgroundImage: "url('/img/pricing/pricing2.png')",
                backgroundSize: "100% 100%",
              }}>
              <span className="text-white text-3xl font-bold">
                Customised Consultancy Services
              </span>

              <p className="text-white text-center text-[14px] mt-4">
                Get expert advice on casino operations, payments, and legal aspects of your iGaming
              </p>

              <img
                src="./img/curve.png"
                className="mb-2 mt-6"
                width="80%"
                style={{
                  zIndex: 1,
                }}></img>

              <p className="text-black text-center text-3xl mt-4 font-bold ">
                POC
              </p>
              <p className="text-black text-center text-xl  font-bold ">
                (Price on Consultation)
              </p>
            </div>

          </div>

        <div className="md:hidden mt-8 px-4 w-full flex justify-center items-center">

          <Carousel
                className="rounded-xl "
                prevArrow={({ handlePrev }) => (
                  <IconButton
                    variant="text"
                    color="white"
                    size="md"
                    onClick={handlePrev}
                    className="!absolute top-2/4 left-4 -translate-y-2/4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-6 w-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                      />
                    </svg>
                  </IconButton>
                )}
                nextArrow={({ handleNext }) => (
                  <IconButton
                    variant="text"
                    color="white"
                    size="md"
                    onClick={handleNext}
                    className="!absolute top-2/4 !right-4 -translate-y-2/4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-6 w-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </IconButton>
                )}
                navigation={({ setActiveIndex, activeIndex, length }) => (
                  <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2 ">
                    {new Array(length).fill("").map((_, i) => (
                      <span
                        key={i}
                        className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                          activeIndex === i
                            ? "w-4 bg-white "
                            : "w-4 bg-white bg-opacity-20"
                        }`}
                        onClick={() => setActiveIndex(i)}
                      />
                    ))}
                  </div>
                )}>

            <div
              className="flex flex-col items-center min-h-[500px]  py-[50px] px-[20px]  bg-cover bg-center bg-no-repeat relative mb-4"
              style={{
                backgroundImage: "url('/img/pricing/pricing1.png')",
                backgroundSize: "100% 100%",
              }}>
              <p className="text-black text-3xl font-bold">CRM Management</p>
              <p className="text-black text-center text-[14px] mt-4">
                Enhance player engagement and retention with our scalable CRM solutions:
              </p>

              <img
                src="./img/curve.png"
                className="my-2"
                width="80%"
                style={{
                  zIndex: 1,
                }}></img>

              <p className="text-black text-center text-[14px] mt-4 px-2 underline">
                 Dedicated CRM manager Advanced optimisation tools Comprehensive retention
              </p>
              <span className="text-black text-center font-bold text-[30px] mt-4">
                <span className="text-[14px] ">From</span>€2,500
                <span className="text-[14px]">p/m</span>
              </span>
            </div>

            <div
              className="flex flex-col items-center min-h-[500px]  py-[60px] px-[20px]  bg-cover bg-center bg-no-repeat relative"
              style={{
                backgroundImage: "url('/img/pricing/pricing2.png')",
                backgroundSize: "100% 100%",
              }}>
              <p className="text-white text-3xl font-bold">Social Media Management</p>
              <p className="text-white text-center text-[14px] mt-4">
                Build your brand's presence &  connect with your audience through strategic social media campaigns:
              </p>
              <img
                src="./img/curve.png"
                className="mb-2 mt-6"
                width="80%"
                style={{
                  zIndex: 1,
                }}></img>

              <p className="text-white text-center text-[14px] mt-4 px-2 underline">
              Dedicated social media manager Content creation and campaign management Performance tracking and detailed reporting
              </p>
              <span className="text-white text-center font-bold text-[30px] mt-4">
                <span className="text-[14px] ">From</span>€2,500
                <span className="text-[14px]">p/m</span>
              </span>
            </div>

            <div
              className="flex flex-col items-center min-h-[500px] py-[50px] px-[20px]  bg-cover bg-center bg-no-repeat relative"
              style={{
                backgroundImage: "url('/img/pricing/pricing1.png')",
                backgroundSize: "100% 100%",
              }}>
              <p className="text-black text-3xl font-bold">Customer Service & VIP Management</p>
              <p className="text-black text-center text-[14px] mt-4">
               Boost player satisfaction with our multilingual, 24/7 support solutions:
              </p>

              <img
                src="./img/curve.png"
                className="my-2"
                width="80%"
                style={{
                  zIndex: 1,
                }}></img>

              <p className="text-black text-center text-[14px] mt-4 px-2 underline">
                 VIP management Comprehensive player support
              </p>

              <p className="text-black text-center text-3xl mt-4 font-bold ">
              POC
              </p>
              <p className="text-black text-center text-xl  font-bold ">
                (Price on Consultation)
              </p>
            </div>


            <div
              className="flex flex-col items-center  min-h-[500px] py-[60px] px-[20px]  bg-cover bg-center bg-no-repeat relative"
              style={{
                backgroundImage: "url('/img/pricing/pricing2.png')",
                backgroundSize: "100% 100%",
              }}>
              <span className="text-white text-3xl font-bold">
                Customised Consultancy Services
              </span>

              <p className="text-white text-center text-[14px] mt-4">
                Get expert advice on casino operations, payments, and legal aspects of your iGaming
              </p>

              <img
                src="./img/curve.png"
                className="mb-2 mt-6"
                width="80%"
                style={{
                  zIndex: 1,
                }}></img>

              <p className="text-black text-center text-3xl mt-4 font-bold ">
                POC
              </p>
              <p className="text-black text-center text-xl  font-bold ">
                (Price on Consultation)
              </p>
            </div>

         </Carousel>

        </div>

        </div>
      </div>

      <div className="flex flex-col justify-center items-center md:text-left  text-center w-full px-[5%]">
      <div className="w-[50%] md:hidden block">
            <img src="/img/pricing/av.png" className="" />
          </div>
        <p className="md:text-6xl text-3xl  font-bold text-black md:mt-10">
          Why choose Aff-Starter?
        </p>
        <div className="flex  w-[80%] md:mt-10 justify-center md:pt-10">
          <div className="w-[50%] md:block hidden">
            <img src="/img/pricing/av.png" className="" />
          </div>

          <div className="flex flex-col md:px-12 w-full">
            <div className="mt-8">
              <p className="text-black md:text-4xl text-2xl font-bold">
                Transparent Pricing:
              </p>
              <p className="text-black md:text-[20px] text-[18px] mt-4 px-2 ">
                No hidden fees—just clear, honest pricing.
              </p>
            </div>
            <div className="mt-8">
              <p className="text-black md:text-4xl text-2xl font-bold">Tailored Plans:</p>
              <p className="text-black md:text-[20px] text-[18px] mt-4 px-2 ">
                Services designed to fit your unique business needs.
              </p>
            </div>
            <div className="mt-8 mb-4">
              <p className="text-black md:text-4xl text-2xl font-bold">Proven Expertise:</p>
              <p className="text-black md:text-[20px] text-[18px] mt-4 px-2 ">
                management. Benefit from our years of experience in iGaming
                affiliate
              </p>
            </div>
          </div>
        </div>
      </div>





      <div className="">
        <Footer></Footer>
      </div>
    </main>
  );
}
