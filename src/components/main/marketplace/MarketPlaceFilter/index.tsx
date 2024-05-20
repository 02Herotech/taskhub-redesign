import { FiSearch } from "react-icons/fi"
import { IoClose } from "react-icons/io5"
import Link from "next/link"

interface props {
    selectedCategory: any
    selectedSubCategory: any
    location: any
    pricing: any
    search1: any
    handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleSubCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleLocation: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handlePricing: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleSearch1: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleClearSearch: () => void
    categories: any
    categoryHeader: any

}


const MarketPlaceFilter = ({
    selectedCategory,
    selectedSubCategory,
    location,
    pricing,
    search1,
    handleCategoryChange,
    handleSubCategoryChange,
    handleLocation,
    handlePricing,
    handleSearch1,
    handleClearSearch,
    categories,
    categoryHeader
}: props) => {

    const handleSubmit = (e: any) => {
        e.preventDefault
    }

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div className="flex flex-col space-y-16 my-12">
            <div className=" flex flex-col space-y-8">

                <div className="flex flex-col space-y-2">
                    <h1 className="text-[#221354] font-bold text-[30px] md:text-[39px]">Our Various Category</h1>
                    <p className="text-[#221354] text-[16px] md:text-[20px] font-[400] cursor-pointer">Find the help you need on Taskhub</p>
                </div>

                <div className="flex lg:hidden justify-center">
                    <select
                        name="filterBy"
                        id="filterBy"
                        className="border-[1.5px] border-[#381F8C] rounded-3xl bg-[#F1F1F2] text-[16px] font-[700] text-[#381F8C] text-center focus:outline-none w-[180px] py-4 px-8"
                    >
                        <option value="" className="rounded-3xl">
                            Filter By
                        </option>
                    </select>
                </div>

                <div className="hidden lg:block">
                    <div className="flex text-[11px] space-x-2 ">

                        <p className="bg-[#381F8C] text-white py-2 px-4 rounded-3xl text-[16px] font-[700] cursor-pointer" onClick={handleReload}>All</p>

                        <select
                            name="category"
                            id="category"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="border-[1.5px] border-[#381F8C] rounded-3xl bg-[#F1F1F2] text-[16px] font-[700] text-[#381F8C] text-center focus:outline-none w-[180px]"
                        >
                            <option value="" disabled>
                                Category
                            </option>
                            {Object.keys(categories).map((categoryKey) => (
                                <option key={categoryKey} value={categoryKey}>
                                    {categories[categoryKey].name}
                                </option>
                            ))}
                        </select>

                        <select
                            name="subCategory"
                            id="subCategory"
                            value={selectedSubCategory}
                            onChange={handleSubCategoryChange}
                            className="border-[1.5px] border-[#381F8C] rounded-3xl bg-[#F1F1F2] text-[16px] font-[700] text-[#381F8C] text-center focus:outline-none w-[180px]"
                        >
                            <option value="" disabled>
                                Subcategory
                            </option>

                            {categories[selectedCategory]?.subcategories.map(
                                (subCategory: any, index: any) => (
                                    <option key={index} value={subCategory}>
                                        {subCategory}
                                    </option>
                                )
                            )}
                        </select>

                        <select
                            name="location"
                            id="location"
                            value={location}
                            onChange={handleLocation}
                            className="border-[1.5px] border-[#381F8C] rounded-3xl bg-[#F1F1F2] text-[16px] font-[700] text-[#381F8C] text-center focus:outline-none w-[180px]"
                        >
                            <option value="" disabled>
                                Location
                            </option>
                            <option value="Western Australia">Western Australia</option>
                            <option value="Northern Territory">Northern Territory</option>
                            <option value="South Australia">South Australia</option>
                            <option value="Queensland">Queensland</option>
                            <option value="New South Wales">New South Wales</option>
                            <option value="Victoria">Victoria</option>
                            <option value="Tasmania">Tasmania</option>
                            <option value="Australian Capital Territory">
                                Australian Capital Territory
                            </option>

                        </select>

                        <select
                            name="pricing"
                            id="pricing"
                            value={pricing}
                            onChange={handlePricing}
                            className="border-[1.5px] border-[#381F8C] rounded-3xl bg-[#F1F1F2] text-[16px] font-[700] text-[#381F8C] text-center focus:outline-none w-[150px]"
                        >
                            <option value="" disabled>
                                Pricing
                            </option>
                            <option value={`${500}, ${1000}`}>
                                $500 -$1000
                            </option>
                            <option value="1000">
                                $1000
                            </option>
                            <option value="2000">
                                $2000
                            </option>

                        </select>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row w-full lg:justify-between lg:items-center my-10  space-y-10">
                <div className="flex flex-col space-y-2 w-[350px] md:w-full lg:w-full">
                    <h1 className="font-bold md:text-[39px] text-[30px]">{categoryHeader ? categoryHeader : "Get a Tasker Directly"}</h1>
                    <p className="text-[##381F8C] md:text-[25px] text-[20px] font-[400]">{categoryHeader ? `Here are few of our ${categoryHeader}` : "Browse through our various services"}</p>
                </div>


                <form onSubmit={handleSubmit} className="flex items-center w-full lg:justify-end justify-center ">

                    <div className="flex items-center w-full md:w-[400px] border-[1.5px] rounded-xl border-[#C1BADB] px-3">

                        <FiSearch size={15} className="text-[#C1BADB]" />

                        <input
                            type="text"
                            value={search1}
                            className=" w-full focus:border-white focus:outline-none px-2 py-4 text-[16px]  "
                            onChange={handleSearch1}
                            placeholder="Search"
                        />

                        {search1 && (

                            <IoClose size={15} className=" cursor-pointer text-grey6 hover:text-[#C1BADB] " onClick={handleClearSearch} />

                        )}
                    </div>

                    <button
                        type="submit"
                        className="bg-primary hover:bg-status-darkViolet rounded-xl py-5 px-5 text-[12px] ml-2 focus:outline-none text-white"
                    >
                        <FiSearch size={20} />
                    </button>
                </form>

            </div>
        </div >
    );
}

export default MarketPlaceFilter;