"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadCrumbs } from "@/store/Features/breadcrumbs";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  accountName: z.coerce.string().min(1, "Account name is required"),
  bsb: z.string().min(1, "BSB is required"),
  accountNumber: z.string().min(1, "Account number is required"),
});

type Schema = z.infer<typeof schema>;

function Page() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setBreadCrumbs({
        header: "Add bank account",
        links: [
          {
            url: "/customer/payment-new/update/receive",
            text: "Receive payments",
          },
          { url: "#", text: "Add bank account" },
        ],
      }),
    );
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<Schema> = async (data) => {};
  return (
    <section className="flex min-h-[55vh] items-center justify-center">
      <div className="w-full rounded-xl bg-[#EBE9F4] p-2 px-3 sm:w-10/12 sm:p-4">
        <h3 className="mb-2 text-xl font-bold sm:text-2xl">Add bank account</h3>
        <p className="mb-2 text-[#546276]">
          Add the account you would be credited, from your wallet.
        </p>
        <p className="mb-4 text-sm text-[#666B73]">ACCOUNT INFORMATION</p>
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="account-name"
              className="block text-sm text-[#4E5158]"
            >
              Account name
            </label>
            <input
              type="text"
              id="account-name"
              className="block w-full rounded-lg p-2 outline-none"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="bsb" className="block text-sm text-[#4E5158]">
              BSB
            </label>
            <input
              type="text"
              id="bsb"
              className="block w-full rounded-lg p-2 outline-none"
              placeholder="123456"
            />
          </div>
          <div>
            <label htmlFor="bsb" className="block text-sm text-[#4E5158]">
              Account number
            </label>
            <input
              type="text"
              id="bsb"
              className="block w-full rounded-lg p-2 outline-none"
              placeholder="123456789"
            />
          </div>
          <button className="mt-20 w-full rounded-full bg-primary px-10 py-2 text-white sm:mt-10 sm:w-max">
            Add bank account
          </button>
        </form>
      </div>
    </section>
  );
}

export default Page;
