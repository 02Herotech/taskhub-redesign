"use client"

import { useEffect, useState } from 'react';
import { formatAmount, formatDate } from "@/lib/utils";
import { FiClock } from "react-icons/fi";
import Button from "@/components/global/Button";
import Popup from '@/components/global/Popup';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useSession } from 'next-auth/react';
import CheckoutForm from '../CheckoutForm';
import { useGetInvoiceByCustomerIdQuery } from '@/services/invoices';
import Loading from '@/shared/loading';
import { useSelector } from 'react-redux';
import { RootState } from "@/store";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const Invoices = () => {
    const [visibleTransactions, setVisibleTransactions] = useState(4);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [initiatePayment, setInitiatePayment] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const todayDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const { data: session } = useSession();
    const userToken = session?.user?.accessToken;
    const firstName = session?.user?.user.firstName;
    const lastName = session?.user?.user.lastName;
    const fullName = `${firstName} ${lastName}`;

    const handleLoadMore = () => {
        setVisibleTransactions(prevVisible => prevVisible + 4);
    };

    const handleCardClick = async (invoice: Invoice) => {
        setSelectedInvoice(invoice);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedInvoice(null);
        setInitiatePayment(false);
        setClientSecret("");
    };

    const { profile: user } = useSelector(
        (state: RootState) => state.userProfile,
    );

    const { data: invoices, isLoading } = useGetInvoiceByCustomerIdQuery(user?.customerId!);

    const fetchPaymentIntent = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/payment-intent-stripe/${selectedInvoice?.id}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setClientSecret(data.clientSecret);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log('Error fetching payment intent:', error);
            setError('Invoice has already been paid for');
        }
    };

    useEffect(() => {
        if (isModalOpen && userToken) {
            fetchPaymentIntent();
        }
    }, [isModalOpen, userToken]);

    if (!invoices || isLoading) {
        return (
            <div className="w-full flex items-center justify-center h-[full]">
                <Loading />
            </div>
        );
    }

    const stripeOptions = {
        clientSecret: clientSecret,
    };

    return (
        <>
            <div className="w-full bg-[#EBE9F4] rounded-[20px] p-4 font-satoshi">
                <h3 className="text-[#140B31] font-satoshiBold font-bold text-base mb-5">{todayDate}</h3>
                {invoices.length === 0 && (
                    <div className="flex flex-col items-center justify-center space-y-5 h-[50vh]">
                        <h2 className="text-2xl font-bold text-primary text-center">No invoice found</h2>
                    </div>
                )}
                <div className="space-y-5">
                    {invoices.slice(0, visibleTransactions).map((data, index) => (
                        <div
                            key={index}
                            className="flex max-lg:flex-col lg:items-center justify-between px-5 py-3 border-b border-primary"
                        >
                            <div className="flex items-center space-x-5">
                                <div className="w-14 h-14 bg-[#C1BADB] rounded-full flex items-center justify-center">
                                    <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.8571 6.11111H6.14286M13.8571 11.2222H6.14286M13.8571 16.3333H8.71429M1 1H19V24L17.6731 22.8704C17.2071 22.4735 16.6136 22.2553 15.9998 22.2553C15.386 22.2553 14.7925 22.4735 14.3264 22.8704L12.9996 24L11.674 22.8704C11.2079 22.4732 10.6141 22.2548 10 22.2548C9.38593 22.2548 8.79213 22.4732 8.326 22.8704L7.00043 24L5.67357 22.8704C5.20753 22.4735 4.61399 22.2553 4.00021 22.2553C3.38643 22.2553 2.7929 22.4735 2.32686 22.8704L1 24V1Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="">
                                    <h4 className="text-primary font-bold text-xl mb-1">{data.serviceProvider.user.firstName} sent you an invoice</h4>
                                    <p className="text-[#716F78] font-satoshiMedium text-base">Name of service/type of service</p>
                                </div>
                            </div>
                            <Button theme='outline' className='rounded-full max-lg:mt-2' onClick={() => handleCardClick(data)}>
                                View Invoice
                            </Button>
                        </div>
                    ))}
                    {visibleTransactions < invoices.length && (
                        <div className="flex items-center justify-center">
                            <Button onClick={handleLoadMore} className='rounded-full flex items-center space-x-2'>
                                <FiClock className='text-white' />
                                <p>Load more...</p>
                            </Button>
                        </div>
                    )}
                </div>

                {isModalOpen && selectedInvoice && (
                    <Popup isOpen={isModalOpen} onClose={closeModal}>
                        <div className="relative bg-[#EBE9F4] rounded-2xl min-h-[200px] lg:max-w-[877px] font-satoshi p-5 lg:px-7 lg:py-10">
                            {clientSecret && initiatePayment ? (
                                <Elements stripe={stripePromise} options={stripeOptions}>
                                    <CheckoutForm clientSecret={clientSecret} invoiceId={selectedInvoice.id} />
                                </Elements>
                            ) : (
                                <>
                                    <h3 className="text-3xl font-clashSemiBold text-[#060D1F]">Invoice Details</h3>
                                    <p className="text-md text-[#546276]">
                                        {selectedInvoice.serviceProvider.user.firstName}
                                    </p>
                                    <div className="flex flex-col justify-between space-y-3 mt-5">
                                        <div className="bg-[#C1BADB] p-4 rounded-[20px]">
                                            <h4 className="text-base text-primary font-satoshiMedium">
                                                Total amount payable
                                            </h4>
                                            <h2 className="text-xl font-bold capitalize text-[#001433]">
                                                AUD{formatAmount(selectedInvoice.total, "USD", false)}
                                            </h2>
                                        </div>
                                        <div className="bg-[#C1BADB] p-4 rounded-[20px]">
                                            <h2 className="text-xs text-primary font-satoshiMedium mb-5">
                                                SERVICE INFORMATION
                                            </h2>
                                            <div className="flex items-center max-lg:space-x-3 justify-between mb-6">
                                                <div>
                                                    <h2 className="text-xl text-[#001433] font-bold">
                                                        {formatDate(selectedInvoice.createdAt)}
                                                    </h2>
                                                    <h5 className="text-[#716F78]">Issued on</h5>
                                                </div>
                                                <div>
                                                    <h2 className="text-xl text-[#001433] font-bold">
                                                        {formatDate(selectedInvoice.expiredAt)}
                                                    </h2>
                                                    <h5 className="text-[#716F78]">Due on</h5>
                                                </div>
                                            </div>
                                            <div className="flex items-center max-lg:space-x-3 justify-between mb-6">
                                                <div>
                                                    <h2 className="text-xl text-[#001433] font-bold">
                                                        {fullName}
                                                    </h2>
                                                    <h5 className="text-[#716F78]">Bill from</h5>
                                                </div>
                                                <div>
                                                    <h2 className="text-xl text-[#001433] font-bold">
                                                        {`${selectedInvoice.serviceProvider.user.firstName} ${selectedInvoice.serviceProvider.user.lastName}`}
                                                    </h2>
                                                    <h5 className="text-[#716F78]">Bill to</h5>
                                                </div>
                                            </div>
                                            <div className="flex items-center max-lg:space-x-3 justify-between mb-6">
                                                <div>
                                                    <h2 className="text-xl text-[#001433] font-bold">
                                                        1 day
                                                    </h2>
                                                    <h5 className="text-[#716F78]">Service duration</h5>
                                                </div>
                                            </div>
                                            {error && (
                                                <div className="text-status-error-100 text-base font-semibold my-1">{error}</div>
                                            )}
                                            <div className="flex items-center space-x-4 !mt-6">
                                                <Button loading={loading} disabled={!clientSecret} className="rounded-full" onClick={() => {
                                                    setInitiatePayment(true)
                                                }}>
                                                    Accept Offer
                                                </Button>
                                                <Button theme="outline" className="rounded-full" onClick={closeModal}>
                                                    Reject Offer
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </Popup>
                )}
            </div>
        </>
    );
}

export default Invoices;
