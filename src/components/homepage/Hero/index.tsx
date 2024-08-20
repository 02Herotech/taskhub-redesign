import Link from 'next/link'
import React from 'react'
import Image from 'next/image'


import heroImage1 from "../../../../public/assets/images/homepage/hero/new/hero1.png";

import heroImage2a from "../../../../public/assets/images/homepage/hero/new/hero2a.png";
import heroImage2b from "../../../../public/assets/images/homepage/hero/new/hero2b.png";
import heroImage2c from "../../../../public/assets/images/homepage/hero/new/hero2c.png";


import heroImage3 from "../../../../public/assets/images/homepage/hero/new/hero3.png";


const Hero = () => {
    return (
        <div className='relative h-auto bg-[#EBE9F4] pt-[95px]  ' >

            <div className='flex justify-between overflow-hidden'>
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

            </div>


            <div className='relative z-10 mx-auto max-w-7xl mt-[-500px]'>

                <div className='w-[90%] mx-auto'>
                    <h1 className='font-clashSemiBold my-4 text-center xl:text-[40px] text-[32px] text-[#140B31] '>
                        Every immigrant needs a <span className='text-[#E58C06]'>Product</span>
                    </h1>

                    <p className='text-center font-satoshiMedium text-[28px] text-[#381F8C] font-[500] py-0 '>
                        We provide a dynamic <span className='text-[#E58C06]'>AI enabled </span> platform that bridges the gap <br />
                        between individuals, businesses, and services, where you can buy,<br />
                        sell and gain business education.
                    </p>

                    <div className='flex justify-around my-5'>
                        <div className='flex space-x-4 w-auto '>

                            <button
                                className="rounded-[50px] bg-primary text-[16px] font-satoshi font-[700]
                                p-3 text-[#EBE9F4] hover:bg-[#25135f] w-[250px] xl:w-[190px] lg:w-[175px]"
                            >
                                <Link href="">
                                    Explore Marketplace
                                </Link>
                            </button>

                            <button
                                className="rounded-[50px] bg-[#FE9B07] text-[16px] font-satoshi font-[700]
                                p-3 text-white hover:bg-[#e79823] w-[130px]"
                            >
                                <Link href="">
                                    Rent a Shop
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>

                {/* <div className='flex justify-between w-[85%] mx-auto'>

                    <div className='w-[24%] h-[350px] relative'>
                        <Image
                            src={heroImage1}
                            alt='heroImage2'
                            className='absolute'

                        />

                    </div>



                    <div className='w-[48%] flex flex-col '>
                        <div className='flex justify-between '>
                            <div className='relative'>
                                <Image
                                    src={heroImage2a}
                                    alt='heroImage2a'
                                    className='absolute'

                                />
                            </div>

                            <div className='relative'>
                                <Image
                                    src={heroImage2b}
                                    alt='heroImage2b'
                                    className='absolute'

                                />
                            </div>
                        </div>

                        <div className='relative'>
                            <Image
                                src={heroImage2c}
                                alt='heroImage2c'
                                className='absolute'

                            />
                        </div>

                    </div>

                    <div className='w-[24%]'>
                        <Image
                            src={heroImage3}
                            alt='heroImage3'
                            className='absolute'

                        />
                    </div>

                </div> */}





                <div className='flex justify-between w-[85%] mx-auto !h-[420px]'>

                    <div className='w-[24%] h-[350px]'>
                        <Image
                            src={heroImage1}
                            alt='heroImage1'
                            layout='responsive'
                            width={500}
                            height={350}
                             className='xl:!h-[441px] lg:!h-[357px]'
                        />
                    </div>


                    <div className='w-[48%] flex flex-col space-y-4'>


                        <div className='flex justify-between space-x-4'>
                            <div className='w-[48%] h-[200px]'>
                                <Image
                                    src={heroImage2a}
                                    alt='heroImage2a'
                                    layout='responsive'
                                    width={500}
                                    height={200}
                                />
                            </div>

                            <div className='w-[48%] h-[200px]'>
                                <Image
                                    src={heroImage2b}
                                    alt='heroImage2b'
                                    // layout='responsive'
                                    width={500}
                                    height={200}
                                    className='!h-[191px]'
                                />
                            </div>




                        </div>

                        <div className='w-full h-[350px]'>
                            <Image
                                src={heroImage2c}
                                alt='heroImage2c'
                                // layout='responsive'
                                width={500}
                                height={350}
                            />
                        </div>

                    </div>

                    <div className='w-[24%] h-[350px]'>
                        <Image
                            src={heroImage3}
                            alt='heroImage3'
                            // layout='responsive'
                            width={500}
                            height={350}
                            className='xl:!h-[441px] lg:!h-[357px]'
                        />
                    </div>




                </div>

            </div>
        </div>
    )
}

export default Hero
