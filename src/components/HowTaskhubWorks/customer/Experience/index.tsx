import React from 'react'
import { BiSolidBadgeDollar } from 'react-icons/bi'
import { BsFillPatchCheckFill, BsShieldFillCheck } from 'react-icons/bs'
import DollarSign from "../../../../../public/assets/images/homepage/howTaskhubWorks/customer/DollarSign.png";
import CheckSign from "../../../../../public/assets/images/homepage/howTaskhubWorks/customer/CheckSign.png";
import MessageSign from "../../../../../public/assets/images/homepage/howTaskhubWorks/customer/MessageSign.png";
import Image from 'next/image';

const ExperienceData = [
  {
    id: 1,
    icon: <Image alt='' src={DollarSign} fill className='absolute' />,
    details: 'Payments with Enhanced Security'
  },
  {
    id: 2,
    icon: <Image alt='' src={CheckSign} fill className='absolute' />,
    details: 'Get connected to the right customer'
  },
  {
    id: 3,
    icon: <BsShieldFillCheck size={75} />,
    // icon: <Image alt='' src={MessageSign} fill className='absolute object-cover' />,
    details: 'Communicate with customers via instant messaging.'
  },
]
const Experience = () => {
  return (
    <div>
      <div className='flex items-center justify-center my-10 lg:mt-20'>
        <h2 className='lg:text-[30px] text-[18px] text-center  xl:w-[50%] w-full lg:w-[65%]  text-primary font-clashSemiBold font-[600]'>
          Get the best experience whether you <br /> “<span className='text-tc-orange'>Add a Task</span>” or “<span className='text-tc-orange'>Perform a Service</span>”.   </h2>
      </div>

      <div className='lg:flex justify-between my-5 space-y-5 lg:space-y-0'>
        {
          ExperienceData.map((eachData) => (
            <div key={eachData.id} className="flex lg:flex-col lg:justify-center items-center bg-[#EBE9F4] lg:w-[30%] w-full xl:text-[24px] lg:[20px] px-3 py-6 lg:space-y-5 space-x-2 lg:border-[2px] lg:border-primary rounded-[20px]">
              <span className=" text-[#FE9B07] h-[70px] w-[70px] relative">
                {eachData.icon}
              </span>
              <p className="font-satoshiMedium font-[700] lg:text-[18px] xl:text-[24px] text-[16px] text-center text-primary">{eachData.details}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Experience