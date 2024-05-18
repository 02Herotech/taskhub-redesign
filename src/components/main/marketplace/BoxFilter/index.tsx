import { IconType } from "react-icons";

interface BoxFilterProper {
    category: string
    Icon: IconType
}

const BoxFilter: React.FC<BoxFilterProper> = ({ category, Icon }) => {
    return (
        <div className="flex m-3 cursor-pointer ">
            <div className="bg-[#E58C06] rounded-lg shadow-md shadow-[#FEFBFB80] flex flex-col items-start justify-center text-white px-4 py-2 md:px-8 md:py-4 space-y-1">

                <Icon size={25} />
                <p className="md:text-[18px] text-[15px] font-bold">{category}</p>
            </div>
        </div>
    );
}

export default BoxFilter;