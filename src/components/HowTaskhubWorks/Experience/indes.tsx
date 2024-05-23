import React from 'react'
import { BiSolidBadgeDollar } from 'react-icons/bi'
import { BsFillPatchCheckFill, BsShieldFillCheck } from 'react-icons/bs'

const Experiences = () => {
    return (
        <div>

            <div className='hidden lg:flex items-center justify-center'>
                <h2 className='lg:text-[40px] text-[24px] text-center font-semibold xl:w-[60%] w-[90%] lg:w-[55%] my-5 text-primary'>
                    Get the best experience whether you “add a task” or “perform a service”.   </h2>
            </div>

            <div className='hidden lg:flex justify-between my-5'>
                <div className="flex items-center space-x-3 bg-[#EBE9F4] w-[30%] xl:text-[24px] lg:[20px] p-5 rounded-[20px]">
                    <span className=" text-[#FE9B07]">
                        <BiSolidBadgeDollar size={70} />
                    </span>
                    <p className="font-semibold lg:text-[18px] xl:text-[24px] text-[16px] text-primary">Payments with Enhanced Security</p>
                </div>

                <div className="flex items-center space-x-3 bg-[#EBE9F4] w-[30%] xl:text-[24px] lg:[20px] p-5 rounded-[20px]">
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
                </div>
            </div>

            <div className='lg:hidden flex flex-col  my-5 space-y-5 w-[90%] m-auto'>
                <h2 className=' text-[24px] text-center font-semibold    my-5 text-primary'>
                    Get the best experience whether you “add a task” or “perform a service”.
                </h2>


                <div className="flex items-center space-x-3 bg-[#EBE9F4] w-[full] p-5 rounded-[20px]">
                    <span className=" text-[#FE9B07]">
                        <BiSolidBadgeDollar size={70} />
                    </span>
                    <p className="font-semibold  text-[16px] text-primary">Payments with Enhanced Security</p>
                </div>

                <div className="flex items-center space-x-3 bg-[#EBE9F4] w-[full]  p-5 rounded-[20px]">
                    <span className=" text-[#FE9B07]">
                        <BsFillPatchCheckFill size={70} />
                    </span>
                    <p className="font-semibold  text-[16px] text-primary">Get connected to the right customer</p>
                </div>

                <div className="flex items-center space-x-3 bg-[#EBE9F4] w-[full]  p-5 rounded-[20px]">
                    <span className=" text-[#FE9B07]">
                        <BsShieldFillCheck size={70} />
                    </span>
                    <p className="font-semibold  text-[16px] text-primary">Communicate with customers via instant messaging.</p>
                </div>
            </div>

        </div>
    )
}

export default Experiences