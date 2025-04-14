"use client";

import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FormProvider, set, SubmitHandler, useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { FiAlertTriangle } from "react-icons/fi";
import { PiSealCheckFill } from "react-icons/pi";
import { BsExclamationTriangle } from "react-icons/bs";
import useAxios from "@/hooks/useAxios";
import { useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setBreadCrumbs } from "@/store/Features/breadcrumbs";

type ChangePasswordRequest = {
  password: string;
  confirmPassword: string;
};

const DashboardPasswordChange = () => {
  const session = useSession();
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const authInstance = useAxios();

  const isServiceProvider =
    session?.data?.user?.user?.roles[0] === "SERVICE_PROVIDER";

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setBreadCrumbs({
        header: "Change password",
        links: [
          {
            url: "/customer/settings/notification-settings",
            text: "Change Password",
          },
        ],
      }),
    );
  }, []);

  const handlePasswordVerification = async (e: any) => {
    e.preventDefault();
    setError(null);
    try {
      setIsLoading(true);
      await authInstance.post("change-password/init", {
        oldPassword: currentPassword,
      });
      setIsLoading(false);
      setIsPasswordVerified(true);
    } catch (error: any) {
      setIsLoading(false);
      const errorMessage =
        error?.response?.data?.message || "An unknown error occurred.";
      setError(errorMessage);
      // setTimeout(() => {
      //   setError(null);
      // }, 2000);
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
      const response = await authInstance.post(`change-password`, {
        newPassword: payload.password,
      });
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
      setTimeout(() => {
        setError(null);
      }, 2000);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative p-4 lg:px-20">
      {success && (
        <section className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70">
          <div
            className="absolute inset-0 h-screen w-screen"
            onClick={() => setSuccess(null)}
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
      {error ===
        "You can only change your password once every 30 days. Please try again in 30 days." && (
        <section className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70">
          <div
            className="absolute inset-0 h-screen w-screen"
            onClick={() => setError("")}
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

      {/* Page shows when updated  */}
      <main className="space-y-8">
        <p className="flex items-start gap-x-2 rounded-xl bg-[#FFF0DA] p-5 font-normal text-tc-orange lg:items-center">
          <FiAlertTriangle className="size-14 lg:size-7" />
          <span>
            When you change your password, please know that you will have to
            wait for about 30 days before you can change it again.
          </span>
        </p>

        <div className="mx-auto max-w-[700px] rounded-xl bg-violet-light p-3 lg:px-10 lg:py-6">
          <form
            onSubmit={
              isPasswordVerified
                ? methods.handleSubmit(onSubmit)
                : handlePasswordVerification
            }
            className="flex flex-col gap-8"
          >
            <div className="space-y-2">
              <label
                htmlFor="checkPassword"
                className="text-xl font-bold text-violet-dark"
              >
                Current Password
              </label>
              <div className="relative">
                <div
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <IoMdEyeOff size={28} />
                  ) : (
                    <IoMdEye size={28} />
                  )}
                </div>
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  className="w-full rounded-xl p-3 outline-none disabled:cursor-not-allowed disabled:border-2 disabled:bg-white"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  disabled={isPasswordVerified}
                />
              </div>
            </div>

            <AnimatePresence>
              {isPasswordVerified && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <FormProvider {...methods}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-2"
                    >
                      <label className="text-xl font-bold text-violet-dark">
                        New Password
                      </label>
                      <Input
                        name="password"
                        type="password"
                        className="w-full rounded-xl p-3 outline-none"
                        rules={["required", "password"]}
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mt-4 space-y-2"
                    >
                      <label className="text-xl font-bold text-violet-dark">
                        Confirm Password
                      </label>
                      <Input
                        name="confirmPassword"
                        type="password"
                        className="w-full rounded-xl p-3 outline-none"
                        rules={["required", "confirmPassword"]}
                      />
                    </motion.div>
                  </FormProvider>
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <div className="!my-5 text-base font-semibold text-status-error-100">
                {error}
              </div>
            )}

            <Button
              loading={isLoading}
              type="submit"
              className="mx-auto w-fit rounded-full bg-violet-normal px-6 py-3 text-white"
            >
              {isPasswordVerified ? "Update Password" : "Change Password"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default DashboardPasswordChange;
