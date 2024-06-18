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
    details: 'We guarantee a secure and reliable payment process, ensuring that your payments get to you upon successful completion of service.'
  },
  {
    id: 4,
    title: 'Chance to increase visibility.',
    details: 'With every successfully completed task, we increase your visibility on the platform and put you in front of your potential customers.'
  },

]

const SPGaurantee = () => {
  return (
    <div className='lg:mt-20 mt-10 lg:flex !justify-between'>
      <div className='lg:w-[50%] '>
        <h2 className='font-clashSemiBold lg:text-[45px] text-[30px] text-primary '>
          <span className='text-tc-orange'> TaskHub</span> <br />  Guarantees:
        </h2>

        <div className='space-y-3 mt-5'>
          {SPGauranteeData.map((eachData) => (
            <div key={eachData.id} className="flex  space-x-5">
              <span className="lg:text-[20px] text-[16px] text-[#FE9B07] mt-2">
                <BsFillPatchCheckFill />
              </span>
              <div className='space-y-3'>
                <p className=" lg:text-[24px] text-[18px] font-satoshi font-[900] text-[#140B31]">{eachData.title}</p>
                <p className='font-satoshi font-[600] lg:text-[20px] text-[15px] text-primary'>
                  {eachData.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='hidden lg:block lg:w-[45%] lg:my-0 mt-10'>
        <Image
          src={SPGauranteeImage}
          alt="Post a task"
          height={417}
          width={481}
          className="float-right"
        />
      </div>

      <div className='lg:hidden mt-10 flex items-center justify-center'>
        <Image
          src={SPGauranteeImage}
          alt="Post a task"
          height={217}
          width={381}
          className=""
        />
      </div>
    </div>
  )
}

export default SPGaurantee