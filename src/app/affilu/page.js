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
import { Carousel, IconButton } from "@material-tailwind/react";

export default function Home() {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState("./img/bg/bg-affilue-t.png");

  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setImageSrc("./img/bg/bg-affilue-t.png");
    } else {
      setImageSrc("./img/mobile/bg-affilue-t.png");
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="flex w-full flex-col min-h-screen ">
      <div className="relative">
        <img src={imageSrc} className="w-full"></img>{" "}
        <div className="w-full absolute top-0">
          {" "}
          <div
            className="flex flex-col items-center w-full relative "
            style={{
              backgroundImage: "url('./img/bg/bg-affilue-2.png')",
              backgroundSize: "cover",
              backgroundPosition: "top",
              backgroundRepeat: "no-repeat",
            }}>
            <div></div>
            <img
              src="./img/Octo.png"
              className="w-[30vw] md:w-[20vw]"
              style={{
                zIndex: 1,
              }}></img>
            <div
              style={{ zIndex: 10 }}
              className="flex flex-col items-center md:w-[65%] w-[85%] mt-[3vw] text-[24px]  md:text-5xl xxl:text-6xl">
              <p class=" text-white font-bold ">Affiliate Managed Services</p>

              <p className="text-white xxl:text-3xl md:text-2xl text-[12px] md:mt-12 mt-4 text-center">
                Build powerful partnerships that drive growth with Aff-Starter’s
                comprehensive Affiliate Management services. From targeted
                recruitment to ongoing optimization, we manage every step of the
                affiliate journey to ensure your brand thrives in diverse
                markets.
              </p>
            </div>

            <div className="block md:hidden relative w-full px-12 mt-6">
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
                <div className="flex flex-col bg-[#59DEEB] items-center px-4 py-4 ">
                  <p className="font-bold text-[20px] text-center">
                    Affiliate Onboarding
                  </p>
                  <img
                    src="./img/curve.png"
                    className="my-4"
                    width="60%"
                    style={{
                      zIndex: 1,
                    }}></img>
                  <p className="text-[12px] text-center">
                    Start strong with a seamless onboarding experience. We
                    provide new affiliates with all the tools, resources, and
                    guidance they need to succeed from day one, setting the
                    stage for effective and lasting partnerships.
                  </p>
                </div>

                <div className="flex flex-col bg-[#6D12D8] items-center px-4 py-4 text-white">
                  <p className="font-bold text-[20px] text-center">
                    Affiliate Onboarding
                  </p>
                  <img
                    src="./img/curve.png"
                    className="my-4"
                    width="60%"
                    style={{
                      zIndex: 1,
                    }}></img>
                  <p className="text-[12px] text-center">
                    Start strong with a seamless onboarding experience. We
                    provide new affiliates with all the tools, resources, and
                    guidance they need to succeed from day one, setting the
                    stage for effective and lasting partnerships.
                  </p>
                </div>
                <div className="flex flex-col bg-[#59DEEB] items-center px-4 py-4 ">
                  <p className="font-bold text-[20px] text-center">
                    Affiliate Onboarding
                  </p>
                  <img
                    src="./img/curve.png"
                    className="my-4"
                    width="60%"
                    style={{
                      zIndex: 1,
                    }}></img>
                  <p className="text-[12px] text-center">
                    Start strong with a seamless onboarding experience. We
                    provide new affiliates with all the tools, resources, and
                    guidance they need to succeed from day one, setting the
                    stage for effective and lasting partnerships.
                  </p>
                </div>
                <div className="flex flex-col bg-[#6D12D8] items-center px-4 py-4 text-white">
                  <p className="font-bold text-[20px] text-center">
                    Affiliate Onboarding
                  </p>
                  <img
                    src="./img/curve.png"
                    className="my-4"
                    width="60%"
                    style={{
                      zIndex: 1,
                    }}></img>
                  <p className="text-[12px] text-center">
                    Start strong with a seamless onboarding experience. We
                    provide new affiliates with all the tools, resources, and
                    guidance they need to succeed from day one, setting the
                    stage for effective and lasting partnerships.
                  </p>
                </div>
              </Carousel>
            </div>

            <div className="hidden md:grid md:grid-cols-4 grid-cols-2 items-center w-[75%] mt-[3vw] gap-8">
              <div className="flex flex-col items-center border-black border-[3px] rounded-[30px] w-[17vw] px-6 py-8 bg-[#59DEEB] h-full">
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
                <p className="text-[20px] text-center">
                  Start strong with a seamless onboarding experience. We provide
                  new affiliates with all the tools, resources, and guidance
                  they need to succeed from day one, setting the stage for
                  effective and lasting partnerships.
                </p>
              </div>
              <div className="flex flex-col items-center border-black border-[3px] rounded-[30px] w-[17vw] px-6 py-6 bg-[#6D12D8] h-full text-white ">
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
                <p className="text-[20px] text-center">
                  Stay connected and supported. Our dedicated account managers
                  maintain day-to-day contact with affiliates, ensuring they
                  have everything needed to perform at their best while
                  addressing any questions or concerns.
                </p>
              </div>
              <div className="flex flex-col items-center border-black border-[3px] rounded-[30px] w-[17vw] px-6 py-6 bg-[#59DEEB] h-full">
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
                <p className="text-[20px] text-center">
                  Boost engagement with localized content. We offer strategic
                  advice on adapting your brand’s messaging and promotions to
                  resonate with local audiences, helping you drive conversions
                  with culturally relevant campaigns.
                </p>
              </div>
              <div className="flex flex-col  items-center border-black border-[3px] rounded-[30px] w-[17vw] px-6 py-6 bg-[#6D12D8] h-full text-white ">
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
                <p className="text-[20px] text-center">
                  Stay connected and supported. Our dedicated account managers
                  maintain day-to-day contact with affiliates, ensuring they
                  have everything needed to perform at their best while
                  addressing any questions or concerns.
                </p>
              </div>
            </div>

            <div className="md:w-[35vw] w-[50vw]  flex rounded-[30px] border-black border-[2px] md:h-[17px] h-[14px] mt-[3vh] md:mt-[10vh] overflow-hidden">
              <div className="h-full w-[50%] bg-[#59DEEB]"></div>
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
      </div>

      <div className="flex flex-col items-center justify-center ">
        <p className=" md:text-[3vw] text-[25px] font-bold text-[#70E8FC] leading-none">
          Ready to elevate your{" "}
        </p>
        <p className=" md:text-[3vw] text-[25px] font-bold text-black">
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
          className="retention h-[150vh] px-[10%] xxl:px-[15%] pt-32 md:pt-0"
          style={{
            // backgroundImage: "url(./img/bg/bg-affilue-3.png)",
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
          }}>
          <div className=" md:grid md:grid-cols-2 h-full justify-center items-center">
            <div className="">
              <p className="md:text-[3vw] text-[25px] font-bold  text-white text-center md:text-left leading-tight">
                <span className="md:text-[#70E8FC]">RETENTION </span> MANAGED
                SERVICES{" "}
              </p>
              <p className="md:text-[2vw] md:mt-16 mt-4 text-white text-center md:text-left">
                Maximize player lifetime value and build lasting loyalty with
                Aff-Starter’s Retention Management services. Our tailored
                strategies keep players engaged, satisfied, and coming back for
                more.
              </p>
            </div>
            <div>
              <Carousel
                className="rounded-xl"
                prevArrow={({ handlePrev }) => (
                  <IconButton
                    variant="text"
                    color="blue"
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
                    color="blue"
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
                )}>
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
        className="loyal flex flex-col items-center justify-center"
        style={{
          // backgroundImage: "url('./img/bg/bg-affilue-4.png')",
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}>
        <div className="mt-4 md:w-[30vw] w-[60vw]">
          <img src="./img/rewards.png"></img>
        </div>
        <div className="flex flex-col items-center md:w-[35vw] w-[90vw] justify-center mt-8">
          <p className=" md:text-[3vw] text-[25px] font-bold text-[#70E8FC] leading-none">
            Ready to build a
          </p>
          <p className=" md:text-[3vw] text-[25px] font-bold text-black">
            loyal player base?
          </p>
          <p className="text-center mt-8 md:text-[20px]">
            Explore how Aff-Starter’s Retention Management services can enhance
            player loyalty and boost your brand’s long-term success. Contact us
            today to learn more.
          </p>
          <div className="flex w-full justify-center items-center md:pb-8 pb-12">
            <Button className="bg-[#F25411] flex text-xl px-8 items-center rounded-[30px] mt-10  normal-case">
              Contact Us
            </Button>
          </div>
        </div>
      </div>

      <div
        className="flex flex-col items-center justify-center bg-[#F25411] text-white md:pt-42 pt-12  md:pb-0 pb-12"
        style={{
          backgroundImage: "url('./img/bg/bg-affilue-5.png')",
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}>
        <p className="font-bold md:text-5xl text-[40px] text-center md:text-left lg:mt-12">
          Social Media Managed Services
        </p>
        <p className="md:w-[50vw] w-[80vw] text-center mt-8 md:text-2xl">
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
            className="flex flex-col items-center border-black border-[10px] md:rounded-[3vw] rounded-[20px] md:w-[25vw] w-[80vw] px-8 py-6 bg-[#6D12D8] text-white ">
            <p className="font-bold md:text-5xl text-[30px] text-center px-8">
              Discord Community Management
            </p>
            <img
              src="./img/curve.png"
              className="my-8"
              width="80%"
              style={{
                zIndex: 1,
              }}></img>
            <p className="md:text-2xl">
              Stay connected and supported. Our dedicated account managers
              maintain day-to-day contact with affiliates, ensuring they have
              everything needed to perform at their best while addressing any
              questions or concerns.
            </p>
          </div>
          <div
            style={{ zIndex: 9 }}
            className="flex flex-col items-center border-black border-[10px] md:rounded-[3vw] rounded-[20px] md:w-[25vw] w-[80vw] px-8 py-6 bg-[#6D12D8] md:ml-[-24vw] ml-[-77vw] text-white "></div>
          <div
            style={{ zIndex: 8 }}
            className="flex flex-col items-center border-black border-[10px] md:rounded-[3vw] rounded-[20px] md:w-[25vw] w-[80vw] px-8 py-6 bg-[#6D12D8] md:ml-[-24vw] ml-[-77vw] text-white "></div>
          <div
            style={{ zIndex: 7 }}
            className="flex flex-col items-center border-black border-[10px] md:rounded-[3vw] rounded-[20px] md:w-[25vw] w-[80vw]  px-8 py-6 bg-[#6D12D8] md:ml-[-24vw] ml-[-77vw] text-white "></div>
          <div
            style={{ zIndex: 6 }}
            className="flex flex-col items-center border-black border-[10px] md:rounded-[3vw] rounded-[20px] md:w-[25vw] w-[80vw]  px-8 py-6 bg-[#6D12D8] md:ml-[-24vw] ml-[-77vw] text-white "></div>
        </div>
      </div>

      <div
        className="w-full h-[200px] md:block hidden"
        style={{
          backgroundImage: "url('./img/bg/bg-affilue-6.png')",
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}></div>

      <div className="flex flex-col items-center md:text-left text-center  justify-center mt-8">
        <p className="md:text-[3vw] text-[30px] font-bold  text-black  leading-tight">
          <span className="text-[#70E8FC]">Customer Service </span> MANAGED
          SERVICES{" "}
        </p>
        <p className="md:px-[15%] px-[20px] md:text-2xl text-center mt-8">
          Deliver exceptional support experiences that keep your players coming
          back. Through our strong partnership with Workanova, we provide your
          brand with seamless, round-the-clock customer service designed to
          enhance player satisfaction and loyalty.
        </p>
        <div className="mt-8 grid md:grid-cols-2 gap-4 w-full md:px-[20%] px-[5%] md:mb-16">
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

      <div
        className="w-full h-[200px] md:hidden block mt-[-30px] z-[-20]"
        style={{
          backgroundImage: "url('./img/mobile/end.png')",
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}></div>

      <div className="">
        <Footer></Footer>
      </div>
    </main>
  );
}
