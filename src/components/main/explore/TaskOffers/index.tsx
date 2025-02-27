import { FC, useEffect, useRef, useState } from "react";
import { connectSocket } from "@/lib/socket";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Button from "@/components/global/Button";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useGetTasksOffersQuery } from "@/services/tasks";
import { motion, AnimatePresence } from "framer-motion";
import OfferMessage from "@/components/dashboard/customer/OfferMessage";
import { FaCheck } from "react-icons/fa";

interface OffersProps {
  posterId: number;
  currentUserId: number;
  taskId: number;
  // offers: Offer[] | undefined;
}

const TaskOffers: FC<OffersProps> = ({ currentUserId, taskId, posterId }) => {
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
    <div className="small-scrollbar mt-14 min-h-96 overflow-y-auto pr-5">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#E58C06] lg:text-3xl">Offers</h2>
      </div>
      <div className="mb-5">
        {offers?.map((offer) => (
          <div
            key={offer.id}
            className="mb-5 space-y-8 border-b border-[#716F78]"
          >
            <OfferMessage
              message={offer}
              isThread={false}
              posterId={posterId}
            />
            <div className="pl-4">
              {offer.offerThreadList.map((thread) => (
                <div className="mb-4" key={thread.message}>
                  <OfferMessage
                    message={thread}
                    isThread={true}
                    posterId={posterId}
                  />
                </div>
              ))}
            </div>
            {offer.serviceProviderId === currentUserId && (
              <div className="mt-2">
                <h2
                  onClick={() =>
                    setOpenReplyModal((prev) => ({ ...prev, [offer.id]: true }))
                  }
                  className="cursor-pointer font-semibold text-primary"
                >
                  Reply
                </h2>
              </div>
            )}
            {openReplyModal[offer.id] && (
              <div
                ref={modalRef}
                className="fixed inset-0 z-50 flex h-screen items-end justify-center bg-black bg-opacity-20 sm:items-center"
              >
                <div className="w-full rounded-t-3xl bg-white px-5 pb-8 pt-2 transition-all duration-300 max-sm:pb-20 sm:w-[500px] lg:rounded-2xl">
                  <div className="mb-3 flex items-center justify-between">
                    <h2
                      className={`text-start font-clashBold font-bold text-primary ${showSuccessMessage && "hidden"}`}
                    >
                      Reply
                    </h2>
                    <div className="rounded-full bg-[#EBE9F4] p-2">
                      <IoIosCloseCircleOutline
                        className="size-6 cursor-pointer text-[#5A5960]"
                        onClick={() =>
                          setOpenReplyModal((prev) => ({
                            ...prev,
                            [offer.id]: false,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <AnimatePresence>
                    {showSuccessMessage ? (
                      <motion.div
                        className="flex w-full flex-col items-center justify-center space-y-4 rounded-xl px-5 py-2"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="flex size-11 items-center justify-center rounded-full bg-[#4CAF50]">
                          <FaCheck className="text-white" />
                        </div>
                        <h1 className="text-center font-clashSemiBold text-2xl font-semibold text-primary lg:text-4xl">
                          Reply sent successfully!
                        </h1>
                        <h4 className="text-center font-satoshiMedium text-xl font-medium text-[#140B31]">
                          Your reply has been sent to the service provider, you
                          will be notified when there’s a response.
                        </h4>
                        <Button
                          className="rounded-full"
                          onClick={() =>
                            setOpenReplyModal((prev) => ({
                              ...prev,
                              [offer.id]: false,
                            }))
                          }
                        >
                          Go Back
                        </Button>
                      </motion.div>
                    ) : (
                      <div>
                        <textarea
                          rows={5}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="mb-4 w-full rounded-xl border border-primary p-2"
                          required
                        />
                        <Button
                          size="sm"
                          type="button"
                          className="rounded-full"
                          disabled={!replyText.trim()}
                          onClick={() => handleReply(offer.id)}
                        >
                          Send reply
                        </Button>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskOffers;
