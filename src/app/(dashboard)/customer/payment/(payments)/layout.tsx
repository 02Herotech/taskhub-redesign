"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

type LinksProps = {
    title: string;
    link: string;
}

const links: LinksProps[] = [
    {
        title: 'Payment history',
        link: '/customer/payment/payment-history'
    },
    {
        title: 'My Offers',
        link: '/customer/payment/offers'
    }
]

type AuthLayoutProps = {
    children: React.ReactNode;
};

const TransactionHistoryLayout = ({ children }: AuthLayoutProps) => {
    const pathname = usePathname()

    return (
        <div className='p-4 lg:px-14 mt-24'>
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-10">
                        {links.map((link, index) => (
                            <Link key={index} href={link.link} className="flex items-center space-x-3">
                                <div className={`size-5 rounded-full ${pathname === link.link ? 'bg-primary' : 'bg-white border-primary border-4'}`} />
                                <h2 className={`text-[#140B31] lg:text-lg font-satoshiMedium`}>{link.title}</h2>
                            </Link>
                        ))}
                    </div>
                </div>

                <main className="">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default TransactionHistoryLayout