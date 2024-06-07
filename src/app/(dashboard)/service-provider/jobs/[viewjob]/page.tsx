"use client";

import Congratulations from "@/components/dashboard/serviceProvider/jobs/Congratulations";
import Invoice from "@/components/serviceProviderDashboard/jobs/Invoice";
import Loading from "@/shared/loading";
import { formatDateFromNumberArray } from "@/utils";
import axios from "axios";
import { error } from "console";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
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
  const [showCongratulations, setShowCongratulations] = useState(false);

  const router = useRouter();
  const session = useSession();
  const token = session?.data?.user?.accessToken;
  const user = session?.data?.user?.user;

  const fetchSingleBooking = async () => {
    if (!token) {
      console.error("No token available");
      return;
    }
    try {
      setLoading(true);
      const tempId = localStorage.getItem("bookingDetails");
      if (tempId) {
        const id = JSON.parse(tempId);
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
      }
    } catch (error) {
      console.error("An error occurred while fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

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
      console.log("Cancelling");
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
      router.push("/service-provider/profile");
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
    fetchSingleBooking();
    // eslint-disable-next-line
  }, [token, requestStatus.data]);

  const book = {
    id: 1,
    user: {
      id: 6,
      fullName: "Timmy Dev",
      profileImage: null,
    },
    startDate: [2024, 5, 31],
    startTime: [20, 16],
    price: 50000,
    bookingTitle: "Another description",
    bookingDescription: "Here is the description",
    bookingStage: "ACCEPTED",
    listing: {
      id: 1,
    },
    userAddress: {
      id: 14,
      state: "Queensland",
      postCode: "4000",
      suburb: "Brisbane",
    },
    updatedAt: [2024, 5, 30, 15, 7, 34, 470251000],
    bookedAt: [2024, 5, 30],
    invoiceSent: false,
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
        <main className=" relative flex min-h-[70vh] items-center justify-center space-y-8 p-4 lg:p-4">
          <section className="w-[90vw] max-w-2xl space-y-4 rounded-xl bg-violet-light p-4 lg:p-8 ">
            <div className="flex justify-between gap-2">
              <div className="space-y-8 text-violet-normal">
                <p className="font-clash text-xl font-bold">
                  {currentListing?.listingTitle}
                </p>
                <div>
                  <p className="text-xl font-bold uppercase">Requested by:</p>
                  <p className=" text-xl font-bold text-orange-normal">
                    {currentBooking.user.fullName}
                  </p>
                </div>
                <div>
                  <p className="font-bold">Total cost </p>
                  <p className="font-bold">
                    Est. Budget: $ {currentBooking.price}{" "}
                  </p>
                </div>
                <div>
                  <p className="font-bold uppercase">To be Started:</p>
                  <p className="font-bold">
                    {/* @ts-expect-error */}
                    {formatDateFromNumberArray(currentBooking.startDate)}
                  </p>
                </div>
              </div>
              <div>
                <div className="rounded-full border border-[#14782F] p-2">
                  <div className="size-16 overflow-hidden rounded-s-full">
                    <Image
                      src={
                        currentBooking.user.profileImage ??
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
                {currentListing?.listingDescription}
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
                      className="rounded-full border border-violet-normal bg-violet-light px-6 py-3 text-sm font-medium  text-violet-normal transition-colors duration-300 hover:bg-violet-200 max-md:px-4 max-md:py-2 max-md:text-sm "
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
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="rounded-full bg-violet-normal px-6 py-3 text-sm font-medium text-white transition-opacity duration-300 hover:opacity-90 max-md:px-4 max-md:py-2 max-md:text-sm"
                  >
                    Generate Invoice
                  </button>
                ) : (
                  <p className="rounded-full bg-red-100 px-6 py-3 text-sm font-medium text-red-500  max-md:px-4 max-md:py-2 max-md:text-sm">
                    Booking Rejected
                  </p>
                )}
                {(currentBooking.bookingStage === "PROPOSED" ||
                  currentBooking.bookingStage === "ACCEPTED") && (
                  <Link
                    href={{
                      pathname: "/message",
                    }}
                    className="rounded-full px-6 py-3 font-medium transition-colors duration-300 hover:bg-violet-100 max-md:px-4  max-md:py-2 max-md:text-sm"
                  >
                    Chat with Customer
                  </Link>
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
