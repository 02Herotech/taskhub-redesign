import { FaSortDown } from "react-icons/fa6";

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  errors: any;
}

export const CustomDateInput: React.FC<CustomInputProps> = ({
  value,
  onClick,
  errors,
}) => (
  <button
    className={`flex cursor-pointer justify-between rounded-2xl  bg-[#EBE9F4] px-2 py-1 text-[12px] placeholder:text-[14px] placeholder:font-bold hover:bg-status-darkpurple hover:text-white lg:w-[150px] lg:text-[14px] ${
      errors.taskDate
        ? "border border-[#ff0000] outline-[#FF0000]"
        : "border border-tc-gray outline-none"
    }`}
    onClick={onClick}
    type="button"
  >
    {value || "Choose Date"} <FaSortDown />
  </button>
);

export const CustomTimeInput: React.FC<CustomInputProps> = ({
  value,
  onClick,
  errors,
}) => (
  <button
    className={`flex cursor-pointer justify-between rounded-2xl bg-[#EBE9F4] px-2 py-1 text-[12px]  placeholder:text-[14px] placeholder:font-bold hover:bg-status-darkpurple hover:text-white lg:w-[150px] lg:text-[14px] ${
      errors.taskTime
        ? "border border-[#ff0000] outline-[#FF0000]"
        : "border border-tc-gray outline-none"
    }`}
    onClick={onClick}
    type="button"
  >
    {value || "Choose Time"} <FaSortDown />
  </button>
);
