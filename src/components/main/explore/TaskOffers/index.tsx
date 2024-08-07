import { FC, useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { connectSocket } from '@/lib/socket';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Button from '@/components/global/Button';
import { IoIosCloseCircleOutline } from 'react-icons/io';

interface OffersProps {
    offers: Offer[];
    posterId: number;
    currentUserId: number;
    taskId: number;
}

const OfferMessage: FC<{ message: Offer | Offer['offerThreadList'][0]; isThread: boolean }> = ({
    message,
    isThread,
}) => {
    return (
        <div className={`flex justify-start`}>
            <div className={`${isThread ? 'w-[80%]' : 'w-full'}`}>
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                        <Image
                            src="/assets/images/placeholder.jpeg"
                            alt={message.fullName}
                            width={32}
                            height={32}
                            className="rounded-full mr-2"
                        />
                        <span className="font-semibold">{message.fullName}</span>
                    </div>
                    <span className="text-primary font-semibold">
                        {/* {format(new Date(isThread ? message.timeStamp : message.createdAt), 'MMM d, yyyy h:mm a')} */}
                    </span>
                </div>
                <div className="p-3 rounded-lg bg-[#EBE9F4]">
                    <p className='text-[#140B31] font-semibold'>{message.message}</p>
                </div>
            </div>
        </div>
    );
};

const TaskOffers: FC<OffersProps> = ({ offers, currentUserId, taskId }) => {
    const [replyText, setReplyText] = useState<string>('');
    const [openReplyModal, setOpenReplyModal] = useState<boolean>(false);
    const { profile: user } = useSelector(
        (state: RootState) => state.userProfile,
    );

    const handleReply = (offerId: string) => {
        console.log('Replying to offer:', offerId);
        const socket = connectSocket(taskId);
        const data = {
            offerThreadList: [
                {
                    taskId,
                    offerId,
                    userId: user?.id,
                    fullName: user?.firstName + " " + user?.lastName,
                    message: replyText,
                },
            ],
        };

        if (user && socket) {
            try {
                socket.emit("offer/replies", data, () => { })
            } catch (error) {
                console.error('Error submitting offer:', error);
            }
        } else {
            console.error('Socket not connected or user not logged in');
        }
        setReplyText('');
        setOpenReplyModal(false);
    };

    return (
        <div className="max-h-96 overflow-y-scroll small-scrollbar pr-5 mt-14">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#E58C06] lg:text-3xl">Offers</h2>
                <button className="text-lg font-bold text-[#E58C06] lg:text-2xl">View all</button>
            </div>
            <div className="space-y-8">
                {offers.map((offer) => (
                    <div key={offer.id} className="space-y-3 border-b pb-1">
                        <OfferMessage message={offer} isThread={false} />
                        {offer.offerThreadList.map((thread) => (
                            <OfferMessage key={thread.offerId} message={thread} isThread={true} />
                        ))}
                        {offer.serviceProviderId === currentUserId && (
                            <div className="mt-2">
                                <h2 onClick={() => setOpenReplyModal(true)} className='text-primary cursor-pointer font-semibold'>Reply</h2>
                            </div>
                        )}
                        {openReplyModal && (
                            <div className="fixed inset-0 z-50 bg-black bg-opacity-20 flex items-end sm:items-center justify-center">
                                <div className="bg-white w-full sm:w-[500px] rounded-t-3xl lg:rounded-2xl px-5 pb-8 pt-2 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-3">
                                        <h2 className="font-clashBold text-primary text-start font-bold">Reply</h2>
                                        <div className="bg-[#EBE9F4] p-2 rounded-full">
                                            <IoIosCloseCircleOutline className="size-6 text-[#5A5960] cursor-pointer" onClick={() => setOpenReplyModal(false)} />
                                        </div>
                                    </div>
                                    <div>
                                        <textarea
                                            rows={5}
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            className="w-full p-2 border border-primary rounded-xl mb-4"
                                            required
                                        />
                                        <Button size="sm" type="submit" className="rounded-full" onClick={() => handleReply(offer.id)}>Send reply</Button>
                                    </div>
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