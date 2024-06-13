"use client";

import EditProfileModal from "@/components/serviceProviderDashboard/profile/EditProfileModal";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { PiFileArrowDownDuotone } from "react-icons/pi";
import { BiCamera, BiCheck } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { defaultUserDetails } from "@/data/data";
import { BeatLoader } from "react-spinners";
import { formatDateAsYYYYMMDD } from "@/utils";

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
  idType: z.string(),
  idNumber: z.string(),
  bio: z.string().nullable(),
});

const idTypeObject = [
  {
    label: "Medicare Card",
    value: "MEDICARE_CARD",
  },
  {
    label: "International Passport",
    value: "INTERNATIONAL_PASSPORT",
  },
  {
    label: "Photo ID",
    value: "PHOTO_ID",
  },
  {
    label: "Drivers Licence",
    value: "DRIVER_LICENSE",
  },
];

const EditProfile = () => {
  const [isEditingEnabled, setIsEditingEnabled] = useState(false);
  const [isFormModalShown, setIsFormModalShown] = useState(false);
  const [isEditingProfilePicture, setisEditingProfilePicture] = useState<{
    isEditing: boolean;
    image: string | null;
  }>({ isEditing: false, image: null });
  const [documentImage, setDocumentImage] = useState<string | null>(null);
  const [suburbList, setSuburbList] = useState([]);
  const [userDetails, setUserDetails] = useState(defaultUserDetails);
  const [selectedDocument, setSelectedDocument] = useState<File | null>(null);
  const [isProfileUpdatedSuccessfully, setIsProfileUpdatedSuccessfully] =
    useState(false);

  const session = useSession();
  const user = session?.data?.user?.user;
  const token = session?.data?.user?.accessToken;
  const isServiceProvider = user?.roles[0] === "SERVICE_PROVIDER";

  console.log(userDetails);
  type userDataType = z.infer<typeof userDataSchema>;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
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
      idType: "",
      idNumber: "",
      bio: "",
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;
      try {
        let url;
        if (isServiceProvider) {
          url =
            "https://smp.jacinthsolutions.com.au/api/v1/service_provider/profile";
        } else {
          url = "https://smp.jacinthsolutions.com.au/api/v1/customer";
        }
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setUserDetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [token, isServiceProvider]);

  const watchField = watch();

  const parseDate = (date: string | Date | null | undefined): Date | null => {
    if (date instanceof Date) {
      return date;
    }
    if (typeof date === "string") {
      const [year, month, day] = date.split("-").map(Number);
      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        return new Date(year, month - 1, day);
      }
    }
    return null;
  };

  const parseSendingDate = (inputDate: string | Date): string => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
    const day = String(date.getDate()).padStart(2, "0");
    if (isServiceProvider) {
      return `${year}-${month}-${day}`;
    } else {
      return `${day}-${month}-${year}`;
    }
  };

  const today = new Date();
  const age18YearsAgo = new Date(today.setFullYear(today.getFullYear() - 18));

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        // @ts-ignore
        dateOfBirth: parseDate(userDetails.dateOfBirth) || null,
        phoneNumber: user.phoneNumber || "",
        emailAddress: user.emailAddress || "",
        postcode: userDetails.postalCode || "",
        suburb: userDetails.suburbs || "",
        state: userDetails.state || "",
        medicareId: userDetails.idNumber,
        idType: userDetails.idType,
        idNumber: userDetails.idNumber,
        bio: isServiceProvider
          ? userDetails.bio ?? ""
          : "No Bio need for customer",
      });
    }
    // eslint-disable-next-line
  }, [userDetails, reset, user]);

  const handleSubmitUserData: SubmitHandler<userDataType> = async (data) => {
    try {
      let submitData: any;

      let url;
      if (isServiceProvider) {
        submitData = {
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: parseSendingDate(data.dateOfBirth as Date),
          suburb: data.suburb,
          state: data.state,
          postCode: data.postcode,
          idImage: selectedDocument,
          idType: data.idType,
          idNumber: data.idNumber,
          bio: data.bio,
        };
        url =
          "https://smp.jacinthsolutions.com.au/api/v1/service_provider/update";
      } else {
        submitData = {
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: parseSendingDate(data.dateOfBirth as Date),
          suburb: data.suburb,
          state: data.state,
          postCode: data.postcode,
          idImage: selectedDocument,
          idType: data.idType,
          idNumber: data.idNumber,
        };
        url = "https://smp.jacinthsolutions.com.au/api/v1/customer";
      }
      await axios.patch(url, submitData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setIsProfileUpdatedSuccessfully(true);
      setIsFormModalShown(true);
      setIsEditingEnabled(false);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const handleChangeProfilePicture = () => {
    setisEditingProfilePicture((prev) => ({
      ...prev,
      isEditing: true,
      image: "",
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
          className={` rounded-full bg-violet-normal px-4 py-2 text-sm text-white transition-all duration-300 hover:opacity-90 `}
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
        {/* Bio */}
        {isServiceProvider && (
          <section>
            <h3 className="text-xl font-bold text-violet-dark lg:text-center">
              Bio
            </h3>
            {/* First name */}
            <label className="flex w-full flex-col  gap-3 text-lg  text-violet-normal">
              <span className="flex items-center justify-between">
                <span>Bio Description</span>
                {!errors.bio && watchField.bio?.length >= 20 && (
                  <BiCheck className="size-5 rounded-full bg-green-500 p-1 text-white" />
                )}
              </span>
              <textarea
                disabled={!isEditingEnabled}
                className="w-full rounded-xl border border-slate-100 p-2 text-slate-700  shadow outline-none transition-shadow duration-300 hover:shadow-md "
                {...register("bio")}
              />
            </label>
          </section>
        )}

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
                    maxDate={age18YearsAgo}
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
          <div className="flex flex-col lg:col-span-8 lg:gap-8">
            <div className="flex flex-wrap lg:col-span-8 lg:gap-8">
              {/* select Id type */}
              <label className="space-y-4">
                <span className="flex items-center justify-between">
                  <span className="flex items-center justify-between gap-9">
                    <span>Choose a valid means of ID</span>
                    {/* {!errors.idType && watchField.idType.length > 0 && (
                      <BiCheck className="size-5 rounded-full bg-green-500 p-1 text-white" />
                    )} */}
                  </span>
                </span>
                <select
                  className="w-full rounded-xl border border-slate-100
                p-3 text-slate-700 shadow outline-none
                transition-shadow duration-300 hover:shadow-md lg:max-w-sm"
                  {...register("idType")}
                >
                  {idTypeObject.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              {/* Id Type Number */}

              <label className="flex w-full flex-col gap-3 text-lg  text-violet-normal lg:max-w-64 ">
                <span className="flex items-center justify-between">
                  <span className="flex items-center justify-between gap-9">
                    <span>
                      {watchField.idType === ""
                        ? "Select Id Type"
                        : idTypeObject.find(
                            (item) => item.value === watchField.idType,
                          )?.label + " Number"}
                    </span>
                    {!errors.idNumber && watchField.idNumber.length >= 7 && (
                      <BiCheck className="size-5 rounded-full bg-green-500 p-1 text-white" />
                    )}
                  </span>
                </span>
                <input
                  type="number"
                  id="suburb"
                  maxLength={12}
                  className="rounded-xl border border-slate-100 p-2 text-slate-700 shadow  outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm "
                  {...register("idNumber")}
                  disabled={!isEditingEnabled || watchField.idType === ""}
                />
              </label>
            </div>

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
                  <button
                    type="button"
                    className="flex items-end justify-center space-x-2"
                    onClick={() => setIsFormModalShown(true)}
                  >
                    {/* Display a disabled input with message */}
                    <Image
                      src={documentImage}
                      alt="Captured or Selected"
                      width={300}
                      height={300}
                      className="rounded-xl"
                    />
                  </button>
                ) : (
                  // If no taskImage is uploaded, render the file input
                  <button
                    type="button"
                    className="flex h-48 w-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-500 p-4"
                    onClick={() => setIsFormModalShown(true)}
                    disabled={!isEditingEnabled}
                  >
                    <PiFileArrowDownDuotone className="text-xl text-tc-gray" />
                    <span className="text-center text-tc-gray">
                      Choose a File Upload supports: JPG, PDF, PNG.
                    </span>
                  </button>
                )}
              </div>
            </label>
          </div>
        </section>

        {/* ----------------- submit  button -------------------- */}
        <div className="flex lg:items-end lg:justify-end lg:px-24">
          <button className="w-fit rounded-full border border-violet-normal bg-violet-light px-6 py-3 font-medium text-violet-normal transition-all duration-300 hover:bg-violet-200 hover:shadow-md">
            {isSubmitting ? (
              <BeatLoader color={"white"} loading={isSubmitting} size={14} />
            ) : (
              "Save and Continue"
            )}
          </button>
        </div>
      </form>
      <EditProfileModal
        setIsFormModalShown={setIsFormModalShown}
        setDocumentImage={setDocumentImage}
        isFormModalShown={isFormModalShown}
        isEditingProfilePicture={isEditingProfilePicture}
        setisEditingProfilePicture={setisEditingProfilePicture}
        isProfileUpdatedSuccessfully={isProfileUpdatedSuccessfully}
        setIsProfileUpdatedSuccessfully={setIsProfileUpdatedSuccessfully}
        setSelectedDocument={setSelectedDocument}
      />
    </main>
  );
};

export default EditProfile;