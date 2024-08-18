"use client";
import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";

const WalletBalance = () => {
  const { walletBalance } = useSelector(
    (state: RootState) => state.userProfile,
  );
  console.log(walletBalance);
  return <span>{walletBalance}</span>;
};

export default WalletBalance;
