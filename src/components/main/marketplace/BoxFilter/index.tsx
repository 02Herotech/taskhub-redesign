import { IconType } from "react-icons";

interface BoxFilterProper {
  category: string;
  Icon: IconType;
}

const BoxFilter: React.FC<BoxFilterProper> = ({ category, Icon }) => {
  return (
    <button className="flex flex-col gap-3 rounded-lg bg-[#E58C06] px-4  py-2 text-white shadow-md md:px-8 md:py-4">
      <Icon size={15} className="size-4 lg:size-6" />
      <p className="text-[13px] font-bold md:text-[18px]">{category}</p>
    </button>
  );
};

export default BoxFilter;
