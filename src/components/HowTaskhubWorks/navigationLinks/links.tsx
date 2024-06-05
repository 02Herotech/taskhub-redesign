import Link from "next/link";
import clsx from "clsx";

type HowTaskhubWorkLinkProps = {
  href: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
};

const HowTaskhubWorkLinks: React.FC<HowTaskhubWorkLinkProps> = ({
  href,
  label,
  isActive,
  onClick,
}) => {

  return (
    <Link
      href={href}
      className={`cursor-pointer font-clashSemiBold lg:text-[25px] text-[14px] lg:w-[250px]  flex  ${isActive ? "text-[#FE9B07] " : "text-primary"
        }`}
      onClick={onClick}
    >
      <span className="lg:w-full w-[120px] flex flex-col items-center ">
        {label}
        {isActive ? (<div className="lg:w-full w-[120px] h-[2px] bg-[#FE9B07]"></div>) : <></>}
      </span>
    </Link>
  )

};

export default HowTaskhubWorkLinks;
