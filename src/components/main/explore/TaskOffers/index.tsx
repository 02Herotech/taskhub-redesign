import { FC, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { connectSocket } from '@/lib/socket';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Button from '@/components/global/Button';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useGetTasksOffersQuery } from '@/services/tasks';
import { formatTimeAgo } from '@/lib/utils';

interface OffersProps {
    posterId: number;
    currentUserId: number;
    taskId: number;
}

const OfferMessage: FC<{ message: Offer | Offer['offerThreadList'][0]; isThread: boolean }> = ({
    message,
    isThread,
}) => {
    const timestamp = isThread ? (message as Offer['offerThreadList'][0]).timeStamp : (message as Offer).createdAt;
    const profileImageUrl = isThread ? (message as Offer['offerThreadList'][0]).userProfileImage: (message as Offer).service_provider_profile_Image;

    return (
        <div className={`flex ${isThread ? 'justify-end' : 'justify-start'}`}>
            <div className={`${isThread ? 'w-[80%]' : 'w-full'}`}>
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                        <Image
                            src={profileImageUrl || "/assets/images/placeholder.jpeg"}
                            alt={message.fullName}
                            width={64} 
                            height={64} 
                            className="rounded-full mr-2 object-cover w-8 h-8"
                        />
                        <span className="font-semibold">{message.fullName}</span>
                    </div>
                    <span className="text-primary font-semibold text-sm">
                        {formatTimeAgo(timestamp)}
                    </span>
                </div>
                <div className={`p-3 rounded-lg ${isThread ? 'bg-[#F7DBB2]' : 'bg-[#EBE9F4]'}`}>
                    <p className='text-[#140B31] font-semibold'>{message.message}</p>
                </div>
            </div>
        </div>
    );
};

const TaskOffers: FC<OffersProps> = ({ currentUserId, taskId }) => {
    const [replyText, setReplyText] = useState<string>('');
    const [openReplyModal, setOpenReplyModal] = useState<{ [key: string]: boolean }>({});
    const { profile: user } = useSelector((state: RootState) => state.userProfile);
    const { data: offers, refetch } = useGetTasksOffersQuery(taskId);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Use effect to focus on the textarea when the modal opens
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
                    // Optionally, you can clear the reply text or update the UI here
                    refetch();
                });
            } catch (error) {
                console.error('Error submitting reply:', error);
            }
        } else {
            console.error('Socket not connected or user not logged in');
        }
        setReplyText('');
        setOpenReplyModal((prev) => ({ ...prev, [offerId]: false }))
    };

    return (
        <div className="max-h-96 overflow-y-auto small-scrollbar pr-5 mt-14">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#E58C06] lg:text-3xl">Offers</h2>
                {/* <button className="text-lg font-bold text-[#E58C06] lg:text-2xl">View all</button> */}
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
                        <div className="border-l-2 border-gray-300 pl-4">
                            {offer.offerThreadList.map((thread) => (
                                <div className="mb-4" key={thread.message}>
                                    <OfferMessage message={thread} isThread={true} />
                                </div>
                            ))}
                        </div>

                        {openReplyModal[offer.id] && (
                            <div className="fixed inset-0 z-50 bg-black bg-opacity-20 flex items-end sm:items-center justify-center">
                                <div className="bg-white w-full sm:w-[500px] rounded-t-3xl lg:rounded-2xl px-5 pb-8 pt-2 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-3">
                                        <h2 className="font-clashBold text-primary text-start font-bold">Reply</h2>
                                        <div className="bg-[#EBE9F4] p-2 rounded-full">
                                            <IoIosCloseCircleOutline className="size-6 text-[#5A5960] cursor-pointer" onClick={() => setOpenReplyModal((prev) => ({ ...prev, [offer.id]: false }))} />
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
