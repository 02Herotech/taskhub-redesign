import { IoMdCheckmark } from "react-icons/io";
import { motion } from "framer-motion";

type Props = {
  text: string;
  top: number;
  left: number;
  animateTo: number;
  delay?: number;
};

function Guarantee({ text, top, left, animateTo, delay = 0.7 }: Props) {
  return (
    <motion.div
      whileInView={{ left: animateTo, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 1.1 }}
      initial={{ opacity: 0 }}
      className="absolute flex max-w-[300px] items-center gap-2 rounded-xl bg-[#E58C06] px-2 py-2 text-xs font-bold text-white"
      style={{ top: top + "px", left: left + "px" }}
    >
      <div className="rounded-full bg-[#C1F6C399] p-[5px]">
        <div className="rounded-full bg-[#A6F8AA] p-[2px]">
          <div className="relative w-max text-white">
            <svg
              width="16"
              height="16"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 2.74667L25.36 0L28.6267 5.05778L34.64 5.36L34.9422 11.3733L40 14.64L37.2533 20L40 25.36L34.9422 28.6267L34.64 34.64L28.6267 34.9422L25.36 40L20 37.2533L14.64 40L11.3733 34.9422L5.36 34.64L5.05778 28.6267L0 25.36L2.74667 20L0 14.64L5.05778 11.3733L5.36 5.36L11.3733 5.05778L14.64 0L20 2.74667Z"
                fill="#4CAF50"
              />
            </svg>
            <IoMdCheckmark
              size={13}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </div>
      </div>
      <span>{text}</span>
    </motion.div>
  );
}

export default Guarantee;
