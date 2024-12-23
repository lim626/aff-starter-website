"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  LuBarChart2,
  LuCrosshair,
  LuClock,
  LuTrendingUp,
  LuChevronRight,
} from "react-icons/lu";
import Footer from "../components/footer";
import { Carousel } from "@material-tailwind/react";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex w-full flex-col min-h-screen ">
      <div
        style={{
          backgroundImage: "url('./img/bg/bg-affilue-1.png')",
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}>
        {" "}
        <div
          className="flex flex-col items-center w-full relative"
          style={{
            backgroundImage: "url('./img/bg/bg-affilue-2.png')",
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
          }}>
          <img
            src="./img/Octo.png"
            className=""
            width={500}
            style={{
              zIndex: 1,
            }}></img>
          <div
            style={{ zIndex: 10 }}
            className="flex flex-col items-center w-[65%] mt-[3vw]  md:text-5xl xxl:text-6xl">
            <p class=" text-white font-bold ">Affiliate Managed Services</p>

            <p className="text-white xxl:text-3xl text-2xl mt-12">
              Build powerful partnerships that drive growth with Aff-Starter’s
              comprehensive Affiliate Management services. From targeted
              recruitment to ongoing optimization, we manage every step of the
              affiliate journey to ensure your brand thrives in diverse markets.
            </p>
          </div>
          <div className="flex grid md:grid-cols-4 grid-cols-2 items-center w-[75%] mt-[3vw]">
            <div className="flex flex-col items-center border-black border-[3px] rounded-[3vw] w-[17vw] px-6 py-6 bg-[#59DEEB] h-full">
              <p className="font-bold text-2xl text-center">
                Affiliate Onboarding
              </p>
              <img
                src="./img/curve.png"
                className="my-4"
                width="80%"
                style={{
                  zIndex: 1,
                }}></img>
              <p>
                Start strong with a seamless onboarding experience. We provide
                new affiliates with all the tools, resources, and guidance they
                need to succeed from day one, setting the stage for effective
                and lasting partnerships.
              </p>
            </div>
            <div className="flex flex-col items-center border-black border-[3px] rounded-[3vw] w-[17vw] px-6 py-6 bg-[#6D12D8] h-full text-white ">
              <p className="font-bold text-2xl text-center px-8">
                Localized Affiliates
              </p>
              <img
                src="./img/curve.png"
                className="my-4"
                width="80%"
                style={{
                  zIndex: 1,
                }}></img>
              <p>
                Stay connected and supported. Our dedicated account managers
                maintain day-to-day contact with affiliates, ensuring they have
                everything needed to perform at their best while addressing any
                questions or concerns.
              </p>
            </div>
            <div className="flex flex-col items-center border-black border-[3px] rounded-[3vw] w-[17vw] px-6 py-6 bg-[#59DEEB] h-full">
              <p className="font-bold text-2xl text-center">
                Expert Guidance in Brand Localization
              </p>
              <img
                src="./img/curve.png"
                className="my-4"
                width="80%"
                style={{
                  zIndex: 1,
                }}></img>
              <p>
                Boost engagement with localized content. We offer strategic
                advice on adapting your brand’s messaging and promotions to
                resonate with local audiences, helping you drive conversions
                with culturally relevant campaigns.
              </p>
            </div>
            <div className="flex flex-col  items-center border-black border-[3px] rounded-[3vw] w-[17vw] px-6 py-6 bg-[#6D12D8] h-full text-white ">
              <p className="font-bold text-2xl text-center">
                Ongoing Account Management
              </p>
              <img
                src="./img/curve.png"
                className="my-4"
                width="80%"
                style={{
                  zIndex: 1,
                }}></img>
              <p>
                Stay connected and supported. Our dedicated account managers
                maintain day-to-day contact with affiliates, ensuring they have
                everything needed to perform at their best while addressing any
                questions or concerns.
              </p>
            </div>
          </div>

          <div className="w-[35vw] flex rounded-[30px] border-black border-[2px] h-[17px] mt-[50px] overflow-hidden">
            <div className="h-full w-[50%] bg-[#59DEEB]"></div>
          </div>
          <div
            className="flex items-center w-[34vw] mt-[-67px] mr-8"
            style={{ zIndex: 0 }}>
            <img src="./img/bg/bg-affilu-phone-1.png"></img>
          </div>
          <div
            className="flex items-center justify-center w-[34vw] mt-[-120px] mr-6"
            style={{ zIndex: -1 }}>
            <img src="./img/bg/phone.png"></img>
          </div>
          <div
            className="w-[55%]"
            style={{
              backgroundImage: "url(./img/bg/bg-1-2.png)",
              backgroundSize: "contain",
              backgroundPosition: "right",
              backgroundRepeat: "no-repeat",
            }}></div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-8">
        <p className=" text-[3vw] font-bold text-[#70E8FC] leading-none">
          Ready to elevate your{" "}
        </p>
        <p className=" text-[3vw] font-bold text-black">
          affiliate partnerships?
        </p>
        <div className="flex w-full justify-center items-center pb-8">
          <Button className="bg-[#F25411] flex text-xl px-8 items-center rounded-[30px] mt-10  normal-case">
            Contact Us
          </Button>
        </div>
      </div>

      <div className="">
        <div
          className="h-[150vh] px-[10%] xxl:px-[15%]"
          style={{
            backgroundImage: "url(./img/bg/bg-affilue-3.png)",
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
          }}>
          <div className="flex grid grid-cols-2 h-full justify-center items-center">
            <div className="">
              <p className="text-[3vw] font-bold  text-white  leading-tight">
                <span className="text-[#70E8FC]">RETENTION </span> MANAGED
                SERVICES{" "}
              </p>
              <p className="text-[2vw] mt-16 text-white">
                Maximize player lifetime value and build lasting loyalty with
                Aff-Starter’s Retention Management services. Our tailored
                strategies keep players engaged, satisfied, and coming back for
                more.
              </p>
            </div>
            <div>
              <Carousel className="rounded-xl">
                <div className="relative  w-full  h-[80vh]">
                  <div className=" absolute inset-0 grid h-full w-full place-items-center">
                    <div className="w-full text-center md:w-3/5 h-[80%]">
                      <div className="flex flex-col items-center justify-center border-black border-[3px] rounded-[3vw] w-[full] px-6 py-6 bg-white h-full">
                        <p className="font-bold text-2xl text-center">
                          Personalized Engagement and Targeted Campaigns
                        </p>
                        <img
                          src="./img/curve-black.png"
                          className="my-4"
                          width="80%"
                          style={{
                            zIndex: 1,
                          }}></img>
                        <p className="text-[20px]">
                          Connect with players on a personal level. We create
                          targeted campaigns and tailor messaging based on
                          player preferences, ensuring that every interaction
                          feels relevant and engaging.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative h-[80vh] w-full">
                  <div className="absolute inset-0 grid h-full w-full place-items-center">
                    <div className="w-full text-center md:w-3/5 h-[80%]">
                      <div className="flex flex-col items-center justify-center border-black border-[3px] rounded-[3vw] w-[full] px-6 py-6 bg-white h-full">
                        <p className="font-bold text-2xl text-center">
                          Personalized Engagement and Targeted Campaigns
                        </p>
                        <img
                          src="./img/curve-black.png"
                          className="my-4"
                          width="80%"
                          style={{
                            zIndex: 1,
                          }}></img>
                        <p className="text-[20px]">
                          Connect with players on a personal level. We create
                          targeted campaigns and tailor messaging based on
                          player preferences, ensuring that every interaction
                          feels relevant and engaging.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('./img/bg/bg-affilue-4.png')",
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}>
        <div className="mt-4 w-[30vw]">
          <img src="./img/rewards.png"></img>
        </div>
        <div className="flex flex-col items-center w-[35vw] justify-center mt-8">
          <p className=" text-[3vw] font-bold text-[#70E8FC] leading-none">
            Ready to build a
          </p>
          <p className=" text-[3vw] font-bold text-black">loyal player base?</p>
          <p className="text-center mt-8">
            Explore how Aff-Starter’s Retention Management services can enhance
            player loyalty and boost your brand’s long-term success. Contact us
            today to learn more.
          </p>
          <div className="flex w-full justify-center items-center pb-8">
            <Button className="bg-[#F25411] flex text-xl px-8 items-center rounded-[30px] mt-10  normal-case">
              Contact Us
            </Button>
          </div>
        </div>
      </div>

      <div
        className="flex flex-col items-center justify-center bg-[#F25411] text-white pt-52"
        style={{
          backgroundImage: "url('./img/bg/bg-affilue-5.png')",
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}>
        <p className="font-bold text-5xl lg:mt-12">
          Social Media Managed Services
        </p>
        <p className="w-[50vw] text-center mt-8 text-2xl">
          Take your brand to the next level with Aff-Starter’s Social Media
          Managed Services. Combined with our QuestTracker gamification
          platform, we turn social media into a powerful tool for engagement,
          loyalty, and growth.
        </p>
        <div className="flex">
          <p className="font-bold text-4xl mt-4">SWIPE</p>
          <div className="mt-8 ml-4">
            <img src="./img/arrow.png"></img>
          </div>
        </div>
        <div className="flex lg:mb-24">
          <div
            style={{ zIndex: 10 }}
            className="flex flex-col items-center border-black border-[10px] rounded-[3vw] w-[25vw] px-8 py-6 bg-[#6D12D8] text-white ">
            <p className="font-bold text-5xl text-center px-8">
              Discord Community Management
            </p>
            <img
              src="./img/curve.png"
              className="my-8"
              width="80%"
              style={{
                zIndex: 1,
              }}></img>
            <p className="text-2xl">
              Stay connected and supported. Our dedicated account managers
              maintain day-to-day contact with affiliates, ensuring they have
              everything needed to perform at their best while addressing any
              questions or concerns.
            </p>
          </div>
          <div
            style={{ zIndex: 9 }}
            className="flex flex-col items-center border-black border-[10px] rounded-[3vw] w-[25vw] px-8 py-6 bg-[#6D12D8] ml-[-24vw] text-white "></div>
          <div
            style={{ zIndex: 8 }}
            className="flex flex-col items-center border-black border-[10px] rounded-[3vw] w-[25vw] px-8 py-6 bg-[#6D12D8] ml-[-24vw] text-white "></div>
          <div
            style={{ zIndex: 7 }}
            className="flex flex-col items-center border-black border-[10px] rounded-[3vw] w-[25vw] px-8 py-6 bg-[#6D12D8] ml-[-24vw] text-white "></div>
          <div
            style={{ zIndex: 6 }}
            className="flex flex-col items-center border-black border-[10px] rounded-[3vw] w-[25vw] px-8 py-6 bg-[#6D12D8] ml-[-24vw] text-white "></div>
        </div>
      </div>
      <div
        className="w-full h-[200px]"
        style={{
          backgroundImage: "url('./img/bg/bg-affilue-6.png')",
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}></div>

      <div className="flex flex-col items-center justify-center mt-8">
        <p className="text-[3vw] font-bold  text-black  leading-tight">
          <span className="text-[#70E8FC]">Customer Service </span> MANAGED
          SERVICES{" "}
        </p>
        <p className="px-[15%] text-2xl text-center mt-8">
          Deliver exceptional support experiences that keep your players coming
          back. Through our strong partnership with Workanova, we provide your
          brand with seamless, round-the-clock customer service designed to
          enhance player satisfaction and loyalty.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 w-full px-[20%] mb-16">
          <div className="rounded-[20px] border-black border-[3px] bg-[#59DEEB] px-8 py-8">
            <p className="text-black text-center">
              Keep your players happy and supported, anytime, anywhere. With
              Workanova’s 24/7 multilingual support, we cater to players in
              multiple languages, ensuring they receive prompt, knowledgeable
              assistance whenever they need it.
            </p>
          </div>

          <div className="rounded-[20px] border-black border-[3px] bg-[#6D12D8] px-8 py-8 h-full">
            <p className="text-white text-center text-4xl font-bold">
              Dedicated Player Assistance
            </p>
          </div>

          <div className="rounded-[20px] border-black border-[3px] bg-[#6D12D8] px-8 py-8 h-full">
            <p className="text-white text-center text-4xl font-bold">
              Proactive Issue Resolution
            </p>
          </div>

          <div className="rounded-[20px] border-black border-[3px] bg-[#59DEEB] px-8 py-8 h-full">
            <p className="text-black text-center text-4xl font-bold">
              PrAdvanced Support Tools
            </p>
          </div>

          <div className="rounded-[20px] border-black border-[3px] bg-[#59DEEB] px-8 py-8 h-full">
            <p className="text-black text-center text-4xl font-bold">
              Real-Time Feedback & Continuous Improvement
            </p>
          </div>

          <div className="rounded-[20px] border-black border-[3px] bg-[#6D12D8] px-8 py-8 h-full">
            <p className="text-white text-center text-4xl font-bold">
              Ready to elevate your customer support?
            </p>
          </div>
        </div>
      </div>

      <div className="">
        <Footer></Footer>
      </div>
    </main>
  );
}
