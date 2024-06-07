'use client'

import Header from '@/components/HowTaskhubWorks/Header'
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import HowTaskhubWorkLinks from '@/components/HowTaskhubWorks/navigationLinks/links';

type LayoutProps = {
    children: React.ReactNode;
};

type SubLink = {
    href: string;
    label: string;
};

const taskhub_links: SubLink[] = [
    {
        href: "/how-taskhub-works/customer",
        label: "Customer",

    },
    {
        href: "/how-taskhub-works/service-provider",
        label: "Service provider",

    },
];


const MainLayout = ({ children }: LayoutProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState<SubLink | null>(null);

    useEffect(() => {
        const currentRoute = pathname;
        const activeSubLink = taskhub_links.find(
            (subLink) => subLink.href === currentRoute
        );
        setActiveTab(activeSubLink || null);

        window.scrollTo(0, 0);
    }, [pathname]);

    const handleLinkClick = (subLink: SubLink) => {
        if (subLink.href) {
            router.push(subLink.href);
        }
        setActiveTab(subLink);
    };

    return (
        <main className='py-10 bg-white lg:bg-gradient-to-b from-[#f3dcfc]  via-[#FFFFFF] to-[#F5DDFD]'>
            <span className='lg:hidden w-[95%] mx-auto'>
                <Header />
            </span>
            <div className='mx-auto lg:w-[80%] w-[85%]'>
                <span className='hidden lg:block'>
                    <Header />
                </span>

                <nav className="flex lg:space-x-10 space-x-2 lg:my-10 mb-5 ml-5 lg:ml-0 ">
                    {taskhub_links.map((subLink) => (
                        <HowTaskhubWorkLinks
                            key={subLink.href}
                            href={subLink.href}
                            label={subLink.label}
                            isActive={activeTab?.href === subLink.href}
                            onClick={() => handleLinkClick(subLink)}
                        />
                    ))}
                </nav>
                < >{children}</>
            </div>
        </main>
    );
}

export default MainLayout;
