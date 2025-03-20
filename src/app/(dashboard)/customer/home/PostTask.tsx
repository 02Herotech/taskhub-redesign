"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

function PostTask() {
  return (
    <div className="block md:hidden">
      <motion.div
        drag="y"
        whileDrag={{ scale: 1.1 }}
        dragConstraints={{ top: -100, bottom: 50 }}
        initial={{ y: -300, opacity: 0, rotate: -12 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", bounce: 0.6, duration: 1.2 }}
        className="fixed bottom-20 right-5 z-20 block size-20 overflow-hidden rounded-full bg-[#2A1769] md:hidden"
      >
        <Link
          href="/customer/add-task"
          className="flex h-full w-full items-center justify-center"
        >
          <FaPlus color="white" size={30} />
        </Link>
      </motion.div>
    </div>
  );
}

export default PostTask;
