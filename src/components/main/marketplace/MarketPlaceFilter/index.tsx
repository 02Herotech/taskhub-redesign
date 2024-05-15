import { FiSearch } from "react-icons/fi"
import { IoClose } from "react-icons/io5"

interface props {
    selectedCategory: any
    selectedSubCategory: any
    location: any
    service: any
    pricing: any
    others: any
    search1: any
    handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleSubCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleLocation: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleService: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handlePricing: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleOther: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleSearch1: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleClearSearch: () => void
    categories: any

}


const MarketPlaceFilter = ({
    selectedCategory,
    selectedSubCategory,
    location,
    service,
    pricing,
    others,
    search1,
    handleCategoryChange,
    handleSubCategoryChange,
    handleLocation,
    handleService,
    handlePricing,
    handleOther,
    handleSearch1,
    handleClearSearch,
    categories

}: props) => {

    const handleSubmit = (e: any) => {
        e.preventDefault
    }
    return (
        <div className="flex flex-col space-y-16 my-12">
            <div className=" flex flex-col space-y-8">

                <div className="flex flex-col space-y-2">
                    <h1 className="text-[#221354] font-bold text-[28px]">Our Various Category</h1>
                    <p className="text-[#221354] text-[14px]">Find the help you need on Taskhub</p>
                </div>
                <div className="flex text-[11px] space-x-2">
                    <p className="bg-[#381F8C] text-white py-2 px-4 rounded-3xl ">All</p>
                    <select
                        name="category"
                        id="category"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="border-[1.5px] border-[#381F8C] rounded-3xl bg-[#F1F1F2] text-[#381F8C] text-center focus:outline-none w-[180px]"
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
                        className="border-[1.5px] border-[#381F8C] rounded-3xl bg-[#F1F1F2] text-[#381F8C] text-center focus:outline-none w-[180px]"
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
                        className="border-[1.5px] border-[#381F8C] rounded-3xl bg-[#F1F1F2] text-[#381F8C] text-center focus:outline-none w-[180px]"
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
                        name="service"
                        id="service"
                        value={service}
                        onChange={handleService}
                        className="border-[1.5px] border-[#381F8C] rounded-3xl bg-[#F1F1F2] text-[#381F8C] text-center focus:outline-none w-[150px]"
                    >
                        <option value="" disabled>
                            Type of service
                        </option>
                        <option value="Remote">Remote</option>
                        <option value="Physical">Physical</option>
                    </select>

                    <select
                        name="pricing"
                        id="pricing"
                        value={pricing}
                        onChange={handlePricing}
                        className="border-[1.5px] border-[#381F8C] rounded-3xl bg-[#F1F1F2] text-[#381F8C] text-center focus:outline-none w-[150px]"
                    >
                        <option value="" disabled>
                            Pricing
                        </option>

                    </select>

                    <select
                        name="others"
                        id="others"
                        value={others}
                        onChange={handleOther}
                        className="border-[1.5px] border-[#381F8C] rounded-3xl bg-[#F1F1F2] text-[#381F8C] text-center focus:outline-none w-[150px]"
                    >
                        <option value="" disabled>
                            Other
                        </option>

                    </select>
                </div>
            </div>

            <div className="flex justify-between items-center my-10">
                <div className="flex flex-col space-y-2">
                    <h1 className="font-bold text-[28px]">Get a Tasker Directly</h1>
                    <p className="text-[#221354] text-[14px]">Browse through our various services</p>
                </div>


                <form onSubmit={handleSubmit} className="flex items-center">

                    <div className="flex items-center  w-[300px] border-[1.5px] rounded-xl border-[#C1BADB] px-2">

                        <FiSearch size={15} className="text-[#C1BADB]" />

                        <input
                            type="text"
                            value={search1}
                            className=" w-full focus:border-white focus:outline-none px-2 py-3 text-[12px]  "
                            onChange={handleSearch1}
                            placeholder="Search"
                        />

                        {search1 && (

                            <IoClose size={15} className=" cursor-pointer text-grey6 hover:text-[#C1BADB] " onClick={handleClearSearch} />

                        )}
                    </div>

                    <button
                        type="submit"
                        className="bg-purpleBase hover:bg-purpleHover rounded-xl py-3 px-4 text-[12px] ml-2 focus:outline-none text-white"
                    >
                        <FiSearch size={20} />
                    </button>
                </form>

            </div>
        </div>
    );
}

export default MarketPlaceFilter;