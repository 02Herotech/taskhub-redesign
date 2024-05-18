import Image from "next/image";
import React from "react";

const Wallet = () => {
  return (
    <section className="relative flex flex-col gap-4 overflow-hidden rounded-xl bg-[#C1BADB] p-6 ">
      <Image
        src={"/assets/images/serviceProvider/walletOverlay.png"}
        alt="overlay"
        width={400}
        height={300}
        className="absolute right-0 top-0"
      />
      <h4 className="text-2xl font-bold text-[#381F8C] ">Wallet</h4>
      <h1 className="flex flex-col font-bold text-yellow-300">
        <span className="text-base"> $ </span>
        <span className="text-6xl"> 0.00</span>
      </h1>
      <button className="w-fit  rounded-full bg-[#381F8C] px-6 py-3 text-white">
        Withdraw
      </button>
    </section>
  );
};

export default Wallet;
