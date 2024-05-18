import Image from "next/image";
import React from "react";

const Barge = () => {
  return (
    <section className="relative flex flex-col justify-between gap-4 overflow-hidden rounded-xl bg-[#EBE9F4] p-6 ">
      <div className="flex items-center justify-between">
        <Image
          src={"/assets/images/serviceProvider/protective shield.png"}
          alt="overlay"
          width={400}
          height={300}
          className=" max-w-32 "
        />
        <div className="flex flex-col items-end gap-2 text-right">
          <h4 className="text-3xl font-bold text-[#140B31]">My Badge</h4>
          <p className="text-sm  text-yellow-700">Bronze</p>
        </div>
      </div>
      <div>
        <p className="font-medium text-[#381F8C]">
          Based on your status as a certified Service provider
        </p>
        <p className="text-xs text-slate-600">
          Complete your profile for better badge rewards and increased service
          visibility.
        </p>
      </div>
    </section>
  );
};

export default Barge;
