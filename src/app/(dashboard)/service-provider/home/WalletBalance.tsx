"use client";
import { formatAmount } from "@/lib/utils";
import { RootState } from "@/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function WalletBalance() {
  const { walletBalance } = useSelector(
    (state: RootState) => state.userProfile,
  );

  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    setBalance(walletBalance as unknown as number);
  }, [walletBalance]);
  return (
    <p className="text-5xl font-semibold">
      {balance == null ? "---" : formatAmount(balance, "USD", false)}
    </p>
  );
}

export default WalletBalance;
