import { FC, useEffect, useRef, useState } from 'react';
import { connectSocket } from '@/lib/socket';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Button from '@/components/global/Button';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useGetTasksOffersQuery } from '@/services/tasks';
import { motion, AnimatePresence } from 'framer-motion'; 
import OfferMessage from '@/components/dashboard/customer/OfferMessage';

interface OffersProps {
    posterId: number;
    currentUserId: number;
    taskId: number;
    offers: Offer[] | undefined;
}

const TaskOffers: FC<OffersProps> = ({ currentUserId, taskId, offers }) => {
    const [replyText, setReplyText] = useState<string>('');
    const [openReplyModal, setOpenReplyModal] = useState<{ [key: string]: boolean }>({});
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const { profile: user } = useSelector((state: RootState) => state.userProfile);
    const { refetch } = useGetTasksOffersQuery(taskId);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const openOfferId = Object.keys(openReplyModal).find(id => openReplyModal[id]);
        if (openOfferId && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [openReplyModal]);

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
                    setReplyText('');
                    setShowSuccessMessage(true);

                    // Delay the closing of the modal and hiding the success message
                    setTimeout(() => {
                        setShowSuccessMessage(false); 
                        setOpenReplyModal((prev) => ({ ...prev, [offerId]: false }));
                    }, 3000);
                });
            } catch (error) {
                console.error('Error submitting reply:', error);
            }
        } else {
            console.error('Socket not connected or user not logged in');
        }
    };

    return (
        <div className="min-h-96 overflow-y-auto small-scrollbar pr-5 mt-14">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#E58C06] lg:text-3xl">Offers</h2>
            </div>
            <div className="">
                {offers?.map((offer) => (
                    <div key={offer.id} className="space-y-8">
                        <OfferMessage message={offer} isThread={false} />
                        {offer.serviceProviderId === currentUserId && (
                            <div className="mt-2">
                                <h2 onClick={() => setOpenReplyModal((prev) => ({ ...prev, [offer.id]: true }))} className='text-primary cursor-pointer font-semibold'>Reply</h2>
                            </div>
                        )}
                        <div className="pl-4">
                            {offer.offerThreadList.map((thread) => (
                                <div className="mb-4" key={thread.message}>
                                    <OfferMessage message={thread} isThread={true} />
                                </div>
                            ))}
                        </div>

                        {openReplyModal[offer.id] && (
                            <div className="fixed inset-0 z-50 bg-black h-screen bg-opacity-20 flex items-end sm:items-center justify-center">
                                <div className="bg-white w-full sm:w-[500px] rounded-t-3xl lg:rounded-2xl px-5 pb-8 pt-2 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-3">
                                        <h2 className="font-clashBold text-primary text-start font-bold">Reply</h2>
                                        <div className="bg-[#EBE9F4] p-2 rounded-full">
                                            <IoIosCloseCircleOutline
                                                className="size-6 text-[#5A5960] cursor-pointer"
                                                onClick={() => setOpenReplyModal((prev) => ({ ...prev, [offer.id]: false }))}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <textarea
                                            ref={textareaRef}
                                            rows={5}
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            className="w-full p-2 border border-primary rounded-xl mb-4"
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
                                    <AnimatePresence>
                                        {showSuccessMessage && (
                                            <motion.div
                                                className="bg-green-100 border text-green-600 py-2 px-5 mt-4 rounded-xl flex items-center"
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <svg
                                                    className="w-6 h-6 mr-2 text-green-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                                <h2 className="font-semibold">Reply sent successfully!</h2>
                                            </motion.div>
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