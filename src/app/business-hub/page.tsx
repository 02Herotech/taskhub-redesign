import React from "react";
import Image from "next/image";
import Categories from "@/components/business-hub/Categories";
import Information from "@/components/business-hub/Information";
import VideoResources from "@/components/business-hub/VideoResourses";
import NewsUpdates from "@/components/business-hub/NewsUpdates";

function Page() {
  return (
    <div className="">
      {/* Hero section  */}
      <div className="bg-[#F8E9FE] pt-8">
        <section className="mx-auto flex h-screen max-h-[1200px] min-h-[500px] max-w-7xl flex-col items-center justify-center gap-10 px-5 sm:px-20 lg:max-h-[700px] lg:flex-row lg:justify-between">
          <div className="flex max-w-[550px] flex-col justify-center">
            <h2 className="mb-5 font-clashSemiBold text-4xl text-[#381F8C] sm:font-clashBold sm:text-[#140B31] lg:text-5xl xl:text-5xl">
              Your Financial GPS for{" "}
              <strong className="text-[#E58C06]">Business</strong> Success
            </h2>
            <p className="mb-5 text-xl sm:text-2xl font-satoshiMedium text-[#381F8C]">
              Our mission is to provide you with the financial literacy as an
              immigrant business owner and integration support you need to
              thrive in Australia.
            </p>
          </div>
          <div className="max-w-[500px] xl:max-w-[550px]">
            <Image
              width={400}
              height={600}
              src="/assets/images/business-hub/hero-image.jpg"
              alt="Image"
              className="w-full rounded-t-2xl"
            />
          </div>
        </section>
      </div>

      {/* Categories section  */}
      <Categories />

      {/* Popular Information section  */}
      <Information />

      <div className="bg-[#EBE9F4]">
        {/* Video resources  */}
        <VideoResources />

        {/* News updates  */}
        <NewsUpdates />
      </div>
    </div>
  );
}

export default Page;
