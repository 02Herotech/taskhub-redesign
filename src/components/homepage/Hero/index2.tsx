import Link from 'next/link'
import React from 'react'

const Hero = () => {
    return (
        <div className='min-h-screen bg-[#EBE9F4] pt-[100px] overflow-hidden' >


            <div
                style={{
                    position: 'relative',
                    height: '500px',
                    width: '250px',
                    float: 'left',
                    top: '-100px',
                    zIndex: '2'

                }}
            >
                <div
                    style={{
                        height: '500px',
                        width: '500px',
                        borderRadius: '50%',
                        backgroundImage: 'radial-gradient(circle, #fac588, transparent)',
                        filter: 'blur(30px)',
                        position: 'absolute',
                        left: '-250px',
                    }}
                ></div>
            </div>

            <div
                style={{
                    position: 'relative',
                    height: '500px',
                    width: '250px',
                    float: 'right',
                    top: '-160px'
                }}
            >
                <div
                    style={{
                        height: '500px',
                        width: '500px',
                        borderRadius: '50%',
                        backgroundImage: 'radial-gradient(circle, #856cb7, transparent)',
                        filter: 'blur(70px)',
                        position: 'absolute',
                        right: '-200px',
                    }}
                ></div>
            </div>

            <div className='mx-auto max-w-7xl z-10'>

                <div className=' w-[90%] mx-auto'>
                    <h1 className='font-clashSemiBold my-4 text-center xl:text-[40px] text-[32px] text-[#140B31] '>
                        Every immigrant needs a  <span className='text-[#E58C06]'>Product</span>
                    </h1>

                    <p className='text-center font-satoshiMedium text-[28px] text-[#381F8C] font-[500] py-0 '>

                        We provide a dynamic <span className='text-[#E58C06]'>AI enabled </span> platform that bridges the gap <br />
                        between individuals, businesses, and services, where you can buy,<br />
                        sell and gain business education.
                    </p>

                    <div className='flex justify-around my-5'>
                        <div className='flex space-x-4 w-auto '>

                            <button
                                className=" rounded-[50px] bg-primary text-[16px] font-satoshi font-[700]
       p-3 text-[#EBE9F4] hover:bg-[#25135f] w-[250px] xl:w-[190px] lg:w-[175px]  "
                            >
                                <Link href="">
                                    Explore Marketplace
                                </Link>


                            </button>



                            <button
                                className=" rounded-[50px] bg-[#FE9B07] text-[16px] font-satoshi font-[700]
       p-3 text-white  hover:bg-[#e79823]  w-[130px]  "
                            >
                                <Link href="">
                                    Rent a Shop
                                </Link>


                            </button>


                        </div>

                    </div>



                </div>


                <div className='grid grid-cols-3'>
                <div className="col-span-1">First Column</div>
  <div className="col-span-2">Middle Column</div>
  <div className="col-span-1">Last Column</div>

                </div>


            </div>
        </div>
    )
}

export default Hero