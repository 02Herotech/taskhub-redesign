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
      className={`cursor-pointer font-clashSemiBold text-[25px] w-[250px]  flex  ${isActive ? "text-[#FE9B07] " : "text-primary"
        }`}
      onClick={onClick}
    >
      <span className="w-full flex flex-col items-center ">
        {label}
        {isActive ? (<div className="w-full h-[2px] bg-[#FE9B07]"></div>) : <></>}
      </span>
    </Link>
  )

};

export default HowTaskhubWorkLinks;
