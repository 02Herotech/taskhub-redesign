import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Service1 from "../../../../public/assets/images/homepage/howTaskhubWorks/service1.jpg";
import Service2 from "../../../../public/assets/images/homepage/howTaskhubWorks/service2.jpg";
import Service3 from "../../../../public/assets/images/homepage/howTaskhubWorks/services3.jpg";


const PostService = () => {
  const serviceProviderParams = new URLSearchParams({ userType: "serviceProvider" });

  return (
    <div>
      <div className='flex items-center justify-center'>
        <h2 className='text-[40px] text-center font-semibold xl:w-[40%] lg:w-[50%] text-primary my-5'>
          Earn your way to Financial freedom as a
          <span className='text-[#FE9B07]'>  service provider</span> on TaskHub
        </h2>
      </div>

      <div>
        <div className='flex justify-between items-center my-10'>
          <div className='w-[38%]'>
            <Image
              src={Service1}
              alt="Post a service"
              height={417}
              width={451}
              className=""
            />
          </div>

          <div className='w-[55%] space-y-3'>
            <h2 className='xl:text-[35px] text-[30px] font-semibold text-primary'>
              Tell us your service details
            </h2>
            <p className='text-[#2A1769] xl:text-[28px] text-[25px] font-medium pb-5'>
              Choose your service name, find the best category and subcategory for your service and proceed to give a detailed description. The best part is, we make it easy for you with our AI Assistance.

            </p>

            <div>
              <button
                className=" rounded-[50px] w-[250px] bg-[#FE9B07] text-[#FFF5E6] xl:text-[16px] 
                          px-3 py-2    hover:bg-[#e79823]  "
              >

                <Link
                  href={`/auth/sign-up?${serviceProviderParams.toString()}`}
                  className="flex items-center justify-center"
                >
                  <p className="">Become a Service Provider</p>

                </Link>

              </button>
            </div>

          </div>
        </div>

        <div className='flex justify-between items-center my-10'>
          <div className='w-[55%] xl:space-y-4 space-y-3'>
            <h2 className='xl:text-[35px] text-[30px] font-semibold text-primary'>
              Input your Task details.
            </h2>
            <p className='text-[#2A1769] xl:text-[28px] text-[25px] font-medium pb-5'>
              Choose your service type; remotely or in person. Add in your location details and budget and your first task has been created!
            </p>

            <div>
              <button
                className=" rounded-[50px] w-[250px] bg-[#FE9B07] text-[#FFF5E6] xl:text-[16px] 
                          px-3 py-2    hover:bg-[#e79823]  "
              >

                <Link
                  href={`/auth/sign-up?${serviceProviderParams.toString()}`}
                  className="flex items-center justify-center"
                >
                  <p className="">Become a Service Provider</p>

                </Link>

              </button>
            </div>
          </div>
          <div className='w-[38%] rounded-l-[35px]'>
            <Image
              src={Service2}
              alt="Post a service"
              height={417}
              width={451}
              className=" rounded-l-[35px]"
            />
          </div>


        </div>

        <div className='flex justify-between items-center my-10'>
          <div className='w-[38%] rounded-r-[35px]'>
            <Image
              src={Service3}
              alt="Post a service"
              height={417}
              width={451}
              className="rounded-r-[35px]"
            />
          </div>

          <div className='w-[55%] space-y-3'>
            <h2 className='xl:text-[35px] text-[30px] font-semibold text-primary'>
              Upload your service image
            </h2>
            <p className='text-[#2A1769] xl:text-[28px] text-[25px] font-medium pb-5'>
              Add information about your availability (days and time), Then upload service images or generate with AI, and you’re all done.
            </p>


          </div>
        </div>
      </div>
    </div>
  )
}

export default PostService