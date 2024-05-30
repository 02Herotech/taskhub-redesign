import React from 'react'
import { BsFillPatchCheckFill } from 'react-icons/bs'
import Image from 'next/image'
import GauranteeImage from "../../../../../public/assets/images/homepage/howTaskhubWorks/customer/guarantee.png";


const CustomerGauranteeData = [
  {
    id: 1,
    title: 'Posting a task at no cost.',
    details: ' You have access to post your task free with no charge.'
  },
  {
    id: 2,
    title: 'Getting the best provider required for your task',
    details: ' In here we bring you the some of the best services providers to get the work done for you in no time.'
  },

  {
    id: 3,
    title: '  Safe and Secure transactions',
    details: 'We prioritize your financial security. When you pay for a task, your money is held securely until the task is completed to your satisfaction.'
  },
  {
    id: 4,
    title: 'Satisfaction and Good Effort',
    details: 'You have the chance to rate, inspect, request revision, drop a review on a task if you are not satisfied.'
  },

]
const Gaurantee = () => {
  return (
    <div className='mt-16 flex !justify-between'>



      <div className='w-[50%] '>
        <h2 className='font-clashMedium text-[40px] text-primary font-extrabold'>
          <span className='text-tc-orange'> TaskHub</span> <br />  Guarantees:
        </h2>

        <div className='space-y-3 mt-5'>


          {CustomerGauranteeData.map((eachData) => (
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
          src={GauranteeImage}
          alt="Post a task"
          height={417}
          width={481}
          className="float-right"
        />
      </div>
    </div>
  )
}

export default Gaurantee