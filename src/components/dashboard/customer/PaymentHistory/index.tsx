"use client"

import { useState } from 'react';
import { formatAmount } from "@/lib/utils";
import Button from "@/components/global/Button";
import Popup from '@/components/global/Popup';
import { FiClock } from 'react-icons/fi';

type CustomerPaymentHistoryProps = {
    transactionTitle: string;
    transactionAmount: number;
    serviceType: string;
    date: any;
    paidTo: string;
    document: any
}

const CustomerPaymentHistoryData: CustomerPaymentHistoryProps[] = [
    {
        transactionTitle: 'Spa Appointment',
        transactionAmount: 125.75,
        serviceType: 'Wellness',
        date: '03/15/2023',
        paidTo: 'Relaxation Spa',
        document: 'https://example.com/receipt1.pdf'
    },
    {
        transactionTitle: 'House Cleaning',
        transactionAmount: 89.50,
        serviceType: 'Home Services',
        date: '02/20/2023',
        paidTo: 'Sparkle Cleaners',
        document: 'https://example.com/receipt2.pdf'
    },
    {
        transactionTitle: 'Car Repair',
        transactionAmount: 250.00,
        serviceType: 'Automotive',
        date: '01/10/2023',
        paidTo: 'AutoFix Garage',
        document: 'https://example.com/receipt3.pdf'
    },
    {
        transactionTitle: 'Dog Grooming',
        transactionAmount: 70.00,
        serviceType: 'Pet Care',
        date: '04/05/2023',
        paidTo: 'Pawfect Groomers',
        document: 'https://example.com/receipt4.pdf'
    },
    {
        transactionTitle: 'Yoga Class',
        transactionAmount: 45.25,
        serviceType: 'Fitness',
        date: '05/02/2023',
        paidTo: 'Harmony Yoga Studio',
        document: 'https://example.com/receipt5.pdf'
    },
    {
        transactionTitle: 'Personal Training Session',
        transactionAmount: 60.00,
        serviceType: 'Fitness',
        date: '06/12/2023',
        paidTo: 'FitPro Trainers',
        document: 'https://example.com/receipt6.pdf'
    },
    {
        transactionTitle: 'Gardening Service',
        transactionAmount: 100.50,
        serviceType: 'Home Services',
        date: '07/22/2023',
        paidTo: 'Green Thumb Gardens',
        document: 'https://example.com/receipt7.pdf'
    },
    {
        transactionTitle: 'Piano Lessons',
        transactionAmount: 75.00,
        serviceType: 'Education',
        date: '08/15/2023',
        paidTo: 'Melody Music School',
        document: 'https://example.com/receipt8.pdf'
    },
    {
        transactionTitle: 'Massage Therapy',
        transactionAmount: 120.50,
        serviceType: 'Wellness',
        date: '09/30/2023',
        paidTo: 'Therapy Touch',
        document: 'https://example.com/receipt9.pdf'
    },
    {
        transactionTitle: 'Plumbing Repair',
        transactionAmount: 150.00,
        serviceType: 'Home Services',
        date: '10/11/2023',
        paidTo: 'QuickFix Plumbing',
        document: 'https://example.com/receipt10.pdf'
    }
];

const CustomerPaymentHistory = () => {
    const [visibleTransactions, setVisibleTransactions] = useState(4);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<CustomerPaymentHistoryProps | null>(null);
    const todayDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const handleLoadMore = () => {
        setVisibleTransactions(prevVisible => prevVisible + visibleTransactions);
    };

    const handleCardClick = (payment: CustomerPaymentHistoryProps) => {
        setSelectedPayment(payment);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPayment(null);
    };

    return (
        <div className="w-full bg-[#EBE9F4] rounded-[20px] p-4 font-satoshi">
            <h3 className="text-[#140B31] font-satoshiBold text-base mb-5">{todayDate}</h3>
            <div className="space-y-5">
                {CustomerPaymentHistoryData.slice(0, visibleTransactions).map((data, index) => (
                    <div
                        key={index}
                        className="flex max-lg:flex-col lg:items-center justify-between px-5 py-3 border-b border-primary cursor-pointer"
                        onClick={() => handleCardClick(data)}
                    >
                        <div className="flex items-center space-x-5">
                            <div className="w-14 h-14 bg-[#C1BADB] rounded-full flex items-center justify-center">
                                <div className="w-7 h-7 bg-white rounded-full" />
                            </div>
                            <div className="">
                                <h4 className="text-primary font-bold text-xl mb-1">{data.transactionTitle}</h4>
                                <p className="text-[#716F78] font-satoshiMedium text-base">{data.serviceType}</p>
                            </div>
                        </div>
                        <h2 className="text-xl max-lg:mt-2 font-bold capitalize text-tc-orange lg:text-[22px]">
                            AUD{formatAmount(data.transactionAmount, "USD", false)}
                        </h2>
                    </div>
                ))}
                {visibleTransactions < CustomerPaymentHistoryData.length && (
                    <div className="flex items-center justify-center">
                        <Button onClick={handleLoadMore} className='rounded-full flex items-center space-x-2'>
                            <FiClock className='text-white' />
                            <p>Load more...</p>
                        </Button>
                    </div>
                )}
            </div>

            {isModalOpen && selectedPayment && (
                <Popup isOpen={isModalOpen} onClose={closeModal}>
                    <div className="relative bg-[#EBE9F4] rounded-2xl min-h-[200px] lg:w-[577px] font-satoshi p-5 lg:p-7 space-y-5">
                        <h3 className="text-3xl text-center font-bold text-[#060D1F]">Successful</h3>
                        <div className="border-b border-[#C1BADB] flex items-center justify-between pb-2">
                            <h2 className='text-[#333236] font-satoshiMedium'>Transaction title:</h2>
                            <p className='text-[#2A1769] font-bold text-xl'>{selectedPayment.transactionTitle}</p>
                        </div>
                        <div className="border-b border-[#C1BADB] flex items-center justify-between pb-2">
                            <h2 className='text-[#333236] font-satoshiMedium'>Service type:</h2>
                            <p className='text-[#2A1769] font-bold text-xl'>{selectedPayment.serviceType}</p>
                        </div>
                        <div className="border-b border-[#C1BADB] flex items-center justify-between pb-2">
                            <h2 className='text-[#333236] font-satoshiMedium'>Date:</h2>
                            <p className='text-[#2A1769] font-bold text-xl'>{selectedPayment.date}</p>
                        </div>
                        <div className="border-b border-[#C1BADB] flex items-center justify-between pb-2">
                            <h2 className='text-[#333236] font-satoshiMedium'>To:</h2>
                            <p className='text-[#2A1769] font-bold text-xl'>{selectedPayment.paidTo}</p>
                        </div>
                        <div className="border-b border-[#C1BADB] flex items-center justify-between pb-2">
                            <h2 className='text-[#333236] font-satoshiMedium'>Amount:</h2>
                            <h2 className="text-2xl font-bold capitalize text-tc-orange lg:text-[22px]">
                                AUD{formatAmount(selectedPayment.transactionAmount, "USD", false)}
                            </h2>
                        </div>
                        <h2 className='underline underline-offset-4 text-primary text-lg text-center cursor-pointer'>Download Receipt</h2>
                    </div>
                </Popup>
            )}
        </div>
    )
}

export default CustomerPaymentHistory;
