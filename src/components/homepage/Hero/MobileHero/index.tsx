import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import heroImage1 from "../../../../../public/assets/images/homepage/hero/hero1.png";
import heroImage2a from "../../../../../public/assets/images/homepage/hero/hero2a.png";
import heroImage2b from "../../../../../public/assets/images/homepage/hero/hero2b.png";
import heroImage2c from "../../../../../public/assets/images/homepage/hero/hero2c.png";
import heroImage3 from "../../../../../public/assets/images/homepage/hero/hero3.png";
import AnimatedText from '../AnimatedText';




const MobileHero = () => {
    return (
        <div className='relative h-auto bg-gradient-to-b from-[#d8cfe9] via-[#f8ede1] to-[#EBE9F4]  min-h-[1050px] ' >

            <div className='relative z-10 mx-auto w-full'>

                <div className='w-[90%] mx-auto pt-10'>
                    <AnimatedText />

                    <p className='text-center font-satoshi text-[18px] text-[#381F8C] font-[600] py-0 '>
                        We provide a dynamic <span className='text-[#E58C06]'>AI enabled </span> platform that bridges the gap
                        between individuals, businesses, and services, where you can buy,
                        sell and gain business education.
                    </p>

                    <div className='flex justify-around my-5'>
                        <div className='flex space-x-4 w-auto '>

                            <button
                                className="rounded-[50px] bg-primary text-[12px] font-satoshi font-[700]
                                py-3 px-3 text-[#EBE9F4] hover:bg-[#25135f] max-w-[165px] "
                            >
                                <Link href="/marketplace">
                                    Explore Marketplace
                                </Link>
                            </button>

                            <button
                                className="rounded-[50px] bg-[#FE9B07] text-[12px] font-satoshi font-[700]
                                py-3 px-3 text-white hover:bg-[#e79823] max-w-[125px] "
                            >
                                <Link href="/coming-soon">
                                    Rent a Shop
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>


                <div className='  mt-10 '>

                    <div className='flex justify-between h-[450px]'>
                        <div className='flex flex-col justify-between w-[48%] '>
                            <div className=' h-[286px] flex flex-col items-center relative'>
                                <Image
                                    src={heroImage1}
                                    alt='heroImage1'

                                    fill
                                    quality={100}
                                    className='h-[286px]'
                                />


                                <div className='w-[90px] flex flex-col items-center justify-center absolute top-0 mt-[-25px] '>
                                    <div className=' w-full text-center
flex flex-col items-center justify-center text-white h-[45px] space-y-1 
bg-[#FE9B07] rounded-[20px]  '>
                                        <p className='font-satoshi font-[500] text-[10px]'>
                                            I need authentic <br /> local spice
                                        </p>
                                    </div>

                                    <div
                                        className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[10px]
                                  border-t-[#FE9B07] "
                                    ></div>
                                </div>
                            </div>

                            <div className=' h-[160px] relative overflow-hidden rounded-tr-[10px]'>
                                <Image
                                    src={heroImage2b}
                                    alt='heroImage2b'
                                    width={500}
                                    height={150}
                                    className='h-[160px] rounded-tr-[20px]'
                                />

                                <div className='w-[125px] flex flex-col items-center justify-center absolute -top-1 -right-[6px] '>
                                    <div className=' w-full text-center
flex flex-col items-center justify-center text-white h-[45px] space-y-1 
bg-primary rounded-[20px]  '>
                                        <p className='font-satoshi font-[500] text-[10px]'>
                                            I offer car maintenance <br /> services
                                        </p>
                                    </div>

                                    <div
                                        className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[10px]
                                  border-primary "
                                    ></div>
                                </div>
                            </div>

                        </div>

                        <div className='flex flex-col justify-between  w-[48%]  '>
                            <div className=' h-[155px] relative flex flex-col items-center'>

                                <Image
                                    src={heroImage2a}
                                    alt='heroImage2a'
                                    fill
                                    className='h-[155px]'
                                />

                                <div className='w-[100px] flex flex-col items-center justify-center absolute top-24 mt-[-25px] '>
                                    <div className=' w-full text-center
flex flex-col items-center justify-center text-white h-[45px] space-y-1 
bg-[#FE9B07] rounded-[20px]  '>
                                        <p className='font-satoshi font-[500] text-[11px]'>
                                            I sell good african <br /> prints
                                        </p>
                                    </div>

                                    <div
                                        className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[10px]
                                  border-t-[#FE9B07] "
                                    ></div>
                                </div>
                            </div>

                            <div className=' h-[290px] relative flex flex-col items-center'>
                                <Image
                                    src={heroImage3}
                                    alt='heroImage3'
                                    fill
                                    className=''
                                />

                                <div className='w-[90px] flex flex-col items-center justify-center absolute top-[52%] '>
                                    <div className=' w-full text-center
flex flex-col items-center justify-center text-white h-[45px] space-y-1 
bg-[#FE9B07] rounded-[20px]  '>
                                        <p className='font-satoshi font-[500] text-[10px]'>
                                            I need authentic <br /> local spice
                                        </p>
                                    </div>

                                    <div
                                        className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[10px]
                                  border-t-[#FE9B07] "
                                    ></div>
                                </div>
                            </div>


                        </div>

                    </div>


                    <div className='w-full h-[115px] relative my-2'>
                        <Image
                            src={heroImage2c}
                            alt='heroImage2c'
                            layout='responsive'
                            width={500}
                            height={350}
                            className='h-[158px]'
                        />
                        <div className='w-[120px] flex flex-col items-center justify-center absolute top-5 right-5 '>
                            <div className=' w-full text-center
flex flex-col items-center justify-center text-white h-[45px] space-y-1 
bg-primary rounded-[20px]  '>
                                <p className='font-satoshi font-[500] text-[11px]'>
                                    I need someone to <br /> tie my gele.
                                </p>
                            </div>

                            <div
                                className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[15px]
                                  border-primary "
                            ></div>
                        </div>
                    </div>

                </div>






            </div>



        </div>
    )
}

export default MobileHero