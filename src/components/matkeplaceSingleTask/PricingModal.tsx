"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BeatLoader } from "react-spinners";
import { formatDate, formatTimeFromDate } from "@/utils";
import Image from "next/image";
import { PiSealCheckFill } from "react-icons/pi";
import "../../styles/datePickOverflowHandle.css";
import { setCookie } from "cookies-next";
import Button from "../global/Button";

interface ModalProps {
  setIsModalShown: Dispatch<SetStateAction<boolean>>;
  isModalShown: boolean;
  listingId: number;
  modalData: {
    pricing: number;
    isAuthenticated: string | undefined;
    isServiceProvider: boolean;
    title: string;
    negotiable: boolean;
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
  const pathname = usePathname()
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
      const url = `${process.env.NEXT_PUBLIC_API_URL}/booking`;
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
        `${process.env.NEXT_PUBLIC_API_URL}/util/locations/search?postcode=` +
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
      if (formState.postcode) {
        await handleFectchLocationByPostcode();
      }
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

  const handleSignUpNavigation = () => {
    setCookie("redirectToMarketplaceDetail", pathname, { maxAge: 40000 });
    router.push(
      `/auth/sign-up?from=${pathname}`,
    );
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
              Sorry! you are not logged in. Please login or create an account to continue
            </p>
            <div className="flex items-center gap-4 !mt-5">
              <Button
                onClick={() => router.push(`/auth/login?from=${pathname}`)}
                className="rounded-full"
                theme="outline"
                size="sm"
              >
                Login
              </Button>
              <Button
                onClick={handleSignUpNavigation}
                className="rounded-full"
                size="sm"
              >
                Sign up
              </Button>
            </div>
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
              href={`/auth/login?from=${pathname}`}
              className="rounded-full bg-violet-normal px-6 py-3 font-bold text-white"
            >
              Login
            </Link>
          </div>
        </div>
      ) : isSubmittedSuccessful ? (
        <div className="relative z-10 flex w-[90vw] max-w-xl flex-col items-center justify-center gap-3 rounded-xl bg-white p-3 px-4 lg:space-y-4 lg:p-10">
          <div className=" flex flex-col items-center justify-center gap-4">
            <div className="flex size-20 items-center justify-center rounded-full bg-[#C1F6C3] bg-opacity-60">
              <div className=" flex size-14 items-center justify-center rounded-full bg-[#A6F8AA] p-2">
                <PiSealCheckFill className="size-10 text-green-500" />
              </div>
            </div>
            <p className="text-center font-satoshiBold text-2xl font-extrabold text-violet-normal">
              Enquiry Sent
            </p>
            <p className="text-center font-semibold text-violet-darker">
              Great! The booking enquiry has been sent to the service provider
              and you would get a response shortly.
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsModalShown(false)}
                className="rounded-full bg-violet-active px-4 py-2 font-bold text-violet-dark max-sm:text-sm"
              >
                Close
              </button>
              <Link
                href={"/marketplace"}
                className="rounded-full bg-violet-normal px-4 py-2 font-bold text-white max-sm:text-sm"
              >
                Proceed to marketplace
              </Link>
            </div>
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
                popperClassName="custom-datepicker-popper"
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
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2">
                $
              </span>
              <input
                placeholder="what’s your budget?"
                type="number"
                disabled={!modalData.negotiable}
                className="w-full  rounded-lg p-3 px-7 outline-none disabled:bg-white "
                value={formState.pricing}
                required
                min={Math.floor(
                  modalData.pricing - (10 * modalData.pricing) / 100,
                )}
                max={Math.floor(
                  modalData.pricing + (10 * modalData.pricing) / 100,
                )}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    pricing: Number(event.target.value),
                  }))
                }
              />
            </div>
            {modalData.negotiable && (
              <p className="text-sm font-semibold text-violet-darker">
                Price is in the range of 10% of original price
              </p>
            )}
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
