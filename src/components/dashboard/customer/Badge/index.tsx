import Image from "next/image";
import React from "react";

const CustomerBadge = () => {
    return (
        <section className="relative flex flex-col justify-between gap-4 overflow-hidden rounded-xl bg-[#EBE9F4] p-6 ">
            <h4 className="text-lg mb-2 lg:hidden font-bold text-[#140B31]">My Badge</h4>
            <div className="flex items-center justify-between">
                <Image
                    src={"/assets/images/serviceProvider/protective shield.png"}
                    alt="overlay"
                    width={400}
                    height={300}
                    className=" max-w-32 "
                />
                <div className="flex flex-col items-end gap-2 text-right">
                    <h4 className="hidden lg:block text-3xl font-bold text-[#140B31]">My Badge</h4>
                    <p className="text-sm  text-yellow-700">Bronze</p>
                </div>
            </div>
            <div>
                <p className="font-bold text-sm text-[#381F8C]">
                    Based on completion and ratings as a verified user/customer.
                </p>
                {/* <p className="text-xs text-slate-600">
                    Complete your profile for better badge rewards and increased service
                    visibility.
                </p> */}
            </div>
        </section>
    );
};

export default CustomerBadge;
