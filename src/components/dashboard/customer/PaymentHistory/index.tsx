"use client"

import { useEffect, useState } from 'react';
import { formatAmount } from "@/lib/utils";
import Button from "@/components/global/Button";
import Popup from '@/components/global/Popup';
import { FiClock } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useGetInvoiceByCustomerIdQuery } from '@/services/invoices';
import { Receipt } from '@/types/services/invoice';
import Loading from '@/components/global/loading/page';

const PaymentHistory = () => {
    const [visibleTransactions, setVisibleTransactions] = useState(4);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<Receipt | null>(null);
    const todayDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const { profile: user } = useSelector(
        (state: RootState) => state.userProfile,
    );

    const { data: paymentHistoryData, isLoading, refetch } = useGetInvoiceByCustomerIdQuery(user?.customerId!);

    useEffect(() => {
        if (user) {
            refetch()
        }
    }, [user]);

    const handleLoadMore = () => {
        setVisibleTransactions(prevVisible => prevVisible + visibleTransactions);
    };

    const handleCardClick = (payment: Receipt) => {
        setSelectedPayment(payment);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPayment(null);
    };

    if (!paymentHistoryData || isLoading) {
        return (
            <div className="w-full flex items-center justify-center h-[full]">
                <Loading />
            </div>
        );
    }

    return (
        <div className="w-full bg-[#EBE9F4] rounded-[20px] p-4 font-satoshi">
            <h3 className="text-[#140B31] font-satoshiBold font-bold text-base mb-5">{todayDate}</h3>
            {paymentHistoryData.length === 0 && (
                <div className="flex flex-col items-center justify-center space-y-5 h-[50vh]">
                    <h2 className="text-2xl font-bold text-primary text-center">No payment history found</h2>
                </div>
            )}
            <div className="space-y-5">
                {paymentHistoryData?.slice(0, visibleTransactions).map((payment, index) => (
                    <div
                        key={index}
                        className="flex items-center max-lg:space-x-3 lg:justify-between px-5 py-3 border-b border-primary cursor-pointer"
                        onClick={() => handleCardClick(payment)}
                    >
                        <div className="flex items-center w-full flex-1 space-x-5">
                            <div className="w-14 h-14 bg-[#C1BADB] rounded-full flex items-center justify-center">
                                <div className="w-7 h-7 bg-white rounded-full" />
                            </div>
                            <div className="">
                                <h4 className="text-primary font-bold text-xl mb-1">{payment.bookingTitle}</h4>
                                {/* <p className="text-[#716F78] font-satoshiMedium text-base">{payment.}</p> */}
                            </div>
                        </div>
                        <h2 className="text-xl max-lg:mt-2 font-bold capitalize text-tc-orange lg:text-[22px]">
                            AUD{formatAmount(payment.total, "USD", false)}
                        </h2>
                    </div>
                ))}
                {visibleTransactions < paymentHistoryData?.length! && (
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
                            <p className='text-[#2A1769] font-bold text-xl'>{selectedPayment.bookingTitle}</p>
                        </div>
                        <div className="border-b border-[#C1BADB] flex items-center justify-between pb-2">
                            <h2 className='text-[#333236] font-satoshiMedium'>Service type:</h2>
                            {/* <p className='text-[#2A1769] font-bold text-xl'>{selectedPayment.serviceType}</p> */}
                        </div>
                        <div className="border-b border-[#C1BADB] flex items-center justify-between pb-2">
                            <h2 className='text-[#333236] font-satoshiMedium'>Date:</h2>
                            <p className='text-[#2A1769] font-bold text-xl'>{selectedPayment.createdAt}</p>
                        </div>
                        <div className="border-b border-[#C1BADB] flex items-center justify-between pb-2">
                            <h2 className='text-[#333236] font-satoshiMedium'>To:</h2>
                            <p className='text-[#2A1769] font-bold text-xl'>{selectedPayment.serviceProvider.user.firstName} {selectedPayment.serviceProvider.user.lastName}</p>
                        </div>
                        <div className="border-b border-[#C1BADB] flex items-center justify-between pb-2">
                            <h2 className='text-[#333236] font-satoshiMedium'>Amount:</h2>
                            <h2 className="text-xl font-bold capitalize text-tc-orange lg:text-[22px]">
                                AUD{formatAmount(selectedPayment.total, "USD", false)}
                            </h2>
                        </div>
                        <h2 className='underline underline-offset-4 text-primary text-lg text-center cursor-pointer'>Download Receipt</h2>
                    </div>
                </Popup>
            )}
        </div>
    )
}

export default PaymentHistory;
