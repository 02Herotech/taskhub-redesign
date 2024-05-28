"use client";

import EditProfileModal from "@/components/serviceProviderDashboard/profile/EditProfileModal";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { PiFileArrowDownDuotone } from "react-icons/pi";
import { BsPencilSquare } from "react-icons/bs";
import { BiCamera, BiCheck } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Webcam from "react-webcam";

const EditProfile = () => {
  const [isEditingEnabled, setIsEditingEnabled] = useState(false);
  const [isFormModalShown, setIsFormModalShown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditingProfilePicture, setisEditingProfilePicture] = useState<{
    isEditing: boolean;
    image: string | null;
  }>({ isEditing: false, image: null });
  const [documentImage, setDocumentImage] = useState<string | null>(null);
  const [suburbList, setSuburbList] = useState<string[]>([]);

  const session = useSession();
  const user = session?.data?.user?.user;

  const userDataSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    dateOfBirth: z.date().nullable(),
    phoneNumber: z.string().min(10),
    emailAddress: z.string().email(),
    postcode: z.string(),
    suburb: z.string(),
    state: z.string(),
    medicareId: z.string(),
    driverLicence: z.string(),
  });

  type userDataType = z.infer<typeof userDataSchema>;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(userDataSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: null,
      phoneNumber: "",
      emailAddress: "",
      postcode: "",
      suburb: "",
      state: "",
      medicareId: "",
      driverLicence: "",
    },
  });

  const watchField = watch();

  useEffect(() => {
    console.log("Watched", watchField);
  }, [watchField]);

  useEffect(() => {
    if (user) {
      reset({
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        dateOfBirth: null,
        phoneNumber: user?.phoneNumber ?? "",
        emailAddress: user?.emailAddress ?? "",
        postcode: user?.address?.postCode ?? "",
        suburb: user?.address?.suburb ?? "",
        state: user?.address?.state ?? "",
        medicareId: "",
        driverLicence: "",
      });
    }
  }, [user, reset]);

  const handleSubmitUserData: SubmitHandler<userDataType> = (data) => {
    setIsSubmitting(true);
    setIsFormModalShown(true);
    setIsEditingEnabled(false);
    const newUserData = { ...data, documentImage: documentImage };
  };

  const handleChangeProfilePicture = () => {
    setisEditingProfilePicture((prev) => ({
      ...prev,
      isEditing: true,
      image: null,
    }));
    setIsFormModalShown(true);
  };

  useEffect(() => {
    const handleFectchLocationByPostcode = async () => {
      try {
        const url =
          "https://smp.jacinthsolutions.com.au/api/v1/util/locations/search?postcode=" +
          watchField.postcode;
        const { data } = await axios.get(url);
        const suburb = data.map((item: any) => item.name);
        setSuburbList(suburb);
        const state = data[0].state.name;
        setValue("state", state);
      } catch (error) {
        console.log(error);
      }
    };
    handleFectchLocationByPostcode();
    // eslint-disable-next-line
  }, [watchField.postcode]);

  console.log(watchField.suburb);

  return (
    <main className=" relative p-4 lg:p-8">
      {/* Top profile Image section */}
      <section className="flex flex-col items-center justify-center gap-1 pb-8 ">
        <button
          className="relative mx-auto size-28 overflow-hidden rounded-full hover:shadow-md"
          onClick={handleChangeProfilePicture}
        >
          <span className="absolute right-3 top-2/3 z-10 rounded-full bg-white p-1 text-violet-normal">
            <BiCamera className=" size-5" />
          </span>
          <Image
            src={
              isEditingProfilePicture.image ??
              user?.profileImage ??
              "/assets/images/serviceProvider/user.jpg"
            }
            alt="user"
            width={80}
            height={80}
            className="h-full w-full rounded-full object-cover"
          />
        </button>
        <h2 className="text-xl font-bold text-slate-900">
          {user?.firstName} {user?.lastName}
        </h2>
        <p className="font-medium text-slate-500">
          {user?.address?.state} Australia
        </p>
        <button
          className={` rounded-full bg-violet-normal px-4 py-2 text-sm text-white transition-all duration-300 hover:opacity-90  ${isEditingEnabled && "animate-pulse"} `}
          onClick={() => setIsEditingEnabled((prev) => !prev)}
        >
          {isEditingEnabled ? "Editing ..." : " Edit Profile"}
        </button>
      </section>

      {/* Form modal section */}
      <form
        onSubmit={handleSubmit(handleSubmitUserData)}
        className="space-y-10 lg:space-y-20"
      >
        {/* Personal information */}
        <section className="flex flex-col gap-4 ">
          <h3 className="text-xl font-bold text-violet-dark lg:text-center">
            Personal Information
          </h3>
          <div className="flex flex-wrap justify-between gap-6 lg:col-span-8">
            {/* First name */}
            <label className="flex w-full flex-col gap-3 text-lg  text-violet-normal lg:max-w-64 ">
              <span className="flex items-center justify-between">
                <span>First Name</span>
                {!errors.firstName && watchField.firstName?.length >= 3 && (
                  <BiCheck className="size-5 rounded-full bg-green-500 p-1 text-white" />
                )}
              </span>
              <input
                type="text"
                disabled={!isEditingEnabled}
                className="rounded-xl border border-slate-100 p-2 text-slate-700 shadow  outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm "
                {...register("firstName")}
              />
            </label>
            {/* Last name */}
            <label className="flex w-full flex-col gap-3 text-lg  text-violet-normal lg:max-w-64 ">
              <span className="flex items-center justify-between">
                <span>Last Name</span>
                {!errors.lastName && watchField.lastName?.length >= 3 && (
                  <BiCheck className="size-5 rounded-full bg-green-500 p-1 text-white" />
                )}
              </span>
              <input
                type="text"
                disabled={!isEditingEnabled}
                className="rounded-xl border border-slate-100 p-2 text-slate-700 shadow  outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm "
                {...register("lastName")}
              />
            </label>
            {/* Date of birth */}
            <label className="flex w-full flex-col gap-3 text-lg  text-violet-normal lg:max-w-64 ">
              <span className="flex items-center justify-between">
                <span> Date of Birth</span>
                {!errors.dateOfBirth && watchField.dateOfBirth !== null && (
                  <BiCheck className="size-5 rounded-full bg-green-500 p-1 text-white" />
                )}
              </span>
              <Controller
                control={control}
                name="dateOfBirth"
                render={({ field: { onChange, onBlur, value } }) => (
                  <DatePicker
                    disabled={!isEditingEnabled}
                    selected={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className="w-full rounded-xl border border-slate-100 p-2 text-slate-700 shadow outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm"
                    dateFormat="dd/MM/yyyy"
                  />
                )}
              />
            </label>
          </div>
        </section>

        {/* contact details */}
        <section className="flex flex-col gap-4 ">
          <h3 className="text-xl font-bold text-violet-dark lg:text-center">
            Contact Information
          </h3>
          <div className="flex flex-wrap gap-6 lg:col-span-8">
            {/* Phone number */}
            <label className="flex w-full flex-col gap-3 text-lg  text-violet-normal lg:max-w-64 ">
              <span className="flex items-center justify-between">
                <span> Phone Number</span>
                {!errors.phoneNumber && watchField.phoneNumber.length >= 12 && (
                  <BiCheck className="size-5 rounded-full bg-green-500 p-1 text-white" />
                )}
              </span>
              <input
                type="text"
                id="phoneNumber"
                className="rounded-xl border border-slate-100 p-2 text-slate-700 shadow  outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm "
                {...register("phoneNumber")}
                disabled={!isEditingEnabled}
              />
            </label>
            {/* Email Address */}
            <label className="flex w-full flex-col gap-3 text-lg  text-violet-normal lg:max-w-64 ">
              <span className="flex items-center justify-between">
                <span>Email Address</span>
                {!errors.emailAddress &&
                  watchField.emailAddress.length >= 2 && (
                    <BiCheck className="size-5 rounded-full bg-green-500 p-1 text-white" />
                  )}
              </span>
              <input
                type="email"
                readOnly
                className="rounded-xl border border-slate-100 p-2 text-slate-700 shadow  outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm "
                {...register("emailAddress")}
              />
            </label>
          </div>
        </section>
        {/* Address Information */}
        <section className="flex flex-col gap-4 ">
          <h3 className="text-xl font-bold text-violet-dark lg:text-center">
            Address Information
          </h3>

          <div className="flex flex-wrap gap-6 lg:col-span-8">
            {/* postcode */}
            <label className="flex w-full flex-col gap-3 text-lg  text-violet-normal lg:max-w-64 ">
              <span className="flex items-center justify-between">
                <span>Postal Code</span>
                {suburbList.length > 0 && watchField.postcode.length > 0 && (
                  <BiCheck className="size-5 rounded-full bg-green-500 p-1 text-white" />
                )}
              </span>
              <input
                type="text"
                className="rounded-xl border border-slate-100 p-2 text-slate-700 shadow  outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm "
                {...register("postcode")}
                disabled={!isEditingEnabled}
              />
            </label>

            {/* suburb */}
            <label className="flex w-full flex-col gap-3 text-lg  text-violet-normal lg:max-w-64 ">
              <span className="flex items-center justify-between">
                <span> Suburb</span>
                {!errors.suburb && watchField.suburb.length > 0 && (
                  <BiCheck className="size-5 rounded-full bg-green-500 p-1 text-white" />
                )}
              </span>
              <select
                {...register("suburb")}
                className="rounded-xl border border-slate-100 p-2 py-2.5 text-slate-700 shadow  outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm "
                disabled={!isEditingEnabled || suburbList.length === 0}
              >
                {suburbList.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            {/* State */}
            <label className="flex w-full flex-col gap-3 text-lg  text-violet-normal lg:max-w-64 ">
              <span className="flex items-center justify-between">
                <span> State</span>
                {!errors.state && watchField.state.length > 0 && (
                  <BiCheck className="size-5 rounded-full bg-green-500 p-1 text-white" />
                )}
              </span>
              <input
                readOnly
                className="rounded-xl border border-slate-100 p-2 text-slate-700 shadow  outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm "
                {...register("state")}
              />
            </label>
          </div>
        </section>
        {/* Identification Document */}
        <section className="flex flex-col gap-4 ">
          <h3 className="text-xl font-bold text-violet-dark lg:text-center">
            Identification Document
          </h3>
          <div className="flex flex-wrap lg:col-span-8 lg:gap-8">
            {/* Upload Identification Document */}
            <label className="flex w-full flex-col gap-3 text-lg  text-violet-normal lg:max-w-64 ">
              <span className="flex items-center justify-between">
                <span className="flex items-center justify-between gap-9">
                  <span>Means of ID</span>
                  {documentImage && (
                    <BiCheck className="size-5 rounded-full bg-green-500 p-1 text-white" />
                  )}
                </span>
              </span>
              <div>
                {documentImage ? (
                  <div className="flex items-end justify-center space-x-2">
                    {/* Display a disabled input with message */}
                    <Image
                      src={documentImage}
                      alt="Captured or Selected"
                      width={300}
                      height={300}
                      className="rounded-xl"
                    />
                  </div>
                ) : (
                  // If no taskImage is uploaded, render the file input
                  <button
                    type="button"
                    className="flex h-48 w-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-500 p-4"
                    onClick={() => setIsFormModalShown(true)}
                  >
                    <PiFileArrowDownDuotone className="text-xl text-tc-gray" />
                    <span className="text-center text-tc-gray">
                      Choose a File Upload supports: JPG, PDF, PNG.
                    </span>
                  </button>
                )}
              </div>
            </label>

            <label className="flex w-full flex-col gap-3 text-lg  text-violet-normal lg:max-w-64 ">
              <span className="flex items-center justify-between">
                <span className="flex items-center justify-between gap-9">
                  <span> Driver’s Licence Number</span>
                  {!errors.driverLicence &&
                    watchField.driverLicence.length >= 8 && (
                      <BiCheck className="size-5 rounded-full bg-green-500 p-1 text-white" />
                    )}
                </span>
              </span>
              <input
                type="text"
                id="suburb"
                className="rounded-xl border border-slate-100 p-2 text-slate-700 shadow  outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm "
                {...register("driverLicence")}
                disabled={!isEditingEnabled}
              />
            </label>
          </div>
        </section>
        <div className="flex lg:items-end lg:justify-end lg:px-24">
          <button className="w-fit rounded-full border border-violet-normal bg-violet-light px-6 py-3 font-medium text-violet-normal transition-all duration-300 hover:bg-violet-200 hover:shadow-md">
            Save and Continue
          </button>
        </div>
      </form>
      <EditProfileModal
        setIsFormModalShown={setIsFormModalShown}
        setDocumentImage={setDocumentImage}
        isFormModalShown={isFormModalShown}
        isEditingProfilePicture={isEditingProfilePicture}
        setisEditingProfilePicture={setisEditingProfilePicture}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
      />
    </main>
  );
};

export default EditProfile;
