import Link from "next/link";
import Image from "next/image";

type Blog = { title: string; content: string; color: string; imgUrl: string };

//Todo Fix cleaning bsuiness
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

function Information() {
  return (
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
  );
}

export default Information;
