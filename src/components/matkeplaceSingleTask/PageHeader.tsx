import Image from "next/image";
import React from "react";

const PageHeader = () => {
  return (
    <header className="py-10  mx-auto px-10 bg-slate-200 rounded-br-[5rem] rounded-bl-[5rem] ">
      <Image
        src="/assets/images/marketplace/singleTask/marketPlace banner.png"
        alt="banner"
        width={800}
        height={500}
        className="w-full max-w-screen-xl "
      />
    </header>
  );
};

export default PageHeader;
