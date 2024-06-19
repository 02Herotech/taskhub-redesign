"use client";

import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FaBullseye } from "react-icons/fa6";
import { FiAlertTriangle } from "react-icons/fi";

type ChangePasswordRequest = {
    password: string;
    confirmPassword: string;
};


const ChangePassword = () => {
    const session = useSession()
    const token = session.data?.user?.accessToken
    const [isPasswordVerified, setIsPasswordVerified] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPassword, setCurrentPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);

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
                }
            );

            setIsLoading(false);
            setIsPasswordVerified(true);
        } catch (error: any) {
            setIsLoading(false);
            console.log("Error:", error);
            if (error?.response?.data?.message === 'Unauthorized! Incorrect password') {
                setError('Incorrect password');
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
                }
            );

            setIsLoading(false);
            setIsPasswordVerified(true);

            if (response.status === 200) {
                setSuccess('Password changed successfully');
                setIsLoading(false);
            }
            setIsPasswordVerified(false)
        } catch (err: any) {
            console.log("Error:", err);
            setError(err.data.message || 'An unexpected error occurred');
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 lg:px-20 mt-[4rem]">
            <div className="mt-14 mb-8 space-y-8">
                <h4 className='text-[#140B31] font-satoshiBold font-bold text-3xl lg:text-4xl'>Change Password</h4>
                <div className='border-2 border-primary' />
            </div>
            {!isPasswordVerified ? (
                <main className="space-y-8">
                    <p className="flex items-start lg:items-center gap-x-2 rounded-xl bg-[#FFF0DA] p-5 font-normal text-tc-orange">
                        <FiAlertTriangle className="size-14 lg:size-7" />
                        <span>
                            When you change your password, please know that you will have to
                            wait for about 3months before you can change it again.
                        </span>
                    </p>
                    <form onSubmit={handlePasswordVerification} className="mx-auto flex w-full flex-col rounded-xl  bg-violet-light p-3 lg:py-6 lg:px-10">
                        <label
                            htmlFor="checkPassword"
                            className="text-base lg:text-2xl font-bold text-violet-900 my-4"
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
                            <div className="text-status-error-100 text-base font-semibold !my-5">{error}</div>
                        )}
                        <Button loading={isLoading} type="submit" className="mx-auto w-fit rounded-full bg-violet-normal px-6 my-3 py-3 text-white">
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
                                <label
                                    className="text-xl font-bold text-violet-dark"
                                >
                                    New Password
                                </label>
                                <Input
                                    name='password'
                                    type="password"
                                    className="w-full rounded-xl p-3 outline-none"
                                    rules={["required", "password"]}
                                />

                            </div>
                            {/* ---------- */}
                            <div className="space-y-2">
                                <label
                                    className="text-xl font-bold text-violet-dark"
                                >
                                    Confirm Password
                                </label>
                                <Input
                                    name='confirmPassword'
                                    type='password'
                                    className="w-full rounded-xl p-3 outline-none"
                                    rules={["required", "confirmPassword"]}
                                />
                            </div>
                            {success && (
                                <div className="text-status-success text-base font-semibold !my-5">{success}</div>
                            )}
                            <Button type="submit" className="mx-auto w-fit rounded-full bg-violet-normal px-6 py-3 text-white">
                                Update Password
                            </Button>
                        </form>
                    </FormProvider>
                </main>
            )}
        </div>
    );
};

export default ChangePassword;
