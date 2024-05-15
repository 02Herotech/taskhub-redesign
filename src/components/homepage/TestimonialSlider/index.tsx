"use client";

import { RiStarSLine, RiStarSFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import Image from "next/image";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaRegCircle, FaCircle } from "react-icons/fa";

import image1 from "../../../../public/assets/images/homepage/testimonial/testimonial2.png";
import image2 from "../../../../public/assets/images/homepage/testimonial/testimonial3.png";
import image3 from "../../../../public/assets/images/homepage/testimonial/testimonial4.png";

const TestimonialSlider = () => {
    const [selectedTestimonial, setSelectedTestimonial] = useState(0);
    const [testimonials, setTestimonials] = useState([
        {
            id: 1,
            ratedStars: 5,
            unratedStars: 0,
            review:
                "'Outstanding service! Our experience with Jacinth was exceptional, professional, prompt, and went above and beyond to meet our needs. Highly recommended!'",
            name: "Dame Luca",
            image: image1,
        },
        {
            id: 2,
            ratedStars: 4,
            unratedStars: 1,
            review:
                "'The service providers on this website are real professionals. I'm happy I gave it a try. The service providers on this website are real professionals. I'm happy I gave it a try.'",
            name: "Jobi Fella",
            image: image2,
        },
        {
            id: 3,
            ratedStars: 3,
            unratedStars: 2,
            review:
                "'You can never get it wrong with the services on this platform. The pay is worth it. Great job! You can never get it wrong with the services on this platform. The pay is worth it. Great job!'",
            name: "Kudu Mulk",
            image: image3,
        },
    ]);

    const gotoPrev = () => {
        const isFirstSlide = selectedTestimonial === 0;
        const newImage = isFirstSlide
            ? testimonials.length - 1
            : selectedTestimonial - 1;
        setSelectedTestimonial(newImage);
    };

    const gotoNext = () => {
        const isLastSlide = selectedTestimonial === testimonials.length - 1;
        const newImage = isLastSlide ? 0 : selectedTestimonial + 1;
        setSelectedTestimonial(newImage);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setSelectedTestimonial((prevIndex) =>
                prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        // Clear the timer when component unmounts or when the selected testimonial changes
        return () => clearTimeout(timer);
    }, [selectedTestimonial, testimonials.length]);

    const handleCircleClick = (index: any) => {
        setSelectedTestimonial(index);
    };
    return (
        <div className="flex flex-col space-y-20 items-center ">
            <div className="flex items-center w-full justify-between  ">
                <div className="relative">
                    <div className="flex flex-col space-y-10 md:w-[500px] w-full items-center justify-center border-[1.5px] border-grey4 rounded-xl py-3 px-8">
                        <div className="flex flex-col space-y-6 items-center justify-center">
                            <div className="flex text-[#FFE815] text-[30px]">
                                {[...Array(testimonials[selectedTestimonial].ratedStars)].map(
                                    (_, index) => (
                                        <span key={index}>
                                            <RiStarSFill />
                                        </span>
                                    )
                                )}
                                {[...Array(testimonials[selectedTestimonial].unratedStars)].map(
                                    (_, index) => (
                                        <span key={index}>
                                            <RiStarSLine />
                                        </span>
                                    )
                                )}
                            </div>
                            <p className="text-left text-[14px]">
                                {testimonials[selectedTestimonial].review}
                            </p>
                        </div>

                        <div className="flex items-center space-x-5">
                            <Image
                                src={testimonials[selectedTestimonial].image}
                                width={50}
                                alt=""
                            />
                            <div className="text-[12px]">
                                <p className="font-bold">
                                    {testimonials[selectedTestimonial].name}
                                </p>
                                <p>Customer</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between  w-full absolute inset-0 items-center ">
                        <span
                            onClick={gotoPrev}
                            className="text-[25px] cursor-pointer hover:text-white  hover:bg-[#ffadaf] bg-grey4 p-3 rounded-[50%] flex justify-center items-center -ml-7"
                        >
                            <MdKeyboardArrowLeft />
                        </span>
                        <span
                            onClick={gotoNext}
                            className="text-[25px] cursor-pointer hover:text-white hover:bg-[#ffadaf] bg-grey4 p-3 rounded-[50%] flex justify-center items-center -mr-7"
                        >
                            <MdKeyboardArrowRight />
                        </span>
                    </div>
                </div>
            </div>

            {/* <div className="flex items-center w-full justify-between  ">
        <div className="relative w-full">
          <div className="flex flex-col space-y-10 md:w-[500px] w-full items-center justify-center border-[1.5px] border-grey4 rounded-xl py-3 px-8">
            <div className="flex flex-col space-y-6 items-center justify-center">
              <div className="flex text-[#FFE815] text-[30px]">
                {[...Array(testimonials[selectedTestimonial].ratedStars)].map(
                  (_, index) => (
                    <span key={index}>
                      <RiStarSFill />
                    </span>
                  )
                )}
                {[...Array(testimonials[selectedTestimonial].unratedStars)].map(
                  (_, index) => (
                    <span key={index}>
                      <RiStarSLine />
                    </span>
                  )
                )}
              </div>
              <p className="text-left text-[14px]">
                {testimonials[selectedTestimonial].review}
              </p>
            </div>

            <div className="flex items-center space-x-5">
              <Image
                src={testimonials[selectedTestimonial].image}
                width={50}
                alt=""
              />
              <div className="text-[12px]">
                <p className="font-bold">
                  {testimonials[selectedTestimonial].name}
                </p>
                <p>Customer</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between  w-full absolute inset-0 items-center ">
            <span
              onClick={gotoPrev}
              className="text-[25px] cursor-pointer hover:text-white  hover:bg-[#ffadaf] bg-grey4 p-3 rounded-[50%] flex justify-center items-center -ml-7"
            >
              <MdKeyboardArrowLeft />
            </span>
            <span
              onClick={gotoNext}
              className="text-[25px] cursor-pointer hover:text-white hover:bg-[#ffadaf] bg-grey4 p-3 rounded-[50%] flex justify-center items-center -mr-7 md:mr-[-10px] xl:mr-[--25px]"
            >
              <MdKeyboardArrowRight />
            </span>
          </div>
        </div>
      </div> */}
        </div>
    );
};

export default TestimonialSlider;
