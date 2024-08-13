import Image from "next/image";
import Link from "next/link";
import React from "react";

const WaitlistNavbar = () => {
  return (
    <header className="relative flex items-center justify-between gap-4 py-4">
      <Image
        src={"/assets/images/waitlist/Frame 1618869733.png"}
        alt="olojà"
        width={160}
        height={160}
        quality={100}
        className=" absolute -left-20 top-0 max-h-80 w-full max-w-80  object-contain"
      />
      <div className="relative overflow-visible">
        <Image
          src={"/assets/images/waitlist/Layer_x0020_1.png"}
          alt="olojà"
          width={160}
          height={160}
          className="max-w-28 rounded-sm"
        />
      </div>
      <nav className="flex gap-8 font-clashMedium text-white max-md:hidden">
        <Link href="#">Home</Link>
        <Link href="#">Marketplace</Link>
        <Link href="#">BusinessHub</Link>
        <Link href="#">Services</Link>
      </nav>
      <Link
        href={"/waitlist-join"}
        className="rounded-full border border-orange-normal  bg-white px-4 py-2 font-satoshiMedium text-sm font-semibold text-orange-normal"
      >
        Join Waitlist
      </Link>
    </header>
  );
};

export default WaitlistNavbar;
