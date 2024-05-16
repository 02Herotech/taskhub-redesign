import Image from "next/image";

import image1 from "../../../../public/assets/images/homepage/welcomeAboard/welcomeAnime.png";
import icon1 from "../../../../public/assets/images/homepage/welcomeAboard/welcomeIcon1.png";
import icon2 from "../../../../public/assets/images/homepage/welcomeAboard/welcomeIcon2.png";
import icon3 from "../../../../public/assets/images/homepage/welcomeAboard/welcomeIcon3.png";
import styles from "./styles.module.css";

const WelcomeAboard = () => {
    return (
        <div
            className={`mx-auto flex max-w-7xl items-center justify-between lg:p-5 lg:px-12 lg:pb-20 lg:pt-[100px] xl:px-8 `}
        >
            <div className={`${styles.bgCover} w-full p-10 `}>
                <div className=" z-50 flex-col space-y-5 lg:flex">
                    <div className="flex flex-col lg:space-y-5  space-y-1">
                        <div className="flex items-center justify-between ">
                            <div className="flex flex-col lg:space-y-2 lg:text-[40px] text-[12px] font-extrabold  font-clashDisplayBold text-white">
                                <h1>Welcome Aboard!</h1>
                                <h1 >
                                    <span className="text-[#FE9B07]">Get started</span> with
                                    TaskHub
                                </h1>
                            </div>
                            <Image src={image1} width={100} alt="Welcome Animation"></Image>
                        </div>

                        <div className="text-white lg:w-[700px] ">
                            <p>
                                Dear User, We are excited to welcome you to{" "}
                                <span className="text-[#FE9B07]">Jacinth Solutions</span> latest
                                innovation – TaskHub! This new solution is designed to allow you
                                to effortlessly find, connect, and engage with the perfect
                                service professionals.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between">
                        <div className="flex  flex-col space-y-3 rounded-xl px-8 py-4 text-white transition-all duration-700 hover:bg-[#FE9B07]">
                            <h1 className="lg:text-[40px] text-[24px] font-bold">01.</h1>

                            <div className="flex flex-col space-y-2">
                                <div className="flex space-x-2">
                                    <Image src={icon1} width={25} alt="jet icon"></Image>
                                    <h3 className="lg:text-[20px] text-[16px] font-bold">Log in:</h3>
                                </div>
                                <span className="block h-[2px] w-40 bg-white"></span>
                            </div>

                            <ul className="ml-4 flex list-disc flex-col space-y-2 text-[16px]">
                                <li>
                                    Visit taskhub.com.au
                                </li>

                                <li>
                                    Log in using <br />
                                    your credentials
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col space-y-3 rounded-xl lg:px-8 px-4 py-4 text-white transition-all duration-500 hover:bg-[#FE9B07] hover:transform hover:translate-x-2 hover:translate-y-2">

                            <h1 className="lg:text-[40px] text-[24px] font-bold">02.</h1>

                            <div className="flex flex-col space-y-2">
                                <div className="flex space-x-2">
                                    <Image src={icon2} width={25} alt="jet icon"></Image>
                                    <h3 className="lg:text-[20px] text-[16px] font-bold">Explore dashboard:</h3>
                                </div>
                                <span className="block h-[2px] w-[250px] bg-white"></span>
                            </div>

                            <ul className="ml-4 flex list-disc flex-col space-y-2 text-[16px]">
                                <li>
                                    Complete your registration <br /> by submitting your full
                                    address
                                </li>

                                <li>
                                    Upon successful submission, <br />
                                    your account becomes verified
                                </li>
                            </ul>
                        </div>

                        {/* <div className="flex flex-col space-y-3 rounded-xl px-8 py-4 text-white transition-opacity duration-700 hover:bg-[#FE9B07]">
               */}
                        <div className="flex flex-col space-y-3 rounded-xl px-8 py-4 text-white transition-all duration-500 hover:bg-[#FE9B07] hover:transform hover:translate-x-2 hover:translate-y-2">

                            <h1 className="lg:text-[40px] text-[24px] font-bold">03.</h1>

                            <div className="flex flex-col space-y-2">
                                <div className="flex space-x-2">
                                    <Image src={icon3} width={25} alt="jet icon"></Image>
                                    <h3 className="lg:text-[20px] text-[16px] font-bold">Set up:</h3>
                                </div>
                                <span className="block h-[2px] w-40 bg-white"></span>
                            </div>

                            <ul className="ml-4 flex list-disc flex-col space-y-2 text-[16px]">
                                <li>
                                    Personalize your profile <br /> settings
                                </li>

                                <li>Set notifications settings</li>
                                <li>Set payment methods</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeAboard;
