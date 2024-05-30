"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BeatLoader } from "react-spinners";
import { marketPlaceModalIcon } from "@/lib/svgIcons";

interface ModalProps {
  setIsModalShown: Dispatch<SetStateAction<boolean>>;
  isModalShown: boolean;
  listingId: number;
  modalData: {
    pricing: number;
    isAuthenticated: string | undefined;
    isServiceProvider: boolean;
    title: string;
  };
}

const PricingModal = ({
  isModalShown,
  setIsModalShown,
  modalData,
  listingId,
}: ModalProps) => {
  const router = useRouter();

  const [submitSatus, setSubmitStatus] = useState({
    state: false,
    error: "",
    isSubmtting: false,
    message: "",
  });

  const [stateLists, setStateLists] = useState([]);
  const [formState, setFormState] = useState<{
    postcode: number | string;
    date: Date | string;
    suburb: string;
    pricing: number | string;
    description: string;
    time: string;
  }>({
    postcode: "",
    date: "",
    suburb: "",
    pricing: modalData.pricing,
    description: "",
    time: "",
  });

  const session = useSession();
  const token = session?.data?.user?.accessToken;

  useEffect(() => {
    setFormState((prev) => ({ ...prev, pricing: modalData.pricing }));
  }, [modalData.pricing]);

  const handleUpdateFormState = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatTime = (time: string): string => {
    const [hour, minute] = time.split(":");
    let hourNum = parseInt(hour, 10);
    const ampm = hourNum >= 12 ? "PM" : "AM";
    hourNum = hourNum % 12 || 12; // Convert to 12-hour format and handle midnight (0 becomes 12)
    const hourString = String(hourNum).padStart(2, "0"); // Ensure the hour has two digits
    const minuteString = String(minute).padStart(2, "0"); // Ensure the minute has two digits
    return `${hourString}:${minuteString} ${ampm}`;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log(token);
      setSubmitStatus((prev) => ({ ...prev, isSubmtting: true, error: "" }));
      if (
        !formState.date ||
        !formState.time ||
        !formState.postcode ||
        !formState.suburb ||
        !formState.pricing ||
        !formState.description
      ) {
        setSubmitStatus((prev) => ({
          ...prev,
          isSubmtting: false,
          error: "Kindly fill all fields",
        }));
        return;
      }
      const uploadData = {
        listingId,
        startDate: formatDate(formState.date as Date),
        startTime: formatTime(formState.time),
        postCode: formState.postcode,
        suburb: formState.suburb,
        price: formState.pricing,
        bookingDescription: formState.description,
        bookingTitle: modalData.title,
      };
      const url = "https://smp.jacinthsolutions.com.au/api/v1/booking";
      const { data } = await axios.post(url, uploadData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setSubmitStatus((prev) => ({
        ...prev,
        message: data.message,
      }));
      setTimeout(() => {
        router.push("/marketplace");
      }, 2000);
    } catch (error) {
      setSubmitStatus((prev) => ({
        ...prev,
        error: "Kindly check your network connection",
      }));
    } finally {
      setSubmitStatus((prev) => ({
        ...prev,
        isSubmtting: false,
      }));
    }
  };
  const serviceProviderParams = new URLSearchParams({
    userType: "serviceProvider",
  });

  useEffect(() => {
    if (formState.pricing === 0) {
      setFormState((prev) => ({ ...prev, pricing: "" }));
    }
  }, [formState.pricing]);

  const handleFectchLocationByPostcode = async () => {
    try {
      const url =
        "https://smp.jacinthsolutions.com.au/api/v1/util/locations/search?postcode=" +
        formState.postcode;
      const { data } = await axios.get(url);
      const suburb = data.map((item: any) => item.name);
      setStateLists(suburb);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await handleFectchLocationByPostcode();
    };
    fetchData();
    // eslint-disable-next-line
  }, [formState.postcode]);

  return (
    <section
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 transition-opacity duration-300 ${isModalShown ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} `}
    >
      <div
        className="absolute inset-0 -z-10 h-screen w-screen"
        onClick={() => setIsModalShown(false)}
      ></div>
      {!modalData.isAuthenticated ? (
        <div className=" relative z-10 flex w-[90vw] max-w-lg flex-col items-center justify-center gap-3 rounded-xl bg-violet-light p-3 lg:space-y-4 lg:p-10 ">
          <span className="size-32 lg:size-40">{marketPlaceModalIcon}</span>
          <p className="text-center text-3xl font-semibold text-violet-normal">
            Sorry! you are not logged in
          </p>
          <p className="text-violet-darkHover">
            Kindly Login as a customer to Continue
          </p>
          <Link
            href={"/auth/login"}
            className="rounded-full bg-violet-normal px-6 py-3 font-bold text-white"
          >
            Login
          </Link>
        </div>
      ) : modalData.isServiceProvider ? (
        <div className=" relative z-10 flex w-[90vw] max-w-lg flex-col items-center justify-center gap-3 rounded-xl bg-violet-light p-3 px-4 lg:space-y-4 lg:p-10  ">
          <span className="size-32 lg:size-40">{marketPlaceModalIcon}</span>
          <p className="text-center text-3xl font-semibold text-violet-normal">
            Sorry! You cannot access this as a service provider
          </p>
          <p className="text-violet-darkHover">
            Kindly sign up a customer to continue
          </p>
          <Link
            href={`/auth/sign-up?${serviceProviderParams.toString()}`}
            className="rounded-full bg-violet-normal px-6 py-3 font-bold text-white"
          >
            Sign Up
          </Link>
        </div>
      ) : (
        <form
          onSubmit={(event) => handleSubmit(event)}
          className=" relative z-10 w-[90vw] max-w-lg space-y-6 rounded-xl bg-violet-light p-3 lg:space-y-4 lg:p-6 "
        >
          <div className="">
            <h1 className="text-3xl font-bold text-violet-darker">Book Task</h1>
            <p className="text-violet-darker">
              Please fill in a little details so you can get a quick response
            </p>
          </div>
          <div className="grid w-full grid-cols-2  items-end justify-end gap-4 ">
            {/* Date */}
            <div className="flex flex-col justify-between space-y-1">
              <label htmlFor="" className="font-bold  text-violet-darker">
                Date
              </label>
              <DatePicker
                selected={formState.date as Date}
                minDate={new Date()}
                required
                onChange={(date: Date) =>
                  setFormState((prev) => ({
                    ...prev,
                    date: date,
                  }))
                }
                className="w-full rounded-xl border border-slate-100 p-2 py-3 text-slate-700 shadow outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm"
                dateFormat="dd/MM/yyyy"
              />
            </div>
            {/* Time */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="" className="font-bold  text-violet-darker">
                Time
              </label>

              <input
                type="time"
                name="time"
                required
                value={formState.time}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    time: event.target.value,
                  }))
                }
                className="w-full  rounded-lg p-3 outline-none"
              />
            </div>
            {/* Location */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="" className="font-bold  text-violet-darker">
                Location
              </label>
              <input
                type="number"
                name="postcode"
                required
                value={formState.postcode}
                onChange={(event) => handleUpdateFormState(event)}
                placeholder="Postcode"
                className="w-full max-w-60 rounded-lg p-3 outline-none"
              />
            </div>
            {/* State  */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="" className="font-bold  text-violet-darker">
                State/Suburb
              </label>
              <select
                className="w-full max-w-60 rounded-lg p-3 outline-none"
                disabled={stateLists.length === 0}
                required
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    suburb: event.target.value,
                  }))
                }
              >
                {stateLists.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Price  */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="" className="font-bold  text-violet-darker">
              Price
            </label>
            <input
              placeholder="Select/Type you budget"
              type="number"
              className="w-full  rounded-lg p-3 outline-none"
              value={formState.pricing}
              required
              min={modalData.pricing - 10}
              max={modalData.pricing + 10}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  pricing: Number(event.target.value),
                }))
              }
            />
            <p className="text-sm font-semibold text-violet-darker">
              Price is in the range of A${modalData.pricing - 10} - A$
              {modalData.pricing + 10}
            </p>
          </div>
          {/* Description */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="" className="font-bold  text-violet-darker">
              Description
            </label>
            <textarea
              placeholder="Write a little details about why you need the service..."
              className="w-full rounded-lg p-3 outline-none"
              value={formState.description}
              required
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  description: event.target.value,
                }))
              }
            />
          </div>
          <button
            className="mx-auto flex w-full max-w-xs items-center justify-center rounded-full bg-violet-normal p-3 px-8 text-center text-white"
            disabled={submitSatus.state}
          >
            {submitSatus.isSubmtting ? (
              <BeatLoader
                color={"white"}
                loading={submitSatus.isSubmtting}
                size={14}
              />
            ) : (
              "Continue / Send enquiry"
            )}
          </button>
          {submitSatus.error && (
            <p className="text-center  text-red-800">{submitSatus.error}</p>
          )}
          {submitSatus.message && (
            <p className="text-center  text-emerald-800">
              {submitSatus.message}
            </p>
          )}
        </form>
      )}
    </section>
  );
};

export default PricingModal;
