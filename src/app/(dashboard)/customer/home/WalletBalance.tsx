"use client";
import React from "react";
import { useSession } from "next-auth/react";

function WalletBalance() {
  const session = useSession();
  const userSignUpBonus = (
    session?.data?.user?.signUpBonusWallet?.balance ?? 0
  ).toFixed(2);
  return (
    <p className="text-6xl font-semibold">
      ${userSignUpBonus ? userSignUpBonus : "--"}
    </p>
  );
}

export default WalletBalance;
