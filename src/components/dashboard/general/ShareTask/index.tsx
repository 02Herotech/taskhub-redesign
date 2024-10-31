import Head from 'next/head';

interface SocialMetaTagsProps {
    title: string;
    description: string;
    image: string;
    url: string;
}

export const SocialMetaTags: React.FC<SocialMetaTagsProps> = ({
    title,
    description,
    image,
    url
}) => {
    return (
        <Head>
            {/* Essential Meta Tags */}
            <meta name="title" content={title} />
            <meta name="description" content={description} />

            {/* Open Graph Meta Tags */}
            <meta property="og:site_name" content="Oloja" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:image:secure_url" content={image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />

            {/* Twitter Card Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@yourtaskhub" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* WhatsApp specific meta tags */}
            <meta property="og:image:alt" content={title} />
            <meta property="og:locale" content="en_AU" />
        </Head>
    );
};

import React from 'react';
import { FacebookSvg, InstagramSvg, LinkedinSvg, TikTokSvg, TwitterSvg, WhatsappSvg } from '@/lib/svgIcons';

interface ShareProps {
    pathname: string;
    title: string;
    description: string;
    image: string;
}

interface ShareLinkProps {
    name: string;
    icon: React.ReactNode;
    url: string;
}

const ShareTask: React.FC<ShareProps> = ({
    pathname,
    title,
    description,
    image
}) => {
    const fullUrl = `${process.env.NEXT_PUBLIC_URL}${pathname}`;

    // For WhatsApp, we'll only include the URL since the meta tags will handle the preview
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
            url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(`${title} - ${description}`)}`
        },
        {
            name: 'TikTok',
            icon: TikTokSvg,
            url: `https://www.tiktok.com/@username/video/share?url=${encodeURIComponent(fullUrl)}`
        },
        {
            name: 'LinkedIn',
            icon: LinkedinSvg,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`
        },
        // {
        //     name: 'Instagram',
        //     icon: InstagramSvg,
        //     url: `https://www.instagram.com/` // Note: Instagram doesn't support direct sharing via URL
        // }
    ];

    const handleShare = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            <SocialMetaTags
                title={title}
                description={description}
                image={image}
                url={fullUrl}
            />
            <div className="gap-4">
                <span className="text-sm font-medium">Share via:</span>
                <div className="flex gap-2">
                    {shareLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => handleShare(link.url)}
                            title={`Share on ${link.name}`}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            {link.icon}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ShareTask;