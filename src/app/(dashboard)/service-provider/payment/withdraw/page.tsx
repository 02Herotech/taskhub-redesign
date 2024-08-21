"use client";

import WalletBalance from "@/components/dashboard/serviceProvider/Payment/WalletBalance";
import { RootState } from "@/store";
import { refreshWallet } from "@/store/Features/userProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsExclamationTriangle } from "react-icons/bs";
import { PiSealCheckFill, PiWarningDiamond } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import z from "zod";

const WithdrawalPage = () => {
  const { userProfileAuth: auth, profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  const isServiceProvider = auth?.role?.[0] === "SERVICE_PROVIDER";

  const withdrawalSchema = z.object({
    accountName: z.string().min(3).max(50),
    accountNumber: z.string().refine((val) => !isNaN(Number(val)), {
      message: "Account Number must be a number",
    }),
    routingNumber: z.string().min(3).max(6),
    amount: z
      .string()
      .refine((val) => !isNaN(Number(val)), {
        message: "Amount must be a number",
      })
      .transform(Number),
  });

  type WithdrawalType = z.infer<typeof withdrawalSchema>;

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<WithdrawalType>({ resolver: zodResolver(withdrawalSchema) });

  const submitWithdraw: SubmitHandler<WithdrawalType> = async (data) => {
    if (!auth.token) return;
    try {
      const url = "https://smp.jacinthsolutions.com.au/api/v1/stripe/payout";
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setSuccess(true);
      dispatch(refreshWallet());
      reset();
    } catch (error: any) {
      setError(error?.response?.data || "Insufficient balance");
      console.log(error?.response?.data || error);
    }
  };

  useEffect(() => {
    user && setValue("accountName", `${user.lastName} ${user.firstName}`);
    // eslint-disable-next-line
  }, [user]);

  return (
    <main className="space-y-8 p-4 lg:p-8">
      {success && (
        <section className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70">
          <div
            className="absolute inset-0 h-screen w-screen"
            onClick={() => setSuccess(false)}
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
                Your withdrawal is successfully
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href={
                    isServiceProvider
                      ? "/service-provider/profile"
                      : "/customer/profile"
                  }
                  className="rounded-full bg-violet-normal px-4 py-2 font-bold text-white max-sm:text-sm"
                >
                  Proceed to profile
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
      {error && (
        <section className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70">
          <div
            className="absolute inset-0 h-screen w-screen"
            onClick={() => setError(null)}
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
                {error}
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href={
                    isServiceProvider
                      ? "/service-provider/profile"
                      : "/customer/profile"
                  }
                  className="rounded-full bg-violet-normal px-4 py-2 font-bold text-white max-sm:text-sm"
                >
                  Proceed to profile
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
      <p className="flex items-center gap-2 rounded-xl bg-orange-normal p-5 font-normal text-white">
        <span>
          <PiWarningDiamond className="size-5" />
        </span>
        <span>
          Available funds to withdrawal: $<WalletBalance />, minimum withdrawal
          request is $50
        </span>
      </p>
      {user && (
        <form
          onSubmit={handleSubmit(submitWithdraw)}
          className="space-y-3 rounded-xl bg-violet-active p-3 lg:p-6"
        >
          <h2 className="text-3xl font-medium text-violet-normal">
            Withdrawal Method
          </h2>
          <div className="grid grid-cols-2 gap-3 outline-none lg:gap-6">
            <label className="flex flex-col gap-2">
              <span className="text-lg font-bold text-violet-normal">
                Account name
              </span>
              <input
                type="text"
                value={`${user.lastName} ${user.firstName}`}
                className="w-full rounded-md bg-white p-3 outline-none"
                disabled={true}
                {...register("accountName")}
              />
              {errors.accountName && (
                <p className="text-red-600">{errors.accountName.message}</p>
              )}
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-lg font-bold text-violet-normal">
                Account number
              </span>
              <input
                type="text"
                className="w-full rounded-md bg-white p-3"
                {...register("accountNumber")}
              />
              {errors.accountNumber && (
                <p className="text-red-600">{errors.accountNumber.message}</p>
              )}
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-lg font-bold text-violet-normal">BSB</span>
              <input
                type="text"
                className="w-full rounded-md bg-white p-3"
                {...register("routingNumber")}
              />
              {errors.routingNumber && (
                <p className="text-red-600">{errors.routingNumber.message}</p>
              )}
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-lg font-bold text-violet-normal">
                Amount
              </span>
              <input
                type="number"
                min={50}
                className="w-full rounded-md bg-white p-3"
                {...register("amount")}
              />
              {errors.amount && (
                <p className="text-red-600">{errors.amount.message}</p>
              )}
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="w-fit rounded-full bg-violet-normal px-6 py-3 font-medium text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <BeatLoader color="white" loading={isSubmitting} />
              ) : (
                " Request Withdrawal"
              )}
            </button>
          </div>
        </form>
      )}
    </main>
  );
};

export default WithdrawalPage;
