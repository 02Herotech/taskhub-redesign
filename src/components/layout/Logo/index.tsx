import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <Image
      src={"/assets/images/waitlist/Layer_x0020_1.png"}
      alt="olojà"
      width={160}
      height={160}
      className="max-w-28 rounded-sm"
    />
  );
};

export default Logo;
