import Button from "@/components/global/Button";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";

const ExploreMap = () => {
    return (
        <section className='pt-14'>
            <div className='container'>
                <div className="flex items-center justify-between w-full">
                    <form className="flex items-center max-lg:justify-between max-lg:px-1 max-lg:my-4 space-x-4 max-lg:w-full">
                        <div className='border border-status-violet rounded-lg lg:rounded-2xl bg-[#F1F1F2] h-[29px] lg:h-[58px] max-sm:w-full lg:w-[300px] flex items-center space-x-2 px-4'>
                            <CiSearch className="h-6 w-6 text-status-violet" />
                            <input
                                placeholder='Search'
                                type='search'
                                className="outline-none active:outline-none placeholder:text-base text-base lg:py-3 bg-[#F1F1F2] w-full focus:outline-none"
                            />
                        </div>
                        <button className="h-[29px] w-[29px] lg:h-[58px] lg:w-[58px] bg-primary rounded-lg lg:rounded-2xl flex items-center justify-center">
                            <CiSearch className="h-5 w-5 lg:w-7 lg:h-7 text-status-violet" />
                        </button>
                    </form>
                    <Button theme="secondary" className="hidden px-14 h-[29px] lg:h-[58px] rounded-full text-white font-bold bg-tc-orange lg:flex items-center justify-center">
                        1 New Task
                    </Button>
                </div>
                <div className="h-[124px] lg:h-[473px] relative mt-7">
                    <Image src="/assets/images/explore/google-map.png" alt="map" fill className="object-cover" />
                </div>
            </div>
        </section>
    )
}

export default ExploreMap