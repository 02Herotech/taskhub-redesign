// base -> absolute w-full z-10
// add to top -> -translate-y-[76px] sm:-translate-y-16 md:-translate-y-10
// add to bottom -> rotate-180 translate-y-[76px] sm:translate-y-16 md:translate-y-10

function Wave({ position }: { position: "top" | "bottom" }) {
  const styles =
    position == "top"
      ? "-translate-y-[76px] sm:-translate-y-16 md:-translate-y-10"
      : "bottom-0 rotate-180 translate-y-[76px] sm:translate-y-16 md:translate-y-10";
  return (
    <svg
      width="1200"
      height="218"
      viewBox="0 0 1200 218"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={"absolute z-10 w-full " + styles}
    >
      <path
        d="M105.269 198.989C55.1232 191.771 24.7837 173.679 -2.54455 137.754C-39.5693 89.0811 -2.54455 -10 -2.54455 -10H1192.02C1192.02 -10 1278.21 205.069 1176.06 209.195C1106.53 212.003 1127.52 95.8905 1039.66 113.167C951.796 130.443 921.179 172.966 845.265 211.283C769.35 249.599 713.358 111.413 607.223 113.166C517.869 114.643 490.842 194.609 402.166 185.304C345.522 179.36 329.647 131.907 272.708 128.476C199.698 124.076 177.409 209.373 105.269 198.989Z"
        fill="#290D3A"
        fillOpacity="0.23"
      />
      <path
        d="M105.269 198.989C55.1232 191.771 24.7837 173.679 -2.54455 137.754C-39.5693 89.0811 -2.54455 -10 -2.54455 -10H1192.02C1192.02 -10 1278.21 205.069 1176.06 209.195C1106.53 212.003 1127.52 95.8905 1039.66 113.167C951.796 130.443 921.179 172.966 845.265 211.283C769.35 249.599 713.358 111.413 607.223 113.166C517.869 114.643 490.842 194.609 402.166 185.304C345.522 179.36 329.647 131.907 272.708 128.476C199.698 124.076 177.409 209.373 105.269 198.989Z"
        fill="url(#paint0_angular_6714_11657)"
        fillOpacity="0.8"
      />
      <defs>
        <radialGradient
          id="paint0_angular_6714_11657"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(603.5 104) rotate(-180) scale(622.5 114)"
        >
          <stop offset="0.087956" stopColor="#6E05B8" />
          <stop offset="0.395" stopColor="#FFA439" />
          <stop offset="0.63" stopColor="#6E05B8" />
          <stop offset="0.855" stopColor="#FFA439" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default Wave;
