import { FC, useEffect, useRef, useState } from 'react';
import { formatTimeAgo } from '@/lib/utils';
import Image from 'next/image';
import exp from 'constants';

const OfferMessage: FC<{ message: Offer | Offer['offerThreadList'][0]; isThread: boolean; }> = ({
    message,
    isThread,
}) => {
    const timestamp = isThread ? (message as Offer['offerThreadList'][0]).timeStamp : (message as Offer).createdAt;
    const profileImageUrl = isThread ? (message as Offer['offerThreadList'][0]).userProfileImage : (message as Offer).service_provider_profile_Image;

    return (
        <div className={`flex ${isThread ? 'justify-end' : 'justify-start'}`}>
            <div className={`${isThread ? 'w-[80%]' : 'w-full'}`}>
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                        <Image
                            src={profileImageUrl || "/assets/images/placeholder.jpeg"}
                            alt={message.fullName}
                            width={100}
                            height={100}
                            className="rounded-full size-8 object-cover mr-2"
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

export default OfferMessage;