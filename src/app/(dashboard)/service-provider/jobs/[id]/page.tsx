"use client";

import Congratulations from "@/components/dashboard/serviceProvider/jobs/Congratulations";
import Invoice from "@/components/serviceProviderDashboard/jobs/Invoice";
import Loading from "@/shared/loading";
import { RootState } from "@/store";
import {
  dateFromNumberArray,
  formatDateFromNumberArray,
  formatDateFromNumberArrayToRelativeDate,
} from "@/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { stompClient } from "@/lib/stompClient";
import MessageButton from "@/components/global/MessageButton";
const ViewJobs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<BookingType>();
  // const [currentListing, setCurrentListing] = useState<ListingDataType>();
  const [requestStatus, setRequestStatus] = useState({
    isAcceptRequesting: false,
    isRejectRequesting: false,
    data: "",
    error: "",
  });

  const [invoiceDraft, setInvoiceDraft] = useState<InvoiceDraftType>();
  const [showCongratulations, setShowCongratulations] = useState(false);

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
      setCurrentBooking(bookingData);
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

  console.log(currentBooking);

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
            <header className="flex justify-between gap-2">
              <section className="flex w-full flex-col gap-4 text-violet-normal">
                <div className=" flex w-full items-center justify-between ">
                  <p className="font-clash text-xl font-bold">
                    {currentBooking.bookingTitle}
                  </p>
                  <div className="rounded-full border border-[#14782F] md:hidden">
                    <div className="size-10 overflow-hidden rounded-s-full">
                      <Image
                        src={
                          currentBooking?.customer?.user?.profileImage ??
                          "/assets/images/serviceProvider/user.jpg"
                        }
                        alt="user"
                        width={60}
                        height={60}
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                {/* ----------- */}
                <div className="flex justify-between gap-4 md:flex-col">
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
                </div>
                {/* ---------- */}
                <div className="flex justify-between gap-4 md:flex-col">
                  <div>
                    <p className="font-bold uppercase">To be Started:</p>
                    <p className="font-bold capitalize">
                      {/* {dateFromNumberArray(currentBooking.startDate)} */}
                      {currentBooking.startDate
                        ? dateFromNumberArray(currentBooking.startDate)
                        : "Flexible"}
                    </p>
                  </div>
                  {currentBooking?.userAddress && (
                    <p className="flex items-center gap-2 text-sm font-bold text-violet-dark ">
                      <span>
                        <IoLocationOutline />
                      </span>
                      (
                      <span>
                        {currentBooking?.userAddress?.state}{" "}
                        {currentBooking?.userAddress?.suburb}
                      </span>
                      )
                    </p>
                  )}
                </div>
              </section>
              {/* left image side */}
              <section className=" max-md:hidden">
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
              </section>
            </header>

            {/* --- */}
            <div className="space-y-4">
              <p className="font-bold uppercase text-violet-dark ">
                Job Description:
              </p>
              <p className="text-violet-normal">
                {currentBooking.bookingDescription}
              </p>
              <div className="flex flex-wrap gap-4">
                {currentBooking.bookingStage === "PROPOSED" ? (
                  <div className="flex w-full gap-4 max-md:flex-col md:w-fit  ">
                    <button
                      onClick={handleAcceptBooking}
                      className="rounded-full bg-violet-normal px-6 py-3 text-sm font-medium text-white transition-opacity duration-300 hover:opacity-90 max-md:w-full max-md:px-4 max-md:py-2 max-md:text-sm"
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
                      className=" rounded-full  border border-red-500 bg-violet-light px-6 py-3 text-sm font-bold text-red-500  transition-colors duration-300 hover:bg-red-100 max-md:w-full max-md:px-4 max-md:py-2 max-md:text-sm "
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
                      className="rounded-full bg-violet-normal px-6 py-3 text-sm font-medium text-white transition-opacity duration-300 hover:opacity-90 max-md:w-full max-md:px-4 max-md:py-2 max-md:text-sm"
                    >
                      Make An Offer
                    </button>
                  )
                ) : (
                  <p className="rounded-full bg-red-100 px-6 py-3 text-sm font-medium text-red-500  max-md:px-4 max-md:py-2 max-md:text-sm">
                    Booking Rejected
                  </p>
                )}
                {(currentBooking.bookingStage === "PROPOSED" ||
                  currentBooking.bookingStage === "ACCEPTED") && (
                  <div className="flex w-fit items-center gap-2 max-md:w-full max-md:flex-col">
                    <MessageButton
                      recipientId={currentBooking?.customer.user.id.toString()}
                      recipientName={currentBooking?.customer.user.fullName}
                      message="Chat With Customer"
                      className="border border-violet-normal  bg-transparent text-violet-normal hover:bg-violet-100  max-md:w-full max-md:px-4 max-md:py-2 "
                    />

                    {invoiceDraft && (
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="rounded-full bg-violet-active px-6 py-3 text-sm font-bold  text-violet-normal transition-opacity duration-300 hover:opacity-90 max-md:w-full max-md:px-4 max-md:py-2 max-md:text-sm "
                      >
                        View Saved Offer
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
