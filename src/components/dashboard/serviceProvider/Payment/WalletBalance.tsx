"use client";
import { formatAmount } from "@/lib/utils";
import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";

const WalletBalance: React.FC = () => {
  const { walletBalance, walletLoading } = useSelector(
    (state: RootState) => state.userProfile,
  );

  const balance = walletBalance as unknown as number || 0;  

  return <span>{walletLoading ? "---" : formatAmount(balance, "USD", false)}</span>;
};

export default WalletBalance;
