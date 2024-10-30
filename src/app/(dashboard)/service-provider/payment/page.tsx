"use client"

import React, { useState, useMemo } from 'react';
import WalletBalance from '@/components/dashboard/serviceProvider/Payment/WalletBalance';
import Button from '@/components/global/Button';
import Loading from '@/components/global/loading/page';
import { PaymentSvg } from '@/lib/svgIcons';
import { formatAmount, monthNames } from '@/lib/utils';
import { useGetServiceProviderPaymentHistoryQuery } from '@/services/stripe';
import Image from 'next/image';
import Link from 'next/link';
import { FiClock } from 'react-icons/fi';

const ServicePayment: React.FC = () => {
  const [visibleTransactions, setVisibleTransactions] = useState(4);
  const { data: paymentHistoryData, isLoading } = useGetServiceProviderPaymentHistoryQuery({});

  const flattenedTransactions = useMemo(() => {
    if (!Array.isArray(paymentHistoryData)) {
      return [];
    }

    const getOrdinalSuffix = (day: number): string => {
      // Handle 11, 12, 13 as special cases - they all use 'th'
      if (day >= 11 && day <= 13) {
        return 'th';
      }

      // For all other numbers, check the last digit
      const lastDigit = day % 10;
      switch (lastDigit) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    };

    const formatDate = (dateArray: [number, number, number, number, number, number, number]): string => {
      try {
        const [year, month, day] = dateArray;

        // Input validation
        if (month < 1 || month > 12) {
          throw new Error('Invalid month');
        }
        if (day < 1 || day > 31) {
          throw new Error('Invalid day');
        }
        if (year < 0) {
          throw new Error('Invalid year');
        }

        const suffix = getOrdinalSuffix(day);
        return `${monthNames[month - 1]} ${day}${suffix} ${year}`;
      } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid date';
      }
    };

    return paymentHistoryData.map(transaction => ({
      ...transaction,
      formattedDate: formatDate(transaction.transactionDate)
    })).sort((a, b) => new Date(b.formattedDate).getTime() - new Date(a.formattedDate).getTime());
  }, [paymentHistoryData]);

  const visibleTransactionsList = flattenedTransactions.slice(0, visibleTransactions);

  const groupedTransactions = useMemo(() => {
    return visibleTransactionsList.reduce((acc, transaction) => {
      if (!acc[transaction.formattedDate]) {
        acc[transaction.formattedDate] = [];
      }
      acc[transaction.formattedDate].push(transaction);
      return acc;
    }, {} as Record<string, typeof visibleTransactionsList>);
  }, [visibleTransactionsList]);

  const handleLoadMore = () => {
    setVisibleTransactions(prevVisible => Math.min(prevVisible + 4, flattenedTransactions.length));
  };

  const handleLoadLess = () => {
    setVisibleTransactions(prevVisible => Math.max(prevVisible - 4, 4));
  };

  const getStatusColor = (status: TransactionStatus) => {
    switch (status) {
      case 'SUCCESSFUL':
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
      case 'SUCCESSFUL':
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

  const getTransactionDescription = (transactionType: string) => {
    switch (transactionType) {
      case 'DEPOSIT':
        return `Your wallet has been credited`;
      case 'WITHDRAWAL':
        return `Your wallet has been debited`;
      default:
        return `You made a transaction`;
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
        <h1 className="text-lg lg:text-2xl font-bold text-violet-normal">Payment and wallet</h1>
        <span className="rounded-xl bg-white px-6 py-3">
          {/* SVG content */}
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.2865 19.1145C27.7144 19.1145 27.24 18.6401 27.24 18.068C27.24 15.5425 25.5517 13.282 23.1517 12.5425C22.8726 12.4588 22.6354 12.2634 22.5098 11.9983C22.3843 11.7332 22.3703 11.4262 22.4819 11.1611C23.1377 9.5286 23.3052 8.34257 23.0401 7.42165C23.0122 7.29607 22.9843 7.24026 22.9703 7.18444C22.7889 6.7798 22.8866 6.30539 23.2075 5.99841C23.5284 5.69144 24.0168 5.62168 24.4075 5.83097C27.4493 7.42165 29.333 10.5472 29.333 13.9797V18.068C29.333 18.6401 28.8586 19.1145 28.2865 19.1145ZM24.7842 10.9379C25.6633 11.3425 26.4447 11.9146 27.1005 12.5983C26.8354 11.2309 26.1796 9.98905 25.2168 9.01232C25.147 9.59836 25.0075 10.2402 24.7842 10.9379Z" fill="#381F8C" />
            <path d="M1.0465 19.1139C0.474412 19.1139 0 18.6395 0 18.0674V13.9791C0 9.58379 3.11158 5.7885 7.40919 4.9513C7.78593 4.88154 8.17663 5.02107 8.42778 5.31409C8.66499 5.60711 8.73476 6.02571 8.58127 6.37454L6.13944 12.207C6.02782 12.4582 5.83247 12.6535 5.59527 12.7651C3.47437 13.6861 2.10695 15.7651 2.10695 18.0674C2.09299 18.6395 1.63253 19.1139 1.0465 19.1139ZM5.7348 7.76987C3.94878 8.7745 2.65112 10.5326 2.24648 12.5837C2.86042 11.9559 3.57204 11.4256 4.38133 11.0349L5.7348 7.76987Z" fill="#381F8C" />
            <path d="M20.1084 30.0006H9.22479C8.8341 30.0006 8.47132 29.9727 8.10853 29.9308C3.21093 29.596 0.42027 26.8053 0.0853914 21.8519C0.0435315 21.5449 0.015625 21.1682 0.015625 20.7914V18.0705C0.015625 14.9311 1.88537 12.0985 4.77369 10.8427C5.75042 10.4241 6.79692 10.2148 7.87132 10.2148H21.4897C22.2851 10.2148 23.0525 10.3265 23.7641 10.5497C27.0431 11.5404 29.3454 14.638 29.3454 18.0705V20.7914C29.3454 21.0984 29.3315 21.3914 29.3175 21.6705C29.0106 27.1262 25.8292 30.0006 20.1084 30.0006ZM7.85737 12.3078C7.06203 12.3078 6.30856 12.4613 5.58299 12.7683C3.46209 13.6892 2.09466 15.7683 2.09466 18.0705V20.7914C2.09466 21.0845 2.12257 21.3775 2.15048 21.6565C2.41559 25.6332 4.36905 27.5867 8.28992 27.8518C8.63875 27.8937 8.91782 27.9216 9.21084 27.9216H20.0944C24.699 27.9216 26.9594 25.8983 27.1827 21.5728C27.1966 21.3217 27.2106 21.0705 27.2106 20.7914V18.0705C27.2106 15.545 25.5222 13.2846 23.1223 12.545C22.606 12.3916 22.0339 12.3078 21.4479 12.3078H7.85737Z" fill="#381F8C" />
            <path d="M23.4401 12.5863C23.3425 12.5863 23.2308 12.5724 23.1331 12.5445C22.6169 12.391 22.0448 12.3073 21.4588 12.3073H11.831C11.4822 12.3073 11.1473 12.1259 10.9519 11.8328C10.7705 11.5398 10.7287 11.1631 10.8682 10.8422L14.9147 1.45159C15.124 0.949277 15.724 0.614398 16.2542 0.781837C16.4216 0.83765 16.5751 0.907417 16.7425 0.977183L20.0355 2.35856C21.9611 3.1539 23.2448 3.99109 24.082 4.99573C24.2494 5.19108 24.3889 5.40037 24.5145 5.60967C24.668 5.84688 24.8075 6.1399 24.9052 6.43292C24.9471 6.53059 25.0168 6.71198 25.0587 6.90733C25.4494 8.21894 25.254 9.85147 24.4169 11.9445C24.2494 12.3352 23.8587 12.5863 23.4401 12.5863ZM13.4217 10.2143H21.4727C21.9192 10.2143 22.3518 10.2561 22.7843 10.3259C23.175 9.11195 23.2587 8.17708 23.0355 7.4236C23.0076 7.29802 22.9797 7.24221 22.9657 7.1864C22.882 6.96314 22.8262 6.83756 22.7564 6.72594C22.6587 6.57245 22.589 6.44687 22.4773 6.32129C21.8774 5.59572 20.8169 4.92596 19.2402 4.28411L16.4774 3.12599L13.4217 10.2143Z" fill="#381F8C" />
            <path d="M5.18115 12.8508C4.91604 12.8508 4.65093 12.7392 4.44163 12.5438C4.14861 12.2508 4.05094 11.7904 4.21838 11.3997L6.81369 5.2044C6.8695 5.07882 6.89741 4.9951 6.93927 4.92534C9.00436 0.167268 11.6415 -0.990855 16.3019 0.795165C16.567 0.892838 16.7763 1.10214 16.888 1.36725C16.9996 1.63236 16.9996 1.92538 16.888 2.19049L12.7996 11.6787C12.6322 12.0555 12.2555 12.3066 11.8369 12.3066H7.86019C7.06485 12.3066 6.31137 12.4601 5.5858 12.7671C5.46022 12.8229 5.32069 12.8508 5.18115 12.8508ZM12.7299 2.09282C10.9997 2.09282 9.93923 3.22304 8.83692 5.79044C8.82296 5.8323 8.79506 5.87416 8.7811 5.91602L6.95322 10.2555C7.26019 10.2276 7.55321 10.2136 7.86019 10.2136H11.1392L14.502 2.39979C13.8461 2.19049 13.2601 2.09282 12.7299 2.09282Z" fill="#381F8C" />
            <path d="M18.156 21.1281H11.1793C10.8834 21.1281 10.6328 20.8776 10.6328 20.5817C10.6328 20.2857 10.8834 20.0352 11.1793 20.0352H18.156C18.4519 20.0352 18.7024 20.2857 18.7024 20.5817C18.7024 20.8776 18.4519 21.1281 18.156 21.1281Z" stroke="#381F8C" />
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
        <h1 className="text-2xl font-bold text-violet-dark">Transaction History</h1>
        <div className="flex flex-col flex-wrap items-start justify-start gap-2 rounded-lg bg-violet-active p-4 lg:p-6">
          {isLoading && (
            <div className="flex items-center justify-center w-full">
              <Loading />
            </div>
          )}
          {Object.keys(groupedTransactions).length > 0 ? (
            <div className="flex flex-col space-y-4 w-full lg:px-5">
              {Object.entries(groupedTransactions).map(([date, transactions]) => (
                <div key={date} className="p-2 lg:px-5 py-4">
                  <h3 className="mb-4 font-satoshiBold text-lg font-bold text-[#140B31]">{date}</h3>
                  {transactions.map((transaction, index) => (
                    <div key={index} className="mb-4 last:mb-0 pt-6 border-b-[1.5px] border-[#E9ECF1] p-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 lg:gap-10">
                          <div className="bg-white size-10 flex items-center justify-center rounded-full">
                            {getTransactionTypeIcon(transaction.transactionType)}
                          </div>
                          <div className="space-y-1 flex-1 w-full">
                            <span className="text-[#140B31] font-satoshiBold font-semibold">{getTransactionDescription(transaction.transactionType)}</span>
                            <span className={`flex items-center space-x-2 font-semibold ${getStatusColor(transaction.transactionStatus)}`}>
                              <div className={`size-1 rounded-full font-semibold ${getStatusDotColor(transaction.transactionStatus)}`}></div>
                              <span className="text-sm font-semibold">
                                {transaction.transactionStatus.charAt(0).toUpperCase() +
                                  transaction.transactionStatus.slice(1).toLowerCase()}
                              </span>
                            </span>
                          </div>
                        </div>
                        <span className={`font-satoshiMedium text-sm ${getAmountColor(transaction.transactionType)}`}>
                          {formatAmount(transaction.amount, "USD", false)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 w-full">
                {visibleTransactions > 4 && (
                  <Button
                    onClick={handleLoadLess}
                    className="flex max-sm:w-full items-center space-x-2 rounded-full p-2 sm:p-4"
                  >
                    <FiClock className="text-white" />
                    <p className="text-sm sm:text-base">Show less</p>
                  </Button>
                )}
                {visibleTransactions < flattenedTransactions.length && (
                  <Button
                    onClick={handleLoadMore}
                    className="flex max-sm:w-full items-center space-x-2 rounded-full p-2 sm:p-4"
                  >
                    <FiClock className="text-white" />
                    <p className="text-sm sm:text-base">Load more...</p>
                  </Button>
                )}
              </div>
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