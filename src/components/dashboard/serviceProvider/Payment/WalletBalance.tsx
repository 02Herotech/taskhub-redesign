"use client";
import { formatAmount } from "@/lib/utils";
import { RootState } from "@/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const WalletBalance: React.FC = () => {
  const { walletBalance } = useSelector(
    (state: RootState) => state.userProfile,
  );

  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    setBalance(walletBalance as unknown as number);
  }, [walletBalance]);

  return (
    <span>{balance == null ? "---" : formatAmount(balance, "USD", false)}</span>
  );
};

export default WalletBalance;
