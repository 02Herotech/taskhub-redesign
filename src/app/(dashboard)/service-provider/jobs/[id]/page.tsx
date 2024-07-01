"use client";

import Congratulations from "@/components/dashboard/serviceProvider/jobs/Congratulations";
import Invoice from "@/components/serviceProviderDashboard/jobs/Invoice";
import Loading from "@/shared/loading";
import { RootState } from "@/store";
import {
  formatDateFromNumberArray,
  formatDateFromNumberArrayToRelativeDate,
} from "@/utils";
import axios from "axios";
import { error } from "console";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";

const ViewJobs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<BookingType>();
  const [currentListing, setCurrentListing] = useState<ListingDataType>();
  const [requestStatus, setRequestStatus] = useState({
    isAcceptRequesting: false,
    isRejectRequesting: false,
    data: "",
    error: "",
  });

  const [invoiceDraft, setInvoiceDraft] = useState<InvoiceDraftType>();
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);

  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const { stompClient } = useSelector((state: RootState) => state.chat);

  const router = useRouter();
  const session = useSession();
  const token = session?.data?.user?.accessToken;
  const { id } = useParams();

  const fetchSingleBooking = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const url = "https://smp.jacinthsolutions.com.au/api/v1/booking/" + id;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const bookingData = response.data;
      const listingId = bookingData.listing.id;
      setCurrentBooking(bookingData);

      const listingUrl =
        "https://smp.jacinthsolutions.com.au/api/v1/listing/" + listingId;
      const listingResponse = await axios.get(listingUrl);
      const listingData = listingResponse.data;
      setCurrentListing(listingData);
    } catch (error) {
      console.error("An error occurred while fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleBooking();
    // eslint-disable-next-line
  }, [token, requestStatus.data]);

  const handleAcceptBooking = async () => {
    try {
      setRequestStatus((prev) => ({ ...prev, isAcceptRequesting: true }));
      const url =
        "https://smp.jacinthsolutions.com.au/api/v1/booking/accept-proposal?bookingId=" +
        currentBooking?.id;
      const response = await axios.post(
        url,
        { bookingId: currentBooking?.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setRequestStatus((prev) => ({ ...prev, data: response.data }));
      setShowCongratulations(true);
    } catch (error) {
      console.error("An error occurred while fetching services:", error);
      setRequestStatus((prev) => ({
        ...prev,
        error: "Check your network connection",
      }));
    } finally {
      setRequestStatus((prev) => ({ ...prev, isAcceptRequesting: false }));
    }
  };

  const handleCancelBooking = async () => {
    try {
      setRequestStatus((prev) => ({ ...prev, isRejectRequesting: true }));
      const url =
        "https://smp.jacinthsolutions.com.au/api/v1/booking/reject-proposal?bookingId=" +
        currentBooking?.id;
      const response = await axios.post(
        url,
        { bookingId: currentBooking?.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setRequestStatus((prev) => ({ ...prev, data: response.data }));
    } catch (error) {
      console.error("An error occurred while fetching services:", error);
      setRequestStatus((prev) => ({
        ...prev,
        error: "Check your network connection",
      }));
    } finally {
      setRequestStatus((prev) => ({ ...prev, isRejectRequesting: false }));
    }
  };

  useEffect(() => {
    const tempInvoiceData = localStorage.getItem("invoiceDraftData");
    if (tempInvoiceData && currentBooking) {
      const invoiceArray: InvoiceDraftType[] = JSON.parse(tempInvoiceData);
      const currentInvoice = invoiceArray.find(
        (inovice) => inovice.bookingId === currentBooking?.id,
      );
      setInvoiceDraft(currentInvoice);
    }
  }, [currentBooking]);

  const handleMessageCustomer = async ({
    customerId,
    fullName,
  }: {
    customerId: number;
    fullName: string;
  }) => {
    if (user) {
      const message = {
        senderId: user.id,
        recipientId: customerId,
        senderName: `${user.firstName} ${user.lastName}`,
        recipientName: fullName,
        content: "Hello " + fullName,
        timestamp: new Date().toISOString(),
      };
      try {
        setMessageLoading(true);
        await stompClient.send("/app/chat", {}, JSON.stringify(message));
        router.push("/message/" + customerId);
      } catch (error: any) {
        console.log(error.response.data || error.message || error);
      } finally {
        setMessageLoading(false);
      }
    }
  };

  return (
    <>
      <Congratulations
        setIsModalOpen={setIsModalOpen}
        showCongratulations={showCongratulations}
        setShowCongratulations={setShowCongratulations}
      />
      {currentBooking && (
        <Invoice
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          currentBooking={currentBooking}
          invoiceDraft={invoiceDraft}
        />
      )}

      {loading ? (
        <div className="flex min-h-96 items-center justify-center ">
          <Loading />
        </div>
      ) : !currentBooking?.id ? (
        <div className="flex min-h-96 items-center justify-center ">
          Nothing to see here!
        </div>
      ) : (
        <main className=" relative mt-28 flex min-h-[70vh] items-center justify-center space-y-8 p-4 lg:p-4">
          <section className="w-[90vw] max-w-2xl space-y-4 rounded-xl bg-violet-light p-4 lg:p-8 ">
            <div className="flex justify-between gap-2">
              <div className="space-y-8 text-violet-normal">
                <p className="font-clash text-xl font-bold">
                  {currentBooking.bookingTitle}
                </p>
                <div>
                  <p className="text-xl font-bold uppercase">Requested by:</p>
                  <p className="text-lg font-bold text-orange-normal">
                    {currentBooking?.customer?.user?.fullName}
                  </p>
                </div>
                <div>
                  <p className="font-bold">Total cost </p>
                  <p className="font-bold">
                    Est. Budget: $ {currentBooking.price}
                  </p>
                </div>
                <div>
                  <p className="font-bold uppercase">To be Started:</p>
                  <p className="font-bold">
                    {formatDateFromNumberArrayToRelativeDate(
                      currentBooking.startDate,
                    )}
                  </p>
                </div>
              </div>
              <div>
                <div className="rounded-full border border-[#14782F] p-2">
                  <div className="size-16 overflow-hidden rounded-s-full">
                    <Image
                      src={
                        currentBooking?.customer?.user?.profileImage ??
                        "/assets/images/serviceProvider/user.jpg"
                      }
                      alt="user"
                      width={60}
                      height={60}
                      className="h-full  w-full rounded-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* --- */}
            <div className="space-y-4">
              <p className="flex items-center gap-2 text-sm font-bold text-violet-dark ">
                <span>
                  <IoLocationOutline />
                </span>
                <span>
                  {currentBooking.userAddress.state}{" "}
                  {currentBooking.userAddress.suburb}
                </span>
              </p>
              <p className="font-bold uppercase text-violet-dark ">
                Job Description:
              </p>
              <p className="text-violet-normal">
                {currentBooking.bookingDescription}
              </p>
              <div className="flex flex-wrap gap-4">
                {currentBooking.bookingStage === "PROPOSED" ? (
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={handleAcceptBooking}
                      className="rounded-full bg-violet-normal px-6 py-3 text-sm font-medium text-white transition-opacity duration-300 hover:opacity-90 max-md:px-4 max-md:py-2 max-md:text-sm"
                    >
                      {requestStatus.isAcceptRequesting ? (
                        <BeatLoader
                          color={"white"}
                          loading={requestStatus.isAcceptRequesting}
                          size={14}
                        />
                      ) : (
                        " Accept"
                      )}
                    </button>
                    <button
                      onClick={handleCancelBooking}
                      className=" rounded-full border border-red-500 bg-violet-light px-6 py-3 text-sm font-bold  text-red-500 transition-colors duration-300 hover:bg-red-300 max-md:px-4 max-md:py-2 max-md:text-sm "
                    >
                      {requestStatus.isRejectRequesting ? (
                        <BeatLoader
                          color={"white"}
                          loading={requestStatus.isRejectRequesting}
                          size={14}
                        />
                      ) : (
                        "Reject"
                      )}
                    </button>
                  </div>
                ) : currentBooking.bookingStage === "ACCEPTED" ? (
                  !currentBooking.invoiceSent && (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="rounded-full bg-violet-normal px-6 py-3 text-sm font-medium text-white transition-opacity duration-300 hover:opacity-90 max-md:px-4 max-md:py-2 max-md:text-sm"
                    >
                      Generate Invoice
                    </button>
                  )
                ) : (
                  <p className="rounded-full bg-red-100 px-6 py-3 text-sm font-medium text-red-500  max-md:px-4 max-md:py-2 max-md:text-sm">
                    Booking Rejected
                  </p>
                )}
                {(currentBooking.bookingStage === "PROPOSED" ||
                  currentBooking.bookingStage === "ACCEPTED") && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleMessageCustomer({
                          customerId: currentBooking?.customer.user.id,
                          fullName: currentBooking?.customer.user.fullName,
                        })
                      }
                      disabled={messageLoading}
                      className="rounded-full border border-violet-normal px-6 py-3  font-bold text-violet-normal transition-colors duration-300 hover:bg-violet-200 max-md:px-4  max-md:py-2 max-md:text-sm"
                    >
                      {messageLoading ? (
                        <BeatLoader loading={messageLoading} color="white" />
                      ) : (
                        "Chat With Customer"
                      )}
                    </button>
                    {invoiceDraft && (
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="rounded-full bg-violet-active px-6 py-3 text-sm  font-bold text-violet-normal transition-opacity duration-300 hover:opacity-90 max-md:px-4 max-md:py-2 max-md:text-sm "
                      >
                        View Invoice draft
                      </button>
                    )}
                  </div>
                )}
              </div>
              {requestStatus.error && (
                <p className="font-medium text-red-500">
                  {requestStatus.error}
                </p>
              )}
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default ViewJobs;
