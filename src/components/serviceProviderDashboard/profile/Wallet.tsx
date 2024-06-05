import Image from "next/image";
import Link from "next/link";
import React from "react";

const Wallet = () => {
  return (
    <section className="relative flex flex-col gap-4 overflow-hidden rounded-xl bg-[#C1BADB] p-6 ">
      <Image
        src={"/assets/images/serviceProvider/walletOverlay.png"}
        alt="overlay"
        width={400}
        height={300}
        className="absolute -right-10 top-0"
      />
      <h4 className="text-2xl font-bold text-[#381F8C] ">Wallet</h4>
      <h1 className="flex flex-col font-clash text-[#FE9B07]">
        <span className="text-base"> $ </span>
        <span className="text-7xl"> 0.00</span>
      </h1>
      <Link
        href="/service-provider/dashboard/payment/withdrawl"
        className="w-fit  rounded-full bg-[#381F8C] px-6 py-3 text-white"
      >
        Withdraw
      </Link>
    </section>
  );
};

export default Wallet;
