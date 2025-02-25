"use client";

import { useState } from "react";
import { formatAmount, formatDate, getYesterday } from "@/lib/utils";
import { FiClock } from "react-icons/fi";
import Button from "@/components/global/Button";
import Popup from "@/components/global/Popup";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSession } from "next-auth/react";
import CheckoutForm from "../CheckoutForm";
import {
  useAcceptInvoiceMutation,
  useGeneratePaymentIntentMutation,
  useGetInvoiceByCustomerIdQuery,
  useRejectInvoiceMutation,
} from "@/services/bookings";
import Loading from "@/shared/loading";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Invoice } from "@/types/services/invoice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LuCalendarDays } from "react-icons/lu";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const Offers = () => {
  const [visibleTransactions, setVisibleTransactions] = useState(4);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [initiatePayment, setInitiatePayment] = useState(false);
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [acceptInvoiceError, setAcceptInvoiceError] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [invoiceAccepted, setInvoiceAccepted] = useState(false);
  const [
    generatePaymentIntent,
    { isLoading: paymentIntentLoading, error: paymentIntentError },
  ] = useGeneratePaymentIntentMutation();
  const [
    acceptInvoice,
    { isLoading: acceptInvoiceLoading, error: acceptInvoiceErrors },
  ] = useAcceptInvoiceMutation();
  const [
    rejectInvoice,
    { isLoading: rejectInvoiceLoading, error: rejectInvoiceError },
  ] = useRejectInvoiceMutation();

  const { data: session } = useSession();
  const firstName = session?.user?.user.firstName;
  const lastName = session?.user?.user.lastName;
  const fullName = `${firstName} ${lastName}`;

  const handleLoadMore = () => {
    setVisibleTransactions((prevVisible) => prevVisible + 4);
  };

  const handleCardClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
    setInvoiceAccepted(false);
    setInitiatePayment(false);
    setClientSecret("");
    setError("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
    setInitiatePayment(false);
    setClientSecret("");
    setInvoiceAccepted(false);
    setError("");
  };

  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );

  const { data: offers, isLoading } = useGetInvoiceByCustomerIdQuery(
    user?.customerId!,
  );

  const handleAcceptInvoice = async () => {
    if (!selectedInvoice) return;

    try {
      await acceptInvoice({ invoiceId: selectedInvoice.id }).unwrap();

      if (acceptInvoiceErrors) {
        setAcceptInvoiceError("Error accepting offer, please try again");
      } else {
        setInvoiceAccepted(true);
        setError("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRejectInvoice = async () => {
    if (!selectedInvoice) return;

    try {
      await rejectInvoice({ invoiceId: selectedInvoice.id }).unwrap();

      if (rejectInvoiceError) {
        setError("Error rejecting offer, please try again");
      } else {
        setError("");
        closeModal();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInitiatePayment = async () => {
    if (!selectedInvoice) return;

    try {
      const response = await generatePaymentIntent({
        invoiceId: selectedInvoice.id,
      }).unwrap();
      setClientSecret(response.clientSecret);
      setInitiatePayment(true);
      setInvoiceAccepted(false);
      setError("");
    } catch (err) {
      setError("Failed to generate payment intent. Please try again.");
    }
  };

  const groupOffersByDate = (
    offers: Invoice | Invoice[] | undefined | null,
    filterDate: Date | null,
  ) => {
    // Early return if offers is null/undefined
    if (!offers) {
      console.log("No offers data received");
      return [];
    }

    // Convert single object to array if necessary and filter out any undefined/null values
    const offersArray = (Array.isArray(offers) ? offers : [offers]).filter(
      (offer) => offer && typeof offer === "object" && "createdAt" in offer,
    );

    // Skip if no valid offers
    if (!offersArray.length) {
      console.log("No valid offers to process");
      return [];
    }

    const grouped = offersArray.reduce(
      (acc, offer) => {
        try {
          if (!offer.createdAt) {
            console.log("Offer missing createdAt:", offer);
            return acc;
          }

          // Handle the array format of createdAt
          const dateObj = Array.isArray(offer.createdAt)
            ? new Date(
                offer.createdAt[0],
                offer.createdAt[1] - 1,
                offer.createdAt[2],
              )
            : new Date(offer.createdAt);

          if (isNaN(dateObj.getTime())) {
            console.log("Invalid date for offer:", offer);
            return acc;
          }

          const date = dateObj.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          if (filterDate) {
            if (dateObj.toDateString() !== filterDate.toDateString()) {
              return acc;
            }
          }

          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(offer);
          return acc;
        } catch (error) {
          console.error("Error processing offer:", error, offer);
          return acc;
        }
      },
      {} as Record<string, Invoice[]>,
    );

    return Object.entries(grouped).sort(
      (a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime(),
    );
  };

  const groupedOffers = offers ? groupOffersByDate(offers, selectedDate) : [];

  if (!offers || isLoading) {
    return (
      <div className="flex h-[full] w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  const stripeOptions = {
    clientSecret,
  };

  function getFormattedDate(dateArray: number[]): string {
    if (dateArray[0] === 1970 && dateArray[1] === 1 && dateArray[2] === 1) {
      return "Flexible";
    }

    return formatDate(dateArray);
  }

  return (
    <div>
      <div className="relative w-full rounded-[20px] bg-[#EBE9F4] p-4 font-satoshi">
        {/* <h3 className="mb-5 font-satoshiBold text-base font-bold text-[#140B31]">
          {todayDate}
        </h3> */}
        {groupedOffers.length === 0 && (
          <div className="flex h-[50vh] flex-col items-center justify-center space-y-5">
            <h2 className="text-center text-2xl font-bold text-primary">
              No offer found
            </h2>
          </div>
        )}
        <div className="mb-4 flex items-center justify-end">
          <div className={`relative flex items-center`}>
            {selectedDate && (
              <Button
                onClick={() => setSelectedDate(null)}
                className={`mr-3 rounded-full font-bold`}
                theme="outline"
                size="sm"
              >
                View all
              </Button>
            )}
            <div
              className={`absolute right-0 top-0 flex cursor-pointer items-center justify-center rounded-full bg-primary p-[6px] text-white transition-all hover:scale-105 ${groupedOffers.length === 0 && `hidden`}`}
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            >
              <LuCalendarDays size={20} />
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
        </div>
        {groupedOffers.length === 0 ? (
          <div className="flex h-[50vh] flex-col items-center justify-center space-y-5">
            <h2 className="text-center text-2xl font-bold text-primary">
              {selectedDate &&
                `No offers found for ${selectedDate.toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                )}`}
            </h2>
          </div>
        ) : (
          <div className="space-y-5">
            {groupedOffers
              .slice(0, visibleTransactions)
              .map(([date, dateOffers]) => (
                <div key={date} className="mb-8">
                  <h3 className="mb-5 font-satoshiBold text-base font-bold text-[#140B31]">
                    {date}
                  </h3>
                  <div className="space-y-5">
                    {dateOffers.map((offer, index) => (
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
                              {offer.serviceProvider.user.firstName} sent you an
                              offer
                            </h4>
                            <p className="font-satoshiMedium text-base text-[#716F78]">
                              {offer.bookingTitle}{" "}
                            </p>
                          </div>
                        </div>
                        <Button
                          theme="secondary"
                          className="rounded-full max-lg:mt-2"
                          onClick={() => handleCardClick(offer)}
                        >
                          View Offer
                        </Button>
                      </div>
                    ))}
                  </div>
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
        )}

        {isModalOpen && selectedInvoice && (
          <Popup isOpen={isModalOpen} onClose={closeModal}>
            <div className="relative min-h-[200px] rounded-2xl bg-[#EBE9F4] p-5 font-satoshi max-sm:w-[70vw] lg:w-[600px] lg:px-7 lg:py-10">
              {clientSecret && initiatePayment ? (
                <Elements stripe={stripePromise} options={stripeOptions}>
                  <CheckoutForm
                    clientSecret={clientSecret}
                    invoiceId={selectedInvoice.id}
                  />
                </Elements>
              ) : (
                <div>
                  <h3 className="font-clashSemiBold text-3xl text-[#060D1F]">
                    Offer Details
                  </h3>
                  <p className="text-md text-[#546276]">
                    {selectedInvoice.bookingTitle}
                  </p>
                  <div className="mt-5 flex flex-col justify-between space-y-3">
                    <div className="rounded-[20px] bg-[#C1BADB] p-4">
                      <h4 className="font-satoshiMedium text-base text-primary">
                        Total amount payable
                      </h4>
                      <h2 className="text-xl font-bold capitalize text-[#001433]">
                        {formatAmount(selectedInvoice.total, "USD", false)}
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
                        <div className="w-1/2">
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
                        <div className="w-1/2">
                          <h2 className="text-xl font-bold text-[#001433]">
                            {`${selectedInvoice.serviceProvider.user.firstName} ${selectedInvoice.serviceProvider.user.lastName}`}
                          </h2>
                          <h5 className="text-[#716F78]">Bill to</h5>
                        </div>
                      </div>
                      <div className="mb-6 flex items-center justify-between max-lg:space-x-3">
                        <div>
                          <h2 className="text-xl font-bold text-[#001433]">
                            {getFormattedDate(selectedInvoice.serviceStartOn)}
                          </h2>
                          <h5 className="text-[#716F78]">Start Date</h5>
                        </div>
                        {/* <div className="w-1/2">
                          <h2 className="text-xl font-bold text-[#001433]">
                            {formatAmount(selectedInvoice.total * 0.10, "USD", false)}
                          </h2>
                          <h5 className="text-[#716F78]">Gst(10%)</h5>
                        </div> */}
                        <div className="w-1/2">
                          <h2 className="text-xl font-bold text-[#001433]">
                            {formatAmount(
                              selectedInvoice.total * 0,
                              "USD",
                              false,
                            )}
                          </h2>
                          <h5 className="text-[#716F78]">Gst(0%)</h5>
                        </div>
                      </div>
                    </div>
                    {/* <p className="font-satoshiBold font-bold text-[#140B31]">
                      Note: A 10% GST charge would be added to the final bill.
                    </p> */}
                    {error && (
                      <div className="my-1 text-base font-semibold text-status-error-100">
                        {error}
                      </div>
                    )}
                    {acceptInvoiceError && (
                      <div className="my-1 text-base font-semibold text-status-error-100">
                        {acceptInvoiceError}
                      </div>
                    )}
                    <div className="!mt-6 flex items-center space-x-4">
                      {selectedInvoice.invoiceStatus === "ACCEPTED" ||
                      invoiceAccepted ? (
                        <div className="flex w-full justify-center">
                          <Button
                            loading={paymentIntentLoading}
                            className="mr-auto w-max rounded-full p-6 font-bold text-[#EBE9F4] max-lg:text-xs"
                            onClick={handleInitiatePayment}
                            size="sm"
                          >
                            Pay now
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-4">
                          <Button
                            loading={acceptInvoiceLoading}
                            className="rounded-full max-lg:text-xs"
                            onClick={handleAcceptInvoice}
                            size="sm"
                          >
                            Accept Offer
                          </Button>
                          <Button
                            theme="outline"
                            className="rounded-full max-lg:text-xs"
                            onClick={handleRejectInvoice}
                            loading={rejectInvoiceLoading}
                            size="sm"
                          >
                            Reject Offer
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Popup>
        )}
      </div>
    </div>
  );
};

export default Offers;
