"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import Link from "next/link";
import { BeatLoader } from "react-spinners";
import { PiSealCheckFill, PiWarningDiamond } from "react-icons/pi";
import { BsExclamationTriangle } from "react-icons/bs";
import WalletBalance from "@/components/dashboard/serviceProvider/Payment/WalletBalance";
import { RootState } from "@/store";
import { refreshWallet } from "@/store/Features/userProfile";
import useAxios from "@/hooks/useAxios";

// Schema definition
const withdrawalSchema = (maxValue: number) => {
  return z.object({
    accountName: z
      .string()
      .min(3, "Please enter a valid name")
      .max(50)
      .refine((value) => !/\d/.test(value), {
        message: "Account name cannot contain numbers",
      }),
    accountNumber: z
      .string()
      .length(9, "Please enter a valid 9 digit account number")
      .regex(/^\d+(\.\d+)?$/, "Account number must be numeric"),
    routingNumber: z
      .string()
      .regex(
        /^\d+$/,
        "Please enter a valid BSB number, it should consist of six digits",
      )
      .length(6, "Please enter a valid six digit BSB number"),
    amount: z
      .number({
        invalid_type_error: "Amount required, Please enter a valid amount",
      })
      .min(1, "Amount can not be less than $1")
      .max(maxValue, "Amount should not exceed wallet balance")
      .refine((val) => /^(\d+|\d+\.\d{1,2})$/.test(val.toString()), {
        message: "Amount should not exceed two decimal places",
      }),
  });
};

type WithdrawalType = z.infer<ReturnType<typeof withdrawalSchema>>;

// Component definition
const WithdrawalPage: React.FC = () => {
  const dispatch = useDispatch();
  const { userProfileAuth: auth, profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const { walletBalance } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const [userData, setUserData] = useState<{ isVerified: boolean } | null>(
    null,
  );
  const [schema, setSchema] = useState(() => withdrawalSchema(0));
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isServiceProvider = auth?.role?.[0] === "SERVICE_PROVIDER";

  useEffect(() => {
    if (walletBalance) setSchema(withdrawalSchema(walletBalance as number));
  }, [walletBalance]);

  const authInstance = useAxios();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const { data } = await authInstance.get("service-provider/profile");
        setUserData({ isVerified: data.isVerified });
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    }

    fetchUserData();
  }, []);

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<WithdrawalType>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      const fullName = `${user.lastName} ${user.firstName}`;
      if (watch("accountName") && fullName !== watch("accountName")) return;
      setValue("accountName", fullName);
    }
  }, [user, setValue]);

  const submitWithdraw: SubmitHandler<WithdrawalType> = async (data) => {
    if (!auth.token) return;
    try {
      await authInstance.post("/stripe/payout", data);
      setStatus("success");
      dispatch(refreshWallet());
      reset();
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(
        error?.response?.data.message ||
          "Something went wrong, please try again",
      );
      console.error(error?.response?.data || error);
    }
  };

  const resetStatus = () => setStatus("idle");

  function removeLetterOnInput(e: React.FormEvent<HTMLInputElement>) {
    e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
  }

  return (
    <main className="space-y-8 p-4 lg:p-8">
      {status !== "idle" && (
        <StatusModal
          status={status}
          errorMessage={errorMessage}
          onClose={resetStatus}
          isServiceProvider={isServiceProvider}
        />
      )}
      <p className="flex items-center gap-2 rounded-xl bg-orange-normal p-5 font-normal text-white">
        <PiWarningDiamond className="size-5" />
        <span>
          Available funds to withdraw: <WalletBalance />
        </span>
      </p>
      {user && (
        <form
          onSubmit={handleSubmit(submitWithdraw)}
          className="space-y-4 rounded-xl bg-violet-active p-3 lg:p-6"
        >
          <h2 className="mb-5 font-satoshiBold text-xl font-bold text-violet-normal lg:text-2xl">
            Withdrawal Method
          </h2>
          <div className="grid grid-cols-1 gap-3 outline-none sm:grid-cols-2 lg:gap-6">
            <InputField
              label="Account name"
              type="text"
              register={register("accountName")}
              error={errors.accountName}
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(
                  /[^a-zA-Z\s]/g,
                  "",
                );
              }}
            />
            <InputField
              label="Account number"
              type="text"
              register={register("accountNumber")}
              error={errors.accountNumber}
              onInput={removeLetterOnInput}
              maxLength={9}
            />
            <InputField
              label="BSB"
              type="text"
              register={register("routingNumber")}
              error={errors.routingNumber}
              onInput={removeLetterOnInput}
              maxLength={6}
            />
            <InputField
              label="Amount"
              type="number"
              min={1}
              step=".01"
              register={register("amount", { valueAsNumber: true })}
              error={errors.amount}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="w-fit rounded-full bg-violet-normal px-6 py-3 font-medium text-white disabled:opacity-60"
              disabled={isSubmitting || !userData || !userData.isVerified}
            >
              {isSubmitting ? (
                <BeatLoader size={12} color="white" loading={isSubmitting} />
              ) : (
                "Request Withdrawal"
              )}
            </button>
          </div>
        </form>
      )}
    </main>
  );
};

// Sub-components
const StatusModal: React.FC<{
  status: "success" | "error";
  errorMessage: string | null;
  onClose: () => void;
  isServiceProvider: boolean;
}> = ({ status, errorMessage, onClose, isServiceProvider }) => (
  <section className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70">
    <div className="absolute inset-0 h-screen w-screen" onClick={onClose} />
    <div className="relative z-10 flex w-[90vw] max-w-xl flex-col items-center justify-center gap-3 rounded-xl bg-white p-3 px-4 lg:space-y-4 lg:p-10">
      <div className="flex flex-col items-center justify-center gap-4">
        <div
          className={`flex size-20 items-center justify-center rounded-full ${
            status === "success" ? "bg-[#C1F6C3]" : "bg-red-100"
          } bg-opacity-60`}
        >
          <div
            className={`flex size-14 items-center justify-center rounded-full ${
              status === "success" ? "bg-[#A6F8AA]" : "bg-red-300"
            } p-2`}
          >
            {status === "success" ? (
              <PiSealCheckFill className="size-10 text-green-500" />
            ) : (
              <BsExclamationTriangle className="size-10 text-red-500" />
            )}
          </div>
        </div>
        <p className="text-center font-clashBold text-2xl font-bold text-violet-normal">
          {status === "success" ? "Withdrawal Successful" : "Failure"}
        </p>
        <p className="text-center font-semibold text-violet-darker py-3">
          {status === "success"
            ? "Your withdrawal request was successful. Your payment will be processed and deposited into your account within 2 business days."
            : errorMessage}
        </p>
        {status === "success" ? (
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
        ) : (
          <button
            onClick={onClose}
            className="rounded-full bg-violet-normal px-4 py-2 font-bold text-white max-sm:text-sm"
          >
            Close
          </button>
        )}
      </div>
    </div>
  </section>
);

type InputFieldProps = {
  register?: any;
  error?: any;
  label: string;
} & React.ComponentProps<"input">;

//Only label, register and error needs to be pulled out from the rest of the props
const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  register,
  error,
  value,
  disabled,
  min,
  step,
  ...props
}) => {
  const { maxLength, onInput } = props;
  return (
    <label className="flex flex-col gap-2">
      <span className="text-lg font-bold text-violet-normal">{label}</span>
      <input
        type={type}
        className="w-full rounded-md bg-white p-3 outline-none"
        disabled={disabled}
        value={value}
        min={min}
        {...(maxLength ? { maxLength } : {})}
        {...(onInput ? { onInput } : {})}
        step={step}
        {...register}
      />
      {error && <p className="text-red-600">{error.message}</p>}
    </label>
  );
};

export default WithdrawalPage;
