"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BeatLoader } from "react-spinners";
import { formatDate, formatTimeFromDate } from "@/utils";
import Image from "next/image";

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

  const [wordCount, setWordCount] = useState(0);
  const [stateLists, setStateLists] = useState([]);
  const [formState, setFormState] = useState<{
    postcode: number | string;
    date: Date | string;
    suburb: string;
    pricing: number | string;
    description: string;
    time: Date | string;
  }>({
    postcode: "",
    date: "",
    suburb: "",
    pricing: modalData.pricing,
    description: "",
    time: "",
  });
  const [isSubmittedSuccessful, setIsSubmittedSuccessful] = useState(false);

  const session = useSession();
  const token = session?.data?.user?.accessToken;

  const wordLimit = 50;

  useEffect(() => {
    setFormState((prev) => ({ ...prev, pricing: modalData.pricing }));
  }, [modalData.pricing]);

  const handleUpdateFormState = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
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
        startTime: formatTimeFromDate(formState.time as Date),
        postCode: formState.postcode,
        suburb: formState.suburb,
        price: formState.pricing,
        bookingDescription: formState.description,
        bookingTitle: modalData.title,
      };

      console.log(uploadData);
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
      setIsSubmittedSuccessful(true);
    } catch (error: any) {
      console.log(error);
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
      setFormState((prev) => ({ ...prev, suburb: suburb[0] }));
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

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = event.target.value;
    const words = inputText.trim().split(/\s+/);
    const count = words.filter((word) => word).length; // Filter out empty strings

    if (count <= wordLimit) {
      setFormState((prev) => ({
        ...prev,
        description: inputText,
      }));
      setWordCount(count);
    }
  };

  return (
    <section
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 transition-opacity duration-300 ${isModalShown ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} `}
    >
      <div
        className="absolute inset-0 -z-10 h-screen w-screen"
        onClick={() => setIsModalShown(false)}
      ></div>
      {!modalData.isAuthenticated ? (
        <div className="relative z-10 flex w-[90vw] max-w-xl flex-col items-center justify-center gap-3 bg-violet-light p-3 px-4 lg:space-y-4 lg:p-10">
          <div className="clip-triangle absolute left-0 top-0 h-full w-full bg-violet-active"></div>
          <div className="relative flex flex-col items-center justify-center gap-4 bg-white p-6 lg:px-12 ">
            <Image
              src="/assets/images/marketplace/singleTask/Frame 1000003668.png"
              alt="icon"
              width={100}
              height={100}
              className="size-14 object-contain"
            />
            <p className="text-center text-xl font-bold text-violet-normal">
              Sorry! you are not logged in as a customer
            </p>
            <Link
              href={"/auth/login"}
              className="rounded-full bg-violet-normal px-6 py-3 font-bold text-white"
            >
              Login
            </Link>
          </div>
        </div>
      ) : modalData.isServiceProvider ? (
        <div className="relative z-10 flex w-[90vw] max-w-xl flex-col items-center justify-center gap-3 bg-violet-light p-3 px-4 lg:space-y-4 lg:p-10">
          <div className="clip-triangle absolute left-0 top-0 h-full w-full bg-violet-active"></div>
          <div className="relative flex flex-col items-center justify-center gap-4 bg-white p-6 lg:px-20 ">
            <Image
              src="/assets/images/marketplace/singleTask/Frame 1000003668.png"
              alt="icon"
              width={100}
              height={100}
              className="size-14 object-contain"
            />
            <p className="text-center text-xl font-bold text-violet-normal">
              Sorry, you are not logged in as a customer
            </p>
            <p className="font-bold text-violet-darkHover">
              Kindly login to continue
            </p>
            <Link
              href={`/auth/sign-up?${serviceProviderParams.toString()}`}
              className="rounded-full bg-violet-normal px-6 py-3 font-bold text-white"
            >
              Sign Up
            </Link>
          </div>
        </div>
      ) : isSubmittedSuccessful ? (
        <div className="relative z-10 flex w-[90vw] max-w-xl flex-col items-center justify-center gap-3 bg-violet-light p-3 px-4 lg:space-y-4 lg:p-10">
          <div className="clip-triangle absolute left-0 top-0 h-full w-full bg-violet-active"></div>
          <div className="relative flex flex-col items-center justify-center gap-4 bg-white p-6 lg:px-20 ">
            <div className="size-10 rounded-full bg-violet-darker p-2">
              <Image
                src={"/assets/images/serviceProvider/jobs/checkicon.png"}
                alt="checkicon"
                width={80}
                height={80}
                className="h-full w-full"
              />
            </div>
            <p className="text-center text-xl font-bold text-violet-normal">
              Booking Proposal successfully sent to the service provider
            </p>
            <Link
              href={`/marketplace`}
              className="rounded-full bg-violet-normal px-6 py-3 font-bold text-white"
            >
              Proceed to marketplace
            </Link>
          </div>
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
              <label className="font-bold  text-violet-darker">Date</label>
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
              <label className="font-bold  text-violet-darker">Time</label>
              <DatePicker
                selected={formState.time as Date}
                onChange={(date: Date) =>
                  setFormState((prev) => ({ ...prev, time: date }))
                }
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30} // You can adjust the intervals (e.g., 15, 30)
                timeCaption="Time"
                dateFormat="h:mm aa" // Adjust the format as needed
                className="small-scrollbar w-full rounded-xl border border-slate-100 p-2 py-3 text-slate-700 shadow outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm"
                required
              />

              {/* <input
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
              /> */}
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
                value={formState.suburb}
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
              className="small-scrollbar w-full rounded-lg p-3 outline-none "
              value={formState.description}
              required
              onChange={(event) => handleInputChange(event)}
            />
            <div className="text-right text-sm text-violet-normal">
              {wordCount}/{wordLimit} words
            </div>
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
        </form>
      )}
    </section>
  );
};

export default PricingModal;
