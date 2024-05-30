import React from 'react'
import { BiSolidBadgeDollar } from 'react-icons/bi'
import { BsFillPatchCheckFill, BsShieldFillCheck } from 'react-icons/bs'

const ExperienceData = [
  {
    id: 1,
    icon: <BiSolidBadgeDollar size={70} />,
    details: 'Payments with Enhanced Security'
  },
  {
    id: 2,
    icon: <BsFillPatchCheckFill size={70} />,
    details: 'Get connected to the right customer'
  },
  {
    id: 3,
    icon: <BsShieldFillCheck size={70} />,
    details: 'Communicate with customers via instant messaging.'
  },
]
const Experience = () => {
  return (
    <div>

      <div className='flex items-center justify-center my-10 mt-20'>
        <h2 className='lg:text-[30px] text-[24px] text-center  xl:w-[50%] lg:w-[65%]  text-primary font-clashSemiBold font-[600]'>
          Get the best experience whether you <br /> “<span className='text-tc-orange'>Add a Task</span>” or “<span className='text-tc-orange'>Perform a Service</span>”.   </h2>
      </div>

      <div className='flex justify-between my-5'>


        {
          ExperienceData.map((eachData) => (
            <div key={eachData.id} className="flex flex-col justify-center items-center bg-[#EBE9F4] w-[30%] xl:text-[24px] lg:[20px] px-3 py-6 space-y-5 border-[2px] border-primary rounded-[20px]">
              <span className=" text-[#FE9B07]">
                {eachData.icon}
              </span>
              <p className="font-satoshiMedium lg:text-[18px] xl:text-[24px] text-[16px] text-center text-primary">{eachData.details}</p>
            </div>
          ))
        }

        {/* <div className="flex items-center space-x-3 bg-[#EBE9F4] w-[30%] xl:text-[24px] lg:[20px] p-5 rounded-[20px]">
          <span className=" text-[#FE9B07]">
            <BsFillPatchCheckFill size={70} />
          </span>
          <p className="font-semibold lg:text-[18px] xl:text-[24px] text-[16px] text-primary">Get connected to the right customer</p>
        </div>

        <div className="flex items-center space-x-3 bg-[#EBE9F4] w-[30%] xl:text-[24px] lg:[20px] p-5 rounded-[20px]">
          <span className=" text-[#FE9B07]">
            <BsShieldFillCheck size={70} />
          </span>
          <p className="font-semibold lg:text-[18px] xl:text-[24px] text-[16px] text-primary">Communicate with customers via instant messaging.</p>
        </div> */}
      </div>



    </div>
  )
}

export default Experience