"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Input } from "@material-tailwind/react";
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

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const questDiv = useRef(null);
  const router = useRouter();
  const [buttonText, setButtonText] = useState("Learn More About Our Services");
  const [questtop, setQuesttop] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };
  const handleResize = () => {
    setQuesttop(questDiv.current.getBoundingClientRect().top);
    console.log(questDiv.current.getBoundingClientRect().top);
    if (window.innerWidth >= 1024) {
      // lg breakpoint
      setButtonText("Learn More About Our Services");
    } else {
      setButtonText("Learn More");
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
          className="absolute mt-[6vw] ml-[7vw] hidden lg:block"
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
              <Button className="bg-[#F25411] flex lg:text-xl text-[20px] items-center rounded-[30px] mt-10">
                Get Started{" "}
                <img
                  src="./img/icon_start.png"
                  className="ml-2 hidden lg:block"></img>
              </Button>
            </div>
          </div>

          <div className="mt-16 flex hidden lg:flex">
            <img src="./img/mark1.png" className="mr-4 h-[30px]"></img>
            <img src="./img/mark2.png" className="mr-4 h-[30px]"></img>
            <img src="./img/mark3.png" className="mr-4 h-[30px]"></img>
            <img src="./img/mark4.png" className="mr-4 h-[30px]"></img>
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
          <div className="w-[400px] floating-image1 absolute right-12 top-[200px]">
            <img src="./img/animation/2.png"></img>
          </div>
        </div>
      </div>
      <div className="relative mt-4 w-[]" style={{ zIndex: 10 }}>
        <div
          className="absolute w-[25vw] top-[600px] hidden lg:block left-24"
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
            style={{ zIndex: 3 }}
            className="flex flex-col relative  items-center text-center mx-auto text-white  lg:pt-44 pt-44 pb-12">
            <p className="lg:text-5xl text-3xl font-bold ">
              Managed Services to{" "}
              <span className="text-[#6DE0F6] ml-2"> Elevate Your Brand</span>
            </p>
            <p className="lg:text-2xl text-[18px]  lg:px-[10%] text-center mt-8">
              Aff-Starter offers a full suite of managed services designed to
              drive player retention, boost traffic, and deliver top-tier
              customer support. From affiliate management to social media
              strategies, we’ve got you covered.
            </p>
          </div>

          <div className="lg:flex grid place-items-center  lg:justify-end justify-center ">
            <div
              style={{
                // backgroundImage: "url('./img/archieve.png')",
                backgroundSize: "contain",
                backgroundPosition: "top",
                backgroundRepeat: "no-repeat",
              }}
              className="relative card lg:h-[25vw] lg:w-[25vw] w-[75vw] h-[250px] transition-transform duration-300 transform hover:animate-scale">
              <div className="lg:absolute lg:left-[3vw] lg:top-[4vw] lg:w-[13vw] flex items-center justify-center">
                <p className=" font-bold lg:text-[1.5vw] text-[20px] flex lg:mt-0 mt-12">
                  AFFILIATE MANAGEMENT
                </p>
              </div>
              <div className="lg:absolute lg:left-[3vw] lg:top-[9vw] lg:w-[12vw] lg:px-0 lg:mt-0 mt-8 px-8 flex justify-center items-center">
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
              className="relative card lg:h-[25vw] lg:w-[25vw] w-[75vw] h-[250px] transition-transform duration-300 transform hover:animate-scale">
              <div className="lg:absolute lg:left-[3vw] lg:top-[4vw] lg:w-[13vw] flex items-center justify-center">
                <p className=" font-bold lg:text-[1.5vw] text-[20px] flex lg:mt-0 mt-12">
                  Retention Management
                </p>
              </div>
              <div className="lg:absolute lg:left-[3vw] lg:top-[9vw] lg:w-[12vw] lg:px-0 lg:mt-0 mt-4 px-8 flex justify-center items-center">
                <p className=" font-normal lg:text-[1.5vw] text-[16px]">
                  Enhance player retention and loyalty with personalized CRM
                  strategies.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:flex grid place-items-center  lg:justify-end justify-center ">
            <div
              style={{
                // backgroundImage: "url('./img/archieve.png')",
                backgroundSize: "contain",
                backgroundPosition: "top",
                backgroundRepeat: "no-repeat",
              }}
              className="relative card lg:h-[25vw] lg:w-[25vw] w-[75vw] h-[250px] transition-transform duration-300 transform hover:animate-scale">
              <div className="lg:absolute lg:left-[3vw] lg:top-[4vw] lg:w-[13vw] flex items-center justify-center">
                <p className=" font-bold lg:text-[1.5vw] text-[20px] flex lg:mt-0 mt-12">
                  Social Media Management
                </p>
              </div>
              <div className="lg:absolute lg:left-[3vw] lg:top-[9vw] lg:w-[12vw] lg:px-0 lg:mt-0 mt-4 px-8 flex justify-center items-center">
                <p className=" font-normal lg:text-[1.5vw] text-[18px]">
                  Boost visibility and engagement with targeted social
                  campaigns.
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
              className="relative card lg:h-[25vw] lg:w-[25vw] w-[75vw] h-[250px] transition-transform duration-300 transform hover:animate-scale">
              <div className="lg:absolute lg:left-[3vw] lg:top-[4vw] lg:w-[13vw] flex items-center justify-center">
                <p className=" font-bold lg:text-[1.5vw] text-[20px] flex lg:mt-0 mt-12">
                  Customer Service
                </p>
              </div>
              <div className="lg:absolute lg:left-[3vw] lg:top-[9vw] lg:w-[12vw] lg:px-0 lg:mt-0 mt-8 px-8 flex justify-center items-center">
                <p className=" font-normal lg:text-[1.5vw] text-[18px]">
                  24/7 multilingual support for your players.
                </p>
              </div>
            </div>
          </div>

          <div className="flex w-full justify-center items-center lg:mt-28 pb-8">
            <Button className="bg-[#F25411] flex text-xl px-8 items-center rounded-[30px] lg:mt-10  normal-case">
              {buttonText}
            </Button>
          </div>
        </div>
        <div
          className="w-[100%] h-[279px]"
          style={{
            backgroundImage: "url('./img/bg/bg-2-footer.png')",
            backgroundSize: "contain",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
          }}></div>
        <div
          className="relative px-[10%] xxl:px-[15%] py-16"
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
          <div className="mt-4">
            <img src="./img/logo-quest.png" className="w-[35vw]"></img>
          </div>
          <div className="mt-8 flex">
            <div>
              {" "}
              <div className="w-[25vw] px-8 rounded-[20px] border border-[4px] border-black py-16 bg-white">
                <span className="text-[3vw] font-bold flex text-[#6DE0F6] flex flex-col leading-tight">
                  Gamification 
                  <p className="text-black font-bold leading-none">
                    {" "}
                    Meets Social Engagement
                  </p>
                </span>

                <p className="mt-8 text-[1.5vw]">
                  Revolutionise player engagement with our QuestTracker
                  platform, combining gamification with social media integration
                  for an immersive experience that drives player loyalty.
                </p>
              </div>
              <div>
                {" "}
                <Button className="bg-[#F25411] flex text-xl py-5 px-8 items-center rounded-[35px] mt-10 normal-case">
                  Discover QuestTracker
                </Button>
              </div>
            </div>

            <div className="px-8">
              <img src="./img/jorney-track 1.png"></img>
            </div>
          </div>
        </div>

        <div
          className=" flex flex-col bg-[#6D09DD] items-end px-[10%] xxl:px-[15%] relative"
          style={{
            backgroundImage: "url('./img/bg/bg-4 -1.png')",
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
            zIndex: 1,
          }}>
          <div
            className="w-full h-full absolute left-0"
            style={{
              zIndex: 0,
              transform: `translateY(${scrollY * 0.3 - 1000}px)`,
              pointerEvents: "none",
            }}>
            <img src="./img/bg/bg-4-mask.png" className=" w-full h-full"></img>
          </div>

          <div>
            <img src="./img/logo-affiliu.png" className="50vw mt-72"></img>
          </div>
          <div className="w-[30vw] text-white mt-12">
            <span className="text-[3.5vw] font-bold flex text-[#6DE0F6] flex flex-col leading-tight">
              High Quality 
              <p className="text-white font-bold leading-none">
                {" "}
                Traffic from Trusted Sources
              </p>
            </span>

            <p className="mt-8 text-[1.5vw]">
              Affilu connects iGaming brands with premium affiliate partners,
              delivering traffic that converts. Our quality-driven network
              ensures only the best affiliates promote your brand.
            </p>
            <div className="mb-32">
              {" "}
              <Button className="bg-[#F25411] flex text-xl py-5 px-8 items-center rounded-[35px] mt-10 normal-case">
                Explore Our Affiliate Network
              </Button>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col  items-center px-[10%] xxl:px-[15%] py-16 relative"
          style={{
            backgroundImage: "url('./img/bg/bg-5.png')",
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
          }}>
          <div
            className=" absolute left-0"
            style={{
              zIndex: 0,
              transform: `translateY(${scrollY * 0.3 - 1400}px)`,
              pointerEvents: "none",
            }}>
            <img src="./img/bg/bg-5-mask.png" className=" w-[75%] h-full"></img>
          </div>
          <span className="text-[2.5vw] font-bold flex" style={{ zIndex: 1 }}>
            Unlock the full potential of
            <p className="font-bold  ml-[1vw] text-[#6DE0F6]  border-b border-[#6DE0F6] border-b-[6px] leadin-none">
              {" "}
              your iGaming brand
            </p>
          </span>
          <div className="my-16" style={{ zIndex: 1 }}>
            <img src="./img/unlock.png"></img>
          </div>
          <div className="flex" style={{ zIndex: 1 }}>
            <div className="w-[23vw] px-12 rounded-[20px] border border-[4px] border-black py-12 bg-white">
              <span className="text-[2.5vw] font-bold flex text-[#5700FF] flex flex-col leading-tight">
                CUSTOM SOLUTIONS
              </span>
              <p className="mt-8 text-[1.5vw]">
                Our expert team delivers scalable web and mobile solutions
                designed for the unique demands of the iGaming industry.
              </p>
            </div>
            <div className="w-[23vw] px-12 rounded-[20px] border border-[4px] border-black py-12 ml-4 bg-white">
              <span className="text-[2.5vw] font-bold flex text-black flex flex-col leading-tight">
                Technologies
              </span>
              <p className="mt-8 text-[1.5vw]">
                From cutting-edge front-end development to secure, cloud-based
                infrastructure, we cover everything you need to bring your
                vision to life.
              </p>
            </div>
            <div className="flex ">
              <div className="w-[23vw] px-12 rounded-[20px] border border-[4px] border-black py-12 ml-4 bg-white">
                <span className="text-[2.5vw] font-bold flex text-[#5700FF] flex flex-col leading-tight">
                  Blockchain & AI
                </span>
                <p className="mt-8 text-[1.5vw]">
                  Leverage advanced technologies such as blockchain for secure
                  transactions and AI for data-driven player engagement.
                </p>
              </div>
            </div>
          </div>
          <div>
            <Button className="bg-[#0FC3C3] flex text-[22px] py-5 px-12 items-center rounded-[35px] mt-10 normal-case">
              Explore Development Solutions
            </Button>
          </div>
        </div>

        <div
          className="relative flex flex-col  items-start px-[10%] xxl:px-[15%] py-16 mt-[-60px]"
          style={{
            backgroundImage: "url('./img/bg/bg-6.png')",
            backgroundSize: "cover",
            // backgroundPosition: "left",
            backgroundRepeat: "no-repeat",
            zIndex: 10,
          }}>
          <div>
            {" "}
            <div className="w-[37vw] px-8 rounded-[20px]   py-12">
              <span className="text-[3vw] font-bold flex-col text-white  leading-tight">
                Expert Consultancy Tailored for
                <span className=" font-bold leading-none text-[#6DE0F6]">
                  {" "}
                  Your Success
                </span>
              </span>

              <p className="mt-8 text-[1.5vw] text-white">
                Revolutionise player engagement with our QuestTracker platform,
                combining gamification with social media integration for an
                immersive experience that drives player loyalty.
              </p>
            </div>
            <div className="px-8">
              {" "}
              <Button className="bg-[#F25411] flex text-xl py-3 px-8 items-center rounded-[35px] mt-10 normal-case">
                Discover QuestTracker
              </Button>
            </div>
          </div>
        </div>
        <div
          className="w-full h-[130px]"
          style={{
            backgroundImage: "url('./img/bg/bg-6-footer.png')",
            backgroundSize: "cover",
            backgroundPosition: "left",
            backgroundRepeat: "no-repeat",
          }}></div>
        <div className=" grid grid-cols-2   py-16">
          <div className="flex flex-col pl-[15vw]">
            <span className="text-[2.3vw] font-bold flex">
              WHAT OUR
              <p className="font-bold  ml-[1vw] text-[#6DE0F6]  border-b border-[#6DE0F6] border-b-[6px] leadin-none">
                {" "}
                CLIENTS SAY
              </p>
            </span>
            <p className="text-[1.5vw] mt-8">
              Don’t take our word for it—see how we’ve helped brands like yours
              grow and succeed in the competitive iGaming industry
            </p>
            <div>
              <img src="./img/say.png"></img>
            </div>
          </div>
          <div
            className="pl-16 w-full h-full"
            style={{
              backgroundImage: "url('./img/bg-say.png')",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}>
            <div className="bg-white w-[30vw]">
              <div className="flex bg-white items-center px-8 py-8 w-[30vw]">
                <img src="./img/avarta.png"></img>

                <div className="ml-8">
                  <p className="font-bold text-[2vw]">John Doe</p>
                  <p className="text-[1.1vw]">
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    elit nibh, fringilla non metus sit amet, fermentum tincidunt
                    enim”
                  </p>
                </div>
              </div>

              <div className="flex bg-[#9F07EF] ml-[-40px] items-center px-8 py-8 w-[30vw]">
                <img src="./img/avarta.png"></img>

                <div className="ml-8">
                  <p className="font-bold text-[2vw]">John Doe</p>
                  <p className="text-[1.1vw]">
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    elit nibh, fringilla non metus sit amet, fermentum tincidunt
                    enim”
                  </p>
                </div>
              </div>
              <div className="flex bg-white items-center px-8 py-8 w-[30vw]">
                <img src="./img/avarta.png"></img>

                <div className="ml-8">
                  <p className="font-bold text-[2vw]">John Doe</p>
                  <p className="text-[1.1vw]">
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    elit nibh, fringilla non metus sit amet, fermentum tincidunt
                    enim”
                  </p>
                </div>
              </div>
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
