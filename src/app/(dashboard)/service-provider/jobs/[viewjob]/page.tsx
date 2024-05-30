"use client";

import Invoice from "@/components/serviceProviderDashboard/jobs/Invoice";
import Loading from "@/shared/loading";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";

const ViewJobs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<BookingType>();
  const [requestStatus, setRequestStatus] = useState({
    isRequesting: false,
    data: "",
  });

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
        const data = response.data;
        console.log(data);
        setCurrentBooking(data);
      }
    } catch (error) {
      console.error("An error occurred while fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptBooking = async () => {
    try {
      setRequestStatus((prev) => ({ ...prev, isRequesting: true }));
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
      setIsModalOpen((prev) => !prev);
    } catch (error) {
      console.error("An error occurred while fetching services:", error);
    } finally {
      setRequestStatus((prev) => ({ ...prev, isRequesting: false }));
    }
  };

  const handleCancelBooking = async () => {
    try {
      setRequestStatus((prev) => ({ ...prev, isRequesting: true }));
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
    } finally {
      setRequestStatus((prev) => ({ ...prev, isRequesting: false }));
    }
  };
  useEffect(() => {
    fetchSingleBooking();
    // eslint-disable-next-line
  }, [token]);

  return (
    <>
      {loading ? (
        <div className="flex min-h-96 items-center justify-center ">
          <Loading />
        </div>
      ) : !currentBooking?.id ? (
        <div className="flex min-h-96 items-center justify-center ">
          Nothing to see here!
        </div>
      ) : (
        <main className=" relative flex min-h-[70vh] items-center justify-center space-y-8 p-4 lg:p-8">
          <Invoice isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
          <section className="w-[90vw] max-w-2xl space-y-4 rounded-xl bg-violet-light p-4 lg:p-8 ">
            <div className="flex justify-between gap-2">
              <div className="space-y-8 text-violet-normal">
                <p> {currentBooking.listing.listingTitle} </p>
                <div>
                  <p className="text-lg font-bold uppercase">Posted by:</p>
                  <p className=" text-orange-normal">
                    {" "}
                    {user?.firstName} {user?.lastName}
                  </p>
                </div>
                <div>
                  <p>Total cost </p>
                  <p>Est. Budget: $ {currentBooking.price} </p>
                </div>
                <div>
                  <p className="text-lg font-medium uppercase">To be done:</p>
                  <p> {currentBooking.startDate} </p>
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
              <p className="flex items-center gap-2 text-sm text-violet-dark">
                <span>
                  <IoLocationOutline />
                </span>
                <span>
                  {currentBooking.userAddress.state}{" "}
                  {currentBooking.userAddress.suburb}
                </span>
              </p>
              <p className="uppercase text-violet-dark">Job Description:</p>
              <p className="text-violet-normal">
                {currentBooking.bookingTitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleAcceptBooking}
                  className="rounded-full bg-violet-normal px-6 py-3 text-sm font-medium text-white transition-opacity duration-300 hover:opacity-90 max-md:px-4 max-md:py-2 max-md:text-sm"
                >
                  Confirm
                </button>
                <button
                  onClick={handleCancelBooking}
                  className="rounded-full border border-violet-normal bg-violet-light px-6 py-3 text-sm font-medium  text-violet-normal transition-colors duration-300 hover:bg-violet-200 max-md:px-4 max-md:py-2 max-md:text-sm "
                >
                  Cancel
                </button>
                <Link
                  href={{
                    pathname: "/service-provider/message",
                  }}
                  className="rounded-full px-6 py-3 font-medium transition-colors duration-300 hover:bg-violet-900 max-md:px-4  max-md:py-2 max-md:text-sm"
                >
                  Chat with Customer
                </Link>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default ViewJobs;
