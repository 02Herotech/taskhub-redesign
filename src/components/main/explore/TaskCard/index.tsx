import Image from "next/image";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiCalendar, FiClock } from "react-icons/fi";
import { motion } from "framer-motion";
import { formatAmount } from "@/lib/utils";

type TaskCardProps = {
    title: string;
    price: number;
    location: string;
    date: string;
    time: string;
    availabiliy: string;
    offers: number;
    image: string;
};

const TaskCard = ({
    title,
    price,
    location,
    date,
    time,
    availabiliy,
    offers,
    image
}: TaskCardProps) => {
    return (
        <motion.div
            className="bg-[#EBE9F4] p-5 rounded-xl lg:rounded-4xl cursor-pointer"
            whileHover={{ scale: 1.02 }}
        >
            <div className="flex items-center justify-between w-full">
                <h2 className="text-2xl lg:text-[32px] text-primary font-bold">{title}</h2>
                <div className='size-[46px] rounded-full border relative'>
                    <Image src="/assets/images/logo.png" fill alt="Logo" className="object-contain" />
                </div>
            </div>
            <div className="space-y-2 my-4">
                <div className="flex items-center space-x-2 w-full text-[#716F78] font-medium">
                    <HiOutlineLocationMarker className="h-6 w-6 font-bold" />
                    <h5 className="text-[15px] lg:text-xl">{location}</h5>
                </div>
                <div className="flex items-center space-x-2 w-full text-[#716F78] font-medium">
                    <FiCalendar className="h-6 w-6 font-bold" />
                    <h5 className="text-[15px] lg:text-xl">{date}</h5>
                </div>
                <div className="flex items-center space-x-2 w-full text-[#716F78] font-medium">
                    <FiClock className="h-6 w-6 font-bold" />
                    <h5 className="text-[15px] lg:text-xl">{time}</h5>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <h2 className="text-primary text-lg lg:text-2xl font-bold capitalize">{availabiliy}</h2>
                    <div className="w-2 h-2 bg-[#716F78] rounded-full" />
                    <h2 className="text-[#716F78] text-lg lg:text-2xl font-medium capitalize">{`${offers} offers`}</h2>
                </div>
                <h2 className="text-primary text-2xl lg:text-[32px] font-bold capitalize">{formatAmount(price, "USD", false)}</h2>
            </div>
        </motion.div>
    )
}

export default TaskCard