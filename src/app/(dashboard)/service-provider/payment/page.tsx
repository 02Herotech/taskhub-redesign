"use client"

import React, { useState, useMemo } from 'react';
import WalletBalance from '@/components/dashboard/serviceProvider/Payment/WalletBalance';
import Button from '@/components/global/Button';
import Loading from '@/components/global/loading/page';
import { PaymentSvg } from '@/lib/svgIcons';
import { formatAmount } from '@/lib/utils';
import { useGetServiceProviderPaymentHistoryQuery } from '@/services/stripe';
import Image from 'next/image';
import Link from 'next/link';
import { FiClock } from 'react-icons/fi';

const ServicePayment: React.FC = () => {
  const [visibleTransactions, setVisibleTransactions] = useState(3);
  const { data: paymentHistoryData, isLoading } = useGetServiceProviderPaymentHistoryQuery({});

  const groupedTransactions = useMemo(() => {
    if (!Array.isArray(paymentHistoryData)) {
      return [];
    }

    const formatDate = (dateArray: [number, number, number, number, number, number, number]): string => {
      const [year, month, day] = dateArray;
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const suffix = day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th';
      return `${months[month - 1]} ${day}${suffix} ${year}`;
    };

    const grouped = paymentHistoryData.reduce((acc, transaction) => {
      const dateArray = transaction.transactionDate;
      const dateKey = formatDate(dateArray);

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(transaction);
      return acc;
    }, {} as Record<string, ServiceProviderPaymentHistory[]>);

    // Sort the entries by date in descending order
    return Object.entries(grouped).sort((a, b) =>
      new Date(b[0]).getTime() - new Date(a[0]).getTime()
    );
  }, [paymentHistoryData]);

  const handleLoadMore = () => {
    setVisibleTransactions((prevVisible) => prevVisible + 4);
  };

  const getStatusColor = (status: TransactionStatus) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-[#4CAF50]';
      case 'PENDING':
        return 'text-[#E58C06]';
      case 'FAILED':
        return 'text-[#EB1717]';
      default:
        return 'text-gray-500';
    }
  }

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-[#4CAF50]';
      case 'PENDING':
        return 'bg-[#E58C06]';
      case 'FAILED':
        return 'bg-[#EB1717]';
      default:
        return 'bg-gray-500';
    }
  };

  const getTransactionTypeIcon = (transactionType: string) => {
    switch (transactionType) {
      case 'DEPOSIT':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.6316 5.23529V1H3.36842V5.23529M19 11.5882V5.23529H1V19H19" stroke="#FE9B07" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.369 11.5866L10.0006 15.2925H19.0006M10.948 8.41016H9.05325M6.21114 8.41016H4.31641" stroke="#FE9B07" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'WITHDRAWAL':
        return (
          <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.4112 8.375H10.3359M11.9109 8.375H11.8361" stroke="#FE9B07" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15.25 4.25H1.75" stroke="#FE9B07" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14.5001 1.25H2.49988C2.08588 1.25 1.75 1.58588 1.75 1.99988V10.9999C1.75 11.4139 2.08588 11.7498 2.49988 11.7498H14.5001C14.9141 11.7498 15.25 11.4142 15.25 10.9999V1.99988C15.25 1.58588 14.9141 1.25 14.5001 1.25Z" stroke="#FE9B07" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      default:
        return (
          <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.4112 8.375H10.3359M11.9109 8.375H11.8361" stroke="#FE9B07" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15.25 4.25H1.75" stroke="#FE9B07" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14.5001 1.25H2.49988C2.08588 1.25 1.75 1.58588 1.75 1.99988V10.9999C1.75 11.4139 2.08588 11.7498 2.49988 11.7498H14.5001C14.9141 11.7498 15.25 11.4142 15.25 10.9999V1.99988C15.25 1.58588 14.9141 1.25 14.5001 1.25Z" stroke="#FE9B07" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
    }
  }

  const getTransactionDescription = (transactionType: string, amount: number) => {
    switch (transactionType) {
      case 'DEPOSIT':
        return `Your wallet was credited with ${amount}`;
      case 'WITHDRAWAL':
        return `You withdrew ${amount} from your wallet`;
      case 'TRANSFER':
        return `You transferred ${amount} to another user`;
      default:
        return `You made a transaction of ${amount}`;
    }
  }

  const getAmountColor = (transactionType: string) => {
    switch (transactionType) {
      case 'DEPOSIT':
        return 'text-[#4CAF50]';
      case 'WITHDRAWAL':
        return 'text-[#EB1717]';
      case 'TRANSFER':
        return 'text-[#E58C06]';
      default:
        return 'text-gray-500';
    }
  }

  return (
    <main className="space-y-8 p-4 lg:p-8">
      <section className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-violet-active p-3 lg:p-6">
        <h1 className="text-3xl font-bold text-violet-normal">Payment and wallet</h1>
        <span className="rounded-xl bg-white px-6 py-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-violet-active">
            {/* SVG content */}
          </svg>
        </span>
      </section>

      <section className="relative flex flex-wrap items-center justify-between gap-2 overflow-hidden rounded-lg bg-violet-active p-3 lg:p-6">
        <Image src="/assets/images/serviceProvider/wallet/Vector 13.png" alt="overlay" width={1000} height={1000} className="absolute -right-32 h-full w-full object-cover max-sm:hidden" />
        <div className="relative space-y-6">
          <p className="font-bold text-violet-normal">Current balance</p>
          <h1 className="flex flex-col text-5xl font-bold text-orange-normal lg:text-6xl">
            <WalletBalance />
          </h1>
        </div>
        <Link href="/service-provider/payment/withdraw" className="relative rounded-full bg-orange-normal px-6 py-3 font-medium text-white">
          Withdraw
        </Link>
      </section>

      <section className="space-y-4">
        <h1 className="text-2xl font-bold  text-violet-dark">Transaction History</h1>
        <div className="flex flex-col flex-wrap items-start justify-start gap-2 rounded-lg bg-violet-active p-4 lg:p-6">
          {isLoading && (
            <div className="flex items-center justify-center w-full">
              <Loading />
            </div>
          )}
          {groupedTransactions.length > 0 ? (
            <div className="flex flex-col space-y-4 w-full lg:px-5">
              {groupedTransactions.slice(0, visibleTransactions).map(([date, transactions]) => (
                <div key={date} className="">
                  <h3 className="mb-2 font-satoshiBold text-base font-bold text-[#140B31]">{date}</h3>
                  <div className="space-y-5">
                    {transactions.slice(0, visibleTransactions).map((transaction, index) => (
                      <div key={index} className="flex justify-between border-b-[1.5px] border-[#E9ECF1] p-2 lg:px-5 py-4 items-center">
                        <div className="flex items-center gap-3 lg:gap-10">
                          <div className="bg-white size-10 flex items-center justify-center rounded-full">
                            {getTransactionTypeIcon(transaction.transactionType)}
                          </div>
                          <div className="space-y-1 flex-1 w-full">
                            <span className="text-[#140B31] font-satoshiBold">{getTransactionDescription(transaction.transactionType, transaction.amount)}</span>
                            <span className={`flex items-center space-x-2 ${getStatusColor(transaction.transactionStatus)}`}>
                              <div className={`size-1 rounded-full ${getStatusDotColor(transaction.transactionStatus)}`}></div>
                              <span className="text-sm">{transaction.transactionStatus}</span>
                            </span>
                          </div>
                        </div>
                        <span className={`font-satoshiMedium text-sm ${getAmountColor(transaction.transactionType)}`}>{formatAmount(transaction.amount, "USD", false)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {groupedTransactions.some(([, transactions]) => transactions.length > visibleTransactions) && (
                <div className="flex items-center justify-center">
                  <Button onClick={handleLoadMore} className="flex items-center space-x-2 rounded-full">
                    <FiClock className="text-white" />
                    <p>Load more...</p>
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full">
              {PaymentSvg}
              <p className="text-center text-violet-normal">Looks like you do not have any transactions yet!</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ServicePayment;