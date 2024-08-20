import { FC, useEffect, useRef, useState } from 'react';
import { connectSocket } from '@/lib/socket';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Button from '@/components/global/Button';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useGetTasksOffersQuery } from '@/services/tasks';
import { motion, AnimatePresence } from 'framer-motion';
import OfferMessage from '../OfferMessage';
import { FaCheck } from 'react-icons/fa';

interface OffersProps {
    taskId: number;
    posterId: number;
}

const CustomerTaskOffers: FC<OffersProps> = ({ taskId, posterId }) => {
    const [replyText, setReplyText] = useState<string>('');
    const [openReplyModal, setOpenReplyModal] = useState<{ [key: string]: boolean }>({});
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const { profile: user } = useSelector((state: RootState) => state.userProfile);
    const { data: offers, refetch } = useGetTasksOffersQuery(taskId);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const handleResize = () => {
            if (modalRef.current) {
                modalRef.current.style.height = `${window.innerHeight}px`;
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [openReplyModal]);

    const handleReply = (offerId: string) => {
        const socket = connectSocket(taskId);

        if (!socket) {
            console.error('Socket connection failed');
            return;
        }

        if (!user || !user.id || !user.firstName || !user.lastName) {
            console.error('User is not logged in or missing required information');
            return;
        }

        if (!replyText) {
            console.error('Reply text is empty');
            return;
        }

        const data = {
            offerThreadList: [
                {
                    taskId,
                    offerId,
                    userId: user.customerId,
                    fullName: `${user.firstName} ${user.lastName}`,
                    message: replyText,
                },
            ],
        };

        try {
            socket.emit("offer/replies", data, () => {
                refetch();
                setReplyText('');
                setShowSuccessMessage(true);

                // Delay closing the modal and hiding the success message
                setTimeout(() => {
                    setShowSuccessMessage(false);
                    setOpenReplyModal((prev) => ({ ...prev, [offerId]: false }));
                }, 3000);
            });
        } catch (error) {
            console.error('Error submitting reply:', error);
        }
    };

    return (
        <div className="max-h-96 overflow-y-auto small-scrollbar pr-5 mt-14">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#E58C06] lg:text-3xl">Offers</h2>
                {/* <button className="text-lg font-bold text-[#E58C06] lg:text-2xl">View all</button> */}
            </div>
            <div className="">
                {offers?.map((offer) => (
                    <div key={offer.id} className="border-b border-[#716F78] space-y-8 mb-5">
                        <OfferMessage message={offer} isThread={false} posterId={posterId} />
                        <div className="mt-2">
                            <h2 onClick={() => setOpenReplyModal((prev) => ({ ...prev, [offer.id]: true }))} className='text-primary cursor-pointer font-semibold'>Reply</h2>
                        </div>
                        <div className="pl-4">
                            {offer.offerThreadList.map((thread) => (
                                <div className="mb-4" key={thread.message}>
                                    <OfferMessage message={thread} isThread={true} posterId={posterId} />
                                </div>
                            ))}
                        </div>

                        {openReplyModal[offer.id] && (
                            <div ref={modalRef} className="fixed inset-0 z-50 bg-black h-screen bg-opacity-20 flex items-end sm:items-center justify-center">
                                <div className="bg-white w-full max-w-[600px] rounded-t-3xl lg:rounded-2xl px-5 pb-8 pt-2 transition-all duration-300">
                                    <div className={`flex items-center justify-between ${showSuccessMessage !== true && "mb-3"}`}>
                                        <h2 className={`font-clashBold text-primary text-start font-bold ${showSuccessMessage && "hidden"}`}>Reply</h2>
                                        <div className="bg-[#EBE9F4] p-2 rounded-full">
                                            <IoIosCloseCircleOutline
                                                className="size-6 text-[#5A5960] cursor-pointer"
                                                onClick={() => setOpenReplyModal((prev) => ({ ...prev, [offer.id]: false }))}
                                            />
                                        </div>
                                    </div>
                                    <AnimatePresence>
                                        {showSuccessMessage ? (
                                            <motion.div
                                                className="py-2 px-5 rounded-xl w-full flex space-y-4 flex-col items-center justify-center"
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <div className="size-11 bg-[#4CAF50] rounded-full flex items-center justify-center">
                                                    <FaCheck className="text-white" />
                                                </div>
                                                <h1 className="font-semibold text-primary text-center font-clashSemiBold text-2xl lg:text-4xl">Reply sent successfully!</h1>
                                                <h4 className="text-[#140B31] text-center text-xl font-medium font-satoshiMedium">Your reply has been sent to the service provider, you will be notified when there’s a response.</h4>
                                                <Button
                                                    className="rounded-full"
                                                    onClick={() => setOpenReplyModal((prev) => ({ ...prev, [offer.id]: false }))}
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

export default CustomerTaskOffers;
