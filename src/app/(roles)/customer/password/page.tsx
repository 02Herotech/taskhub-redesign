"use client";

import React, { useState } from "react";
import { PiWarningDiamond } from "react-icons/pi";
import { BsEye } from "react-icons/bs";

const ChangePassword = () => {
    const [isPasswordVerified, setIsPasswordVerified] = useState(true);

    return (
        <>
            {!isPasswordVerified ? (
                <main className="space-y-8 p-4 lg:p-8 mt-28">
                    <p className=" flex items-center gap-2 rounded-xl bg-orange-normal p-5 font-normal text-white">
                        <span>
                            <PiWarningDiamond className="size-5" />
                        </span>
                        <span>
                            When you change your password, please know that you will have to
                            wait for about 3months before you can change it again.
                        </span>
                    </p>
                    <form className="mx-auto flex w-full flex-col gap-8 rounded-xl  bg-violet-light p-3 lg:p-6 ">
                        <label
                            htmlFor="checkPassword"
                            className="text-3xl font-bold text-violet-900"
                        >
                            Current Password
                        </label>
                        <div className="relative mx-auto w-4/5">
                            <button className="absolute right-2 top-1/2 -translate-y-1/2">
                                <BsEye />
                            </button>
                            <input
                                type="text"
                                className="w-full rounded-xl p-3  outline-none "
                            />
                        </div>
                        <button className="mx-auto w-fit rounded-full bg-violet-normal px-6 py-3 text-white  ">
                            Change Password
                        </button>
                    </form>
                </main>
            ) : (
                <main className="space-y-8 p-4 lg:p-8">
                    <p className=" flex items-center gap-2 rounded-xl bg-orange-normal p-5 font-normal text-white">
                        <span>
                            <PiWarningDiamond className="size-5" />
                        </span>
                        <span>
                            When you change your password, please know that you will have to
                            wait for about 3months before you can change it again. please
                            include a character, alphanumeric, uppercase and lowercase
                            letters.
                        </span>
                    </p>

                    <form className="mx-auto flex w-full flex-col gap-8 rounded-xl  bg-violet-light p-3 lg:p-6 ">
                        {/* ---------- */}
                        <div className="space-y-2">
                            <label
                                htmlFor="checkPassword"
                                className="text-xl font-bold text-violet-dark"
                            >
                                Current Password
                            </label>
                            <div className="relative w-full ">
                                <button className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <BsEye />
                                </button>
                                <input
                                    type="password"
                                    className="w-full rounded-xl p-3  outline-none "
                                />
                            </div>
                        </div>
                        {/* ---------- */}
                        <div className="space-y-2">
                            <label
                                htmlFor="checkPassword"
                                className="text-xl font-bold text-violet-dark"
                            >
                                New Password
                            </label>
                            <div className="relative w-full ">
                                <button className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <BsEye />
                                </button>
                                <input
                                    type="password"
                                    className="w-full rounded-xl p-3  outline-none "
                                />
                            </div>
                        </div>
                        {/* ---------- */}
                        <div className="space-y-2">
                            <label
                                htmlFor="checkPassword"
                                className="text-xl font-bold text-violet-dark"
                            >
                                Confirm Password
                            </label>
                            <div className="relative w-full ">
                                <button className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <BsEye />
                                </button>
                                <input
                                    type="password"
                                    className="w-full rounded-xl p-3  outline-none "
                                />
                            </div>
                        </div>
                        <button className="mx-auto w-fit rounded-full bg-violet-normal px-6 py-3 text-white  ">
                            Update Password
                        </button>
                    </form>
                </main>
            )}
        </>
    );
};

export default ChangePassword;
