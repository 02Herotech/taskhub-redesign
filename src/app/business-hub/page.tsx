import React from "react";
import Image from "next/image";
import VideoResources from "@/components/business-hub/VideoResourses";
import Link from "next/link";
import {
  Exit,
  Planning,
  Finance,
  Immigrant,
  Product,
  Marketing,
  Register,
  Online,
  Risk,
  Legal,
} from "@/components/business-hub/svg";
import { redirect } from "next/navigation";

type Category = { icon: () => React.JSX.Element; link: "#"; text: string };

const categories: Category[] = [
  { icon: Planning, link: "#", text: "Planning" },
  { icon: Finance, link: "#", text: "Finance" },
  { icon: Immigrant, link: "#", text: "Immmigrant" },
  { icon: Marketing, link: "#", text: "Marketing" },
  { icon: Register, link: "#", text: "Registration" },
  { icon: Online, link: "#", text: "Online & Digital" },
  { icon: Product, link: "#", text: "Products & Services" },
  { icon: Risk, link: "#", text: "Risk Management" },
  { icon: Legal, link: "#", text: "Legal" },
  { icon: Exit, link: "#", text: "Exiting" },
];

type Blog = { title: string; content: string; color: string; imgUrl: string };

function VerticalInfo({ title, content, color, imgUrl }: Blog) {
  return (
    <div className="row-span-2 overflow-hidden rounded-xl bg-[#F8E9FE]">
      <div className="h-3" style={{ background: color }} />
      <div className="p-3">
        <h3 className="mb-3 font-clashSemiBold text-2xl text-[#E58C06]">
          {title}
        </h3>
        <p className="mb-3 font-clashMedium text-lg text-primary">{content}</p>
        <button className="mb-3 rounded-[50px] bg-primary p-2 px-3 font-satoshi text-sm font-bold text-[#EBE9F4] hover:bg-[#25135f] sm:text-base">
          <Link href="#">Read more</Link>
        </button>
        <Image
          src={imgUrl}
          alt="#"
          width={300}
          height={500}
          className="max-h-[200px] rounded-xl object-cover object-top"
        />
      </div>
    </div>
  );
}

function HorizontalInfo({ title, content, color, imgUrl }: Blog) {
  return (
    <div className="col-span-2 flex h-full overflow-hidden rounded-xl bg-[#F8E9FE]">
      <div className="h-full w-6" style={{ background: color }} />
      <div className="flex flex-row-reverse items-center gap-2 p-3 lg:flex-row">
        <div>
          <h3 className="mb-3 font-clashSemiBold text-base text-[#E58C06] md:text-2xl">
            {title}
          </h3>
          <p className="mb-4 font-clashMedium text-sm text-primary md:text-lg">
            {content}
          </p>
          <button className="rounded-[50px] bg-primary p-2 px-3 font-satoshi text-sm font-bold text-[#EBE9F4] hover:bg-[#25135f] sm:text-base">
            <Link href="#">Read more</Link>
          </button>
        </div>
        <Image
          src={imgUrl}
          width={300}
          height={500}
          alt="#"
          className="w-1/3 min-w-[100px] self-stretch rounded-xl object-cover lg:w-1/2 lg:min-w-[300px]"
        />
      </div>
    </div>
  );
}

async function Page() {
  const result = await fetch(process.env.BLOG_API + "/postCategory");
  const categories_: { docs: { title: string; slug: string }[] } =
    await result.json();
  redirect(`/business-hub/${categories_.docs[0].slug}`);
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
            <p className="mb-5 font-satoshiMedium text-xl text-[#381F8C] sm:text-2xl">
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
      <div className="bg-[#D5BDDE]">
        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-20 md:py-16">
          <h2 className="mb-4 text-center font-clashSemiBold text-3xl text-[#2A1769] sm:text-left md:text-4xl">
            Our Categories
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((link) => {
              return (
                <Link
                  href="#"
                  className="flex items-center gap-1 rounded-lg bg-[#F8E9FE] p-1 sm:gap-3 sm:p-2"
                  key={Math.floor(Math.random() * 12000)}
                >
                  <div className="w-max rounded-lg bg-[#381F8C] p-2">
                    <link.icon />
                  </div>
                  <span className="font-clashMedium text-primary ">
                    {link.text}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>

      {/* Popular Information section  */}
      <section className="mx-auto max-w-7xl px-5 py-6 sm:px-20 md:py-10">
        <h2 className="mb-5 font-clashSemiBold text-3xl text-[#2A1769] md:text-4xl">
          Popular Information
        </h2>
        <div className="grid min-h-[700px] grid-cols-2 grid-rows-3 gap-3 lg:grid-cols-3">
          {/* grid-item-1  */}
          <div className="row-span-2 hidden lg:block">
            <VerticalInfo
              title="What are the Legal Requirements for Starting a Business in Australia?"
              content="Starting a business in Australia is an exciting journey. Imagine being your boss, making your schedule, and...."
              color="#E11414"
              imgUrl="/assets/images/business-hub/legal.jpg"
            />
          </div>
          <div className="col-span-2 block lg:hidden">
            <HorizontalInfo
              title="What are the Legal Requirements for Starting a Business in Australia?"
              content="Starting a business in Australia is an exciting journey. Imagine being your boss, making your schedule, and...."
              color="#E11414"
              imgUrl="/assets/images/business-hub/legal.jpg"
            />
          </div>

          {/* grid-item-2  */}
          <HorizontalInfo
            title="How Long Does a Tax Rebate Take? Definition and when to expect it."
            content=" There are several reasons why you may be owed a tax refund, or tax rebate, by HMRC...."
            color="#E58C06"
            imgUrl="/assets/images/business-hub/tax-rebate.jpg"
          />

          {/* grid-item-3  */}
          <div className="col-span-2 flex items-center overflow-hidden rounded-xl bg-[#F8E9FE] lg:col-span-1">
            <div className="h-full w-6 bg-primary" />
            <div className="flex items-center gap-2 p-3 lg:flex-row">
              <Image
                width={300}
                height={500}
                src="/assets/images/business-hub/legal.jpg"
                alt="#"
                className="inline-block w-1/3 min-w-[100px] self-stretch rounded-xl object-cover lg:hidden lg:w-1/2 lg:min-w-[300px]"
              />
              <div>
                <h3 className="mb-3 font-clashSemiBold text-base text-[#E58C06] md:text-2xl">
                  How to Start a Business in Australia With no Money
                </h3>
                <p className="mb-4 font-clashMedium text-sm text-primary md:text-lg">
                  Despite the struggles of the last year, the Australian
                  government has provided small company owners....
                </p>
                <button className="rounded-[50px] bg-primary p-2 px-3 font-satoshi font-bold text-[#EBE9F4] hover:bg-[#25135f]">
                  <Link href="#">Read more</Link>
                </button>
              </div>
            </div>
          </div>

          {/* grid-item-4  */}
          <div className="row-span-2 hidden lg:block">
            <VerticalInfo
              title="How to start a cleaning business in Australia"
              content="Do you want to start a cleaning business in Australia? Here's a thorough guide to doing it, covering everything..."
              color="#FF62A7"
              imgUrl="/assets/images/business-hub/cleaning-business.jpg"
            />
          </div>
          <div className="col-span-2 block lg:hidden">
            <HorizontalInfo
              title="How to start a cleaning business in Australia"
              content="Do you want to start a cleaning business in Australia? Here's a thorough guide to doing it, covering everything..."
              color="#FF62A7"
              imgUrl="/assets/images/business-hub/cleaning-business.jpg"
            />
          </div>

          {/* grid-item-5 */}
          <HorizontalInfo
            title="The 7 Easiest Steps For Foreign Beginners Starting a Business in Australia."
            content="There are several reasons why you may be owed a tax refund, or tax rebate, by HMRC...."
            color="#156A52"
            imgUrl="/assets/images/business-hub/easy-steps.jpg"
          />
        </div>
      </section>

      <div className="bg-[#EBE9F4]">
        {/* Video resources -> Client Side rendering  */}
        <VideoResources />

        {/* News updates  */}
        <section className="mx-auto max-w-7xl px-5 py-6 sm:px-20 md:py-10">
          <h1 className="mb-6 font-clashSemiBold text-xl text-[#381F8C]">
            NEWS AND UPDATES
          </h1>
          <div className="flex flex-col items-start gap-6 md:flex-row">
            <figure className="w-full min-w-[300px] max-w-[400px] md:w-1/3">
              <Image
                src="/assets/images/business-hub/noah-webinar.png"
                alt="Webinar flier"
                className="mb-3 w-full rounded-xl"
                width={386}
                height={374}
              />
              <figcaption className="font-clashSemiBold text-2xl text-[#381F8C]">
                Webinar: How to start a business as an immigrant
              </figcaption>
            </figure>
            <div className="mt-3 flex w-full min-w-[300px] overflow-hidden rounded-lg bg-[#F8E9FE] md:mt-5 md:w-2/5">
              <div className="block w-6 self-stretch bg-[#156A52] md:hidden" />
              <div className="p-3">
                <h3 className="mb-3 font-clashSemiBold text-2xl text-[#E58C06]">
                  How to Start a Business in Australia With no Money
                </h3>
                <p className="mb-4 font-clashMedium text-lg text-primary">
                  Despite the struggles of the last year, the Australian
                  government has provided small company owners....
                </p>
                <button className="rounded-[50px] bg-primary p-2 px-3 font-satoshi font-bold text-[#EBE9F4] hover:bg-[#25135f]">
                  <Link href="#">Read more</Link>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Page;
