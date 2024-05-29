import Button from "@/components/global/Button";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";

const ExploreMap = () => {
  return (
    <section className="pt-14">
      <div className="container">
        <div className="flex w-full items-center justify-between">
          <form className="flex items-center space-x-4 max-lg:my-4 max-lg:w-full max-lg:justify-between max-lg:px-1">
            <div className="flex h-[29px] items-center space-x-2 rounded-lg border border-status-violet bg-[#F1F1F2] px-4 max-sm:w-full lg:h-[58px] lg:w-[300px] lg:rounded-2xl">
              <CiSearch className="h-6 w-6 text-status-violet" />
              <input
                placeholder="Search"
                type="search"
                className="w-full bg-[#F1F1F2] text-base outline-none placeholder:text-base focus:outline-none active:outline-none lg:py-3"
              />
            </div>
            <button className="flex h-[29px] w-[29px] items-center justify-center rounded-lg bg-primary lg:h-[58px] lg:w-[58px] lg:rounded-2xl">
              <CiSearch className="h-5 w-5 text-status-violet lg:h-7 lg:w-7" />
            </button>
          </form>
          <Button
            theme="secondary"
            className="hidden h-[29px] items-center justify-center rounded-full bg-tc-orange px-14 font-bold text-white lg:flex lg:h-[58px]"
          >
            1 New Task
          </Button>
        </div>
        <div className="relative mt-7 h-[124px] lg:h-[473px]">
          <Image
            src="/assets/images/explore/google-map.png"
            alt="map"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default ExploreMap;
