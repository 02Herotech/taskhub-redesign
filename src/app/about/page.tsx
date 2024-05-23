import Image from "next/image";

import image1 from "../../../public/assets/images/about/image1.png"
import image2 from "../../../public/assets/images/about/image2.png"
import icon1 from "../../../public/assets/images/about/icon1.png"
import icon2 from "../../../public/assets/images/about/icon2.png"
import icon3 from "../../../public/assets/images/about/icon3.png"
import icon4 from "../../../public/assets/images/about/icon4.png"


const About = () => {
    return (

        <main className="my-16 font-satoshi">
            <div className={` w-full bg-gradient-to-b from-[#F5E2FC] via-[#FBEAFF] to-[#fdf3ff] m-0  `}>

                <div className="mx-auto flex px-6 pt-10 md:max-w-7xl md:px-20 justify-between items-center pb-20">

                    <div className="w-[47%] bg-[#F8EBFE] border-b-2 border-black py-10 px-3 shadow-md">
                        <h3 className="text-[26px] font-[500] ">ABOUT TASKHUB</h3>
                        <h1 className="text-[64px] font-[500] clashDisplay leading-tight my-3">We make the <span className="text-[#FE9B07]">B</span>usiness Life <span className="text-[#FE9B07]">E</span>asy and <span className="text-[#FE9B07]">S</span>afe</h1>
                        <p className="text-[18px] font-[400] text-justify text-[#140B31]">Excellent customer service, top-notch service providers, and easy-to-use technology. That's our recipe for brewing you a stress-free life.</p>
                    </div>
                    <div className="relative w-[47%] flex justify-end items-center">
                        <div className="w-[315px] h-[500px] bg-[#381F8C] rounded-r-3xl"></div>
                        <Image src={image1} width={350} alt="" className="absolute top-14 right-[8em]" />
                    </div>
                </div>
            </div>

            <div className={` w-full bg-gradient-to-b from-[#F5E2FC] via-[#FFFFFF] to-[#F5E2FC] m-0  `}>
                <div className="mx-auto flex px-6 py-20 md:max-w-7xl md:px-20 justify-between items-center h-[40em]">
                    <div className="w-[30%] h-full flex flex-col justify-start">
                        <h1 className="text-[36px] font-[600] font-clashDisplay text-[#140B31] mb-2">Our Mission</h1>
                        <p className="text-[#2A1769] text-[18px] font-[400] text-justify">At TaskHub our mission is to connect talented service providers with customers and businesses in need. We facilitate a seamless and trustworthy platform for meaningful service exchange. We believe in the power of skill-sharing and collaboration to transform lives and businesses.</p>
                    </div>
                    <div className="w-[30%] h-full flex items-end">
                        <Image src={image2} width={400} alt="" />
                    </div>
                    <div className="w-[30%] h-full flex flex-col justify-end">
                        <h1 className="text-[36px] font-[600] font-clashDisplay text-[#2A1769]">Our Story</h1>
                        <p className="text-[#2A1769] text-[18px] font-[400] text-justify">TaskHub emerged from a vision to revolutionise the way services are sought and delivered. Our journey began when our founders recognised the need for a more efficient, transparent, and user-friendly platform to bring service providers and customers together.</p>
                    </div>
                </div>
            </div>

            <div className="mx-auto px-6 py-20 md:max-w-7xl md:px-20">
                <div className="flex items-start justify-between">

                    <div className="fex flex-col w-[35%] space-y-3 justify-start ">
                        <h3 className="text-[#FE9B07] text-[30px] font-[600]">Our Values</h3>
                        <h1 className="text-[#2A1769] text-[48px] font-[500] leading-tight">At TaskHub our values define who we are and how we operate:</h1>
                    </div>

                    <div className="w-[55%]">
                        <ul className="flex flex-col space-y-5 list-disc">
                            <li className="text-[18px] font-[400] text-[#2A1769] text-justify"><span className="text-[22px] font-[500]">Swift:</span> We pride ourselves on rapid response times and quick service delivery.</li>
                            <li className="text-[18px] font-[400] text-[#2A1769] text-justify"><span className="text-[22px] font-[500]">Efficiency:</span>We deliver high-quality services promptly and resourcefully.</li>
                            <li className="text-[18px] font-[400] text-[#2A1769] text-justify"><span className="text-[22px] font-[500]">Quality:</span>We are dedicated to maintaining the highest standards of service quality.</li>
                            <li className="text-[18px] font-[400] text-[#2A1769] text-justify"><span className="text-[22px] font-[500]">Trust:</span>We foster trust among our users through transparency and accountability</li>
                            <li className="text-[18px] font-[400] text-[#2A1769] text-justify"><span className="text-[22px] font-[500]">Community:</span>We believe in the power of community to inspire growth and success.</li>
                            <li className="text-[18px] font-[400] text-[#2A1769] text-justify"><span className="text-[22px] font-[500]">Innovation:</span>We continually innovate to improve user experiences and outcomes.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={` w-full bg-gradient-to-b from-[#F5E2FC] via-[#FFFFFF] to-[rgb(245,226,252)] m-0  `}>
                <div className="mx-auto flex flex-col px-6 py-20 md:max-w-[1350px] md:px-20">
                    <div className="flex justify-center text-[36px] font-[600] text-[#2A1769]">
                        <h2>What Sets Us Apart</h2>
                    </div>
                    <div className="flex w-full justify-between items-center mt-10">
                        <div className="bg-[#221354] w-[218px] h-[225px] flex flex-col items-center text-[#EBE9F4] p-4 rounded-lg shadow-lg space-y-3">
                            <Image src={icon1} width={18} alt="" />
                            <p className="font-[700] text-[18px] text-center">User Friendly Interface</p>
                            <p className="text-justify font-[300] text-[13px]">Our platform is designed with simplicity in mind, making it easy for service providers and seekers to connect and transact.</p>
                        </div>
                        <div className="bg-[#221354] w-[218px] h-[225px] flex flex-col items-center text-[#EBE9F4] p-4 rounded-lg shadow-lg space-y-3">
                            <Image src={icon2} width={18} alt="" />
                            <p className="font-[700] text-[18px] text-center">Verified Service Providers</p>
                            <p className="text-justify font-[300] text-[13px]">We carefully vet and verify all service providers to ensure their skills and qualifications meet our standards.</p>
                        </div>  <div className="bg-[#221354] w-[218px] h-[225px] flex flex-col items-center text-[#EBE9F4] p-4 rounded-lg shadow-lg space-y-3">
                            <Image src={icon3} width={18} alt="" />
                            <p className="font-[700] text-[18px] text-center">Ratings and <br /> Reviews</p>
                            <p className="text-justify font-[300] text-[13px]">Users can provide feedback and ratings, helping others make informed decisions.</p>
                        </div>  <div className="bg-[#221354] w-[218px] h-[225px] flex flex-col items-center text-[#EBE9F4] p-4 rounded-lg shadow-lg space-y-3">
                            <Image src={icon2} width={18} alt="" />
                            <p className="font-[700] text-[18px] text-center">Secure <br /> Payments</p>
                            <p className="text-justify font-[300] text-[13px]">Our secure payment system protects your transactions.</p>
                        </div>  <div className="bg-[#221354] w-[218px] h-[225px] flex flex-col items-center text-[#EBE9F4] p-4 rounded-lg shadow-lg space-y-3">
                            <Image src={icon4} width={18} alt="" />
                            <p className="font-[700] text-[18px] text-center">Wide range of Services</p>
                            <p className="text-justify font-[300] text-[13px]">From Home services to electronics, we offer a diverse array of services to meet your needs.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                
            </div>
        </main >
    );
}

export default About;