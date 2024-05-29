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
    }, [pathname]);

    const handleLinkClick = (subLink: SubLink) => {
        if (subLink.href) {
            router.push(subLink.href);
        }
        setActiveTab(subLink);
    };

    return (
        <main className='py-10 bg-white lg:bg-gradient-to-b from-[#f3dcfc]  via-[#FFFFFF] to-[#F5DDFD]'>

            <div className='mx-auto max-w-7xl xl:mx-[120px] lg:mx-[48px] m-[20px] my-0'>
                <Header />

                <nav className="flex space-x-10 my-10 ">
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


// const MainLayout = ({ children }: LayoutProps) => {
//     return (
//         <main className='py-10 bg-white lg:bg-gradient-to-b from-[#f3dcfc]  via-[#FFFFFF] to-[#F5DDFD]'>

//             <div className='mx-auto max-w-7xl xl:mx-[120px] lg:mx-[48px] m-[20px] my-0'>
//                 <Header />
//                 < >{children}</>

//             </div>
//         </main>
//     );
// };

export default MainLayout;
