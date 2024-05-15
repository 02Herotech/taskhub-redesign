import { IconType } from "react-icons";

interface BoxFilterProper {
    category: string
    Icon: IconType
}

const BoxFilter: React.FC<BoxFilterProper> = ({ category, Icon }) => {
    return (
        <div className="flex mr-5 cursor-pointer ">
            <div className="bg-[#E58C06] rounded-lg shadow-md shadow-grey6 flex flex-col text-white py-3 px-3 space-y-2">

                <Icon size={20} />
                <p className="text-[12px]">{category}</p>
            </div>
        </div>
    );
}

export default BoxFilter;