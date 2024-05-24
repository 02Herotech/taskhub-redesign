"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { BiLoaderCircle } from "react-icons/bi";

interface ModalProps {
  setIsModalShown: Dispatch<SetStateAction<boolean>>;
  isModalShown: boolean;
  modalData: { pricing: number };
}

const PricingModal = ({
  isModalShown,
  setIsModalShown,
  modalData,
}: ModalProps) => {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState({ state: false, error: "" });
  const [stateLists, setStateLists] = useState([]);
  const [formState, setFormState] = useState({
    postcode: "",
    date: "",
    suburb: "",
    pricing: modalData.pricing,
    description: "",
    time: "",
  });

  console.log(formState.pricing);

  useEffect(() => {
    setFormState((prev) => ({ ...prev, pricing: modalData.pricing }));
  }, [modalData.pricing]);

  const handleUpdateFormState = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if (
    //   !formState.postcode ||
    //   !formState.date ||
    //   !formState.suburb ||
    //   !formState.pricing ||
    //   !formState.description ||
    //   !formState.time
    // ) {
    //   setIsSubmitted((prev) => ({ ...prev, error: "All fields are required" }));
    // } else {
    setIsSubmitted({ state: true, error: "" });
    setTimeout(() => {
      router.push("/marketplace");
    }, 2000);
    // }
  };

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
      <form
        onSubmit={(event) => handleSubmit(event)}
        className=" relative z-10 w-[90vw] max-w-lg space-y-6 rounded-xl bg-violet-active p-3 lg:space-y-4 lg:p-6 "
      >
        <div className="">
          <h1 className="text-3xl font-bold text-violet-dark">Book Task</h1>
          <p className="text-violet-dark">
            Please fill in a little details so you can get a quick response
          </p>
        </div>
        <div className="grid w-full grid-cols-2  items-end justify-end gap-4 ">
          <div className="flex flex-col justify-between space-y-1">
            <label htmlFor="" className="font-medium text-violet-dark">
              Date
            </label>
            <input
              className="w-full  rounded-lg p-3 outline-none"
              type="date"
              name="date"
              // value={formState.date}
              onChange={(event) =>
                setFormState((prev) => ({ ...prev, data: event.target.value }))
              }
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="" className="font-medium text-violet-dark">
              Time
            </label>
            <input
              type="time"
              name="time"
              // value={formState.time}
              // @ts-ignore
              onchange={(event) =>
                setFormState((prev) => ({ ...prev, time: event.target.value }))
              }
              className="w-full  rounded-lg p-3 outline-none"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="" className="font-medium text-violet-dark">
              Location
            </label>
            <input
              type="number"
              name="postcode"
              value={formState.postcode}
              onChange={(event) => handleUpdateFormState(event)}
              placeholder="Postcode"
              className="w-full max-w-60 rounded-lg p-3 outline-none"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="" className="font-medium text-violet-dark">
              State/Suburb
            </label>
            <select
              className="w-full max-w-60 rounded-lg p-3 outline-none"
              disabled={stateLists.length === 0}
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
        <div className="flex flex-col space-y-1">
          <label htmlFor="" className="font-medium text-violet-dark">
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
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="" className="font-medium text-violet-dark">
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
          className="flex w-full items-center justify-center rounded-lg bg-violet-normal p-3 text-center text-white"
          disabled={isSubmitted.state}
        >
          {isSubmitted.state ? (
            <BiLoaderCircle className="animate-spin" />
          ) : (
            "Continue / Send enquiry"
          )}
        </button>
        {isSubmitted.error && (
          <p className="text-center  text-red-800">{isSubmitted.error}</p>
        )}
        {isSubmitted.state && (
          <p className="text-center  text-emerald-800">
            Request Successfully Sent to the service provider
          </p>
        )}
      </form>
    </section>
  );
};

export default PricingModal;
