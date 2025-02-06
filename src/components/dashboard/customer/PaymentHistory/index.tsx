"use client"

import { useEffect, useRef, useState } from 'react';
import { formatAmount, getYesterday } from "@/lib/utils";
import Button from "@/components/global/Button";
import Popup from '@/components/global/Popup';
import { FiClock } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useGetReceiptsByCustomerIdQuery } from '@/services/bookings';
import { Receipt } from '@/types/services/invoice';
import Loading from '@/components/global/loading/page';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LuCalendarDays } from "react-icons/lu";
import PaymentReceipt from '../PaymentReceipt';
import { PDFDownloadLink } from '@react-pdf/renderer';

const PaymentHistory = () => {
    const [visibleTransactions, setVisibleTransactions] = useState(4);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<Receipt | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const { profile: user } = useSelector(
        (state: RootState) => state.userProfile,
    );
    const pdfRef = useRef(null)

    const { data: paymentHistoryData, isLoading, refetch } = useGetReceiptsByCustomerIdQuery(user?.customerId!);

    useEffect(() => {
        if (user) {
            refetch()
        }
    }, [user]);

    const handleLoadMore = () => {
        setVisibleTransactions(prevVisible => prevVisible + 4);
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

    // type PDFDownloadLinkChildrenProps = {
    //     loading: boolean;
    // };
    // const formatCreatedAt = (dateArray: number[]): string => {
    //     const [year, month, day] = dateArray;
    //     return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    //         year: 'numeric',
    //         month: 'long',
    //         day: 'numeric'
    //     });
    // };

    const groupReceiptsByDate = (receipts: Receipt[], filterDate: Date | null) => {
        if (!receipts || !Array.isArray(receipts)) {
            return [];
        }

        const grouped = receipts.reduce((acc, receipt) => {
            const date = new Date(receipt.createdAt[0], receipt.createdAt[1] - 1, receipt.createdAt[2]).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
            if (filterDate) {
                const receiptDate = new Date(receipt.createdAt[0], receipt.createdAt[1] - 1, receipt.createdAt[2]);
                if (receiptDate.toDateString() !== filterDate.toDateString()) {
                    return acc;
                }
            }
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(receipt);
            return acc;
        }, {} as Record<string, Receipt[]>);

        return Object.entries(grouped).sort((a, b) =>
            new Date(b[0]).getTime() - new Date(a[0]).getTime()
        );
    };

    const groupedReceipts = groupReceiptsByDate(paymentHistoryData, selectedDate);
    const dateArray = selectedPayment?.createdAt;
    const formattedDate: string = dateArray ? new Date(Number(dateArray[0]), Number(dateArray[1]) - 1, Number(dateArray[2])).toLocaleDateString() : '';

    return (
        <div className="w-full bg-[#EBE9F4] rounded-[20px] p-4 font-satoshi relative">
            <div className="flex items-center justify-end mb-4">
                <div className="relative flex items-center">
                    {selectedDate && (
                        <Button
                            onClick={() => setSelectedDate(null)}
                            className="font-bold rounded-full mr-3"
                            theme="outline"
                            size="sm"
                        >
                            View all
                        </Button>
                    )}
                    <div className="bg-primary text-white p-[6px] rounded-full cursor-pointer flex items-center justify-center hover:scale-105 transition-all" onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}>
                        <LuCalendarDays
                            size={20}
                        />
                    </div>
                    {isDatePickerOpen && (
                        <div className="absolute right-0 top-full z-50 mt-2">
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date: Date | null) => {
                                    setSelectedDate(date);
                                    setIsDatePickerOpen(false);
                                }}
                                onClickOutside={() => setIsDatePickerOpen(false)}
                                maxDate={getYesterday()}
                                inline
                                renderDayContents={(day, date) => {
                                    return (
                                        <div title={date! > getYesterday() ? "Only past dates can be selected" : undefined}>
                                            {day}
                                        </div>
                                    );
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
            {groupedReceipts.length === 0 ? (
                <div className="flex flex-col items-center justify-center space-y-5 h-[50vh]">
                    <h2 className="text-2xl font-bold text-primary text-center">
                        {selectedDate
                            ? `No payment history found for ${selectedDate.toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}`
                            : "No payment history found"}
                    </h2>
                </div>
            ) : (
                groupedReceipts.slice(0, visibleTransactions).map(([date, dateReceipts]) => (
                    <div key={date} className="mb-8">
                        <h3 className="text-[#140B31] font-satoshiBold font-bold text-base mb-5">{date}</h3>
                        <div className="space-y-5 cursor-pointer">
                            {dateReceipts.map((payment, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col lg:flex-row items-start lg:items-center justify-between lg:px-5 py-3 border-b border-primary"
                                    onClick={() => handleCardClick(payment)}
                                >
                                    <div className="flex items-center w-full space-x-5 mb-3 lg:mb-0">
                                        <div className="w-14 h-14 bg-[#C1BADB] rounded-full flex items-center justify-center">
                                            <div className="w-7 h-7 bg-white rounded-full" />
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="text-primary font-bold text-xl mb-1">{payment.bookingTitle}</h4>
                                            <p className="text-[#716F78] font-satoshiMedium text-base">{payment.bookingCategory}</p>
                                        </div>
                                    </div>
                                    <h2 className="text-xl font-bold capitalize text-tc-orange lg:text-[22px] lg:mt-0 mt-2">
                                        AUD{formatAmount(payment.total, "USD", false)}
                                    </h2>
                                </div>
                            ))}
                        </div>
                    </div>
                )))}
            {visibleTransactions < groupedReceipts.length && (
                <div className="flex items-center justify-center">
                    <Button onClick={handleLoadMore} className='rounded-full flex items-center space-x-2'>
                        <FiClock className='text-white' />
                        <p>Load more...</p>
                    </Button>
                </div>
            )}

            {isModalOpen && selectedPayment && (
                <Popup isOpen={isModalOpen} onClose={closeModal}>
                    <div className="bg-[#EBE9F4] rounded-2xl lg:w-[500px]">
                        <div ref={pdfRef} className="relative rounded-2xl max-w-[500px] h-auto min-h-[60vh] max-h-[90vh] font-satoshi py-2 px-4">
                            <div className="flex items-center justify-center mb-2">
                                <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="35" cy="35" r="35" fill="#C1F6C3" fill-opacity="0.6" />
                                    <circle cx="34.5" cy="34.5" r="22.5" fill="#A6F8AA" />
                                    <path d="M52 34.9924L48.2291 30.742L48.7545 25.1156L43.1755 23.8619L40.2545 19L35 21.2322L29.7455 19L26.8245 23.8619L21.2455 25.1003L21.7709 30.7267L18 34.9924L21.7709 39.2427L21.2455 44.8844L26.8245 46.1381L29.7455 51L35 48.7525L40.2545 50.9847L43.1755 46.1228L48.7545 44.8691L48.2291 39.2427L52 34.9924ZM31.9091 42.6369L25.7273 36.5213L27.9064 34.3655L31.9091 38.3101L42.0936 28.2346L44.2727 30.4056L31.9091 42.6369Z" fill="#4CAF50" />
                                </svg>
                            </div>
                            <h3 className="text-2xl sm:text-3xl text-center font-bold text-primary mb-2">Success</h3>
                            <h3 className="text-lg sm:text-xl text-center font-bold text-[#55535A] mb-2">Your transaction was successful</h3>
                            <div className="flex items-center justify-center !mb-4">
                                <div className="bg-[#C1BADB] p-3 w-full max-w-[240px] rounded-3xl">
                                    <h4 className='text-[#55535A] font-bold text-center my-2'>Amount</h4>
                                    <h2 className="text-xl font-bold text-center capitalize text-primary lg:text-[22px]">
                                        AUD{formatAmount(selectedPayment.total, "USD", false)}
                                    </h2>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="border-b border-[#C1BADB] flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 py-1">
                                    <h2 className='text-[#333236] font-satoshiMedium'>Transaction ID:</h2>
                                    <p className='text-primary font-bold text-lg sm:text-xl'>#{selectedPayment.id}</p>
                                </div>
                                <div className="border-b border-[#C1BADB] flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 py-1">
                                    <h2 className='text-[#333236] font-satoshiMedium'>Transaction title:</h2>
                                    <p className='text-primary font-bold text-lg sm:text-xl'>{selectedPayment.bookingTitle}</p>
                                </div>
                                <div className="border-b border-[#C1BADB] flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 py-1">
                                    <h2 className='text-[#333236] font-satoshiMedium'>From:</h2>
                                    <p className='text-primary font-bold text-lg sm:text-xl'>{user?.firstName} {user?.lastName}</p>
                                </div>
                                <div className="border-b border-[#C1BADB] flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 py-1">
                                    <h2 className='text-[#333236] font-satoshiMedium'>To:</h2>
                                    <p className='text-primary font-bold text-lg sm:text-xl'>{selectedPayment.serviceProvider.user.fullName}</p>
                                </div>
                                <div className="border-b border-[#C1BADB] flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 py-1">
                                    <h2 className='text-[#333236] font-satoshiMedium'>Date:</h2>
                                    <p className='text-primary font-bold text-lg sm:text-xl'>{formattedDate}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center w-full !mt-4 sm:!mt-3 pb-2 sm:pb-3">
                            {/* <PDFDownloadLink
                                document={<PaymentReceipt selectedPayment={selectedPayment} user={user} formattedDate={formattedDate} />}
                                fileName="oloja_receipt.pdf"
                                className="text-center text-[#E58C06] font-bold underline hover:text-[#c77905] transition-colors duration-300"
                            >
                                {({ blob, url, loading, error }) =>
                                    loading ? 'Loading document...' : 'Download Receipt'
                                }
                            </PDFDownloadLink> */}

                        </div>
                    </div>
                </Popup>
            )}
        </div>
    )
}

export default PaymentHistory;
