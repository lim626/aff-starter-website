"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Input, Carousel, IconButton } from "@material-tailwind/react";
import { useEffect, useState, useRef } from "react";
import { BackendBaseURL } from "./utils/constant";
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
import Footer from "./components/footer";

// Import Swiper components at the top of the file
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const questDiv = useRef(null);
  const router = useRouter();
  const [buttonText, setButtonText] = useState("Learn More About Our Services");
  const [solutionText, setSolutionText] = useState(
    "Explore Development Solutions"
  );
  const [exploreText, setExploreText] = useState(
    "Explore Our Affiliate Network"
  );

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      // lg breakpoint
      setButtonText("Learn More About Our Services");
      setExploreText("Explore Our Affiliate Network");
      setSolutionText("Explore Development Solutions");
    } else {
      setButtonText("Learn More");
      setExploreText("Explore Our Network");
      setSolutionText("Learn More");
    }
  };

  const scrollToConsultancy = () => {
    const element = document.getElementById('consultancy');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Set initial button text
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="flex w-full flex-col min-h-screen ">
      <div className="flex w-full relative">
        <img
          src="./img/ring.png"
          className="absolute mt-[6vw] ml-[7vw] hidden lg:block hover:animate-scale"
          width={100}
          style={{
            zIndex: 1,
          }}></img>
        <div
          style={{ zIndex: 10 }}
          className="w-[full] lg:w-[45%] mt-0 lg:mt-[100px] lg:ml-[14vw] text-[30px] lg:text-6xl leading-[1.1]">
          <div className="lg:hidden block">
            <img src="./img/mobile/1.png"></img>
          </div>
          <div className="mt-4 flex flex-col justify-center px-[10%] text-center lg:justify-start lg:px-0 lg:text-start">
            <motion.p
              initial={{ opacity: 0, z: 20 }}
              animate={{ opacity: 1, z: 0 }}
              transition={{ duration: 0.3 }}
              class=" text-black font-bold">
              Empowering
            </motion.p>


            <motion.p
              initial={{ opacity: 0, z: 20 }}
              animate={{ opacity: 1, z: 0 }}
              transition={{ duration: 0.3 }}
              class=" text-black font-bold">
              iGaming Brands
            </motion.p>
            <div className="relative inline-block">
              <motion.p
                initial={{ opacity: 0, z: 20 }}
                animate={{ opacity: 1, z: 0 }}
                transition={{ duration: 0.3 }}
                className="text-[#6DE0F6] font-bold">
                to Grow and Thrive
              </motion.p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8 }}
                className="absolute h-1 bg-[#6DE0F6]  bottom-[-4] left-0"
              />
            </div>
            <p className="text-black xxl:text-3xl text-[20px] leading-[1.3] mt-12">
              Comprehensive Managed Services, Social Gamification Solutions, and
              Quality Affiliate Traffic—All in One Place.
            </p>
            <div className="flex lg:justify-start justify-center">
              <Button className="bg-[#F25411] flex lg:text-xl text-[22px] items-center rounded-[30px] mt-10">
              <a href="/contact">Get Started</a>
                <img
                  src="./img/icon_start.png"
                  className="ml-2 hidden lg:block"></img>
              </Button>
            </div>
          </div>

          <div className="mt-16 flex hidden lg:flex gap-4 lg:text-2xl text-[22px] items-center">
              <img 
                src="./img/mark1-1.png" 
                className="w-[120px] h-[40px] object-contain cursor-pointer hover:animate-scale" 
              />
              <img 
                src="./img/mark1-2.png" 
                className="w-[120px] h-[40px] object-contain cursor-pointer hover:animate-scale"
                // onClick={scrollToConsultancy}
              />
       
 
              <img 
                src="./img/mark1-3.png" 
                className="w-[130px] h-[40px] object-contain cursor-pointer hover:animate-scale"
                // onClick={scrollToConsultancy}
              />

              <img 
                src="./img/mark1-4.png" 
                className="w-[130px] h-[40px] object-contain cursor-pointer hover:animate-scale"
                // onClick={scrollToConsultancy}
              />
              
              <img 
                src="./img/mark1-5.png" 
                className="w-[70px] h-[40px] object-contain cursor-pointer hover:animate-scale"
                // onClick={scrollToConsultancy}
              />
              
              <img 
                src="./img/mark1-6.png" 
                className="w-[60px] h-[40px] object-contain cursor-pointer hover:animate-scale"
                // onClick={scrollToConsultancy}
              />
          </div>
          <div className=" flex hidden lg:flex gap-4 lg:text-2xl text-[22px] items-center">
              <img 
                src="./img/mark2-1.png" 
                className="w-[120px] h-[40px] object-contain cursor-pointer hover:animate-scale" 
              />
              <img 
                src="./img/mark2-2.png" 
                className="w-[120px] h-[40px] object-contain cursor-pointer hover:animate-scale"
                // onClick={scrollToConsultancy}
              />
              <img 
                src="./img/mark2-3.png" 
                className="w-[250px] h-[40px] object-contain cursor-pointer hover:animate-scale"
                // onClick={scrollToConsultancy}
              />
              <img 
                src="./img/mark2-4.png" 
                className="w-[140px] h-[40px] object-contain cursor-pointer hover:animate-scale"
                // onClick={scrollToConsultancy}
              />
          </div>
        </div>
        <div
          className="w-0 lg:w-[55%] relative hidden lg:block"
          style={{
            backgroundImage: "url(./img/bg/bg-1-2.png)",
            backgroundSize: "contain",
            backgroundPosition: "right top",
            backgroundRepeat: "no-repeat",
          }}>
          <div className="w-[300px] floating-image absolute right-0 top-[150px]">
            <img src="./img/animation/1.png"></img>
          </div>
          <div className="w-[380px] floating-image1 absolute right-[13%] top-[140px]">
            <img src="./img/animation/2.png"></img>
          </div>
          <div className="floating-image1 absolute right-0 top-[130px]">
            <img className="w-[130px]" src="./img/animation/3.png"></img>
          </div>
        </div>
      </div>
      <div className="relative mt-4 w-[]" style={{ zIndex: 10 }}>
        <div
          className="absolute w-[40vw] top-[400px] hidden lg:block left-[8%] "
          style={{ zIndex: 0 }}>
          <img src="./img/image 2.png"></img>
        </div>
        <div
          className="px-[10%] service xxl:px-[15%] "
          style={{
            // backgroundImage: "url(./img/bg/bg-2-1.png)",
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
          }}>
          <div
            id="managed-services"
            style={{ zIndex: 3 }}
            className="flex flex-col relative  items-center text-center mx-auto text-white  lg:pt-44 pt-44 pb-12 ">
            <p className="lg:text-5xl text-3xl font-bold lg:mt-8">
              Managed Services to{" "}
              <span className="text-[#6DE0F6] ml-2"> Elevate Your Brand</span>
            </p>
            <p className="lg:text-2xl text-[18px]  lg:px-[10%] text-center mt-8">
              Aff-Starter offers a full suite of managed services designed to
              drive player retention, boost traffic, and deliver top-tier
              customer support. From affiliate management to social media
              strategies, we&apos;ve got you covered.
            </p>
          </div>

          <div className="lg:flex grid place-items-top  lg:justify-end justify-center ">
            <div
              style={{
                // backgroundImage: "url('./img/archieve.png')",
                backgroundSize: "contain",
                backgroundPosition: "top",
                backgroundRepeat: "no-repeat",
              }}
              className="relative card lg:h-[35vw] lg:w-[27vw] w-[75vw] h-[250px] transition-transform duration-300 transform hover:animate-scale">
              <div className="lg:absolute lg:left-[3vw] lg:top-[6vw] lg:w-[13vw] flex items-center justify-center">
                <p className=" font-bold lg:text-[1.5vw] text-[20px] flex lg:mt-0 mt-12">
                  AFFILIATE MANAGEMENT
                </p>
              </div>
              <div className="lg:absolute lg:left-[3vw] lg:top-[11vw] lg:w-[12vw] lg:px-0 lg:mt-4 mt-4 px-8  flex justify-center items-center">
                <p className=" font-normal lg:text-[1.5vw] text-[18px]">
                  Drive high-quality traffic and optimize conversions.
                </p>
              </div>
            </div>
            <div
              style={{
                // backgroundImage: "url('./img/archieve.png')",
                backgroundSize: "contain",
                backgroundPosition: "top",
                backgroundRepeat: "no-repeat",
              }}
              className="relative card1 lg:h-[25vw] lg:mt-10 lg:w-[20vw] w-[75vw] h-[250px] transition-transform duration-300 transform hover:animate-scale">
              <div className="lg:absolute  lg:left-[4vw] lg:top-[4vw] lg:w-[16vw] flex items-center justify-center">
                <p className=" font-bold lg:text-[1.5vw] text-[20px] flex lg:mt-0 mt-12">
                  Social Media Management
                </p>
              </div>
              <div className="lg:absolute  lg:left-[4vw] lg:top-[10vw] lg:w-[14vw] lg:px-0 lg:mt-0 mt-4 px-8 flex justify-center items-center">
                <p className=" font-normal lg:text-[1.5vw] text-[18px]">
                  Boost visibility and engagement with targeted social
                  campaigns.
                </p>
              </div>
            </div>
          </div>
          

          <div className="flex w-full justify-center items-center lg:mt-20 pb-8">
            <Button className="bg-[#F25411] flex text-xl px-8 items-center justify-center rounded-[30px] lg:mt-10  normal-case" >
              <a href="/service">{buttonText}</a>
            </Button>
          </div>
        </div>
        <div
          className="w-[100%] h-[279px] md:bg-cover bg-contain"
          style={{
            backgroundImage: "url('./img/bg/bg-2-footer.png')",

            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
          }}></div>
        <div
          className="relative px-[10%] xxl:px-[15%] lg:py-16 mt-[-190px] lg:mt-0"
          id="quest-tracker"
          ref={questDiv}
          style={
            {
              // backgroundImage: "url('./img/bg/bg-3.png')",
              // backgroundSize: "contain",
              // backgroundPosition: "center",
              // backgroundRepeat: "no-repeat",
              // transform: `translateY(${scrollY * 0.5}px)`,
            }
          }>
          <div
            className="w-full h-full absolute left-0"
            style={{
              zIndex: -1,
              transform: `translateY(${scrollY * 0.3 - 700}px)`,
              pointerEvents: "none",
            }}>
            <img src="./img/bg/bg-3.png" className=" w-full h-full"></img>
          </div>
          <div className="mt-4 flex lg:block justify-center">
            <img
              src="./img/logo-quest.png"
              className="lg:w-[35vw] w-[60vw] hover:animate-scale"></img>
          </div>
          <div className="mt-8 lg:flex">
            <div>
              {" "}
              <div className="lg:w-[25vw] px-8 rounded-[20px] border border-[4px] border-black lg:py-16 py-8 bg-white">
                <p className="lg:text-[3vw] text-[22px] font-bold  text-[#6D12D8] text-center lg:flex lg:flex-col leading-tight">
                  Gamification 
                  <span className="text-black font-bold leading-none">
                    {" "}
                    Meets Social Engagement
                  </span>
                </p>

                <p className="mt-8 lg:text-[1.5vw] text-[12px] text-center">
                  Revolutionise player engagement with our QuestTracker
                  platform, combining gamification with social media integration
                  for an immersive experience that drives player loyalty.
                </p>
              </div>
            </div>

            <div className="lg:px-8 mt-8 lg:mt-0 hover:animate-scale">
              <img src="./img/jorney-track 1.png"></img>
            </div>
          </div>
          <div className="flex lg:justify-start justify-center">
            {" "}
            {/* <Button className="md:bg-[#F25411] bg-[#F14902] flex text-xl lg:py-5 px-8 items-center rounded-[35px] mt-10 normal-case ">
              Discover QuestTracker
            </Button> */}
          </div>
        </div>



        <div id="consultancy"
          className="consultancy relative flex flex-col  items-start px-[10%] xxl:px-[15%] py-16 mt-[-40px]"
          style={{
            // backgroundImage: "url('./img/bg/bg-6.png')",
            backgroundSize: "cover",
            // backgroundPosition: "left",
            backgroundRepeat: "no-repeat",
            zIndex: 10,
          }}>
          <div >
            {" "}
            <div className="md:w-[37vw] px-8 rounded-[20px]  md:mt-12 mt-4 md:py-12 py-4 flex flex-col text-center md:text-left items-center md:items-left">
              <span className="md:text-[3vw] text-[20px]  md:text-left font-bold flex-col text-white  leading-tight">
                Expert Consultancy Tailored for
                <span className=" font-bold leading-none text-[#6DE0F6]">
                  {" "}
                  Your Success
                </span>
              </span>

              <p className="mt-8 md:text-[1.5vw] text-[13px] text-white">
                Leverage our industry expertise with tailored consultancy
                services, ranging from payment solutions to legal setup, helping
                you navigate complex regulatory landscapes.
              </p>

              <div className="md:hidden mt-4">
                <img src="./img/bg/bg-6-2.png" className=""></img>
              </div>
            </div>
            <div className="px-8 flex justify-center">
              {" "}
              <Button className="bg-[#F25411] flex text-xl py-3 md:px-8 px-4 text-[15px] md:text-[22px] items-center rounded-[35px] md:mt-10 normal-case">
                <a href="https://calendar.app.google/9RhX95NA3kyXy2F46" target="_blank">Schedule a consultaion</a>
              </Button>
            </div>
          </div>
        </div>
        <div
          className="w-full md:h-[130px] h-[50px]"
          style={{
            backgroundImage: "url('./img/bg/bg-6-footer.png')",
            backgroundSize: "cover",
            backgroundPosition: "left",
            backgroundRepeat: "no-repeat",
          }}></div>
        <div
          className=" grid md:grid-cols-2   py-16"
          style={{
            backgroundImage: "url('./img/bg-say.png')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}>
          <div className="flex flex-col md:pl-[15vw]  items-center justify-center  md:px-0 ">
            <span className="md:text-[2.3vw] text-[23px] font-bold flex">
              WHAT OUR
              <p className="font-bold  ml-2 md:text-[#6D12D8]  md:border-b md:border-[#6DE0F6] md:border-b-[6px] leadin-none">
                {" "}
                CLIENTS SAY
              </p>
            </span>
            <p className="md:text-[1.5vw] mt-8 text-center md:text-left px-8 md:px-0">
              Don&apos;t take our word for it—see how we&apos;ve helped brands like yours
              grow and succeed in the competitive iGaming industry
            </p>
            <div className="hidden md:block hover:animate-scale">
              <img src="./img/say.png"></img>
            </div>
            <div className="w-[85vw] px-4 py-4 mt-8 block md:hidden">
              <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
                centeredSlides={true}
                initialSlide={1}
                cardsEffect={{
                  perSlideOffset: 8,
                  perSlideRotate: 2,
                  rotate: true,
                  slideShadows: false
                }}
              >
                <SwiperSlide className="!w-[250px]">
                  <div className="flex flex-col bg-[#7F07EF] items-center px-4 py-4 rounded-xl border-4 border-white shadow-2xl shadow-purple-900/80">
                    <img src="./img/Luckywhale-icon.png" width={80} alt="avatar"></img>
                    <div className="px-4 mt-2">
                      <p className="font-bold text-gray-200 text-[12px]">LuckyWhale:</p>
                      <p className="text-[10px] text-gray-200 my-2">
                        &quot;LuckyWhale&apos;s collaboration with Aff-Starter has transformed our operations, driving remarkable growth in customer acquisition through expert affiliate management. Their team not only enhanced our CRM strategies but also redesigned our bonus and promotion approaches, leading to a significant increase in engagement and revenue.&quot;
                      </p>
                      <p className="font-bold text-[12px] text-gray-200">Steve : Founder and CEO</p>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide className="!w-[250px]">
                  <div className="flex flex-col bg-[#7F07EF] items-center px-2 py-2 rounded-xl border-4 border-white shadow-2xl shadow-purple-900/80">
                    <img src="./img/BetterWin-Icon.png" width={80} alt="avatar"></img>
                    <div className="px-4 mt-2">
                      <p className="font-bold text-gray-200 text-[12px]">Betterwin</p>
                      <p className="text-[10px] text-gray-200 my-2">
                        &quot;Aff-Starter has been a pivotal partner in our journey from three months before launch to our initial week live. Their comprehensive support in setting up our affiliate program and overseeing our casino and sportsbook setup has been phenomenal. From strategizing bonuses and promotions to designing our creative assets, their expertise was integral to ensuring a smooth and successful launch.&quot;
                      </p>
                      <p className="font-bold text-[12px] text-gray-200">Raj - Founder and CEO</p>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide className="!w-[250px]">
                  <div className="flex flex-col bg-[#7F07EF] items-center px-4 py-8 rounded-xl border-4 border-white shadow-2xl shadow-purple-900/80">
                    <img src="./img/play-frank-Icon.png" width={80} alt="avatar"></img>
                    <div className="px-4 mt-4">
                      <p className="font-bold text-gray-200 text-[12px]">Playfrank</p>
                      <p className="text-[10px] text-gray-200 my-4">
                        &quot;Nathan from Aff-Starter has expertly led our affiliate program, aligning it perfectly with UKGC regulations and driving significant growth. His strategic guidance has been crucial in expanding our market presence effectively.&quot;
                      </p>
                      <p className="font-bold text-[12px] text-gray-200">Michel - Founder and CEO</p>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide className="!w-[250px]">
                  <div className="flex flex-col bg-[#7F07EF] items-center px-4 py-8 rounded-xl border-4 border-white shadow-2xl shadow-purple-900/80">
                    <img src="./img/Quickspinns-Icons.png" width={80} alt="avatar"></img>
                    <div className="px-4 mt-4">
                      <p className="font-bold text-gray-200 text-[12px]">Quickspinner</p>
                      <p className="text-[10px] text-gray-200 my-4">
                        &quot;With Nathan at the helm of our affiliate program, managed by Aff-Starter, we&apos;ve seen remarkable enhancements in our operations. His deep understanding of the UKGC guidelines and affiliate management has propelled our brand forward.&quot;
                      </p>
                      <p className="font-bold text-[12px] text-gray-200">Michel - Founder and CEO</p>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide className="!w-[250px]" >
                  <div className="flex flex-col bg-[#7F07EF] items-center px-4 py-8 rounded-xl border-4 border-white shadow-2xl shadow-purple-900/80">
                    <img src="./img/Wasino-icon.png" width={80} alt="avatar"></img>
                    <div className="px-4 mt-4">
                      <p className="font-bold text-gray-200 text-[12px]">Wasino</p>
                      <p className="text-[10px] text-gray-200 my-4">
                        &quot;Over the past six months, Aff-Starter has been instrumental in navigating through some challenging periods for Wasino. Their steadfast support and expert management of our affiliate program have not only helped us stabilize but also position ourselves for future growth.&quot;
                      </p>
                      <p className="font-bold text-[12px] text-gray-200">Andy - CEO</p>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide className="!w-[250px]">
                  <div className="flex flex-col bg-[#7F07EF] items-center px-4 py-8 rounded-xl border-4 border-white shadow-2xl shadow-purple-900/80">
                    <img src="./img/Loothoot-icon.png" width={80} alt="avatar"></img>
                    <div className="px-4 mt-4">
                      <p className="font-bold text-gray-200 text-[12px]">Loothoot</p>
                      <p className="text-[10px] text-gray-200 my-4">
                        &quot;At Loothoot, leveraging the right influencers and streamers is crucial to our success, and Aff-Starter has been exceptional in this area. Their targeted approach has greatly enhanced our visibility and engagement, helping us stand out in the competitive unboxing market.&quot;
                      </p>
                      <p className="font-bold text-[12px] text-gray-200">Francisco - CEO</p>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          <div className="pl-16 w-full h-full hidden md:flex justify-center items-center">
            <div className=" md:w-[30vw] ">
              {/* <div className="flex bg-gray-100 items-center px-8 py-8 w-[30vw]">
                <img src="./img/avarta.png"></img>

                <div className="ml-8">
                  <p className="font-bold text-[20px]">LuckyWhale:</p>
                  <p className="text-[14px]">
                    "LuckyWhale's collaboration with Aff-Starter has transformed our operations, driving remarkable growth in customer acquisition through expert affiliate management. Their team not only enhanced our CRM strategies but also redesigned our bonus and promotion approaches, leading to a significant increase in engagement and revenue."
                  </p>
                  <p className="font-bold text-[14px]">Steve : Founder and CEO</p>
                </div>
              </div>

              <div className="flex bg-[#9F07EF] ml-[-40px] items-center px-8 py-8 w-[30vw]">
                <img src="./img/avarta.png"></img>

                <div className="ml-8">
                  <p className="font-bold text-[2vw]">John Doe</p>
                  <p className="text-[1.1vw]">
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    elit nibh, fringilla non metus sit amet, fermentum tincidunt
                    enim"
                  </p>
                </div>
              </div>
              <div className="flex bg-gray-100 items-center px-8 py-8 w-[30vw]">
                <img src="./img/avarta.png"></img>

                <div className="ml-8">
                  <p className="font-bold text-[2vw]">John Doe</p>
                  <p className="text-[1.1vw]">
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    elit nibh, fringilla non metus sit amet, fermentum tincidunt
                    enim"
                  </p>
                </div>
              </div> */}

              <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
                centeredSlides={true}
                initialSlide={1}
                cardsEffect={{
                  perSlideOffset: 8,
                  perSlideRotate: 2,
                  rotate: true,
                  slideShadows: false
                }}
              >
                <SwiperSlide>
                  <div className="flex bg-[#7F07EF] items-center px-4 py-12 rounded-xl border-4 border-white shadow-2xl shadow-purple-900/80">
                    <img src="./img/Luckywhale-icon.png" width={100} alt="avatar"></img>
                    <div className="ml-8">
                      <p className="font-bold text-gray-200 text-[26px]">LuckyWhale</p>
                      <p className=" text-[16px] text-gray-200 my-4">
                        &quot;LuckyWhale&apos;s collaboration with Aff-Starter has transformed our operations, driving remarkable growth in customer acquisition through expert affiliate management. Their team not only enhanced our CRM strategies but also redesigned our bonus and promotion approaches, leading to a significant increase in engagement and revenue.&quot;
                      </p>
                      <p className="font-bold text-[18px] text-gray-200">Steve : Founder and CEO</p>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="flex bg-[#7F07EF] items-center px-4 py-4 rounded-xl border-4 border-white shadow-2xl shadow-purple-900/80">
                    <img src="./img/BetterWin-Icon.png" width={100} alt="avatar"></img>
                    <div className="ml-8">
                      <p className="font-bold text-gray-200 text-[26px]">Betterwin</p>
                      <p className=" text-[16px] text-gray-200 my-4">
                        &quot;Aff-Starter has been a pivotal partner in our journey from three months before launch to our initial week live. Their comprehensive support in setting up our affiliate program and overseeing our casino and sportsbook setup has been phenomenal. From strategizing bonuses and promotions to designing our creative assets, their expertise was integral to ensuring a smooth and successful launch.&quot;
                      </p>
                      <p className="font-bold text-[18px] text-gray-200">Raj - Founder and CEO</p>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="flex bg-[#7F07EF] items-center px-4 py-12 rounded-xl border-4 border-white shadow-2xl shadow-purple-900/80">
                    <img src="./img/play-frank-Icon.png" width={100} alt="avatar"></img>
                    <div className="ml-8">
                      <p className="font-bold text-gray-200 text-[26px]">Playfrank</p>
                      <p className=" text-[18px] text-gray-200 my-4">
                        &quot;Nathan from Aff-Starter has expertly led our affiliate program, aligning it perfectly with UKGC regulations and driving significant growth. His strategic guidance has been crucial in expanding our market presence effectively.&quot;
                      </p>
                      <p className="font-bold text-[18px] text-gray-200">Michel - Founder and CEO</p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="flex bg-[#7F07EF] items-center px-4 py-12 rounded-xl border-4 border-white shadow-2xl shadow-purple-900/80">
                    <img src="./img/Quickspinns-Icons.png" width={100} alt="avatar"></img>
                    <div className="ml-8">
                      <p className="font-bold text-gray-200 text-[26px]">Quickspinner</p>
                      <p className=" text-[18px] text-gray-200 my-4">
                        &quot;With Nathan at the helm of our affiliate program, managed by Aff-Starter, we&apos;ve seen remarkable enhancements in our operations. His deep understanding of the UKGC guidelines and affiliate management has propelled our brand forward.&quot;
                      </p>
                      <p className="font-bold text-[18px] text-gray-200">Michel - Founder and CEO</p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="flex bg-[#7F07EF] items-center px-4 py-12 rounded-xl border-4 border-white shadow-2xl shadow-purple-900/80">
                    <img src="./img/Wasino-icon.png" width={100} alt="avatar"></img>
                    <div className="ml-8">
                      <p className="font-bold text-gray-200 text-[26px]">Wasino</p>
                      <p className=" text-[18px] text-gray-200 my-4">
                        &quot;Over the past six months, Aff-Starter has been instrumental in navigating through some challenging periods for Wasino. Their steadfast support and expert management of our affiliate program have not only helped us stabilize but also position ourselves for future growth.&quot;
                      </p>
                      <p className="font-bold text-[18px] text-gray-200">Andy - CEO</p>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="flex bg-[#7F07EF] items-center px-4 py-12 rounded-xl border-4 border-white shadow-2xl shadow-purple-900/80">
                    <img src="./img/Loothoot-icon.png" width={100} alt="avatar"></img>
                    <div className="ml-8">
                      <p className="font-bold text-gray-200 text-[26px]">Loothoot</p>
                      <p className=" text-[18px] text-gray-200 my-4">
                        &quot;At Loothoot, leveraging the right influencers and streamers is crucial to our success, and Aff-Starter has been exceptional in this area. Their targeted approach has greatly enhanced our visibility and engagement, helping us stand out in the competitive unboxing market.&quot;
                      </p>
                      <p className="font-bold text-[18px] text-gray-200">Francisco - CEO</p>
                    </div>
                  </div>
                </SwiperSlide>

              </Swiper>
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
