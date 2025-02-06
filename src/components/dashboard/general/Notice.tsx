// import React from "react";
// import { MdOutlineErrorOutline } from "react-icons/md";

// type Props = {
//   role: "USER" | "SERVICE_PROVIDER";
//   verificationStatus?: null | "NOT_VERIFIED" | "VERIFIED" | "PENDING";
// };

// function Notice({ role, verificationStatus }: Props) {
//   let verifiedMessage: string =
//     role == "USER"
//       ? "Note: Please provide accurate information below. Some fields (first name, last name, address, and date of birth) cannot be edited after submission. Contact customer support for any changes."
//       : "Note: Please provide accurate information below. Some fields (first name, last name, ABN, address, and date of birth) cannot be edited after submission. Contact customer support for any changes.";
      
//   let notVerifiedMessage: string = "Upload a new ID";
//   return (
//     <div className="mb-5 flex items-center space-x-3 rounded-lg bg-[#F8E9FE] p-3 text-[#D72828]">
//       <MdOutlineErrorOutline className="size-5" />
//       <h4 className="font-satoshiMedium text-sm">
//         {verificationStatus == null ||
//         verificationStatus == "VERIFIED" ||
//         verificationStatus == "PENDING"
//           ? verifiedMessage
//           : notVerifiedMessage}
//       </h4>
//     </div>
//   );
// }

// export default Notice;


import React, { useState } from "react";
import { MdOutlineErrorOutline } from "react-icons/md";
import ContactSupportModal from "../general/SupportModal"; // Import the modal component

type Props = {
  role: "USER" | "SERVICE_PROVIDER";
  verificationStatus?: null | "NOT_VERIFIED" | "VERIFIED" | "PENDING";
};

function Notice({ role, verificationStatus }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  let verifiedMessage: string =
    role === "USER"
      ? "Note: Please provide accurate information below. Some fields (first name, last name, address, and date of birth) cannot be edited after submission. "
      : "Note: Please provide accurate information below. Some fields (first name, last name, ABN, address, and date of birth) cannot be edited after submission. ";

  let notVerifiedMessage: string = "Upload a new ID";

  return (
    <>
      <div className="mb-5 flex items-center space-x-3 rounded-lg bg-[#F8E9FE] p-3 text-[#D72828]">
        <MdOutlineErrorOutline className="size-5" />
        <h4 className="font-satoshiMedium text-sm">
          {verificationStatus == null ||
          verificationStatus === "VERIFIED" ||
          verificationStatus === "PENDING"
            ? <>
                {verifiedMessage}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-blue-600 underline ml-1"
                >
                  Contact customer support
                </button>
              </>
            : notVerifiedMessage}
        </h4>
      </div>

      {isModalOpen && <ContactSupportModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}

export default Notice;
