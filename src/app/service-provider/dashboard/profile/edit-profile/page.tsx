"use client";

import EditProfileModal from "@/components/serviceProviderDashboard/profile/EditProfileModal";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { PiFileArrowDownDuotone } from "react-icons/pi";

const EditProfile = () => {
  const [isEditingEnabled, setIsEditingEnabled] = useState(false);
  const [isFormModalShown, setIsFormModalShown] = useState(false);
  const [documentImage, setDocumentImage] = useState<{ image: File | null }>({
    image: null,
  });

  const session = useSession();
  const user = session?.data?.user?.user;

  const userDataSchema = z.object({
    firstName: z.string().nullable().optional(),
    lastName: z.string().nullable().optional(),
    dateOfBirth: z.string(),
    phoneNumber: z.string().nullable().optional(),
    emailNumber: z.string().nullable().optional(),
    postcode: z.string().nullable().optional(),
    suburb: z.string().nullable().optional(),
    state: z.string().nullable().optional(),
    medicareId: z.string(),
    driverLicence: z.string(),
  });

  type userDataType = z.infer<typeof userDataSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(userDataSchema),
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      dateOfBirth: "",
      phoneNumber: user?.phoneNumber ?? "",
      emailNumber: user?.emailAddress ?? "",
      postcode: user?.address?.postCode ?? "",
      suburb: user?.address?.suburb ?? "",
      state: user?.address?.state ?? "",
      medicareId: "",
      driverLicence: "",
    },
  });

  const handleSetDocumentImage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setDocumentImage({ image: uploadedFile });
    }
  };

  const handleRemoveDocumentImage = () => {
    setDocumentImage({ image: null });
  };

  useEffect(() => {
    if (user) {
      reset({
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        dateOfBirth: "",
        phoneNumber: user?.phoneNumber ?? "",
        emailNumber: user?.emailAddress ?? "",
        postcode: user?.address?.postCode ?? "",
        suburb: user?.address?.suburb ?? "",
        state: user?.address?.state ?? "",
        medicareId: "",
        driverLicence: "",
      });
    }
  }, [user, reset]);

  const handleSubmitUserData: SubmitHandler<userDataType> = (data) => {
    // console.log(data);
    setIsFormModalShown(true);
    setIsEditingEnabled(false);

    const newUserData = { ...data, documentImage: documentImage.image };
  };

  return (
    <main className=" relative p-4 lg:p-8">
      <section className="flex flex-col items-center justify-center gap-1 pb-8 ">
        <Image
          src={user?.profileImage ?? "/assets/images/serviceProvider/user.jpg"}
          alt="user"
          width={80}
          height={80}
          className="size-20 rounded-full object-cover"
        />
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
                disabled
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
                disabled
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
                type="date"
                id="dateOfBirth"
                placeholder=""
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
            <div className="grid space-y-3">
              <label className="text-sm text-slate-500">
                Upload identification document
              </label>
              {/* Check if taskImage is uploaded */}
              {documentImage.image ? (
                <div className="flex items-end justify-center space-x-2">
                  {/* Display a disabled input with message */}
                  <label
                    htmlFor="file-upload"
                    className="flex h-48 w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 p-4"
                  >
                    <PiFileArrowDownDuotone className="text-xl text-tc-gray" />
                    <span className="text-center text-tc-gray">
                      Image Uploaded
                    </span>
                    {/* <input
                      id="file-upload"
                      type="file"
                      readOnly
                      disabled
                      className="hidden"
                      onChange={(e) => handleSetDocumentImage(e)}
                    /> */}
                  </label>
                  <button
                    className="rounded-lg bg-tc-gray px-3 py-1 text-white"
                    onClick={handleRemoveDocumentImage}
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                // If no taskImage is uploaded, render the file input
                <label
                  htmlFor="file-upload"
                  className="flex h-48 w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-500 p-4"
                >
                  <PiFileArrowDownDuotone className="text-xl text-tc-gray" />
                  <span className="text-center text-tc-gray">
                    Choose a File Upload supports: JPG, PDF, PNG.
                  </span>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".png, .jpg, .jpeg, .gif"
                    className="hidden"
                    onChange={(e) => handleSetDocumentImage(e)}
                    disabled={!isEditingEnabled}
                  />
                </label>
              )}
            </div>
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
        isFormModalShown={isFormModalShown}
      />
    </main>
  );
};

export default EditProfile;
