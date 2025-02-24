"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Carousel, IconButton } from "@material-tailwind/react";
import Footer from "../components/footer";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


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
            you&apos;re a start-up or an established casino, our transparent pricing
            structure ensures you only pay for what you need.
          </p>
        </div>
      </div>

      <div className="md:hidden flex flex-col items-center bg-cover justify-center  w-full bg-top bg-no-repeat relative">
        <Image
          src="/img/pricing/m-plan.png"
          alt="Mobile pricing plan background"
          width={1920}
          height={1080}
          className="w-full"
          priority
          sizes="100vw"
        />
          <div className="mt-16 text-center absolute top-0 left-0 z-10">
            <p className="text-white  text-2xl font-bold px-4">
              Flexible plans tailored to meet the needs of your iGaming brand.
            </p>
            <p className="text-white md:text-3xl text-[16px] md:w-[50%] mt-10 md:pr-10 px-8">
              At Aff-Starter, we offer comprehensive affiliate, CRM, and social
              media management solutions designed to deliver results. Whether
              you&apos;re a start-up or an established casino, our transparent pricing
              structure ensures you only pay for what you need.
            </p>
          </div>
        </div>


      <div className="flex flex-col items-center text-center px-4 my-10 w-full md:px-[15%]">
        <div
            className="w-full h-full absolute left-0 md:block hidden"
            style={{
              zIndex: -1,
              transform: `translateY(${scrollY * 0.3 - 80}px)`,
              pointerEvents: "none",
            }}>
            <img src="./img/bg/bg-3.png" className=" w-[80%] h-full"></img>
        </div>
        
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
            className="flex flex-col items-center hover:animate-scale  py-[50px] px-[20px]  bg-cover bg-center bg-no-repeat relative"
            style={{
              backgroundImage: "url('/img/pricing/pricing1.png')",
              backgroundSize: "100% 100%",
            }}>
            <p className="text-black text-3xl font-bold">Pay-as-You-Go</p>
            <p className="text-black text-center text-[14px] mt-4">
              No long-term commitment&mdash;ideal for flexibility.
            </p>

            <Image
              src="/img/curve.png"
              alt="Decorative curve"
              width={800}
              height={100}
              className="my-2"
              style={{
                zIndex: 1,
              }}
              sizes="80vw"
            ></Image>

            <p className="text-black text-center text-[14px] mt-4 px-2 underline">
              Full affiliate management Deal negotiation Retention optimisation
            </p>
            <span className="text-black text-center font-bold text-[30px] mt-4">
              €4,500
              <span className="text-[14px]">p/m</span>
            </span>
          </div>

          <div
            className="flex flex-col items-center hover:animate-scale  py-[60px] px-[20px]  bg-cover bg-center bg-no-repeat relative"
            style={{
              backgroundImage: "url('/img/pricing/pricing2.png')",
              backgroundSize: "100% 100%",
            }}>
            <p className="text-white text-3xl font-bold">Aff-Starter Plan</p>

            <Image
              src="/img/curve.png"
              alt="Decorative curve"
              width={800}
              height={100}
              className="mb-2 mt-6"
              style={{
                zIndex: 1,
              }}
              sizes="80vw"
            ></Image>

            <p className="text-white text-center text-[14px] mt-4 px-2 underline">
              Core affiliate management and deal negotiation services.
            </p>
            <span className="text-white text-center font-bold text-[30px] mt-4">
              €3,500
              <span className="text-[14px]">p/m</span>
            </span>
          </div>

          <div
            className="flex flex-col items-center hover:animate-scale py-[50px] px-[20px]  bg-cover bg-center bg-no-repeat relative"
            style={{
              backgroundImage: "url('/img/pricing/pricing1.png')",
              backgroundSize: "100% 100%",
            }}>
            <p className="text-black text-3xl font-bold">Aff-Driver Plan</p>

            <Image
              src="/img/curve.png"
              alt="Decorative curve"
              width={800}
              height={100}
              className="my-2 mt-4"
              style={{
                zIndex: 1,
              }}
              sizes="80vw"
            ></Image>

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
            className="flex flex-col items-center  hover:animate-scale py-[60px] px-[20px]  bg-cover bg-center bg-no-repeat relative"
            style={{
              backgroundImage: "url('/img/pricing/pricing2.png')",
              backgroundSize: "100% 100%",
            }}>
            <span className="text-white text-3xl font-bold">
              Aff-Driver
              <span className="text-[#FF6D00] text-xl font-bold">+</span>
              Plan
            </span>

            <Image
              src="/img/curve.png"
              alt="Decorative curve"
              width={800}
              height={100}
              className="mb-2 mt-6"
              style={{
                zIndex: 1,
              }}
              sizes="80vw"
            ></Image>

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

        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          className="md:!hidden !mt-8 w-[60%]"
        >
          <SwiperSlide>
            <div
              className="flex flex-col items-center pt-[50px] px-[15px] bg-cover bg-center bg-no-repeat relative min-h-[320px]"
              style={{
                backgroundImage: "url('/img/pricing/pricing1.png')",
                backgroundSize: "100% 100%",
              }}>
              <p className="text-black text-2xl font-bold">Pay-as-You-Go</p>
              <p className="text-black text-center text-[12px] mt-2">
                No long-term commitment&mdash;ideal for flexibility.
              </p>

              <Image
                src="/img/curve.png"
                alt="Decorative curve"
                width={600}
                height={100}
                className="my-2"
                style={{
                  zIndex: 1,
                }}
                sizes="60vw"
              />

              <p className="text-black text-center text-[12px] mt-2 px-2 underline">
                Full affiliate management Deal negotiation Retention optimisation
              </p>
              <span className="text-black text-center font-bold text-[24px] mt-2">
                €4,500
                <span className="text-[12px]">p/m</span>
              </span>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="flex flex-col items-center py-[30px] px-[15px] bg-cover bg-center bg-no-repeat relative min-h-[320px]"
              style={{
                backgroundImage: "url('/img/pricing/pricing2.png')",
                backgroundSize: "100% 100%",
              }}>
              <p className="text-white text-2xl font-bold">Aff-Starter Plan</p>

              <Image
                src="/img/curve.png"
                alt="Decorative curve"
                width={600}
                height={100}
                className="my-2"
                style={{
                  zIndex: 1,
                }}
                sizes="60vw"
              />

              <p className="text-white text-center text-[12px] mt-2 px-2 underline">
                Core affiliate management and deal negotiation services.
              </p>
              <span className="text-white text-center font-bold text-[24px] mt-2">
                €3,500
                <span className="text-[12px]">p/m</span>
              </span>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="flex flex-col items-center py-[30px] px-[15px] bg-cover bg-center bg-no-repeat relative min-h-[320px]"
              style={{
                backgroundImage: "url('/img/pricing/pricing1.png')",
                backgroundSize: "100% 100%",
              }}>
              <p className="text-black text-2xl font-bold">Aff-Driver Plan</p>

              <Image
                src="/img/curve.png"
                alt="Decorative curve"
                width={600}
                height={100}
                className="my-2"
                style={{
                  zIndex: 1,
                }}
                sizes="60vw"
              />

              <p className="text-black text-center text-[12px] mt-2 px-2 underline">
                All Aff-Starter services plus social media management and basic
                content creation.
              </p>
              <span className="text-black text-center font-bold text-[24px] mt-2">
                €4,500
                <span className="text-[12px]">p/m</span>
              </span>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="flex flex-col items-center py-[30px] px-[15px] bg-cover bg-center bg-no-repeat relative min-h-[320px]"
              style={{
                backgroundImage: "url('/img/pricing/pricing2.png')",
                backgroundSize: "100% 100%",
              }}>
              <span className="text-white text-2xl font-bold">
                Aff-Driver
                <span className="text-[#FF6D00] text-xl font-bold">+</span>
                Plan
              </span>

              <Image
                src="/img/curve.png"
                alt="Decorative curve"
                width={600}
                height={100}
                className="my-2"
                style={{
                  zIndex: 1,
                }}
                sizes="60vw"
              />

              <p className="text-white text-center text-[12px] mt-2 px-2 underline">
                All Aff-Driver services with enhanced optimisation and deal
                negotiation.
              </p>
              <span className="text-white text-center font-bold text-[24px] mt-2">
                €6,500
                <span className="text-[12px]">p/m</span>
              </span>
            </div>
          </SwiperSlide>
        </Swiper>
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
              className="flex flex-col items-center hover:animate-scale py-[50px] px-[20px] min-h-[500px] bg-cover bg-center bg-no-repeat relative"
              style={{
                backgroundImage: "url('/img/pricing/pricing1.png')",
                backgroundSize: "100% 100%",
              }}>
              <p className="text-black text-3xl font-bold">CRM Management</p>
              <p className="text-black text-center text-[14px] mt-4">
                Enhance player engagement and retention with our scalable CRM solutions:
              </p>

              <Image
                src="/img/curve.png"
                alt="Decorative curve"
                width={800}
                height={100}
                className="my-2"
                style={{
                  zIndex: 1,
                }}
                sizes="80vw"
              ></Image>

              <p className="text-black text-center text-[14px] mt-4 px-2 underline">
                 Dedicated CRM manager Advanced optimisation tools Comprehensive retention
              </p>
              <span className="text-black text-center font-bold text-[30px] mt-4">
                <span className="text-[14px] ">From</span>€2,500
                <span className="text-[14px]">p/m</span>
              </span>
            </div>

            <div
              className="flex flex-col items-center min-h-[500px] hover:animate-scale py-[30px] px-[20px]  bg-cover bg-center bg-no-repeat relative"
              style={{
                backgroundImage: "url('/img/pricing/pricing2.png')",
                backgroundSize: "100% 100%",
              }}>
              <p className="text-white text-3xl font-bold">Social Media Management</p>
              <p className="text-white text-center text-[14px] mt-4">
                Build your brand&apos;s presence & connect with your audience through strategic social media campaigns:
              </p>
              
              <Image
                src="/img/curve.png"
                alt="Decorative curve"
                width={800}
                height={100}
                className="mb-2 mt-6"
                style={{
                  zIndex: 1,
                }}
                sizes="80vw"
              ></Image>

              <p className="text-white text-center text-[14px] mt-4 px-2 underline">
              Dedicated social media manager Content creation and campaign management Performance tracking and detailed reporting
              </p>
              <span className="text-white text-center font-bold text-[30px] mt-4">
                <span className="text-[14px] ">From</span>€2,500
                <span className="text-[14px]">p/m</span>
              </span>
            </div>

            <div
              className="flex flex-col items-center min-h-[500px] py-[50px] px-[20px] hover:animate-scale bg-cover bg-center bg-no-repeat relative"
              style={{
                backgroundImage: "url('/img/pricing/pricing1.png')",
                backgroundSize: "100% 100%",
              }}>
              <p className="text-black text-3xl font-bold">Customer Service & VIP Management</p>
              <p className="text-black text-center text-[14px] mt-4">
               Boost player satisfaction with our multilingual, 24/7 support solutions:
              </p>

              <Image
                src="/img/curve.png"
                alt="Decorative curve"
                width={800}
                height={100}
                className="my-2"
                style={{
                  zIndex: 1,
                }}
                sizes="80vw"
              ></Image>

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
              className="flex flex-col items-center min-h-[500px] hover:animate-scale py-[60px] px-[20px]  bg-cover bg-center bg-no-repeat relative"
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

              <Image
                src="/img/curve.png"
                alt="Decorative curve"
                width={800}
                height={100}
                className="mb-2 mt-6"
                style={{
                  zIndex: 1,
                }}
                sizes="80vw"
              ></Image>

              <p className="text-black text-center text-3xl mt-4 font-bold ">
                POC
              </p>
              <p className="text-black text-center text-xl  font-bold ">
                (Price on Consultation)
              </p>
            </div>

          </div>

        <div className="md:hidden mt-8 px-4 w-full flex justify-center items-center">

          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            className="md:hidden mt-8 w-[80%]"
          >
            {[
              {
                title: "CRM Management",
                description: "Enhance player engagement and retention with our scalable CRM solutions:",
                details: "Dedicated CRM manager Advanced optimisation tools Comprehensive retention",
                price: "€2,500",
                bgImage: "pricing1.png",
                textColor: "black"
              },
              {
                title: "Social Media Management",
                description: "Build your brand&apos;s presence & connect with your audience through strategic social media campaigns:",
                details: "Dedicated social media manager Content creation and campaign management Performance tracking and detailed reporting",
                price: "€2,500",
                bgImage: "pricing2.png",
                textColor: "white"
              },
              {
                title: "Customer Service & VIP Management",
                description: "Boost player satisfaction with our multilingual, 24/7 support solutions:",
                details: "VIP management Comprehensive player support",
                price: "POC",
                bgImage: "pricing1.png",
                textColor: "black",
                isPOC: true
              },
              {
                title: "Customised Consultancy Services",
                description: "Get expert advice on casino operations, payments, and legal aspects of your iGaming",
                price: "POC",
                bgImage: "pricing2.png",
                textColor: "white",
                isPOC: true
              }
            ].map((slide, index) => (
              <SwiperSlide key={index}>
                <div
                  className="flex flex-col items-center min-h-[400px]  pt-[50px] px-[15px] bg-cover bg-center bg-no-repeat relative"
                  style={{
                    backgroundImage: `url('/img/pricing/${slide.bgImage}')`,
                    backgroundSize: "100% 100%",
                  }}>
                  <p className={`text-${slide.textColor} text-2xl font-bold`}>{slide.title}</p>
                  <p className={`text-${slide.textColor} text-center text-[12px] mt-2`}>
                    {slide.description}
                  </p>
                  <Image
                    src="/img/curve.png"
                    alt="Decorative curve"
                    width={600}
                    height={100}
                    className="my-2"
                    style={{ zIndex: 1 }}
                    sizes="60vw"
                  />
                  {slide.details && (
                    <p className={`text-${slide.textColor} text-center text-[12px] mt-2 px-2 underline`}>
                      {slide.details}
                    </p>
                  )}
                  {slide.isPOC ? (
                    <>
                      <p className="text-black text-center text-2xl mt-2 font-bold">POC</p>
                      <p className="text-black text-center text-base font-bold">(Price on Consultation)</p>
                    </>
                  ) : (
                    <span className={`text-${slide.textColor} text-center font-bold text-[24px] mt-2`}>
                      <span className="text-[12px]">From</span>{slide.price}
                      <span className="text-[12px]">p/m</span>
                    </span>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>

        </div>
      </div>

      <div className="flex flex-col justify-center items-center md:text-left  text-center w-full px-[5%]">
      <div className="w-[50%] md:hidden block">
            <Image
              src="/img/pricing/av.png"
              alt="Aff-Starter advantages illustration"
              width={800}
              height={600}
              className=""
              sizes="50vw"
            />
          </div>
        <p className="md:text-6xl text-3xl hover:animate-scale font-bold text-black md:mt-10">
          Why choose Aff-Starter?
        </p>
        <div className="flex  w-[80%] md:mt-10 justify-center md:pt-10">
          <div className="w-[50%] md:block hidden hover:animate-scale">
            <Image
              src="/img/pricing/av.png"
              alt="Aff-Starter advantages illustration"
              width={800}
              height={600}
              className=""
              sizes="50vw"
            />
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
