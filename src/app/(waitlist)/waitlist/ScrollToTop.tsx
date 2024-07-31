"use client";
import React from "react";

const ScrollToTop = () => {
  return (
    <button
      className="rounded-full bg-violet-light bg-opacity-30 px-6 py-3 text-white"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
    >
      Back to top
    </button>
  );
};

export default ScrollToTop;
