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
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';


// import required modules
import { EffectCards } from 'swiper/modules';


export default function Home() {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState("./img/bg/bg-affilue-t.png");
  const [scrollY, setScrollY] = useState(0);
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setImageSrc("./img/bg/bg-affilue-t.png");
    } else {
      setImageSrc("./img/mobile/bg-affilue-t.png");
    }
  };

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

 

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
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
              // backgroundImage: "url('./img/bg/bg-affilue-2.png')",
              backgroundSize: "cover",
              backgroundPosition: "top",
              backgroundRepeat: "no-repeat",
            }}>
            <div></div>
            <img
              src="./img/Octo.png"
              className="w-[50vw] md:w-[30vw] hover:animate-scale"
              style={{
                zIndex: 1,
              }}></img>

            <div
             className="w-full h-full absolute left-0 md:block hidden flex  items-center"
             style={{
              zIndex: 1,
              transform: `translateY(${scrollY * 0.3}px)`,
              pointerEvents: "none",
             }}>
             <img src="./img/bg/bg-affilue-2.png" style={{
                zIndex: 1,
              }} className=" w-[80%] h-full"></img>
           </div>



            <div
              style={{ zIndex: 10 }}
              className="flex flex-col items-center md:w-[65%] w-[85%] mt-[3vw] text-[24px]  md:text-5xl xxl:text-6xl">
              <p class=" text-white font-bold ">Affiliate Managed Services</p>

              <p className="text-white xxl:text-3xl md:text-2xl text-[12px] md:mt-12 mt-4 text-center">
                Build powerful partnerships that drive growth with Aff-Starter&apos;s
                comprehensive Affiliate Management services. From targeted
                recruitment to ongoing optimization, we manage every step of the
                affiliate journey to ensure your brand thrives in diverse
                markets.
              </p>
            </div>


            <div className="hidden md:grid md:grid-cols-4 grid-cols-2 items-center w-[75%] mt-[3vw] gap-8">
              <div className="flex flex-col items-center border-black hover:animate-scale border-[3px] rounded-[30px] w-[17vw] px-6 py-8 bg-[#59DEEB] h-full" style={{zIndex:2}}>
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
              <div className="flex flex-col items-center hover:animate-scale border-black border-[3px] rounded-[30px] w-[17vw] px-6 py-6 bg-[#6D12D8] h-full text-white " style={{zIndex:2}}>
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
              <div className="flex flex-col items-center border-black hover:animate-scale border-[3px] rounded-[30px] w-[17vw] px-6 py-6 bg-[#59DEEB] h-full" style={{zIndex:2}}>
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
                  advice on adapting your brand&apos;s messaging and promotions to
                  resonate with local audiences, helping you drive conversions
                  with culturally relevant campaigns.
                </p>
              </div>
              <div className="flex flex-col  items-center border-black hover:animate-scale border-[3px] rounded-[30px] w-[17vw] px-6 py-6 bg-[#6D12D8] h-full text-white " style={{zIndex:2}}>
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
        <p className=" md:text-[3vw] text-[25px] font-bold text-[#6D12D8] leading-none">
          Ready to elevate your{" "}
        </p>
        <p className=" md:text-[3vw] text-[25px] font-bold text-black">
          affiliate partnerships?
        </p>
        <div className="flex w-full justify-center items-center pb-8">
          <Button className="bg-[#6D12D8] flex text-xl px-8 items-center rounded-[30px] mt-10  normal-case">
          <a href="/contact">Contact US</a>
          </Button>
        </div>
      </div>

      {/* <div className="">
        <div
          className="retention h-[100vh] md:h-[150vh] px-[10%] xxl:px-[15%] pt-32 md:pt-0"
          style={{
            // backgroundImage: "url(./img/bg/bg-affilue-3.png)",
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
          }}>
          <div className=" md:grid md:grid-cols-2 h-full justify-center items-center">
            <div className="hover:animate-scale">
              <p className="md:text-[3vw] text-[25px] font-bold  text-white text-center md:text-left leading-tight">
                <span className="md:text-[#70E8FC]">RETENTION </span> MANAGED
                SERVICES{" "}
              </p>
              <p className="md:text-[2vw] md:mt-16 mt-4 text-white text-center md:text-left">
                Maximize player lifetime value and build lasting loyalty with
                Aff-Starter&apos;s Retention Management services. Our tailored
                strategies keep players engaged, satisfied, and coming back for
                more.
              </p>
            </div>


            <div className="">
              <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                className="cards-swiper"
              >
                <SwiperSlide>
                  <div className="flex flex-col items-center justify-center  px-6 py-8 bg-white h-full">
                    <p className="font-bold text-2xl text-center text-black">
                      CRM Expertise On-Demand
                    </p>
                    <img
                      src="./img/curve-black.png"
                      className="my-4"
                      width="80%"
                      style={{
                        zIndex: 1,
                      }}
                    />
                    <p className="text-[20px] font-normal text-center text-black">
                      Need a CRM manager? We provide skilled professionals who adapt to your existing systems to maximize customer engagement and drive long-term loyalty.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="flex flex-col items-center justify-center  px-6 py-6 bg-white h-full">
                    <p className="font-bold text-2xl text-center text-black">
                      Cost-Effective CRM Management - Reduce Overheads!
                    </p>
                    <img
                      src="./img/curve-black.png"
                      className="my-4"
                      width="80%"
                      style={{
                        zIndex: 1,
                      }}
                    />
                    <p className="text-[20px] font-normal text-center text-black">
                      Manage your CRM with skilled experts, minizing the need for in-house training and resourcesand personnel expenses.
                    </p>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div> */}

      <div
        className="loyal flex flex-col items-center justify-center"
        style={{
          // backgroundImage: "url('./img/bg/bg-affilue-4.png')",
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}>
        <div className=" flex items-center justify-center mt-4 md:w-[50vw] hover:animate-scale w-[50vw]">
          <img className="" src="./img/rewards.png"></img>
        </div>
        <div className="flex flex-col items-center md:w-[35vw] w-[90vw] justify-center mt-8">
          <p className=" md:text-[3vw] text-[25px] font-bold text-[#70E8FC] leading-none">
            Ready to build a
          </p>
          <p className=" md:text-[3vw] text-[25px] font-bold text-black">
            loyal player base?
          </p>
          <p className="text-center mt-8 md:text-[20px]">
            Explore how Aff-Starter&apos;s Retention Management services can enhance
            player loyalty and boost your brand&apos;s long-term success. Contact us
            today to learn more.
          </p>
          <div className="flex w-full justify-center items-center md:pb-8 pb-12">
            <Button className="bg-[#6D12D8] flex text-xl px-8 items-center rounded-[30px] mt-10  normal-case">
            <a href="/contact">Contact US</a>
            </Button>
          </div>
        </div>
      </div>

      <div
        className="flex flex-col items-center justify-center bg-[#6D12D8] text-white md:pt-42 pt-12  md:pb-0 pb-12"
        style={{
          backgroundImage: "url('./img/bg/bg-affilue-5.png')",
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}>
        <p className="font-bold md:text-5xl text-[40px] text-center md:text-left lg:mt-12 ">
          Social Media Managed Services
        </p>
        <p className="md:w-[50vw] w-[80vw] text-center mt-8 md:text-2xl ">
          Take your brand to the next level with Aff-Starter&apos;s Social Media
          Managed Services. Combined with our QuestTracker gamification
          platform, we turn social media into a powerful tool for engagement,
          loyalty, and growth.
        </p>
        {/* <div className="flex">
          <p className="font-bold text-4xl mt-4">SWIPE</p>
          <div className="mt-8 ml-4 hover:animate-scale">
            <img src="./img/arrow.png"></img>
          </div>
        </div> */}
        <div className="flex lg:mb-24 pt-0 md:mt-32 mt-4 ">
             {/* <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                className="cards-swiper !mt-0 !bg-none"
              >
                <SwiperSlide className="!w-[250px]">
                  <div className="flex flex-col items-center justify-center mx-auto w-full rounded-[20px] font-['Bobby_Jones_Soft']">
                    <div className="relative w-[50%]">
                      <img 
                        src="./img/blank.png" 
                        alt="Social Media Service 1"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <p className="md:text-3xl text-[12px] px-4 text-center font-bold text-white">Social Media Management &amp; Strategy</p>
                        <p className="md:text-2xl text-[10px] text-black  md:mt-8 mt-2 md:px-4 px-2 text-center">
                        Master your social media landscape with our strategic management services. We plan and execute a tailored strategy across all platforms to increase your brand&apos;s visibility and engagement, ensuring your social media efforts align with your business goals.
                        </p>

                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="!w-[250px]">
                  <div className="flex flex-col items-center justify-center mx-auto w-full rounded-[20px] font-['Bobby_Jones_Soft']">
                    <div className="relative w-[50%]">
                      <img 
                        src="./img/blank.png" 
                        alt="Social Media Service 1"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                      <p className="md:text-3xl text-[12px] px-4 text-center font-bold text-white">Content Creation - Visual &amp; Text</p>
                      <p className="md:text-2xl text-[10px] text-black  md:mt-8 mt-2 md:px-4 px-2 text-center">
                           Elevate your brand with compelling content. Our team crafts high-quality visuals and engaging text that resonates with your audience, driving interactions and building lasting connections on every social media channel.
                        </p>

                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="!w-[250px]">
                  <div className="flex flex-col items-center justify-center mx-auto w-full rounded-[20px] font-['Bobby_Jones_Soft']">
                    <div className="relative w-[50%]">
                      <img 
                        src="./img/blank.png" 
                        alt="Social Media Service 1"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                      <p className="md:text-3xl text-[12px] px-4 text-center font-bold text-white">Discord Community Management</p>
                      <p className="md:text-2xl text-[10px] text-black  md:mt-8 mt-2 md:px-4 px-2 text-center">
                        Create a vibrant community on Discord with our management services. We set up, manage, and nurture your Discord server to foster engagement, organize events, and ensure a dynamic interaction space that reflects your brand&apos;s values and connects deeply with users.
                        </p>

                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="!w-[250px]">
                  <div className="flex flex-col items-center justify-center mx-auto w-full rounded-[20px] font-['Bobby_Jones_Soft']">
                    <div className="relative w-[50%]">
                      <img 
                        src="./img/blank.png" 
                        alt="Social Media Service 1"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                      <p className="md:text-3xl text-[12px] px-4 text-center font-bold text-white">Influencer Collaboration</p>
                      <p className="md:text-2xl text-[10px] text-black  md:mt-8 mt-2 md:px-4 px-2 text-center">
                        Connect with the perfect influencers to amplify your brand. We manage all aspects of influencer partnerships, from selection to campaign execution, ensuring influencers align with your brand values and reach your target demographics effectively.
                        </p>

                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="!w-[250px]">
                  <div className="flex flex-col items-center justify-center mx-auto w-full rounded-[20px] font-['Bobby_Jones_Soft']">
                    <div className="relative w-[50%]">
                      <img 
                        src="./img/blank.png" 
                        alt="Social Media Service 1"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                      <p className="md:text-3xl text-[12px] px-4 text-center font-bold text-white">Community Engagement</p>
                      <p className="md:text-2xl text-[10px] text-black  md:mt-8 mt-2 md:px-4 px-2 text-center">
                        Keep your community active and engaged. Our team specializes in maintaining a lively presence on your social platforms, responding to comments, initiating discussions, and managing your brand image to strengthen customer loyalty and satisfaction.
                        </p>

                      </div>
                    </div>
                  </div>
                </SwiperSlide>

              </Swiper> */}

              <div className="grid md:grid-cols-3 grid-cols-1 md:gap-12 gap-2 items-center justify-center mx-[10%]">
                <div className="bg-white text-white rounded-[40px] border border border-black border-[5px] px-8 py-8">
                   <p className="md:text-3xl text-[12px] px-4 text-center font-bold text-black">Discord Community Management</p>
                      <p className="md:text-2xl text-[10px] text-black  md:mt-8 mt-2 md:px-4 px-2 text-center">
                        Create a vibrant community on Discord with our management services. We set up, manage, and nurture your Discord server to foster engagement, organize events, and ensure a dynamic interaction space that reflects your brand&apos;s values and connects deeply with users.
                      </p>
                </div>
                <div className="bg-white text-white rounded-[40px] border border border-black border-[5px] px-8 py-8">
                   <p className="md:text-3xl text-[12px] px-4 text-center font-bold text-black">Influencer Collaboration</p>
                      <p className="md:text-2xl text-[10px] text-black  md:mt-8 mt-2 md:px-4 px-2 text-center">
                      Connect with the perfect influencers to amplify your brand. We manage all aspects of influencer partnerships, from selection to campaign execution, ensuring influencers align with your brand values and reach your target demographics effectively.
                      </p>
                </div>
                <div className="bg-white text-white rounded-[40px] border border border-black border-[5px] px-8 py-8">
                   <p className="md:text-3xl text-[12px] px-4 text-center font-bold text-black">Monthly Performance Reports</p>
                      <p className="md:text-2xl text-[10px] text-black  md:mt-8 mt-2 md:px-4 px-2 text-center text">
                      See the bigger picture with clear, act  ionable i   nsights. Each month, we provide a detailed report on engagement, reach, and campaign performance, giving you a comprehensive view of your brand&apos;s social media impact.
                      </p>
                </div>

                <div className="bg-white text-white rounded-[40px] border border border-black border-[5px] px-8 py-8">
                   <p className="md:text-3xl text-[12px] px-4 text-center font-bold text-black">Community Management</p>
                      <p className="md:text-2xl text-[10px] text-black  md:mt-8 mt-2 md:px-4 px-2 text-center">
                      Keep your followers engaged and loyal. Our team actively respond to comments  , messages, and feedback, buildi ng trust and a positive brand image that players want to be part of.
                      </p>
                </div>
                <div className="bg-white text-white rounded-[40px] border border border-black border-[5px] px-8 py-8">
                   <p className="md:text-3xl text-[12px] px-4 text-center font-bold text-black">Content Creation &amp; Strategy</p>
                      <p className="md:text-2xl text-[10px] text-black  md:mt-8 mt-2 md:px-4 px-2 text-center">
                        Make your brand unforgettable with standout content. We develop a unique content strategy that reflects your brand&apos;s personality, crafting posts that entertain, inform, and spark conversations across all major platforms.
                      </p>
                </div>
                <div className="bg-white text-white rounded-[40px] border border border-black border-[5px] px-8 py-8">
                   <p className="md:text-3xl text-[12px] px-4 text-center font-bold text-black">Real-Time Engagement Monitoring</p>
                      <p className="md:text-2xl text-[10px] text-black  md:mt-8 mt-2 md:px-4 px-2 text-center text">
                      Stay a head with real-time insights. Our team continuously monitors engagement metrics and social trends, allowing us to adjust strategies quickly to maximize impact.
                      </p>
                </div>

              </div>

         </div>
      </div>
{/* 
      <div
        className="w-full h-[200px] md:block hidden"
        style={{
          backgroundImage: "url('./img/bg/bg-affilue-6.png')",
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}></div> */}

      <div className="flex flex-col items-center md:text-left text-center  justify-center md:mt-20 mt-4">
        <p className="md:text-[3vw] text-[30px] font-bold  text-black  leading-tight">
          <span className="text-[#70E8FC]">Some work We&apos;ve Done</span>
        </p>
        <p className=" md:text-2xl text-center mt-8 md:px-[20%] px-[20px]">
        From emerging brands to established players, we&apos;ve helped clients turn performance goals into measurable growth. Our team has executed influencer campaigns, paid media strategies, and affiliate partnerships that deliver real conversions , not vanity metrics. Every project reflects our core focus &#58; data-driven marketing that scales reach, sharpens ROI, and drives sustainable acquisition.
        </p>
        <div className="mt-8 flex md:flex-row flex-col gap-4 w-full md:px-[20%] px-[5%] md:mb-16">
          {/* Left Side - Contains nested grid with 3 top elements and 2 bottom elements */}
          <div className="flex-1 grid md:grid-cols-6 md:grid-rows-2 grid-cols-1 gap-4">
            {/* Top Row - First Element */}
            <div className="relative rounded-[20px] overflow-hidden border-2 border-black  cursor-pointer md:col-span-2">
              <img src="./img/work/1.png" alt="Work 1" className="w-full h-full object-cover" />
            </div>
            
            {/* Top Row - Second Element */}
            <div className="relative rounded-[20px] overflow-hidden border-2 border-black  cursor-pointer md:col-span-2">
              <img src="./img/work/2.png" alt="Work 2" className="w-full h-full object-cover" />
            </div>
            
            {/* Top Row - Third Element */}
            <div className="relative rounded-[20px] overflow-hidden border-2 border-black  cursor-pointer md:col-span-2">
              <video 
                src="./img/work/1.mp4" 
                controls 
                className="w-full h-full object-cover"
                preload="metadata"
                autoPlay={true}
                loop={true}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            
            {/* Bottom Row - First Element */}
            <div className="relative rounded-[20px] overflow-hidden border-2 border-black  cursor-pointer md:col-span-3">
            <video 
              src="./img/work/3.mp4" 
              controls 
              className="w-full h-full object-cover"
              preload="metadata"
              autoPlay={1}
              loop={true}
            >
              Your browser does not support the video tag.
            </video>
            </div>
            
            {/* Bottom Row - Second Element */}
            <div className="relative rounded-[20px] overflow-hidden border-2 border-black  cursor-pointer md:col-span-3">
              <img src="./img/work/3.png" alt="Work 3" className="w-full h-full object-cover" />
            </div>
          </div>
          
          {/* Right Side - Single element spanning both rows */}
          <div className="md:w-[30%] w-full relative rounded-[20px] overflow-hidden border-2 border-black  cursor-pointer">
            <video 
              src="./img/work/2.mp4" 
              controls 
              className="w-full h-full object-cover"
              preload="metadata"
              autoPlay={true}
              loop={true}
            >
              Your browser does not support the video tag.
            </video>
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
