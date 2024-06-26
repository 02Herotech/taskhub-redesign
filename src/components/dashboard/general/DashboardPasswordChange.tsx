"use client";

import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FaBullseye } from "react-icons/fa6";
import { FiAlertTriangle } from "react-icons/fi";
import { PiSealCheckFill } from "react-icons/pi";

type ChangePasswordRequest = {
  password: string;
  confirmPassword: string;
};

const DashboardPasswordChange = () => {
  const session = useSession();
  const token = session.data?.user?.accessToken;
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const isServiceProvider =
    session?.data?.user?.user?.roles[0] === "SERVICE_PROVIDER";

  const handlePasswordVerification = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/change-password/init`,
        {
          oldPassword: currentPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      setIsLoading(false);
      setIsPasswordVerified(true);
    } catch (error: any) {
      setIsLoading(false);
      console.log("Error:", error);
      if (
        error?.response?.data?.message === "Unauthorized! Incorrect password"
      ) {
        setError("Incorrect password");
      }
    }
  };

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    formState: { isValid },
    watch,
  } = methods;

  const onSubmit: SubmitHandler<ChangePasswordRequest> = async (payload) => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/change-password`,
        {
          newPassword: payload.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      setIsLoading(false);
      setIsPasswordVerified(true);

      if (response.status === 200) {
        setSuccess("Password changed successfully");
        setIsLoading(false);
      }
      setIsPasswordVerified(false);
    } catch (err: any) {
      console.log("Error:", err.response.data || error);
      setError(err.data.message || "An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative mt-10 p-4 lg:mt-20 lg:px-20">
      {success && (
        <section className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70">
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
                Your password has been changed succesfully
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
      {!isPasswordVerified ? (
        <main className="space-y-8">
          <p className="flex items-start gap-x-2 rounded-xl bg-[#FFF0DA] p-5 font-normal text-tc-orange lg:items-center">
            <FiAlertTriangle className="size-14 lg:size-7" />
            <span>
              When you change your password, please know that you will have to
              wait for about 3months before you can change it again.
            </span>
          </p>
          <form
            onSubmit={handlePasswordVerification}
            className="mx-auto flex w-full flex-col rounded-xl  bg-violet-light p-3 lg:px-10 lg:py-6"
          >
            <label
              htmlFor="checkPassword"
              className="my-4 text-base font-bold text-[#140B31] lg:text-2xl"
            >
              Current Password
            </label>
            <div className="relative my-2">
              <div
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <BsEyeSlash /> : <BsEye />}
              </div>
              <input
                type={showCurrentPassword ? "text" : "password"}
                className="w-full rounded-xl p-3  outline-none"
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            {error && (
              <div className="!my-5 text-base font-semibold text-status-error-100">
                {error}
              </div>
            )}
            <Button
              loading={isLoading}
              type="submit"
              className="mx-auto my-3 w-fit rounded-full bg-violet-normal px-6 py-3 text-white"
            >
              Change Password
            </Button>
          </form>
        </main>
      ) : (
        <main className="space-y-8">
          <p className=" flex items-center gap-2 rounded-xl bg-[#FFF0DA] p-5 font-normal text-tc-orange">
            <FiAlertTriangle className="size-8" />
            <span>
              When you change your password, please know that you will have to
              wait for about 3months before you can change it again. please
              include a character, alphanumeric, uppercase and lowercase
              letters.
            </span>
          </p>

          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="mx-auto flex w-full flex-col gap-8 rounded-xl  bg-violet-light p-3 lg:p-6 "
            >
              {/* ---------- */}
              <div className="space-y-2">
                <label className="text-xl font-bold text-violet-dark">
                  New Password
                </label>
                <Input
                  name="password"
                  type="password"
                  className="w-full rounded-xl p-3 outline-none"
                  rules={["required", "password"]}
                />
              </div>
              {/* ---------- */}
              <div className="space-y-2">
                <label className="text-xl font-bold text-violet-dark">
                  Confirm Password
                </label>
                <Input
                  name="confirmPassword"
                  type="password"
                  className="w-full rounded-xl p-3 outline-none"
                  rules={["required", "confirmPassword"]}
                />
              </div>
              {/* {success && (
                <div className="!my-5 text-base font-semibold text-status-success">
                  {success}
                </div>
              )} */}
              <Button
                type="submit"
                className="mx-auto w-fit rounded-full bg-violet-normal px-6 py-3 text-white"
              >
                Update Password
              </Button>
            </form>
          </FormProvider>
        </main>
      )}
    </div>
  );
};

export default DashboardPasswordChange;
