"use client";

import { useEffect, useRef, useState } from "react";
import { formatAmount, getYesterday } from "@/lib/utils";
import Button from "@/components/global/Button";
import Popup from "@/components/global/Popup";
import { FiClock } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useGetReceiptsByCustomerIdQuery } from "@/services/bookings";
import { useGetCustomerReceiptsQuery } from "@/services/bookings";
import { Receipt } from "@/types/services/invoice";
import Loading from "@/components/global/loading/page";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LuCalendarDays } from "react-icons/lu";
import PaymentReceipt from "../PaymentReceipt";
import { PDFDownloadLink } from "@react-pdf/renderer";

const PaymentHistory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Receipt | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const pdfRef = useRef(null);
  const [size, setSize] = useState(10);
  const { data, isLoading, refetch, isFetching } = useGetCustomerReceiptsQuery({
    customerId: user?.customerId!,
    size,
  });

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user]);

  const handleLoadMore = () => {
    if (!data) return;
    const { totalElements, content } = data;
    if (content.length < totalElements) {
      setSize((currSize) => currSize + 10);
    }
  };

  const handleCardClick = (payment: Receipt) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPayment(null);
  };

  if (!data || isLoading) {
    return (
      <div className="flex h-[full] w-full items-center justify-center">
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

  const groupReceiptsByDate = (
    receipts: Receipt[],
    filterDate: Date | null,
  ) => {
    if (!receipts || !Array.isArray(receipts)) {
      return [];
    }

    const grouped = receipts.reduce(
      (acc, receipt) => {
        const date = new Date(
          receipt.createdAt[0],
          receipt.createdAt[1] - 1,
          receipt.createdAt[2],
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        if (filterDate) {
          const receiptDate = new Date(
            receipt.createdAt[0],
            receipt.createdAt[1] - 1,
            receipt.createdAt[2],
          );
          if (receiptDate.toDateString() !== filterDate.toDateString()) {
            return acc;
          }
        }
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(receipt);
        return acc;
      },
      {} as Record<string, Receipt[]>,
    );

    return Object.entries(grouped).sort(
      (a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime(),
    );
  };

  const groupedReceipts = groupReceiptsByDate(data.content, selectedDate);
  const dateArray = selectedPayment?.createdAt;
  const formattedDate: string = dateArray
    ? new Date(
        Number(dateArray[0]),
        Number(dateArray[1]) - 1,
        Number(dateArray[2]),
      ).toLocaleDateString()
    : "";

  return (
    <div className="relative w-full rounded-[20px] bg-[#EBE9F4] p-4 font-satoshi">
      <div className="mb-4 flex items-center justify-end">
        <div className="relative flex items-center">
          {selectedDate && (
            <Button
              onClick={() => setSelectedDate(null)}
              className="mr-3 rounded-full font-bold"
              theme="outline"
              size="sm"
            >
              View all
            </Button>
          )}
          <div
            className="flex cursor-pointer items-center justify-center rounded-full bg-primary p-[6px] text-white transition-all hover:scale-105"
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
          >
            <LuCalendarDays size={20} />
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
                    <div
                      title={
                        date! > getYesterday()
                          ? "Only past dates can be selected"
                          : undefined
                      }
                    >
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
        <div className="flex h-[50vh] flex-col items-center justify-center space-y-5">
          <h2 className="text-center text-2xl font-bold text-primary">
            {selectedDate
              ? `No payment history found for ${selectedDate.toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                )}`
              : "No payment history found"}
          </h2>
        </div>
      ) : (
        <>
          {groupedReceipts.map(([date, dateReceipts]) => (
            <div key={date} className="mb-8">
              <h3 className="mb-5 font-satoshiBold text-base font-bold text-[#140B31]">
                {date}
              </h3>
              <div className="cursor-pointer space-y-5">
                {dateReceipts.map((payment, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start justify-between border-b border-primary py-3 lg:flex-row lg:items-center lg:px-5"
                    onClick={() => handleCardClick(payment)}
                  >
                    <div className="mb-3 flex w-full items-center space-x-5 lg:mb-0">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C1BADB]">
                        <div className="h-7 w-7 rounded-full bg-white" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="mb-1 text-xl font-bold text-primary">
                          {payment.bookingTitle}
                        </h4>
                        <p className="font-satoshiMedium text-base text-[#716F78]">
                          {payment.bookingCategory}
                        </p>
                      </div>
                    </div>
                    <h2 className="mt-2 text-xl font-bold capitalize text-tc-orange lg:mt-0 lg:text-[22px]">
                      AUD{formatAmount(payment.total, "USD", false)}
                    </h2>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="flex items-center justify-center">
            {!selectedDate && (
              <Button
                onClick={handleLoadMore}
                className="flex items-center space-x-2 rounded-full"
                disabled={data.content.length === data.totalElements}
              >
                <FiClock className="text-white" />
                {isFetching ? (
                  <span>Fetching...</span>
                ) : (
                  <span>Load more...</span>
                )}
              </Button>
            )}
          </div>
        </>
      )}

      {isModalOpen && selectedPayment && (
        <Popup isOpen={isModalOpen} onClose={closeModal}>
          <div className="rounded-2xl bg-[#EBE9F4] lg:w-[500px]">
            <div
              ref={pdfRef}
              className="relative h-auto max-h-[90vh] min-h-[60vh] max-w-[500px] rounded-2xl px-4 py-2 font-satoshi"
            >
              <div className="mb-2 flex items-center justify-center">
                <svg
                  width="70"
                  height="70"
                  viewBox="0 0 70 70"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="35"
                    cy="35"
                    r="35"
                    fill="#C1F6C3"
                    fill-opacity="0.6"
                  />
                  <circle cx="34.5" cy="34.5" r="22.5" fill="#A6F8AA" />
                  <path
                    d="M52 34.9924L48.2291 30.742L48.7545 25.1156L43.1755 23.8619L40.2545 19L35 21.2322L29.7455 19L26.8245 23.8619L21.2455 25.1003L21.7709 30.7267L18 34.9924L21.7709 39.2427L21.2455 44.8844L26.8245 46.1381L29.7455 51L35 48.7525L40.2545 50.9847L43.1755 46.1228L48.7545 44.8691L48.2291 39.2427L52 34.9924ZM31.9091 42.6369L25.7273 36.5213L27.9064 34.3655L31.9091 38.3101L42.0936 28.2346L44.2727 30.4056L31.9091 42.6369Z"
                    fill="#4CAF50"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-center text-2xl font-bold text-primary sm:text-3xl">
                Success
              </h3>
              <h3 className="mb-2 text-center text-lg font-bold text-[#55535A] sm:text-xl">
                Your transaction was successful
              </h3>
              <div className="!mb-4 flex items-center justify-center">
                <div className="w-full max-w-[240px] rounded-3xl bg-[#C1BADB] p-3">
                  <h4 className="my-2 text-center font-bold text-[#55535A]">
                    Amount
                  </h4>
                  <h2 className="text-center text-xl font-bold capitalize text-primary lg:text-[22px]">
                    AUD{formatAmount(selectedPayment.total, "USD", false)}
                  </h2>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex flex-col items-start justify-between border-b border-[#C1BADB] px-2 py-1 sm:flex-row sm:items-center">
                  <h2 className="font-satoshiMedium text-[#333236]">
                    Transaction ID:
                  </h2>
                  <p className="text-lg font-bold text-primary sm:text-xl">
                    #{selectedPayment.id}
                  </p>
                </div>
                <div className="flex flex-col items-start justify-between border-b border-[#C1BADB] px-2 py-1 sm:flex-row sm:items-center">
                  <h2 className="font-satoshiMedium text-[#333236]">
                    Transaction title:
                  </h2>
                  <p className="text-lg font-bold text-primary sm:text-xl">
                    {selectedPayment.bookingTitle}
                  </p>
                </div>
                <div className="flex flex-col items-start justify-between border-b border-[#C1BADB] px-2 py-1 sm:flex-row sm:items-center">
                  <h2 className="font-satoshiMedium text-[#333236]">From:</h2>
                  <p className="text-lg font-bold text-primary sm:text-xl">
                    {user?.firstName} {user?.lastName}
                  </p>
                </div>
                <div className="flex flex-col items-start justify-between border-b border-[#C1BADB] px-2 py-1 sm:flex-row sm:items-center">
                  <h2 className="font-satoshiMedium text-[#333236]">To:</h2>
                  <p className="text-lg font-bold text-primary sm:text-xl">
                    {selectedPayment.serviceProvider.user.fullName}
                  </p>
                </div>
                <div className="flex flex-col items-start justify-between border-b border-[#C1BADB] px-2 py-1 sm:flex-row sm:items-center">
                  <h2 className="font-satoshiMedium text-[#333236]">Date:</h2>
                  <p className="text-lg font-bold text-primary sm:text-xl">
                    {formattedDate}
                  </p>
                </div>
              </div>
            </div>
            <div className="!mt-4 flex w-full items-center justify-center pb-2 sm:!mt-3 sm:pb-3">
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
  );
};

export default PaymentHistory;
