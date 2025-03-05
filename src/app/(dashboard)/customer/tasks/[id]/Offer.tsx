import React from "react";
import Image from "next/image";
import { useState } from "react";
import { formatTimeAgo } from "@/lib/utils";
import { LiaReplySolid } from "react-icons/lia";
import SendPayment from "./SendPayment";
import { FaStar } from "react-icons/fa6";
import ReplyForm from "./ReplyForm";

type Props = { offer: Offer; taskId: number; refetch: any };

function Offer({ offer, taskId, refetch }) {
  const [openPaymentModal, setOpenPaymentModal] = useState(false);

  return (
    <li className="border-b border-[#C1BADB] pb-4" key={offer.id}>
      <div className="flex gap-1 sm:gap-3">
        <Image
          src={
            offer.service_provider_profile_Image ||
            "/assets/images/placeholder.jpeg"
          }
          width={40}
          height={40}
          alt="Service provder profile picture"
          className="size-10 rounded-full object-cover object-top md:size-14"
        />
        <div className="flex-grow">
          <div className="relative mb-2 rounded-xl bg-[#EBE9F4] p-2 sm:p-3">
            <div className="flex items-center justify-between border-b border-[#F7DBB2] pb-2">
              <div>
                <p className="font-satoshiMedium text-lg text-primary md:text-2xl">
                  {offer.fullName}
                </p>
                {/* <div className="flex gap-2">
                        <small>(4.5)</small>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_) => (
                            <FaStar
                              fill="#F8C51B"
                              // fill='#D5DADD'
                              key={Math.random() * 1234}
                            />
                          ))}
                        </div>
                      </div> */}
              </div>
              <button
                type="submit"
                className="rounded-full bg-primary px-5 py-2 font-satoshiBold text-sm font-bold text-white md:text-base"
                onClick={() => setOpenPaymentModal(true)}
              >
                Accept
              </button>
            </div>

            <div className="mt-3 flex justify-between">
              <p className="max-w-[150px] font-satoshiMedium text-sm text-[#140B31] sm:max-w-full sm:text-xl">
                {offer.message}
              </p>
              <div className="text-right">
                <p className="block font-satoshiMedium text-xs text-primary sm:text-base">
                  {formatTimeAgo(offer.createdAt)}
                </p>
                {offer.offerAmount && (
                  <p className="font-satoshiMedium text-sm text-[#E58C06] md:text-xl">
                    Price: ${offer.offerAmount}
                  </p>
                )}
              </div>
            </div>
            {offer.offerThreadList.length > 0 && (
              <LiaReplySolid
                strokeWidth={1.2}
                stroke="#381F8C"
                className="absolute -bottom-5 -left-5 rotate-180 text-base md:text-xl"
              />
            )}
          </div>

          {/* Rest of the thread  */}
          <ul className="mt-5 w-full space-y-2">
            {offer.offerThreadList.map((offerThread) => (
              <li key={Math.random() * 1234}>
                <div className="flex gap-1 sm:gap-3">
                  <Image
                    src={
                      offerThread.userProfileImage ||
                      "/assets/images/placeholder.jpeg"
                    }
                    alt="User profile picture"
                    width={36}
                    height={36}
                    className="size-9 rounded-full object-cover object-top md:size-12"
                  />
                  <div className="flex-grow rounded-xl bg-[#FDF8F0] p-2 sm:p-3">
                    <div className="mb-2 flex justify-between border-b border-[#C1BADB] pb-2">
                      <p className="font-satoshiMedium text-base text-primary md:text-2xl">
                        {offerThread.fullName}
                      </p>
                      <div className="text-right">
                        <p className="block font-satoshiMedium text-xs text-primary sm:text-base">
                          {formatTimeAgo(offerThread.timeStamp)}
                        </p>
                        {offerThread.offerAmount && (
                          <p className="font-satoshiMedium text-sm text-[#E58C06] md:text-xl">
                            Price: ${offerThread.offerAmount}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="max-w-[150px] font-satoshiMedium text-sm text-[#140B31] sm:max-w-full sm:text-xl">
                      {offerThread.message}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <SendPayment
        open={openPaymentModal}
        closeModal={() => setOpenPaymentModal(false)}
      />
      <ReplyForm taskId={taskId} offerId={offer.id} refetch={refetch} />
    </li>
  );
}

export default Offer;
