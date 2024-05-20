import Image from "next/image";
import React from "react";

const PageHeader = () => {
  return (
    <header className=" mx-auto bg-slate-200  p-4 lg:rounded-bl-[5rem] lg:rounded-br-[5rem] lg:px-10 lg:py-10 ">
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
