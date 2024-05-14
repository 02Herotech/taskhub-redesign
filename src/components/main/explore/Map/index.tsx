import { CiSearch } from "react-icons/ci";

const ExploreMap = () => {

    return (
        <section className='py-5'>
            <div className='container lg:flex items-center gap-5 lg:gap-20'>
                <div className="flex items-center justify-between">
                    <form className="flex items-center space-x-4">
                        <div className='border border-status-violet rounded-2xl bg-[#F1F1F2] h-[29px] lg:h-[58px] max-sm:max-w-[202px] lg:w-[300px] flex items-center space-x-2 px-4'>
                            <CiSearch className="h-6 w-6 text-status-violet" />
                            <input
                                placeholder='Search'
                                type='search'
                                className="outline-none active:outline-none placeholder:text-base text-base py-3 bg-[#F1F1F2] w-full focus:outline-none"
                            />
                        </div>
                        <button className="size-[56px] bg-primary">
                            <CiSearch className="h-6 w-6 text-status-violet" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ExploreMap