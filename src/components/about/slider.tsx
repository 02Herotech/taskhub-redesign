"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import icon1 from "../../../public/assets/images/about/icon1.png"
import icon2 from "../../../public/assets/images/about/icon2.png"
import icon3 from "../../../public/assets/images/about/icon3.png"
import icon4 from "../../../public/assets/images/about/icon4.png"

const Slider = () => {
    const [selectObjective, setSelectedObjective] = useState(0);
    const [objectives, setObjectives] = useState([
        {
            id: 1,
            header: "User Friendly<br />Interface",
            body: "Our platform is designed with simplicity in mind, making it easy for service providers and seekers to connect and transact",
            image: icon1,
        },
        {
            id: 2,
            header: "Verified Service Providers",
            body: "We carefully vet and verify all service providers to ensure their skills and qualifications meet our standards.",
            image: icon2,
        },
        {
            id: 3,
            header: "Ratings and<br />Reviews",
            body: "We carefully vet and verify all service providers to ensure their skills and qualifications meet our standards.",
            image: icon3,
        },
        {
            id: 4,
            header: "Secure<br />Payments",
            body: "Our secure payment system protects your transactions.",
            image: icon2,
        },
        {
            id: 5,
            header: "Wide range of Services",
            body: "From Home services to electronics, we offer a diverse array of services to meet your needs.",
            image: icon4,
        },
    ]);

    const gotoPrev = () => {
        const isFirstSlide = selectObjective === 0;
        const newImage = isFirstSlide
            ? objectives.length - 1
            : selectObjective - 1;
        setSelectedObjective(newImage);
    };

    const gotoNext = () => {
        const isLastSlide = selectObjective === objectives.length - 1;
        const newImage = isLastSlide ? 0 : selectObjective + 1;
        setSelectedObjective(newImage);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setSelectedObjective((prevIndex) =>
                prevIndex === objectives.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000);

        return () => clearTimeout(timer);
    }, [selectObjective, objectives.length]);

    const handleCircleClick = (index: any) => {
        setSelectedObjective(index);
    };
    return (

        <div className="flex items-center w-full justify-between  ">
            <div className="relative">
                <div className="bg-[#221354] w-[218px] h-[225px] flex flex-col items-center text-[#EBE9F4] p-4 rounded-lg shadow-lg space-y-3 hover:bg-[#FE9B07] transition-colors duration-500">
                    <Image src={objectives[selectObjective].image} width={18} alt="" />
                    <p className="font-[700] text-[18px] text-center font-satoshiMedium" dangerouslySetInnerHTML={{ __html: objectives[selectObjective].header }}></p>
                    <p className=" font-[300] text-[13px]">{objectives[selectObjective].body}</p>
                </div>
                <div className="flex justify-between w-full absolute inset-0 items-center ">
                    <span
                        onClick={gotoPrev}
                        className="text-[40px] cursor-pointer text-[#221354] hover:text-[#FE9B07] -ml-[70px]"
                    >
                        <MdKeyboardArrowLeft />
                    </span>
                    <span
                        onClick={gotoNext}
                        className="text-[40px] cursor-pointer text-[#221354] hover:text-[#FE9B07] -mr-[70px]"
                    >
                        <MdKeyboardArrowRight />
                    </span>
                </div>
            </div>
        </div>

    );
};

export default Slider;