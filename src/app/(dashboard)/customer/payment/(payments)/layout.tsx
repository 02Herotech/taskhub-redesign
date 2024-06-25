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
        title: 'My invoices',
        link: '/customer/payment/invoices'
    }
]

type AuthLayoutProps = {
    children: React.ReactNode;
};

const TransactionHistoryLayout = ({ children }: AuthLayoutProps) => {
    const pathname = usePathname()

    return (
        <div className='p-4 lg:px-14 mt-24'>
            {/* <div className="mt-14 mb-4 space-y-8">
                <h4 className='text-[#140B31] font-satoshiBold font-bold text-2xl lg:text-4xl'>Payments</h4>
                <div className='border-[1.5px] border-primary' />
            </div> */}
            {/* <div className="flex items-center space-x-2 mb-5 lg:mb-10">
                <Button className='px-2' onClick={router.back}>
                    <IoArrowBackSharp className='size-7' />
                </Button>
                <Button>
                    Payment and invoice history
                </Button>
            </div> */}
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-10">
                        {links.map((link, index) => (
                            <Link key={index} href={link.link} className="flex items-center space-x-3">
                                <div className={`size-5 rounded-full ${pathname === link.link ? 'bg-white border-primary border-4' : 'bg-primary'}`} />
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