import Link from "next/link";
import React from "react";

const WaitlistNavbar = () => {
  return (
    <header className="flex items-center justify-between gap-4 py-4">
      <div className="text-white">Logo</div>
      <nav className="flex gap-8 font-clashMedium text-white max-md:hidden">
        <Link href="#">Home</Link>
        <Link href="#">Marketplace</Link>
        <Link href="#">BusinessHub</Link>
        <Link href="#">Services</Link>
      </nav>
      <button className="rounded-full border border-orange-normal  bg-white px-4 py-2 font-satoshiMedium text-sm font-semibold text-orange-normal">
        Join Waitlist
      </button>
    </header>
  );
};

export default WaitlistNavbar;
