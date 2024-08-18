import WalletBalance from "@/components/dashboard/serviceProvider/Payment/WalletBalance";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Wallet = () => {
  return (
    <section className="relative flex min-h-20 flex-col gap-4 overflow-hidden rounded-xl bg-[#C1BADB] p-6 lg:min-h-64 ">
      <Image
        src={"/assets/images/serviceProvider/walletOverlay.png"}
        alt="overlay"
        width={400}
        height={300}
        className="absolute -right-10 -top-8 md:top-0"
      />
      <h4 className="font-satoshiBold text-base font-bold text-[#381F8C] md:text-2xl ">
        Wallet
      </h4>
      <h1 className="flex flex-col font-clash text-[#FE9B07]">
        <span className="text-xs md:text-base"> $ </span>
        <span className="text-4xl md:text-7xl">
          {" "}
          <WalletBalance />{" "}
        </span>
      </h1>
      <div className="flex max-md:items-center max-md:justify-center">
        <Link
          href="/service-provider/payment/withdraw"
          className="w-fit rounded-full  bg-[#381F8C] px-4 py-2 text-white max-md:text-sm"
        >
          Withdraw
        </Link>
      </div>
    </section>
  );
};

export default Wallet;
