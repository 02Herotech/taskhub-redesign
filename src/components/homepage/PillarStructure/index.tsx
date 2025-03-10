"use client";

import React, { useEffect, useState } from "react";
import HubBackground from "../../../../public/assets/images/homepage/pillarStructure/hub-bg.jpeg";
import Link from "next/link";
import Image from "next/image";
import marketplace from "../../../../public/assets/images/homepage/pillarStructure/marketplace.png";
import businessHub from "../../../../public/assets/images/homepage/pillarStructure/businessHub.png";
import rentAShop from "../../../../public/assets/images/homepage/pillarStructure/rent.png";

import clsx from "clsx";
import MobilePillarStructure from "./MobilePillarStructure";

const MiniNavbar = ({ activeIndex, onNavChange, setIsHovering }: any) => {
  const links = [
    {
      link: "marketplace",
      label: "Marketplace",
      textColor: "FFFFFF",
      bgColor: "E58C06",
    },
    {
      link: "BusinessHub",
      label: "BusinessHub",
      textColor: "2A1769",
      bgColor: "F8E9FE",
    },
    {
      link: "Shop",
      label: "Rent a shop",
      textColor: "FFFFFF",
      bgColor: "381F8C",
    },
  ];

  return (
    <div className="flex space-x-5  p-4 ">
      {links.map((link, index) => (
        <button
          key={index}
          onClick={() => onNavChange(index)}
          onMouseEnter={() => {
            onNavChange(index);
            setIsHovering(true);
          }}
          onMouseLeave={() => setIsHovering(false)}
          className={`rounded-[40px] px-4 py-2 font-clashMedium text-[20px] font-[600] ${activeIndex === index ? "underline" : ""}`}
          style={{
            backgroundColor: `#${link.bgColor}`,
            color: `#${link.textColor}`,
          }}
        >
          {link.label}
        </button>
      ))}
    </div>
  );
};

const PillarStructure = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const content = [
    {
      title: "Marketplace",
      text: "Buy & Sell Products, Get Tasks Done, Post Your Services: All at Your Convenience.",
      btnText: "Explore our marketplace",
      btnBgColor: "E58C06",
      btnTextColor: "FFFFF",
      img: marketplace,
      link: "/marketplace",
    },
    {
      title: "Business Hub",
      text: "We offer information on both financial and business literacy, empowering you with business 101 skills and setting you up for success.",
      btnText: "View resources",
      btnBgColor: "F8E9FE",
      btnTextColor: "2A1769",
      img: businessHub,
      link: "/",
    },

    {
      title: "Rent a shop",
      text: "Own a personalized virtual shop for your business and get access to 5000+ potential customers from our community.",
      btnText: "Rent a shop",
      btnBgColor: "381F8C",
      btnTextColor: "FFFFF",
      img: rentAShop,
      link: "/",
    },
  ];

  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % content.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isHovering, content.length]);

  return (
    <div
      className="min-h-[1050px] bg-cover bg-center lg:min-h-[680px] xl:min-h-[600px]"
      style={{
        backgroundImage: `url(${HubBackground.src})`,
      }}
    >
      <div className="mx-auto hidden max-w-7xl lg:block">
        <div className="mx-auto w-[85%] ">
          <div className="flex justify-center py-10">
            <MiniNavbar
              activeIndex={activeIndex}
              onNavChange={setActiveIndex}
              setIsHovering={setIsHovering}
            />
          </div>

          <div className="flex justify-between pb-14">
            <div className="flex w-[35%] flex-col space-y-6 text-white">
              <h2 className="font-clashSemiBold text-[32px] transition-all duration-500 ease-in-out xl:text-[40px]">
                {content[activeIndex].title}
              </h2>

              <p className="text-left font-satoshiMedium text-[30px] font-[500] transition-all duration-500 ease-in-out">
                {content[activeIndex].text}
              </p>

              <button
                className={clsx(
                  "w-[250px]  rounded-[50px] p-3 font-satoshi text-[16px] font-[700]",
                  activeIndex === 0 && "bg-[#E58C06] text-white",
                  activeIndex === 1 && "bg-[#F8E9FE] text-[#2A1769]",
                  activeIndex === 2 && "bg-[#381F8C] text-white",
                )}
              >
                <Link href={`${content[activeIndex].link}`}>
                  {content[activeIndex].btnText}
                </Link>
              </button>
            </div>

            <Image
              src={content[activeIndex].img}
              alt={content[activeIndex].title}
              width={600}
              height={400}
            />
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <MobilePillarStructure />
      </div>
    </div>
  );
};

export default PillarStructure;
