import React from 'react'
import { BsFillPatchCheckFill } from 'react-icons/bs'
import Image from 'next/image'
import SPGauranteeImage from "../../../../../public/assets/images/homepage/howTaskhubWorks/service-provider/SPGuarantee.png";

const SPGauranteeData = [
  {
    id: 1,
    title: 'Become your own boss on your terms.',
    details: 'Taskhub empowers you by letting you set your own rates and choose tasks, giving you the potential to build financial security on your terms.'
  },
  {
    id: 2,
    title: 'Connecting with taskers and get the job done.',
    details: 'Get in touch with the right people in need of your service and make offers instantly.'
  },

  {
    id: 3,
    title: 'Payments Guaranteed.',
    details: 'We prioritize your financial security. When you pay for a task, your money is held securely until the task is completed to your satisfaction.'
  },
  {
    id: 4,
    title: 'Chance to increase visibility.',
    details: 'You have the chance to rate, inspect, request revision, drop a review on a task if you are not satisfied.'
  },

]

const SPGaurantee = () => {
  return (
    <div className='mt-24 flex !justify-between'>



      <div className='w-[50%] '>
        <h2 className='font-clashMedium text-[40px] text-primary font-extrabold'>
          <span className='text-tc-orange'> TaskHub</span> <br />  Guarantees:
        </h2>

        <div className='space-y-3 mt-5'>


          {SPGauranteeData.map((eachData) => (
            <div key={eachData.id} className="flex  space-x-5">
              <span className="text-[20px] text-[#FE9B07] mt-2">
                <BsFillPatchCheckFill />
              </span>
              <div className='space-y-3'>
                <p className=" text-[24px] font-satoshiMedium font-[700] text-[#140B31]">{eachData.title}</p>
                <p className='font-satoshiMedium font-[500] text-[20px] text-primary'>
                  {eachData.details}
                </p>
              </div>
            </div>
          ))}
        </div>



      </div>

      <div className='w-[45%]'>
        <Image
          src={SPGauranteeImage}
          alt="Post a task"
          height={417}
          width={481}
          className="float-right"
        />
      </div>
    </div>
  )
}

export default SPGaurantee