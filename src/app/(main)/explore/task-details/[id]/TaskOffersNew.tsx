import { FC, useEffect, useRef, useState } from "react";
import { connectSocket } from "@/lib/socket";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { FaChevronDown, FaStar } from "react-icons/fa6";
import Button from "@/components/global/Button";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useGetTasksOffersQuery } from "@/services/tasks";
import { motion, AnimatePresence } from "framer-motion";
import OfferMessage from "@/components/dashboard/customer/OfferMessage";
import { FaCheck } from "react-icons/fa";
import { formatTimeAgo } from "@/lib/utils";

////
import { LiaReplySolid } from "react-icons/lia";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import ReplyOfferForm from "./ReplyOfferForm";

interface OffersProps {
  posterId: number;
  currentUserId: number;
  taskId: number;
  // offers: Offer[] | undefined;
}

function TaskOffersNew({ currentUserId, taskId, posterId }: OffersProps) {
  const [viewAll, setViewAll] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  ////////
  const [replyText, setReplyText] = useState<string>("");
  const [openReplyModal, setOpenReplyModal] = useState<{
    [key: string]: boolean;
  }>({});
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const { data: offers, refetch } = useGetTasksOffersQuery(taskId);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (modalRef.current) {
        modalRef.current.style.height = `${window.innerHeight}px`;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [openReplyModal]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleReply = (offerId: string) => {
    const socket = connectSocket(taskId);
    const data = {
      offerThreadList: [
        {
          taskId,
          offerId,
          userId: user?.serviceProviderId,
          fullName: user?.firstName + " " + user?.lastName,
          message: replyText,
        },
      ],
    };

    if (user && socket) {
      try {
        socket.emit("offer/replies", data, () => {
          refetch();
          setReplyText("");
          setShowSuccessMessage(true);

          // Delay the closing of the modal and hiding the success message
          setTimeout(() => {
            setShowSuccessMessage(false);
            setOpenReplyModal((prev) => ({ ...prev, [offerId]: false }));
          }, 3000);
        });
      } catch (error) {
        console.error("Error submitting reply:", error);
      }
    } else {
      console.error("Socket not connected or user not logged in");
    }
  };
  return (
    <section className="mt-14">
      <header className="mb-6 text-[#E58C06]">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-satoshiBold text-xl font-bold lg:text-3xl">
            Offers
          </h2>
          <button
            className="flex items-center gap-3"
            onClick={() => setViewAll(!viewAll)}
          >
            <span className="font-satoshiBold font-bold">
              {viewAll ? "View less" : "View all"}
            </span>
            <FaChevronDown />
          </button>
        </div>
        <p className="font-satoshiBold text-base font-bold text-[#403E44] sm:text-lg">
          <strong className="font-bold text-primary">Note: </strong>
          Before you accept an Offer...
        </p>
        <p className="font-satoshiMedium text-[15px] text-[#55535A] sm:text-lg">
          ✅ Converse with the service provider to ensure they’re the right fit.
        </p>
        <p className="font-satoshiMedium text-[15px] text-[#55535A] sm:text-lg">
          ✅{" "}
          <strong className="font-satoshiBold font-bold text-primary">
            Edit your task details
          </strong>{" "}
          (if necessary)—especially the price—to match what you both agreed on.
        </p>
      </header>

      <ul className="">
        {offers?.map((offer) => (
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
                {/* First Offer  */}
                <div className=" relative mb-2 rounded-xl bg-[#FDF8F0] p-2 sm:p-3">
                  <p className="font-satoshiMedium text-lg text-primary md:text-2xl">
                    {offer.fullName}
                  </p>
                  <div className="flex gap-2 border-b border-[#F7DBB2] pb-2">
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
                  </div>
                  <div className="mt-3 flex justify-between">
                    <p className="max-w-[150px] font-satoshiMedium text-sm text-[#140B31] sm:max-w-full sm:text-xl">
                      {offer.message}
                    </p>
                    <div className="text-right">
                      {/* <p className="block font-satoshiMedium text-xs text-primary sm:text-base">
                        20 of Dec, 2024
                      </p> */}
                      <p className="block font-satoshiMedium text-xs text-primary sm:text-base">
                        {formatTimeAgo(offer.createdAt)}
                      </p>
                      <p className="font-satoshiMedium text-sm text-[#E58C06] line-through md:text-xl">
                        Price: $2500
                      </p>
                    </div>
                  </div>
                  {/* Display when offer has other messages  */}
                  {offer.offerThreadList.length > 0 && (
                    <LiaReplySolid
                      strokeWidth={1.2}
                      stroke="#381F8C"
                      size={25}
                      className="absolute -bottom-5 -left-5 rotate-180"
                    />
                  )}
                </div>
                {offer.offerThreadList.length > 0 && (
                  <ul className="mt-5 w-full">
                    {offer.offerThreadList.map((offerThread) => (
                      <li key={offerThread.message}>
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
                          <div className="flex-grow rounded-xl bg-[#EBE9F4] p-2 sm:p-3">
                            <div className="mb-2 flex justify-between border-b border-[#C1BADB] pb-2">
                              <p className="font-satoshiMedium text-base text-primary md:text-2xl">
                                {offerThread.fullName}
                              </p>
                              <div className="text-right">
                                <p className="block font-satoshiMedium text-xs text-primary sm:text-base">
                                  {formatTimeAgo(offerThread.timeStamp)}
                                </p>
                                <p className="font-satoshiMedium text-sm text-[#E58C06] line-through md:text-xl">
                                  Price: $2000
                                </p>
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
                )}
              </div>
            </div>
            {offer.serviceProviderId === currentUserId &&
              offer.offerThreadList.length > 0 && <ReplyOfferForm />}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TaskOffersNew;
