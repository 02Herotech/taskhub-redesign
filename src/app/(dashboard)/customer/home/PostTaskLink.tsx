"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { IoIosAddCircle } from "react-icons/io";

function PostTaskLink() {
  return (
    <motion.div
      initial={{ y: -300, opacity: 0, rotate: -12 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      transition={{ type: "spring", bounce: 0.4, duration: 1.2 }}
      className="fixed bottom-5 right-5 z-20 size-10 rounded-full bg-[#2A1769]"
    >
      <Link href="/customer/add-task" className="block h-full w-full">
        <IoIosAddCircle />
      </Link>
    </motion.div>
  );
}

export default PostTaskLink;
