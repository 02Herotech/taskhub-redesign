"use client";
import React from "react";
import { useGetWalletBalanceQuery } from "@/services/wallet";

//Todo Move component to home page
function WalletBalance() {
  const { data: result } = useGetWalletBalanceQuery();
  return (
    <p className="text-5xl font-semibold">
      ${result ? result.data.balance : "--"}
    </p>
  );
}

export default WalletBalance;
