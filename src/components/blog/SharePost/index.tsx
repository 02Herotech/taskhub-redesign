import { FacebookSvg, InstagramSvg, LinkedinSvg, TikTokSvg, TwitterSvg, WhatsappSvg } from '@/lib/svgIcons';
import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { FaFacebook, FaWhatsapp, FaTelegram, FaSnapchatGhost, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { IoCopy } from 'react-icons/io5';

interface ShareProps {
    pathname: string;
    id?: number;
}

interface ShareLinkProps {
    name: string;
    icon: React.ReactNode;
    url: string;
    color?: string;
}

const ShareComponent: React.FC<ShareProps> = ({ pathname }) => {
    const [copied, setCopied] = useState(false);
    const fullUrl = `${process.env.NEXT_PUBLIC_URL}${pathname}`;

    const shareLinks: ShareLinkProps[] = [
        {
            name: 'Facebook',
            icon: FacebookSvg,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`
        },
        {
            name: 'WhatsApp',
            icon: WhatsappSvg,
            url: `https://api.whatsapp.com/send?text=${encodeURIComponent(fullUrl)}`
        },
        {
            name: 'X',
            icon: TwitterSvg,
            url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}`
        },
        {
            name: 'Tik Tok',
            icon: TikTokSvg,
            url: `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(fullUrl)}`
        },
        {
            name: 'LinkedIn',
            icon: LinkedinSvg,
            url: `https://t.me/share/url?url=${encodeURIComponent(fullUrl)}`
        },
    ];

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
        <div className="bg-white w-full">
            <button
                onClick={copyToClipboard}
                className="p-2 bg-[#EBE9F4] rounded-xl hover:bg-gray-300 text-primary w-full outline-none flex items-center justify-center space-x-2 cursor-pointer transition-colors"
                title="Copy link"
            >
                <h3 className='text-sm font-bold'>Link here...</h3>
                <IoCopy className="size-4 items-end" />
            </button>
            <p className='text-xs text-primary font-semibold font-satoshiBold my-2'>Export to share</p>
            <div className="grid grid-cols-3 max-sm:grid-cols-6 gap-2 w-full">
                {shareLinks.map((link) => (
                    <div key={link.name} className="flex flex-col justify-center items-center">
                        <button
                            onClick={() => handleShare(link.url)}
                            className="p-2 rounded-full transition-colors cursor-pointer hover:bg-gray-100 flex items-center justify-center"
                            title={`Share on ${link.name}`}
                        >
                            {link.icon}
                        </button>
                        <h5 className='text-center text-xs text-primary font-semibold font-satoshiBold'>{link.name}</h5>
                    </div>
                ))}
            </div>
            {copied && <p className="text-green-600 text-center">Link copied to clipboard!</p>}
        </div>
    );
};

export default ShareComponent;