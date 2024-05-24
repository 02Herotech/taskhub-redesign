import Image from "next/image";

import styles from "./styles.module.css"
import desktop from "../../../public/assets/images/about/desktop.png"
import mobile from "../../../public/assets/images/about/mobile.png"
import image2 from "../../../public/assets/images/about/image2.png"
import icon1 from "../../../public/assets/images/about/icon1.png"
import icon2 from "../../../public/assets/images/about/icon2.png"
import icon3 from "../../../public/assets/images/about/icon3.png"
import icon4 from "../../../public/assets/images/about/icon4.png"
import Link from "next/link";
import Slider from "@/components/about/slider";



const About = () => {
    return (

        <main className="mt-16 font-satoshi">
            <div className={` w-full md:bg-gradient-to-b from-[#F5E2FC] via-[#FBEAFF] to-[#fdf3ff] m-0  `}>

                <div className="mx-auto flex flex-col lg:flex-row px-8 pt-10 lg:max-w-7xl lg:px-20 justify-between items-center pb-10  lg:pb-20 space-y-10 lg:space-y-0">

                    <div className=" w-full md:w-[70%] lg:w-[47%] bg-[#F8EBFE] border-b-2 border-black py-10 px-5 shadow-md">
                        <h3 className="text-[16px] md:text-[20px] lg:text-[26px] font-[500] font-satoshiMedium ">ABOUT TASKHUB</h3>
                        <h1 className="text-[30px] md:text-[50px] lg:text-[64px] font-bold font-clashSemiBold leading-tight my-3 text-[#2A1769]">We make the <span className="text-[#FE9B07]">B</span>usiness Life <span className="text-[#FE9B07]">E</span>asy and <span className="text-[#FE9B07]">S</span>afe</h1>
                        <p className="lg:text-[18px] md:text-[16px] text-[14px] font-[400] text-justify text-[#140B31]">Excellent customer service, top-notch service providers, and easy-to-use technology. That is our recipe for brewing you a stress-free life.</p>
                    </div>
                    <div className=" lg:w-[47%]  w-full flex lg:justify-end justify-center items-center">
                        <Image src={desktop} width={450} alt="" className="hidden lg:block" />
                        <Image src={mobile} width={500} alt="" className="lg:hidden" />
                    </div>
                </div>
            </div>

            <div className={` w-full bg-gradient-to-b from-[#F5E2FC] via-[#FFFFFF] to-[#F5E2FC] m-0  `}>
                <div className="mx-auto flex lg:flex-row flex-col px-6 py-20 lg:max-w-7xl lg:px-20 justify-between items-center lg:h-[40em] space-y-10 lg:space-y-0">
                    <div className="lg:w-[30%] w-full h-full flex flex-col justify-start">
                        <h1 className="lg:text-[36px] md:text-[30px] text-[25px] font-[600] font-clashSemiBold  text-[#140B31] mb-2">Our Mission</h1>
                        <p className="text-[#2A1769] md:text-[18px] text-[15px] font-[400] ">At TaskHub our mission is to connect talented service providers with customers and businesses in need. We facilitate a seamless and trustworthy platform for meaningful service exchange. We believe in the power of skill-sharing and collaboration to transform lives and businesses.</p>
                    </div>
                    <div className="lg:w-[30%] w-full h-full flex lg:items-end justify-center items-center">
                        <Image src={image2} width={400} alt="" />
                    </div>
                    <div className="lg:w-[30%] w-full h-full flex flex-col justify-end">
                        <h1 className="lg:text-[36px] md:text-[30px] text-[25px] font-[600] font-clashSemiBold  text-[#2A1769]">Our Story</h1>
                        <p className="text-[#2A1769] md:text-[18px] text-[15px] font-[400]">TaskHub emerged from a vision to revolutionise the way services are sought and delivered. Our journey began when our founders recognised the need for a more efficient, transparent, and user-friendly platform to bring service providers and customers together.</p>
                    </div>
                </div>
            </div>

            <div className="mx-auto px-8 md:py-20 py-16 md:max-w-7xl md:px-20">
                <div className="flex lg:flex-row flex-col items-start space-y-5 lg:space-y-0 justify-between">

                    <div className="fex flex-col w-full lg:w-[35%] space-y-3  justify-start ">
                        <h3 className="text-[#FE9B07] text-[25px] md:text-[27px] lg:text-[30px] font-[600] font-clashSemiBold">Our Values</h3>
                        <h1 className="text-[#2A1769] text-[35px] md:text-[42px] lg:text-[48px] font-[500] leading-tight font-clashMedium">At TaskHub our values define who we are and how we operate:</h1>
                    </div>

                    <div className="lg:w-[55%] w-full">
                        <ul className="flex flex-col space-y-5 list-disc pl-5 md:pl-10 lg:pl-0">
                            <li className="text-[15px] lg:text-[18px] font-[400] text-[#2A1769] text-justify md:text-left"><span className=" text-[18px] lg:text-[22px] font-satoshiMedium ">Swift:</span> We pride ourselves on rapid response times and quick service delivery.</li>
                            <li className="text-[15px] lg:text-[18px] font-[400] text-[#2A1769] text-justify md:text-left"><span className="text-[18px] lg:text-[22px] font-satoshiMedium ">Efficiency:</span> We deliver high-quality services promptly and resourcefully.</li>
                            <li className="text-[15px] lg:text-[18px] font-[400] text-[#2A1769] text-justify md:text-left"><span className="text-[18px] lg:text-[22px] font-satoshiMedium ">Quality:</span> We are dedicated to maintaining the highest standards of service quality.</li>
                            <li className="text-[15px] lg:text-[18px] font-[400] text-[#2A1769] text-justify md:text-left"><span className="text-[18px] lg:text-[22px] font-satoshiMedium ">Trust:</span> We foster trust among our users through transparency and accountability</li>
                            <li className="text-[15px] lg:text-[18px] font-[400] text-[#2A1769] text-justify md:text-left"><span className="text-[18px] lg:text-[22px] font-satoshiMedium ">Community:</span> We believe in the power of community to inspire growth and success.</li>
                            <li className="text-[15px] lg:text-[18px] font-[400] text-[#2A1769] text-justify md:text-left"><span className="text-[18px] lg:text-[22px] font-satoshiMedium ">Innovation:</span> We continually innovate to improve user experiences and outcomes.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={`w-full bg-gradient-to-b from-[#F5E2FC] via-[#FFFFFF] to-[rgb(245,226,252)] m-0`}>
                <div className="mx-auto flex flex-col px-6 py-20 md:max-w-[1350px] md:px-20">
                    <div className="flex justify-center lg:text-[36px] md:text-[30px] text-[25px] font-[600] text-[#2A1769] font-clashMedium">
                        <h2>What Sets Us Apart</h2>
                    </div>
                    <div className="w-full overflow-x-auto md:flex justify-center mt-10 hidden">
                        <div className="flex flex-nowrap space-x-4">
                            <div className="bg-[#221354] w-[218px] h-[225px] flex flex-col items-center text-[#EBE9F4] p-4 rounded-lg shadow-lg space-y-3 hover:bg-[#FE9B07] transition-colors duration-500">
                                <Image src={icon1} width={18} alt="" />
                                <p className="font-[700] text-[18px] text-center font-satoshiMedium">User Friendly<br />Interface</p>
                                <p className="font-[300] text-[13px]">Our platform is designed with simplicity in mind, making it easy for service providers and seekers to connect and transact.</p>
                            </div>
                            <div className="bg-[#221354] w-[218px] h-[225px] flex flex-col items-center text-[#EBE9F4] p-4 rounded-lg shadow-lg space-y-3 hover:bg-[#FE9B07] transition-colors duration-500">
                                <Image src={icon2} width={18} alt="" />
                                <p className="font-[700] text-[18px] text-center font-satoshiMedium">Verified Service Providers</p>
                                <p className="font-[300] text-[13px]">We carefully vet and verify all service providers to ensure their skills and qualifications meet our standards.</p>
                            </div>
                            <div className="bg-[#221354] w-[218px] h-[225px] flex flex-col items-center text-[#EBE9F4] p-4 rounded-lg shadow-lg space-y-3 hover:bg-[#FE9B07] transition-colors duration-500">
                                <Image src={icon3} width={18} alt="" />
                                <p className="font-[700] text-[18px] text-center font-satoshiMedium">Ratings and <br /> Reviews</p>
                                <p className="font-[300] text-[13px]">Users can provide feedback and ratings, helping others make informed decisions.</p>
                            </div>
                            <div className="bg-[#221354] w-[218px] h-[225px] flex flex-col items-center text-[#EBE9F4] p-4 rounded-lg shadow-lg space-y-3 hover:bg-[#FE9B07] transition-colors duration-500">
                                <Image src={icon2} width={18} alt="" />
                                <p className="font-[700] text-[18px] text-center font-satoshiMedium">Secure <br /> Payments</p>
                                <p className="font-[300] text-[13px]">Our secure payment system protects your transactions.</p>
                            </div>
                            <div className="bg-[#221354] w-[218px] h-[225px] flex flex-col items-center text-[#EBE9F4] p-4 rounded-lg shadow-lg space-y-3 hover:bg-[#FE9B07] transition-colors duration-500">
                                <Image src={icon4} width={18} alt="" />
                                <p className="font-[700] text-[18px] text-center font-satoshiMedium">Wide range of<br />Services</p>
                                <p className="font-[300] text-[13px]">From Home services to electronics, we offer a diverse array of services to meet your needs.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center md:hidden mt-10 mx-auto">
                        <Slider />
                    </div>
                </div>
            </div>

            <div className={`${styles.headerCover} w-full py-20`}>
                <div className="mx-auto px-8 lg:py-20 md:py-16 py-10 md:max-w-7xl md:px-20 flex lg:justify-end justify-center items-center">
                    <div className="flex flex-col items-center lg:items-start lg:w-[600px] w-full space-y-5">
                        <h3 className="text-[#E1DDEE] md:text-[36px] text-[20px] font-clashSemiBold">Join Our Community</h3>
                        <p className="text-[#EBE9F4] md:text-[20px] text-[12px] font-satoshi text-center lg:text-start">Join our growing TaskHub Service Marketplace Platform community today and experience the future of service exchange. Whether you’re looking to find skilled professionals or showcase your expertise, we’re here to help you succeed.</p>
                        <Link
                            href="/auth/"
                            className="bg-[#FE9B07] hover:bg-[#e79823] rounded-2xl py-2 px-12 text-white text-[16px]"
                        >
                            <button
                                type="button"
                            >
                                Join now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </main >
    );
}

export default About; 