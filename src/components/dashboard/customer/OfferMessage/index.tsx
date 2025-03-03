import { FC } from "react";
import { formatTimeAgo } from "@/lib/utils";
import Image from "next/image";

const OfferMessage: FC<{
  message: Offer | Offer["offerThreadList"][0];
  isThread: boolean;
  posterId: number;
}> = ({ message, isThread, posterId }) => {
  const timestamp = isThread
    ? (message as Offer["offerThreadList"][0]).timeStamp
    : (message as Offer).createdAt;
  const profileImageUrl = isThread
    ? (message as Offer["offerThreadList"][0]).userProfileImage
    : (message as Offer).service_provider_profile_Image;
  const isPoster = posterId === (message as Offer).userId;

  return (
    <div className={`flex ${isThread ? "justify-end" : "justify-start"} `}>
      <div className={`${isThread ? "w-[80%]" : "w-full"}`}>
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src={profileImageUrl || "/assets/images/placeholder.jpeg"}
              alt={message.fullName}
              width={100}
              height={100}
              className="mr-2 size-8 rounded-full object-cover"
            />
            <span className="font-semibold">{message.fullName}</span>
          </div>
          <span className="text-sm font-semibold text-primary">
            {formatTimeAgo(timestamp)}
          </span>
        </div>
        <div
          className={`rounded-b-lg p-3 ${isPoster ? "bg-[#EBE9F4]" : "bg-[#F7DBB2]"}`}
        >
          <p className="font-semibold text-[#140B31]">{message.message}</p>
        </div>
      </div>
    </div>
  );
};

export default OfferMessage;
