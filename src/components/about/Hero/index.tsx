import Image from 'next/image'
import React from 'react'

const AboutHeroSection = () => {
    return (
        <section className='bg-gradient-to-b from-[#F8E9FE] via-[#FFFFFF] to-[#FBEAFF] h-full'>
            <div className="container">
                <div className="py-5 md:flex md:justify-evenly gap-10"> 
                    <div className='flex items-center justify-center lg:w-1/2'> 
                        <Image
                            src="/assets/images/about/about_hero.png"
                            alt='About us banner'
                            width={800}
                            height={800}
                            className='size-[300px] lg:size-[450px]'
                        />
                    </div>
                    <div className='space-y-5 lg:space-y-8 lg:w-1/2 md:py-14 max-sm:mt-10'>
                        <h3 className='text-tc-orange text-lg lg:text-2xl font-satoshiBold font-bold'>About Olójà</h3>
                        <h1 className='text-primary font-clashBold font-bold text-3xl lg:text-[40px]'>Every Immigrant needs a product, a service and the provider.</h1>
                        <p className='text-[#381F8C] text-lg lg:text-2xl'>Olójà is a central hub that addresses the unique challenges faced by immigrants especially in starting & staying in business.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutHeroSection
