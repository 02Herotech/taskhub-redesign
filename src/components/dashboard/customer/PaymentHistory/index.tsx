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
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LuCalendarDays } from "react-icons/lu";

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

    const downloadPdf = () => {
        const input = pdfRef.current;
        if (input) {
            html2canvas(input).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');

                // Calculate the width and height for the PDF
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                // Add the image to the PDF
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save('taskhub_receipt.pdf');
            });
        }
        setIsModalOpen(false);
    };

    const formatCreatedAt = (dateArray: number[]): string => {
        const [year, month, day] = dateArray;
        return new Date(year, month - 1, day).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

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
                                onChange={(date: Date) => {
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
                    <div className="bg-[#EBE9F4] rounded-2xl">
                        <div ref={pdfRef} className="relative rounded-2xl min-h-[200px] lg:w-[577px] font-satoshi p-5 lg:p-7">
                            <div className="flex items-center justify-center mb-3">
                                <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="35" cy="35" r="35" fill="#C1F6C3" fill-opacity="0.6" />
                                    <circle cx="34.5" cy="34.5" r="22.5" fill="#A6F8AA" />
                                    <path d="M52 34.9924L48.2291 30.742L48.7545 25.1156L43.1755 23.8619L40.2545 19L35 21.2322L29.7455 19L26.8245 23.8619L21.2455 25.1003L21.7709 30.7267L18 34.9924L21.7709 39.2427L21.2455 44.8844L26.8245 46.1381L29.7455 51L35 48.7525L40.2545 50.9847L43.1755 46.1228L48.7545 44.8691L48.2291 39.2427L52 34.9924ZM31.9091 42.6369L25.7273 36.5213L27.9064 34.3655L31.9091 38.3101L42.0936 28.2346L44.2727 30.4056L31.9091 42.6369Z" fill="#4CAF50" />
                                </svg>
                            </div>
                            <h3 className="text-3xl text-center font-bold text-primary mb-2">Success</h3>
                            <h3 className="text-xl text-center font-bold text-[#55535A] mb-2">Your transaction was successful</h3>
                            <div className="flex items-center justify-center !mb-4">
                                <div className="bg-[#C1BADB] p-3 w-60 rounded-3xl">
                                    <h2 className="text-xl font-bold text-center capitalize text-primary lg:text-[22px]">
                                        AUD{formatAmount(selectedPayment.total, "USD", false)}
                                    </h2>
                                    <h4 className='text-[#55535A] font-bold text-center mt-2'>Amount</h4>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="border-b border-[#C1BADB] flex items-center justify-between px-4">
                                    <h2 className='text-[#333236] font-satoshiMedium'>Transaction ID:</h2>
                                    <p className='text-primary font-bold text-xl'>#{selectedPayment.id}</p>
                                </div>
                                <div className="border-b border-[#C1BADB] flex items-center justify-between px-4">
                                    <h2 className='text-[#333236] font-satoshiMedium'>Transaction title:</h2>
                                    <p className='text-primary font-bold text-xl'>{selectedPayment.bookingTitle}</p>
                                </div>
                                <div className="border-b border-[#C1BADB] flex items-center justify-between px-4">
                                    <h2 className='text-[#333236] font-satoshiMedium'>From:</h2>
                                    <p className='text-primary font-bold text-xl'>{user?.firstName} {user?.lastName}</p>
                                </div>
                                <div className="border-b border-[#C1BADB] flex items-center justify-between px-4">
                                    <h2 className='text-[#333236] font-satoshiMedium'>To:</h2>
                                    <p className='text-primary font-bold text-xl'>{selectedPayment.serviceProvider.user.fullName}</p>
                                </div>
                                <div className="border-b border-[#C1BADB] flex items-center justify-between px-4">
                                    <h2 className='text-[#333236] font-satoshiMedium'>Date:</h2>
                                    <p className='text-primary font-bold text-xl'>{formattedDate}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center space-x-2 mb-4 cursor-pointer" onClick={downloadPdf}>
                            <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 0C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H14C14.5304 20 15.0391 19.7893 15.4142 19.4142C15.7893 19.0391 16 18.5304 16 18V4.414C15.9999 3.88361 15.7891 3.37499 15.414 3L13 0.586C12.625 0.210901 12.1164 0.000113275 11.586 0H2ZM2 2H11.586L14 4.414V18H2V2ZM12.238 8.793C12.3335 8.70075 12.4097 8.59041 12.4621 8.4684C12.5145 8.3464 12.5421 8.21518 12.5433 8.0824C12.5444 7.94962 12.5191 7.81794 12.4688 7.69505C12.4185 7.57215 12.3443 7.4605 12.2504 7.3666C12.1565 7.27271 12.0449 7.19846 11.922 7.14818C11.7991 7.0979 11.6674 7.0726 11.5346 7.07375C11.4018 7.0749 11.2706 7.10249 11.1486 7.1549C11.0266 7.20731 10.9162 7.28349 10.824 7.379L6.582 11.622L5.167 10.207C4.9784 10.0248 4.7258 9.92405 4.4636 9.92633C4.2014 9.9286 3.95059 10.0338 3.76518 10.2192C3.57977 10.4046 3.4746 10.6554 3.47233 10.9176C3.47005 11.1798 3.57084 11.4324 3.753 11.621L5.803 13.672C5.90515 13.7742 6.02644 13.8553 6.15993 13.9106C6.29342 13.9659 6.4365 13.9944 6.581 13.9944C6.7255 13.9944 6.86858 13.9659 7.00207 13.9106C7.13556 13.8553 7.25685 13.7742 7.359 13.672L12.238 8.793Z" fill="#E58C06" />
                            </svg>
                            <h2 className='text-tc-orange font-bold text-lg cursor-pointer'>Download Receipt</h2>
                        </div>
                    </div>
                </Popup>
            )}
        </div>
    )
}

export default PaymentHistory;
