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
              className="w-[30vw] md:w-[20vw]"
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
              <div className="flex flex-col items-center border-black border-[3px] rounded-[30px] w-[17vw] px-6 py-8 bg-[#59DEEB] h-full" style={{zIndex:2}}>
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
              <div className="flex flex-col items-center border-black border-[3px] rounded-[30px] w-[17vw] px-6 py-6 bg-[#6D12D8] h-full text-white " style={{zIndex:2}}>
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
              <div className="flex flex-col items-center border-black border-[3px] rounded-[30px] w-[17vw] px-6 py-6 bg-[#59DEEB] h-full" style={{zIndex:2}}>
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
              <div className="flex flex-col  items-center border-black border-[3px] rounded-[30px] w-[17vw] px-6 py-6 bg-[#6D12D8] h-full text-white " style={{zIndex:2}}>
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
          <a href="/contact">Contact US</a>
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
            Explore how Aff-Starter&apos;s Retention Management services can enhance
            player loyalty and boost your brand&apos;s long-term success. Contact us
            today to learn more.
          </p>
          <div className="flex w-full justify-center items-center md:pb-8 pb-12">
            <Button className="bg-[#F25411] flex text-xl px-8 items-center rounded-[30px] mt-10  normal-case">
            <a href="/contact">Contact US</a>
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
        <p className="font-bold md:text-5xl text-[40px] text-center md:text-left lg:mt-12 ">
          Social Media Managed Services
        </p>
        <p className="md:w-[50vw] w-[80vw] text-center mt-8 md:text-2xl ">
          Take your brand to the next level with Aff-Starter&apos;s Social Media
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
        <div className="flex lg:mb-24 pt-0 ">
             <Swiper
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

              </Swiper>

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
              <strong>24/7 multilingual support</strong> Keep your players supported around the clock. Our multilingual team provides immediate, knowledgeable assistance, ensuring a seamless experience wherever they are.
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
