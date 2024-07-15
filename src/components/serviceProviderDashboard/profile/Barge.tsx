import Image from "next/image";
import React from "react";

const Barge = () => {
  return (
    <section className="relative max-md:max-w-64 md:min-h-64 flex flex-col justify-between gap-4 overflow-hidden rounded-xl bg-[#EBE9F4] px-4 py-2 md:p-6 ">
      <h4 className="text-lg font-bold font-satoshiBold md:hidden text-[#140B31]">My Badge</h4>
      <div className="flex items-end justify-center">
        <Image
          src={"/assets/images/serviceProvider/protective shield.png"}
          alt="overlay"
          width={400}
          height={300}
          className=" max-w-20 md:max-w-32  "
        />
        <div className="flex flex-col items-end gap-2 text-right">
          <h4 className="text-3xl font-bold font-satoshiBold max-md:hidden text-[#140B31]">My Badge</h4>
          <p className=" text-base md:text-sm  text-yellow-700">Bronze</p>
        </div>
      </div>
      <div>
        <p className="font-medium font-satoshiMedium text-[#381F8C]">
          Based on your status as a certified Service provider
        </p>
        <p className="text-xs text-slate-600 max-md:hidden ">
          Complete your profile for better badge rewards and increased service
          visibility.
        </p>
      </div>
    </section>
  );
};

export default Barge;
