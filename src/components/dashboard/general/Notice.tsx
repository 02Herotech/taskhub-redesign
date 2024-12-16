import React from "react";
import { MdOutlineErrorOutline } from "react-icons/md";

type Props = {
  role: "USER" | "SERVICE_PROVIDER";
  verificationStatus?: null | "notVerified" | "verified" | "pending";
};

function Notice({ role, verificationStatus }: Props) {
  let verifiedMessage: string =
    role == "USER"
      ? "Note: Please provide accurate information below, as some fields (address and date of birth) cannot be edited after submission."
      : "Note: Please provide accurate information below, as some fields (address, date of birth and ABN) cannot be edited after submission.";
  let notVerifiedMessage: string = "Upload a new ID";
  return (
    <div className="mb-5 flex items-center space-x-3 rounded-lg bg-[#F8E9FE] p-3 text-[#D72828]">
      <MdOutlineErrorOutline className="size-5" />
      <h4 className="font-satoshiMedium text-sm">
        {verificationStatus == null ||
        verificationStatus == "verified" ||
        verificationStatus == "pending"
          ? verifiedMessage
          : notVerifiedMessage}
      </h4>
    </div>
  );
}

export default Notice;
