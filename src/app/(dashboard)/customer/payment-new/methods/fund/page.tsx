"use client";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import useAxios from "@/hooks/useAxios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SendPayment from "./SendPayment";
import Button from "@/components/global/Button";
import { useDispatch } from "react-redux";
import { setBreadCrumbs } from "@/store/Features/breadcrumbs";
import Link from "next/link";
import Popup from "@/components/global/Popup/PopupTwo";
import { IoCheckmark } from "react-icons/io5";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const schema = z.object({
  amount: z.coerce
    .number({ message: "Invalid input, please enter a number" })
    .min(5, "Minimum of $5"),
});

type Schema = z.infer<typeof schema>;

type Response = {
  data: {
    intentId: string;
    clientSecret: string;
    amount: number;
    fee: number;
    total: number;
  };
  message: string;
  successful: boolean;
};

function Page() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setBreadCrumbs({
        header: "Fund wallet",
        links: [
          { url: "/customer/payment-new/methods", text: "Payment methods" },
          { url: "#", text: "Fund wallet" },
        ],
      }),
    );
  }, []);
  const authInstance = useAxios();
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState("");
  const {
    reset,
    watch,
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({ resolver: zodResolver(schema), mode: "onChange" });

  const price = watch("amount");

  const onSubmit: SubmitHandler<Schema> = async (payload) => {
    try {
      const { data } = await authInstance.post<Response>(
        "/wallet/fund",
        payload,
      );
      setClientSecret(data.data.clientSecret);
      reset();
    } catch (e) {
      setError("root", { message: "Error occured while initializing payment" });
    }
  };
  return (
    <section className="mt-4 flex min-h-[55vh] w-full items-center justify-center pb-10">
      <div className="rounded-xl bg-[#EBE9F4] p-3 sm:w-10/12 sm:p-4">
        <h3 className="mb-2 text-xl font-bold sm:text-2xl">Fund wallet</h3>
        <p className="mb-4 text-[#546276]">
          Top up your wallet to be able to pay your service providers stress
          free.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="amount" className="block text-sm text-[#4E5158]">
            Amount{" "}
          </label>
          <input
            type="tel"
            id="amount"
            className="block w-full rounded-lg p-2 outline-none"
            placeholder="$ 500"
            {...register("amount")}
          />
          <div className="mt-1 flex items-center justify-between">
            {errors.amount && (
              <p className="w-full text-sm font-medium text-red-500">
                {errors.amount.message}
              </p>
            )}
            <div className="ml-auto min-w-20 border text-xs">
              {price && <>Charge: ${(price * 0.017 + 0.3).toFixed(2)}</>}
            </div>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
            className="mb-3 mt-20 w-full rounded-full bg-primary px-10 py-2 text-white sm:mt-10 sm:w-max"
          >
            Submit
          </Button>
          {errors.root && (
            <p className="w-full text-sm font-medium text-red-500">
              {errors.root.message}
            </p>
          )}
        </form>
      </div>
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              variables: { colorPrimary: "#381f8c" },
              theme: "flat",
            },
            loader: "always",
          }}
        >
          <SendPayment
            closeModal={() => setClientSecret(null)}
            clientSecret={clientSecret}
            setAmount={(amount: string) => setAmount(amount)}
          />
        </Elements>
      )}
      <Popup isOpen={Boolean(amount)} onClose={() => setAmount("")}>
        <div className="relative mt-6 max-h-[700px] min-w-[320px] max-w-[800px] bg-white p-5 sm:min-w-[560px]">
          <div className="mx-auto mb-3 w-max rounded-full bg-[#FE9B07] p-2">
            <IoCheckmark size={23} className="text-[#EBE9F4]" />
          </div>
          <h3 className="mb-2 text-center font-clashSemiBold text-2xl text-[#2A1769] md:mb-4 md:text-4xl">
            Congratulations!!!
          </h3>
          <div className="mx-auto mb-6 max-w-[500px] space-y-3">
            <p className="text-center text-base font-semibold text-[#140B31] sm:text-lg">
              You have been credited with ${amount} to <br /> be used for task
              payments!
            </p>
            {/* <p className="text-center text-sm text-[#140B31] sm:text-base">
              Refer even more people to get more points!
            </p> */}
          </div>
          <div className="my-3 flex flex-col justify-center gap-3 sm:flex-row">
            {/* <Link
              href="/customer/add-task"
              className="w-full rounded-full border border-primary bg-[#EBE9F4] px-10 py-2 text-center font-satoshiBold font-bold text-primary sm:w-max"
            >
              Post a task
            </Link> */}
            <Link
              href="/customer/add-task"
              className="w-full rounded-full bg-primary px-10 py-2 text-center font-satoshiBold font-bold text-white sm:w-max"
            >
              Post a task
            </Link>
          </div>
        </div>
      </Popup>
    </section>
  );
}

export default Page;
