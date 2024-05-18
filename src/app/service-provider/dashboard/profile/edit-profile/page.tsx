"use client";

import EditProfileModal from "@/components/serviceProviderDashboard/profile/EditProfileModal";
import Image from "next/image";
import React, { useState } from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const initialUserData = {
  firstName: "John",
  lastName: "Doe",
  dateOfBirth: "12/03/1993",
  phoneNumber: "+1234567890",
  emailNumber: "Johndoe@gmail.com",
  postcode: "450123",
  suburb: "QLD",
  state: "Qld",
  medicareId: "450123",
  driverLicence: "450123",
};

const EditProfile = () => {
  const [isEditingEnabled, setIsEditingEnabled] = useState(false);
  const [isFormModalShown, setIsFormModalShown] = useState(false);

  const userDataSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    dateOfBirth: z.string(),
    phoneNumber: z.string(),
    emailNumber: z.string(),
    postcode: z.string(),
    suburb: z.string(),
    state: z.string(),
    medicareId: z.string(),
    driverLicence: z.string(),
  });

  type userDataType = z.infer<typeof userDataSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userDataSchema),
    defaultValues: initialUserData,
  });

  const handleSubmitUserData: SubmitHandler<userDataType> = (data) => {
    console.log(data);
    setIsFormModalShown(true);
    setIsEditingEnabled(false);
  };

  return (
    <main className="space-y-8 p-4 lg:p-8">
      <EditProfileModal
        setIsFormModalShown={setIsFormModalShown}
        isFormModalShown={isFormModalShown}
      />
      <section className="flex flex-col items-center justify-center gap-1 ">
        <Image
          src="/assets/images/marketplace/singleTask/oluchi.png"
          alt="user"
          width={60}
          height={60}
          className="rounded-full"
        />
        <h2 className="text-xl font-bold text-slate-900">John Doe</h2>
        <p className="font-medium text-slate-500">QLD, Australia</p>
        <button
          className={` rounded-full bg-violet-normal px-4 py-2 text-sm text-white transition-all duration-300 hover:opacity-90  ${isEditingEnabled && "animate-pulse"} `}
          onClick={() => setIsEditingEnabled((prev) => !prev)}
          // disabled={isEditingEnabled}
        >
          {isEditingEnabled ? "Editing ..." : " Edit Profile"}
        </button>
      </section>
      <form
        onSubmit={handleSubmit(handleSubmitUserData)}
        className="space-y-10 lg:space-y-20"
      >
        {/* Personal information */}
        <section className="flex flex-col flex-wrap justify-between gap-4  lg:grid lg:grid-cols-12">
          <div className=" space-y-4 lg:col-span-4 ">
            <h3 className="text-base font-bold text-slate-800">
              Personal Information
            </h3>
            <p className="text-sm text-slate-500">
              Update your personal information to keep your account safe.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 lg:col-span-8">
            <div className="flex w-full flex-col gap-3 lg:max-w-64 ">
              <label htmlFor="firstName" className="text-sm text-slate-500">
                First Name
              </label>
              <input
                // type="text"
                id="firstName"
                className="rounded-xl border border-slate-100 p-2 text-slate-700 shadow  outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm "
                {...register("firstName")}
                disabled={!isEditingEnabled}
              />
              {errors.firstName && (
                <p className="text-red-600">{errors.firstName.message}</p>
              )}
            </div>
            <div className="flex w-full flex-col gap-3 lg:max-w-64 ">
              <label htmlFor="lastName" className="text-sm text-slate-500">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="rounded-xl border border-slate-100 p-2 text-slate-700 shadow  outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm "
                {...register("lastName")}
                disabled={!isEditingEnabled}
              />
              {errors.lastName && (
                <p className="text-red-600">{errors.lastName.message}</p>
              )}
            </div>
            <div className="flex w-full flex-col gap-3 lg:max-w-64 ">
              <label htmlFor="dateOfBirth" className="text-sm text-slate-500">
                Date of Birth
              </label>
              <input
                type="text"
                id="dateOfBirth"
                className="rounded-xl border border-slate-100 p-2 text-slate-700 shadow  outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm "
                {...register("dateOfBirth")}
                disabled={!isEditingEnabled}
              />
              {errors.dateOfBirth && (
                <p className="text-red-600">{errors.dateOfBirth.message}</p>
              )}
            </div>
          </div>
        </section>

        {/* contact details */}
        <section className="flex flex-col flex-wrap justify-between gap-4  lg:grid lg:grid-cols-12">
          <div className=" space-y-4 lg:col-span-4 ">
            <h3 className="text-base font-bold text-slate-800">
              Contact Information
            </h3>
            <p className="text-sm text-slate-500">
              Updating your personal information is important to keep your
              account secure
            </p>
          </div>
          <div className="flex flex-wrap gap-6 lg:col-span-8">
            <div className="flex w-full flex-col gap-3 lg:max-w-64 ">
              <label htmlFor="phoneNumber" className="text-sm text-slate-500">
                Phone Number
              </label>
              <input
                // type="text"
                id="phoneNumber"
                className="rounded-xl border border-slate-100 p-2 text-slate-700 shadow  outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm "
                {...register("phoneNumber")}
                disabled={!isEditingEnabled}
              />
              {errors.phoneNumber && (
                <p className="text-red-600">{errors.phoneNumber.message}</p>
              )}
            </div>

            <div className="flex w-full flex-col gap-3 lg:max-w-64 ">
              <label htmlFor="emailAddress" className="text-sm text-slate-500">
                Email Address
              </label>
              <input
                // type="text"
                id="emailAddress"
                className="rounded-xl border border-slate-100 p-2 text-slate-700 shadow  outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm "
                {...register("emailNumber")}
                disabled={!isEditingEnabled}
              />
              {errors.emailNumber && (
                <p className="text-red-600">{errors.emailNumber.message}</p>
              )}
            </div>
          </div>
        </section>
        {/* Address Information */}
        <section className="flex flex-col flex-wrap justify-between gap-4  lg:grid lg:grid-cols-12">
          <div className=" space-y-4 lg:col-span-4 ">
            <h3 className="text-base font-bold text-slate-800">
              Address Information
            </h3>
            <p className="text-sm text-slate-500">
              Update your address information so customers around can find you.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 lg:col-span-8">
            <div className="flex w-full flex-col gap-3 lg:max-w-64 ">
              <label htmlFor="postalCode" className="text-sm text-slate-500">
                Postal Code
              </label>
              <input
                // type="text"
                id="postalCode"
                className="rounded-xl border border-slate-100 p-2 text-slate-700 shadow  outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm "
                {...register("postcode")}
                disabled
              />
              {errors.postcode && (
                <p className="text-red-600">{errors.postcode.message}</p>
              )}
            </div>
            <div className="flex w-full flex-col gap-3 lg:max-w-64 ">
              <label htmlFor="suburb" className="text-sm text-slate-500">
                Suburb
              </label>
              <input
                // type="text"
                id="suburb"
                className="rounded-xl border border-slate-100 p-2 text-slate-700 shadow  outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm "
                {...register("suburb")}
                disabled
              />
              {errors.suburb && (
                <p className="text-red-600">{errors.suburb.message}</p>
              )}
            </div>
            <div className="flex w-full flex-col gap-3 lg:max-w-64 ">
              <label htmlFor="state" className="text-sm text-slate-500">
                State
              </label>
              <input
                id="state"
                className="rounded-xl border border-slate-100 p-2 text-slate-700 shadow  outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm "
                {...register("state")}
                disabled
              />
              {errors.state && (
                <p className="text-red-600">{errors.state.message}</p>
              )}
            </div>
          </div>
        </section>
        {/* Identification Document */}
        <section className="flex flex-col flex-wrap justify-between gap-4  lg:grid lg:grid-cols-12">
          <div className=" space-y-4 lg:col-span-4 ">
            <h3 className="text-base font-bold text-slate-800">
              Identification Document
            </h3>
            <p className="text-sm text-slate-500">
              You can upload one or multiple documents as proof od identity.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 lg:col-span-8">
            <div className="flex w-full flex-col gap-3 lg:max-w-64 ">
              <label htmlFor="medicareId" className="text-sm text-slate-500">
                Medicare 1D Number
              </label>
              <input
                // type="text"
                id="medicareId"
                className="rounded-xl border border-slate-100 p-2 text-slate-700 shadow  outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm "
                {...register("medicareId")}
                disabled={!isEditingEnabled}
              />
              {errors.medicareId && (
                <p className="text-red-600">{errors.medicareId.message}</p>
              )}
            </div>
            <div className="flex w-full flex-col gap-3 lg:max-w-64 ">
              <label htmlFor="driverlicence" className="text-sm text-slate-500">
                Driver’s Licence Number
              </label>
              <input
                // type="text"
                id="suburb"
                className="rounded-xl border border-slate-100 p-2 text-slate-700 shadow  outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm "
                {...register("driverLicence")}
                disabled={!isEditingEnabled}
              />
              {errors.driverLicence && (
                <p className="text-red-600">{errors.driverLicence.message}</p>
              )}
            </div>
            {/* <div className="flex w-screen flex-col gap-3 lg:max-w-64 ">
              <label htmlFor="state" className="text-sm text-slate-500">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                className="rounded-xl border border-slate-200 p-2 text-slate-700 shadow  outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm "
              />
            </div> */}
          </div>
        </section>
        <div className="flex lg:items-end lg:justify-end lg:px-24">
          <button className="bg-violet-light w-fit rounded-full border border-violet-normal px-6 py-3 font-medium text-violet-normal transition-all duration-300 hover:bg-violet-200 hover:shadow-md">
            Save and Continue
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditProfile;
