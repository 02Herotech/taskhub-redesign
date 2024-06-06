import Image from "next/image";
import image1 from "../../../../public/assets/images/homepage/securityFeatures/lady.jpg";
import DollarSign from "../../../../public/assets/images/homepage/howTaskhubWorks/customer/DollarSign.png";
import CheckSign from "../../../../public/assets/images/homepage/howTaskhubWorks/customer/CheckSign.png";
import MessageSign from "../../../../public/assets/images/homepage/howTaskhubWorks/customer/MessageSign.png";

const SecurityFeaturesData = [
    {
        id: 1,
        icon: DollarSign,
        details: 'Payments with Enhanced Security'
    },
    {
        id: 2,
        icon: CheckSign,
        details: 'Reliable ratings and reviews'
    },
    {
        id: 3,
        icon: MessageSign,
        details: 'Coverage for peace of mind'
    },
]

const SecurityFeatures = () => {
    return (
        <div className={` w-full  bg-gradient-to-b from-[#FAF2FD] via-[#FDF7FE] to-[#F6E1FD] `}>
            <div
                className={`lg:block hidden xl:ml-[80px] lg:ml-[48px] xl:pl-12 pb-20 lg:pt-[60px]   font-SatoshiBold `}
            >
                <div className="flex justify-between items-center">
                    <div className="flex w-[400px] flex-col gap-5 space-y-8 xl:w-1/2">
                        <h1 className="hidden xl:text-[64px]  text-[40px] font-[900] text-[#381F8C] lg:block font-clashMedium ">
                            Security features ensuring your <br /> trust and safety
                        </h1>
                        <div className="flex flex-col gap-5 lg:space-y-6">
                            {SecurityFeaturesData.map((feature) => (
                                <div key={feature.id} className="flex items-center space-x-3">
                                    <span className="relative h-[28px] w-[25px] text-[20px] text-[#FE9B07]">
                                        <Image alt="" src={feature.icon} fill className="absolute" />
                                    </span>
                                    <p className="font-semibold lg:text-[24px] text-[16px] font-satoshiMedium">
                                        {feature.details}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="xl:h-[650px] xl:w-[650px] lg:h-[500px] lg:w-[500px]  relative rounded-l-[150px]">
                        <Image src={image1} fill alt="" className="absolute rounded-l-[150px]" />
                    </div>
                </div>


            </div>

            <div className="lg:hidden px-12">
                <h1 className=" text-[20px] text-center pt-10  font-[900] text-[#381F8C] block font-clashMedium">
                    Security features ensuring your trust and safety
                </h1>

                <div className="flex justify-center">
                    <div className="h-[250px] w-[250px] my-5 relative rounded-[150px]">
                        <Image src={image1} fill alt="" className="absolute rounded-[150px]" />
                    </div>
                </div>
                <div className="flex flex-col gap-5 pb-10">
                    {SecurityFeaturesData.map((feature) => (
                        <div key={feature.id} className="flex items-center space-x-3">
                            <span className="relative h-[20px] w-[20px] text-[20px] text-[#FE9B07]">
                                <Image alt="" src={feature.icon} fill className="absolute object-cover" />
                            </span>
                            <p className="font-semibold text-[16px]">{feature.details}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SecurityFeatures;
