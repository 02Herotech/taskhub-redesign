import React from "react";
import { IoMdCheckmark } from "react-icons/io";

type SVGProps = { svgWidth?: string; svgHeight?: string };

function OrangeTick({
  svgWidth,
  svgHeight,
  ...props
}: React.ComponentProps<"div"> & SVGProps) {
  return (
    <div className="relative w-max text-white" {...props}>
      <svg
        width={svgWidth ?? "30"}
        height={svgHeight ?? "30"}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 2.74667L25.36 0L28.6267 5.05778L34.64 5.36L34.9422 11.3733L40 14.64L37.2533 20L40 25.36L34.9422 28.6267L34.64 34.64L28.6267 34.9422L25.36 40L20 37.2533L14.64 40L11.3733 34.9422L5.36 34.64L5.05778 28.6267L0 25.36L2.74667 20L0 14.64L5.05778 11.3733L5.36 5.36L11.3733 5.05778L14.64 0L20 2.74667Z"
          fill="#FE9B07"
        />
      </svg>
      <IoMdCheckmark className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}

export default OrangeTick;
