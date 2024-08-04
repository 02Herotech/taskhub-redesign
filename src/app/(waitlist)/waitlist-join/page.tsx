"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { BsExclamationTriangle } from "react-icons/bs";
import { PiSealCheckFill } from "react-icons/pi";
import { BeatLoader } from "react-spinners";

const WaitlistJoin = () => {
  const [waitlistData, setWaitlistData] = useState({
    fullName: "",
    email: "",
    loading: false,
    error: "",
    success: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const payload = {
        fullName: waitlistData.fullName,
        email: waitlistData.email,
      };
      const url = "https://smp.jacinthsolutions.com.au/api/v1/util/waitlist";
      setWaitlistData((prev) => ({ ...prev, loading: true, error: "" }));
      const response = await axios.post(url, payload);
      setWaitlistData((prev) => ({
        ...prev,
        fullName: "",
        email: "",
        success: response.data,
      }));
    } catch (error: any) {
      console.error(error?.response?.data || error);
      setWaitlistData((prev) => ({
        ...prev,
        error: error?.response?.data?.message,
      }));
    } finally {
      setWaitlistData((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <main className="relative flex h-screen items-center justify-center overflow-hidden bg-violet-normal ">
      <Image
        src={"/assets/images/waitlist/Vector 13.png"}
        alt="vector"
        width={1200}
        height={1200}
        quality={100}
        className="absolute -left-4 top-1/2 w-[200vw] -translate-y-1/4 scale-110"
      />
      <Image
        src={"/assets/images/waitlist/Vector 14.png"}
        alt="vector"
        width={1200}
        height={1200}
        quality={100}
        className="absolute -left-4 top-1/2 w-[200vw] -translate-y-1/2 scale-110"
      />
      <Image
        src={"/assets/images/waitlist/Vector 15.png"}
        alt="vector"
        width={1200}
        height={1200}
        quality={100}
        className="absolute -left-4 top-1/2 w-[200vw] -translate-y-3/4 scale-110"
      />
      {waitlistData.success && (
        <section className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70">
          <div
            className="absolute inset-0 h-screen w-screen"
            onClick={() =>
              setWaitlistData((prev) => ({ ...prev, success: "" }))
            }
          />
          <div className="relative z-10 flex w-[90vw] max-w-xl flex-col items-center justify-center gap-3 rounded-xl bg-white p-3 px-4 lg:space-y-4 lg:p-10">
            <div className=" flex flex-col items-center justify-center gap-4">
              <div className="flex size-20 items-center justify-center rounded-full bg-[#C1F6C3] bg-opacity-60">
                <div className=" flex size-14 items-center justify-center rounded-full bg-[#A6F8AA] p-2">
                  <PiSealCheckFill className="size-10 text-green-500" />
                </div>
              </div>
              <p className="text-center font-satoshiBold text-2xl font-extrabold text-violet-normal">
                Success
              </p>
              <p className="text-center font-semibold text-violet-darker">
                {waitlistData.success}
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href={"/waitlist"}
                  className="rounded-full bg-violet-normal px-4 py-2 font-bold text-white max-sm:text-sm"
                >
                  Go home
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
      {waitlistData.error && (
        <section className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70">
          <div
            className="absolute inset-0 h-screen w-screen"
            onClick={() => setWaitlistData((prev) => ({ ...prev, error: "" }))}
          />
          <div className="relative z-10 flex w-[90vw] max-w-xl flex-col items-center justify-center gap-3 rounded-xl bg-white p-3 px-4 lg:space-y-4 lg:p-10">
            <div className=" flex flex-col items-center justify-center gap-4">
              <div className="flex size-20 items-center justify-center rounded-full bg-red-100 bg-opacity-60">
                <div className=" flex size-14 items-center justify-center rounded-full bg-red-300 p-4">
                  <BsExclamationTriangle className="size-10 text-red-500" />
                </div>
              </div>
              <p className="text-center font-satoshiBold text-2xl font-extrabold text-red-500">
                Failure
              </p>
              <p className="text-center font-semibold text-violet-darker">
                {waitlistData.error}
              </p>
            </div>
          </div>
        </section>
      )}

      <Link
        href={"/waitlist"}
        className="absolute left-4 top-10 flex items-center justify-center gap-2 rounded-full px-4 py-2 font-satoshiMedium text-white transition-colors duration-300 hover:bg-violet-900 md:left-10   "
      >
        <BiChevronLeft /> Go back
      </Link>

      <section className="relative w-11/12 max-w-xl space-y-6">
        <h2 className=" text-center font-clashSemiBold text-3xl font-semibold text-white lg:text-4xl ">
          Coming Soon
        </h2>
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="space-y-4 rounded-xl bg-white p-4 lg:p-8"
        >
          <h3 className="text-center font-satoshiBold text-3xl font-semibold text-violet-normal">
            Join Our Waitlist
          </h3>
          <p className="text-center font-satoshiMedium text-lg text-violet-normal">
            Be the first to connect! Join now and unlock a world of
            opportunities
          </p>
          <label className="flex flex-col gap-2">
            <span className="font-satoshiBold font-bold text-violet-darker ">
              Name
            </span>
            <input
              type="text"
              required
              value={waitlistData.fullName}
              onChange={(event) =>
                setWaitlistData((prev) => ({
                  ...prev,
                  fullName: event.target.value,
                }))
              }
              className="rounded-xl border border-violet-light p-3 outline-none"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-satoshiBold font-bold text-violet-darker">
              Email
            </span>
            <input
              type="email"
              required
              value={waitlistData.email}
              onChange={(event) =>
                setWaitlistData((prev) => ({
                  ...prev,
                  email: event.target.value.toLowerCase(),
                }))
              }
              className="rounded-xl border border-violet-light p-3 outline-none"
            />
          </label>
          <div className="flex justify-center">
            <button
              disabled={waitlistData.loading}
              className=" rounded-full bg-violet-normal px-6 py-3 text-white transition-opacity duration-300 hover:opacity-80"
            >
              {waitlistData.loading ? (
                <BeatLoader color="white" loading={waitlistData.loading} />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default WaitlistJoin;
