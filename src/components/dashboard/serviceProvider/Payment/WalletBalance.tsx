"use client";
import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";

const formatNumber = (amount: string | number | null) => {
  if (amount === null || amount === undefined) return "---";
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const WalletBalance: React.FC = () => {
  const { walletBalance, walletLoading } = useSelector(
    (state: RootState) => state.userProfile,
  );

  return <span>{walletLoading ? "---" : formatNumber(walletBalance)}</span>;
};

export default WalletBalance;
