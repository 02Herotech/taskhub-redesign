import React, { useState } from 'react';
import { FaFacebook, FaWhatsapp, FaTelegram, FaSnapchatGhost, FaPinterest } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { IoCopy } from 'react-icons/io5';

interface ShareProps {
    pathname: string;
}

const ShareComponent: React.FC<ShareProps> = ({ pathname }) => {
    const [copied, setCopied] = useState(false);
    const fullUrl = `https://www.taskhub.com.au${pathname}`;

    const shareLinks = [
        { name: 'Facebook', icon: FaFacebook, url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}` },
        { name: 'WhatsApp', icon: FaWhatsapp, url: `https://api.whatsapp.com/send?text=${encodeURIComponent(fullUrl)}` },
        { name: 'X', icon: FaXTwitter, url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}` },
        { name: 'Telegram', icon: FaTelegram, url: `https://t.me/share/url?url=${encodeURIComponent(fullUrl)}` },
        { name: 'Snapchat', icon: FaSnapchatGhost, url: `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(fullUrl)}` },
        { name: 'Pinterest', icon: FaPinterest, url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(fullUrl)}` },
    ];

    const getIconColor = (name: string): string => {
        switch (name.toLowerCase()) {
            case 'facebook':
                return 'text-blue-600';
            case 'whatsapp':
                return 'text-green-500';
            case 'twitter':
                return 'text-blue-400';
            case 'telegram':
                return 'text-[#2AABEE]';
            case 'snapchat':
                return 'text-white bg-[#F7F251] p-1 rounded-full';
            case 'pinterest':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(fullUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleShare = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="space-y-4 bg-white">
            <button
                onClick={copyToClipboard}
                className="p-2 bg-[#EBE9F4] rounded-xl hover:bg-gray-300 text-primary w-full outline-none flex items-center justify-center space-x-2 cursor-pointer transition-colors"
                title="Copy link"
            >
                <h3 className='text-sm font-bold'>Link here...</h3>
                <IoCopy className="size-4 items-end" />
            </button>
            <div className="grid grid-cols-3 gap-2 w-full">
                {shareLinks.map((link) => (
                    <button
                        key={link.name}
                        onClick={() => handleShare(link.url)}
                        className="p-2 rounded-full transition-colors cursor-pointer"
                        title={`Share on ${link.name}`}>
                        <link.icon className={`size-8 ${getIconColor(link.name)}`} />
                    </button>
                ))}
            </div>
            {copied && <p className="text-green-600">Link copied to clipboard!</p>}
        </div>
    );
};

export default ShareComponent;