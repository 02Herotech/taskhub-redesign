import { IoMdCheckmark } from "react-icons/io";
import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

function WaveTick() {
  const tickRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(tickRef, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    const startSequence = async () => {
      await controls.start({
        x: -50,
        opacity: 1,
        transition: { duration: 0.5 },
      });
      await controls.start({ scale: 1.5, transition: { duration: 0.5 } });
      await controls.start({
        rotate: 0,
        scale: 1,
        transition: { duration: 0.5 },
      }); // Reset
    };

    if (isInView) startSequence();
  }, [isInView]);

  return (
    <motion.div
      ref={tickRef}
      animate={controls}
      className="absolute -right-[62px] -top-3 rounded-full bg-[#C1F6C399] p-[10px] opacity-0"
    >
      <div className="rounded-full bg-[#A6F8AA] p-[5px]">
        <div className="relative w-max text-white">
          <svg
            width="26"
            height="26"
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
            size={23}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default WaveTick;
