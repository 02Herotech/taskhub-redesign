"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import heroImage1 from "../../../../public/assets/images/homepage/hero/hero1.png";
import heroImage2a from "../../../../public/assets/images/homepage/hero/hero2a.png";
import heroImage2b from "../../../../public/assets/images/homepage/hero/hero2b.png";
import heroImage2c from "../../../../public/assets/images/homepage/hero/hero2c.png";
import heroImage3 from "../../../../public/assets/images/homepage/hero/hero3.png";

import MobileHero from "./MobileHero";
import AnimatedText from "./AnimatedText";

const Hero = () => {
  return (
    <div className="relative h-auto bg-[#EBE9F4] pt-10 lg:pt-[95px]  ">
      <div className="hidden lg:block">
        <div className="flex justify-between overflow-hidden">
          <div
            style={{
              position: "relative",
              height: "500px",
              width: "250px",
              float: "left",
              top: "-100px",
              zIndex: "2",
            }}
          >
            <div
              style={{
                height: "500px",
                width: "500px",
                borderRadius: "50%",
                backgroundImage:
                  "radial-gradient(circle, #fac588, transparent)",
                filter: "blur(30px)",
                position: "absolute",
                left: "-250px",
              }}
            ></div>
          </div>

          <div
            style={{
              position: "relative",
              height: "500px",
              width: "250px",
              float: "right",
              top: "-160px",
            }}
          >
            <div
              style={{
                height: "500px",
                width: "500px",
                borderRadius: "50%",
                backgroundImage:
                  "radial-gradient(circle, #856cb7, transparent)",
                filter: "blur(70px)",
                position: "absolute",
                right: "-200px",
              }}
            ></div>
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-[-500px] max-w-7xl ">
          <div className="mx-auto w-[90%] pt-10">
            <h1 className="mx-auto max-w-[690px] text-center font-clashSemiBold text-[32px] text-[#6F678A] max-lg:my-5 xl:text-[40px]">
              Buy back your <span className="text-[#3B1F8C]">time</span>, get
              more <span className="text-[#3B1F8C]">done</span>, and{" "}
              <div className="inline-flex items-center text-[#E58C06]">
                <span className="translate-x-1">con</span>
                <svg
                  width="21"
                  height="22"
                  viewBox="0 0 32 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="-z-10 translate-y-1"
                >
                  <path
                    d="M5.40846 7.60961C5.47102 11.0911 8.26483 12.517 9.80171 12.6689C10.5957 12.7468 11.0241 12.7121 11.3642 12.7092C12.5099 12.7443 13.0285 12.1509 13.0893 11.3227C13.1127 10.9902 13.0863 9.04572 13.1244 7.11711C13.1308 6.13158 13.1438 5.44422 13.1376 4.872C13.1419 4.09594 13.2514 3.31067 12.732 2.81705C12.2679 2.35289 11.5162 2.43019 10.6656 2.43573C9.68858 2.44208 8.71063 2.70333 8.02836 3.13306C6.02375 4.37723 5.46073 6.12253 5.40846 7.60961ZM5.40846 7.60961L1.84055 7.6321M26.6711 7.47277C26.6092 3.98919 23.8103 2.58242 22.2734 2.43195C21.4773 2.35335 21.0497 2.38879 20.7088 2.39101C19.5624 2.35657 19.0438 2.94996 18.9837 3.77892C18.9745 3.89826 18.9737 4.22629 18.9715 4.68709M26.6711 7.47277C26.6188 8.95985 26.0507 10.7258 24.0446 11.9714C23.3616 12.4004 22.3837 12.6617 21.406 12.6687C20.5568 12.6742 19.8037 12.7516 19.3395 12.2874C18.8202 11.7938 18.9294 11.1597 18.9323 10.3823M26.6711 7.47277L30.2411 7.44814M18.9715 4.68709C18.9704 5.50786 18.973 6.74964 18.9479 7.9852C18.9415 8.97073 18.9261 9.81005 18.933 10.3816L16.742 10.3688M18.9715 4.68709L16.7739 4.70777"
                    stroke="#381F8C"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="-translate-x-1">nect</span>
              </div>{" "}
              with the right experts.
            </h1>
            {/* <AnimatedText /> */}

            <p className="py-0 text-center font-satoshiMedium text-[28px] font-[500] text-[#381F8C] ">
              Whether you need tasks handled, want to earn doing what you love,
              or learn to start your business, Oloja is your platform to
              succeed.
            </p>

            {/* <p className="py-0 text-center font-satoshiMedium text-[28px] font-[500] text-[#381F8C] ">
              We provide a dynamic{" "}
              <span className="text-[#E58C06]">AI enabled </span> platform that
              bridges the gap <br />
              between individuals, businesses, and services, where you can buy,
              <br />
              sell and gain business education.
            </p> */}

            <div className="my-5 flex justify-around">
              <div className="flex w-auto space-x-4 ">
                <button className="w-[250px] rounded-[50px] bg-primary p-3 font-satoshi text-[16px] font-[700] text-[#EBE9F4] hover:bg-[#25135f] lg:w-[175px] xl:w-[190px]">
                  <Link href="/customer/add-task">Post a task for free</Link>
                </button>

                <button className="w-[170px] rounded-[50px] bg-[#FE9B07] p-3 font-satoshi text-[16px] font-[700] text-white hover:bg-[#e79823]">
                  <Link href="/coming-soon">Monetize your skills</Link>
                </button>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 flex !h-[420px] w-[85%] justify-between xl:!h-[500px]">
            <div className="relative flex h-[350px] w-[24%] flex-col items-center">
              <Image
                src={heroImage1}
                alt="heroImage1"
                layout="responsive"
                width={500}
                height={350}
                quality={100}
                className="lg:!h-[357px] xl:!h-[441px]"
              />

              <div className="absolute top-0 mt-[-25px] flex w-[120px] flex-col items-center justify-center ">
                <div className=" flex h-[45px] w-full flex-col items-center justify-center space-y-1 rounded-[20px] bg-[#FE9B07] text-center text-white ">
                  <p className="font-satoshi text-[11px] font-[500]">
                    I need authentic <br /> local spice
                  </p>
                </div>

                <div className="h-0 w-0 border-l-[10px] border-r-[10px] border-t-[15px] border-l-transparent border-r-transparent border-t-[#FE9B07] "></div>
              </div>
            </div>

            <div className="flex w-[48%] flex-col justify-between xl:space-y-14">
              <div className="flex justify-between  space-x-4">
                <div className="relative flex h-[200px] w-[45%] flex-col items-center">
                  {/* <Image
                                    src={heroImage2a}
                                    alt='heroImage2a'
                                    layout='responsive'
                                    width={500}
                                    height={210}
                                    className='xl:!h-[250px] !h-[191px]'
                                /> */}
                  <Image
                    src={heroImage2a}
                    alt="heroImage2a"
                    fill
                    className="!h-[191px] xl:!h-[240px]"
                  />

                  <div className="absolute top-24 mt-[-25px] flex w-[120px] flex-col items-center justify-center ">
                    <div className=" flex h-[45px] w-full flex-col items-center justify-center space-y-1 rounded-[20px] bg-[#FE9B07] text-center text-white  ">
                      <p className="font-satoshi text-[11px] font-[500]">
                        I sell good african <br /> prints
                      </p>
                    </div>

                    <div
                      className="h-0 w-0 border-l-[10px] border-r-[10px] border-t-[15px] border-l-transparent border-r-transparent
                                  border-t-[#FE9B07] "
                    ></div>
                  </div>
                </div>

                <div className="relative h-[200px] w-[55%]">
                  <Image
                    src={heroImage2b}
                    alt="heroImage2b"
                    // layout='responsive'
                    width={500}
                    height={200}
                    className="!h-[191px] xl:!h-[240px]"
                  />

                  <div className="absolute right-5 top-5 flex w-[125px] flex-col items-center justify-center ">
                    <div className=" flex h-[45px] w-full flex-col items-center justify-center space-y-1 rounded-[20px] bg-primary text-center text-white">
                      <p className="font-satoshi text-[11px] font-[500]">
                        I offer car maintenance <br /> services
                      </p>
                    </div>

                    <div className="h-0 w-0 border-l-[10px] border-r-[10px] border-t-[15px] border-primary border-l-transparent border-r-transparent "></div>
                  </div>
                </div>
              </div>

              <div className="relative h-[350px] w-full">
                <Image
                  src={heroImage2c}
                  alt="heroImage2c"
                  layout="responsive"
                  width={500}
                  height={350}
                  className="lg:!h-[158px] xl:!h-[185px]"
                />
                <div className="absolute right-5 top-5 flex w-[120px] flex-col items-center justify-center ">
                  <div className=" flex h-[45px] w-full flex-col items-center justify-center space-y-1 rounded-[20px] bg-primary text-center text-white">
                    <p className="font-satoshi text-[11px] font-[500]">
                      I need someone to <br /> tie my gele.
                    </p>
                  </div>

                  <div className="h-0 w-0 border-l-[10px] border-r-[10px] border-t-[15px] border-primary border-l-transparent border-r-transparent"></div>
                </div>
              </div>
            </div>

            <div className="relative h-[350px] w-[24%]">
              <Image
                src={heroImage3}
                alt="heroImage3"
                // layout='responsive'
                width={500}
                height={350}
                className="lg:!h-[357px] xl:!h-[441px]"
              />

              <div className="absolute right-0 top-0 mt-[-25px] flex w-[120px] flex-col items-center justify-center ">
                <div className=" flex h-[45px] w-full flex-col items-center justify-center space-y-1 rounded-[20px] bg-[#FE9B07] text-center text-white">
                  <p className="font-satoshi text-[11px] font-[500]">
                    I need authentic <br /> local spice
                  </p>
                </div>

                <div className="h-0 w-0 border-l-[10px] border-r-[10px] border-t-[15px] border-l-transparent border-r-transparent border-t-[#FE9B07] "></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <MobileHero />
      </div>
    </div>
  );
};

export default Hero;
