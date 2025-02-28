import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { LiaReplySolid } from "react-icons/lia";
import { connectSocket } from "@/lib/socket";

type Props = {
  taskId: number;
  user: UserProfileTypes;
};

function ReplyOfferForm({ taskId, user }: Props) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReply = (offerId: string) => {
    const socket = connectSocket(taskId);
    const data = {
      offerThreadList: [
        {
          taskId,
          offerId,
          userId: user?.serviceProviderId,
          fullName: user?.firstName + " " + user?.lastName,
          //? Message and price
          //message: replyText,
          //price: 
        },
      ],
    };

    if (user && socket) {
      try {
        socket.emit("offer/replies", data, () => {
          //? Run when post is successful
          //refetch();

          // Delay the closing of the modal and hiding the success message
          setTimeout(() => {
            //? CLosing of modal
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
    <AnimatePresence initial={false} mode="wait">
      {!showReplyForm ? (
        <motion.button
          className="mt-3 flex items-center gap-1 text-primary sm:gap-2"
          key="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            setShowReplyForm(true);
          }}
        >
          <LiaReplySolid strokeWidth={1.2} size={20} className="rotate-180" />
          <span className="font-satoshiBold text-base font-bold sm:text-xl ">
            Reply
          </span>
        </motion.button>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative mt-4 flex gap-[6px] rounded-lg border border-primary bg-[#EEEEEF99] p-4"
        >
          <textarea
            className="flex-grow resize-none appearance-none bg-transparent outline-none placeholder:font-satoshiMedium placeholder:text-[#716F78] sm:p-2"
            placeholder="Send a message..."
            rows={5}
            required
          ></textarea>
          <div className="flex flex-col">
            <div className="flex items-center gap-1 rounded-xl border border-[#C1BADB] bg-[#FCF4E6] p-1 px-2 sm:gap-2 sm:p-2">
              <label
                htmlFor="price"
                className="font-satoshiBold font-bold text-[#E58C06] sm:text-lg"
              >
                $
              </label>
              <input
                id="price"
                type="number"
                required
                min={1}
                placeholder="0"
                autoComplete="off"
                className="max-w-14 appearance-none bg-transparent font-bold outline-none placeholder:text-[#E58C06] sm:max-w-24 sm:text-lg"
              />
            </div>
            <button
              className="mt-auto self-end rounded-xl bg-primary px-4 py-2 font-satoshiBold font-bold text-white"
              type="submit"
            >
              Send
            </button>
          </div>
          <button
            type="button"
            onClick={() => setShowReplyForm(false)}
            className="absolute -right-3 -top-3 flex size-8 items-center justify-center rounded-full bg-[#EBE9F4] p-1 font-bold"
          >
            <IoClose />
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export default ReplyOfferForm;
