import Image from "next/image";
import image1 from "../../../../public/assets/images/homepage/testimonial/testimonialImg2.png";
import image2 from "../../../../public/assets/images/homepage/testimonial/testimonialImg.png";
import TestimonialSlider from "../TestimonialSlider";

const Testimonials = () => {
    return (
        <div
            className={`flex  justify-between items-center xl:px-8 px-12 pt-10 max-w-7xl mx-auto mt-8`}
        >
            <div className="lg:flex lg:justify-between lg:items-start  w-full h-[510px]  hidden  ">
                <div className=" w-[570px] flex flex-col space-y-14">
                    <div>
                        <h1 className={`font-[600] text-[40px]`}>Testimonials</h1>
                        <p className="text-[35px] font-[400] ">Our Customer Says</p>

                    </div>
                    <TestimonialSlider />
                </div>
                <div className="relative flex items-center w-[500px] justify-center h-[360px] ">
                    <Image src={image1} width={300} alt="Image of an electrician"></Image>
                    <div className="absolute -bottom-10 xl:right-14 lg:right-5 ">
                        <Image
                            src={image2}
                            width={300}
                            alt="Image of an electrician"
                        ></Image>
                    </div>
                </div>
            </div>

            {/* mobile */}

            <div className="lg:hidden  justify-between items-start  w-[90%] mx-auto md:h-[820px]  h-[860px] mb-10  ">
                <div className="relative flex items-center justify-center h-[350px] ">
                    {/* <Image src={image1} width={250} height={350} alt="Image of an electrician"></Image> */}
                    <div className="w-full md:w-[50%] h-[350px] border-2 border-[#C4C4C4] rounded-tl-[50px]">

                    </div>
                    <div className="absolute w-[95%] md:w-[50%] md:left-[30%] h-full -bottom-5 left-[15%] ">
                        <Image
                            src={image2}

                            fill
                            alt="Image of an electrician"
                        ></Image>
                    </div>
                </div>

                <div className="w-[80%] mx-auto  flex flex-col items-center justify-center space-y-14 mt-10">
                    <div className=" text-center">
                        <h1 className={`font-SatoshiBold text-[24px]`}>Testimonials</h1>
                        <p className="text-[16px] font-SatoshiBold ">Our Customer Says</p>

                    </div>
                    <TestimonialSlider />
                </div>

            </div>
        </div>
    );
};

export default Testimonials;
