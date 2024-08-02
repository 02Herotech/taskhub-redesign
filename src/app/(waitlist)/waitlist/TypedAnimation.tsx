"use client";
import React from "react";
import { ReactTyped } from "react-typed";

const TypedAnimation = () => {
  return (
    <ReactTyped
      strings={["Product", "Service", "Provider"]}
      loop
      typeSpeed={250}
      backSpeed={100}
    />
  );
};

export default TypedAnimation;
