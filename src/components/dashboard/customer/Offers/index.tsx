"use client";

import { useEffect, useState } from "react";
import { formatAmount, formatDate } from "@/lib/utils";
import { FiClock } from "react-icons/fi";
import Button from "@/components/global/Button";
import Popup from "@/components/global/Popup";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSession } from "next-auth/react";
import CheckoutForm from "../CheckoutForm";
import { useGetInvoiceByCustomerIdQuery } from "@/services/bookings";
import Loading from "@/shared/loading";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Invoice } from "@/types/services/invoice";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const Offers = () => {
  const [visibleTransactions, setVisibleTransactions] = useState(4);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [initiatePayment, setInitiatePayment] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const todayDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const { data: session } = useSession();
  const userToken = session?.user?.accessToken;
  const firstName = session?.user?.user.firstName;
  const lastName = session?.user?.user.lastName;
  const fullName = `${firstName} ${lastName}`;

  const handleLoadMore = () => {
    setVisibleTransactions((prevVisible) => prevVisible + 4);
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

  const { data: offers, isLoading } = useGetInvoiceByCustomerIdQuery(
    user?.customerId!,
  );

  const fetchPaymentIntent = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/payment-intent-stripe/${selectedInvoice?.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setClientSecret(data.clientSecret);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error fetching payment intent:", error);
      setError("An error occurred, please try again later ...");
    }
  };

  useEffect(() => {
    if (isModalOpen && userToken) {
      fetchPaymentIntent();
    }
  }, [isModalOpen, userToken]);

  if (!offers || isLoading) {
    return (
      <div className="flex h-[full] w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  const stripeOptions = {
    clientSecret: clientSecret,
  };

  return (
    <>
      <div className="w-full rounded-[20px] bg-[#EBE9F4] p-4 font-satoshi">
        <h3 className="mb-5 font-satoshiBold text-base font-bold text-[#140B31]">
          {todayDate}
        </h3>
        {offers.length === 0 && (
          <div className="flex h-[50vh] flex-col items-center justify-center space-y-5">
            <h2 className="text-center text-2xl font-bold text-primary">
              No invoice found
            </h2>
          </div>
        )}
        <div className="space-y-5">
          {offers.slice(0, visibleTransactions).map((data, index) => (
            <div
              key={index}
              className="flex justify-between border-b border-primary px-5 py-3 max-lg:flex-col lg:items-center"
            >
              <div className="flex items-center space-x-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C1BADB]">
                  <svg
                    width="20"
                    height="25"
                    viewBox="0 0 20 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.8571 6.11111H6.14286M13.8571 11.2222H6.14286M13.8571 16.3333H8.71429M1 1H19V24L17.6731 22.8704C17.2071 22.4735 16.6136 22.2553 15.9998 22.2553C15.386 22.2553 14.7925 22.4735 14.3264 22.8704L12.9996 24L11.674 22.8704C11.2079 22.4732 10.6141 22.2548 10 22.2548C9.38593 22.2548 8.79213 22.4732 8.326 22.8704L7.00043 24L5.67357 22.8704C5.20753 22.4735 4.61399 22.2553 4.00021 22.2553C3.38643 22.2553 2.7929 22.4735 2.32686 22.8704L1 24V1Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="">
                  <h4 className="mb-1 text-xl font-bold text-primary">
                    {data.serviceProvider.user.firstName} sent you an invoice
                  </h4>
                  <p className="font-satoshiMedium text-base text-[#716F78]">
                    {data.bookingTitle}{" "}
                  </p>
                </div>
              </div>
              <Button
                theme="outline"
                className="rounded-full max-lg:mt-2"
                onClick={() => handleCardClick(data)}
              >
                View Invoice
              </Button>
            </div>
          ))}
          {visibleTransactions < offers.length && (
            <div className="flex items-center justify-center">
              <Button
                onClick={handleLoadMore}
                className="flex items-center space-x-2 rounded-full"
              >
                <FiClock className="text-white" />
                <p>Load more...</p>
              </Button>
            </div>
          )}
        </div>

        {isModalOpen && selectedInvoice && (
          <Popup isOpen={isModalOpen} onClose={closeModal}>
            <div className="relative min-h-[200px] rounded-2xl bg-[#EBE9F4] p-5 font-satoshi lg:max-w-[877px] lg:px-7 lg:py-10">
              {clientSecret && initiatePayment ? (
                <Elements stripe={stripePromise} options={stripeOptions}>
                  <CheckoutForm
                    clientSecret={clientSecret}
                    invoiceId={selectedInvoice.id}
                  />
                </Elements>
              ) : (
                <>
                  <h3 className="font-clashSemiBold text-3xl text-[#060D1F]">
                    Invoice Details
                  </h3>
                  <p className="text-md text-[#546276]">
                    {selectedInvoice.serviceProvider.user.firstName}
                  </p>
                  <div className="mt-5 flex flex-col justify-between space-y-3">
                    <div className="rounded-[20px] bg-[#C1BADB] p-4">
                      <h4 className="font-satoshiMedium text-base text-primary">
                        Total amount payable
                      </h4>
                      <h2 className="text-xl font-bold capitalize text-[#001433]">
                        AUD{formatAmount(selectedInvoice.total, "USD", false)}
                      </h2>
                    </div>
                    <div className="rounded-[20px] bg-[#C1BADB] p-4">
                      <h2 className="mb-5 font-satoshiMedium text-xs text-primary">
                        SERVICE INFORMATION
                      </h2>
                      <div className="mb-6 flex items-center justify-between max-lg:space-x-3">
                        <div>
                          <h2 className="text-xl font-bold text-[#001433]">
                            {formatDate(selectedInvoice.createdAt)}
                          </h2>
                          <h5 className="text-[#716F78]">Issued on</h5>
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-[#001433]">
                            {formatDate(selectedInvoice.expiredAt)}
                          </h2>
                          <h5 className="text-[#716F78]">Due on</h5>
                        </div>
                      </div>
                      <div className="mb-6 flex items-center justify-between max-lg:space-x-3">
                        <div>
                          <h2 className="text-xl font-bold text-[#001433]">
                            {fullName}
                          </h2>
                          <h5 className="text-[#716F78]">Bill from</h5>
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-[#001433]">
                            {`${selectedInvoice.serviceProvider.user.firstName} ${selectedInvoice.serviceProvider.user.lastName}`}
                          </h2>
                          <h5 className="text-[#716F78]">Bill to</h5>
                        </div>
                      </div>
                      <div className="mb-6 flex items-center justify-between max-lg:space-x-3">
                        {/* <div>
                                                    <h2 className="text-xl text-[#001433] font-bold">
                                                        {selectedInvoice.}
                                                    </h2>
                                                    <h5 className="text-[#716F78]">Service duration</h5>
                                                </div> */}
                      </div>
                      {error && (
                        <div className="my-1 text-base font-semibold text-status-error-100">
                          {error}
                        </div>
                      )}
                      <div className="!mt-6 flex items-center space-x-4">
                        <Button
                          loading={loading}
                          disabled={!clientSecret}
                          className="rounded-full"
                          onClick={() => {
                            setInitiatePayment(true);
                          }}
                        >
                          Accept Offer
                        </Button>
                        <Button
                          theme="outline"
                          className="rounded-full"
                          onClick={closeModal}
                        >
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
};

export default Offers;
