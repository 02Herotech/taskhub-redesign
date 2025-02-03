import React from "react";
import { BiSolidBadgeDollar } from "react-icons/bi";
import { BsFillPatchCheckFill, BsShieldFillCheck } from "react-icons/bs";
import DollarSign from "../../../../../public/assets/images/homepage/howTaskhubWorks/customer/DollarSign.png";
import CheckSign from "../../../../../public/assets/images/homepage/howTaskhubWorks/customer/CheckSign.png";
import MessageSign from "../../../../../public/assets/images/homepage/howTaskhubWorks/customer/MessageSign.png";
import Image from "next/image";

const ExperienceData = [
  {
    id: 1,
    icon: (
      <Image alt="" src={DollarSign} fill className="absolute object-contain" />
    ),
    details: "Payments with Enhanced Security",
  },
  {
    id: 2,
    icon: (
      <Image alt="" src={CheckSign} fill className="absolute object-contain" />
    ),
    details: "Get connected to the right service provider",
  },
  {
    id: 3,
    icon: <BsShieldFillCheck size={70} />,
    // icon: <Image alt='' src={MessageSign} fill className='absolute object-cover' />,
    details: "Communicate with service providers via instant messaging",
  },
];

const ExperienceDataMobile = [
  {
    id: 1,
    icon: <BiSolidBadgeDollar size={60} />,
    // icon: <Image alt='' src={DollarSign} fill className='absolute object-contain' />,
    details: "Payments with Enhanced Security",
  },
  {
    id: 2,
    icon: <BsFillPatchCheckFill size={50} />,
    //  icon: <Image alt='' src={CheckSign} fill className='absolute object-contain' />,
    details: "Get connected to the right service provider",
  },
  {
    id: 3,
    icon: <BsShieldFillCheck size={50} />,
    // icon: <Image alt='' src={MessageSign} fill className='absolute object-contain' />,
    details: "Communicate with service providers via instant messaging",
  },
];
const Experience = () => {
  return (
    <div>
      <div className="my-10 flex w-full items-center justify-center lg:mt-20">
        <h2 className="w-full text-center font-clashSemiBold  text-[16px] font-[600] text-primary  lg:w-[90%] lg:text-[30px] xl:w-[70%]">
          Get the best experience whether you <br /> “
          <span
            className="text-tc-orange underline"
            style={{ textDecorationColor: "#FE9B07" }}
          >
            Post a Task
          </span>
          ” or “
          <span
            className="text-tc-orange underline"
            style={{ textDecorationColor: "#FE9B07" }}
          >
            Perform a Service
          </span>
          ”.{" "}
        </h2>
      </div>

      <div className="my-5 hidden justify-between space-y-5 lg:flex lg:space-y-0">
        {ExperienceData.map((eachData) => (
          <div
            key={eachData.id}
            className="lg:[20px] flex w-full items-center space-x-2 rounded-[20px] bg-[#EBE9F4] px-3 py-6 lg:w-[30%] lg:flex-col lg:justify-center lg:space-y-5 lg:border-[2px] lg:border-primary xl:text-[24px]"
          >
            <span className=" relative h-[70px] w-[70px] text-[#FE9B07]">
              {eachData.icon}
            </span>
            <p className="text-center font-satoshi text-[16px] font-[700] text-primary lg:text-[18px] xl:text-[24px]">
              {eachData.details}
            </p>
          </div>
        ))}
      </div>

      <div className="my-5 space-y-5 lg:hidden">
        {ExperienceDataMobile.map((eachData) => (
          <div
            key={eachData.id}
            className="flex w-full items-center justify-between space-x-2  rounded-[20px] bg-[#EBE9F4] px-5 py-6   lg:space-y-5"
          >
            <span className=" relative flex h-[65px] w-[65px] items-center justify-center text-[#FE9B07]">
              {eachData.icon}
            </span>
            <p className="text-center font-satoshi text-[16px] font-[700] text-primary lg:text-[18px] xl:text-[24px]">
              {eachData.details}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
