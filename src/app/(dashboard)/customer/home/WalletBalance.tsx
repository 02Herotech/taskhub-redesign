"use client";
import React from "react";
import { useSession } from "next-auth/react";

//!Todo Add wallet balance to it when wallet balance is available
//!Todo Update wallet balance in session after wallet is funded or debited
function WalletBalance() {
  const session = useSession();
  const userSignUpBonus = (
    session?.data?.user?.signUpBonusWallet?.balance ?? 0
  ).toFixed(2);
  return (
    <p className="text-5xl font-semibold">
      ${userSignUpBonus ? userSignUpBonus : "--"}
    </p>
  );
}

export default WalletBalance;
