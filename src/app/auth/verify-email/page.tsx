import Carousel from "../Carousel";
import Link from "next/link";
import { Metadata } from "next";
import ResendEmail from "./ResendEmail";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Verify Email | Olójà",
};

const Page = () => {
  return (
    <section className="mx-auto flex max-w-[1400px] flex-col p-3 lg:flex-row">
      <Carousel />
      <div className="flex flex-grow items-center justify-center">
        <div
          className="relative w-full px-3 pt-8 sm:w-11/12 lg:px-0 lg:pt-0 lg:shadow"
          style={{ boxShadow: "0px -3px 196px 0px #0000000A" }}
        >
          <Image
            src="/assets/icons/polygon.svg"
            alt="Icon"
            className="relative z-20 hidden w-full lg:block"
            width={666}
            height={145}
          />
          <div className="absolute left-20 top-16 z-10 hidden size-24 rounded-full bg-primary blur-[100px] lg:block" />
          <div className="absolute left-48 top-40 z-10 hidden size-24 rounded-full bg-[#B8AED6] blur-3xl lg:block" />
          <div className="mx-auto py-2 lg:w-10/12 lg:py-5">
            <h2 className="mb-2 mt-8 font-clashMedium text-xl text-primary md:text-3xl">
              You’ve got mail!
            </h2>
            <ResendEmail />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
