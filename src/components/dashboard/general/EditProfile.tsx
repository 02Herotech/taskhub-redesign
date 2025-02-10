"use client";
import { useEffect, useState, useRef } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { BiCamera, BiCheck } from "react-icons/bi";
import { PiFileArrowDownDuotone } from "react-icons/pi";
import EditProfileModal from "@/components/serviceProviderDashboard/profile/EditProfileModal";
import { formatDateAsYYYYMMDD } from "@/utils";
import { RootState } from "@/store";
import "react-datepicker/dist/react-datepicker.css";
import { defaultUserDetails } from "@/data/data";
import Button from "@/components/global/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next";
import { UserDataType } from "@/lib/validation/userData.schema";
import FormField from "./FormField";
import Notice from "./Notice";
import instance from "@/utils/axios.config";
import { instance as authInstance } from "@/utils/axiosInterceptor.config";
import axios from "axios";
import useValidateABN from "@/hooks/useValidateABN";
import Information from '@/components/business-hub/Information';
import { Calendar } from "primereact/calendar";

const idTypeObject = [
  { label: "Medicare Card", value: "MEDICARE_CARD" },
  { label: "International Passport", value: "INTERNATIONAL_PASSPORT" },
  { label: "Photo ID", value: "PHOTO_ID" },
  { label: "Driver's License", value: "DRIVERS_LICENSE" },
];

const EditProfile = () => {
  const [isEditingEnabled, setIsEditingEnabled] = useState(true);
  const [isFormModalShown, setIsFormModalShown] = useState(false);
  const [isSupportModalShown, setIsSupportModalShown] = useState(false);
  const [isEditingProfilePicture, setIsEditingProfilePicture] = useState({
    isEditing: false,
    image: null as string | null,
  });
  const [isEditingImageFront, setIsEditingImageFront] =
    useState<boolean>(false);
  const [isEditingImageBack, setIsEditingImageBack] = useState<boolean>(false);
  const [documentImageFront, setDocumentImageFront] = useState<string | null>(
    null,
  );
  const [documentImageBack, setDocumentImageBack] = useState<string | null>(
    null,
  );
  const [documentImage, setDocumentImage] = useState<string | null>(null);
  const [suburbList, setSuburbList] = useState<string[]>([]);
  const [selectedDocumentFront, setSelectedDocumentFront] =
    useState<File | null>(null);
  const [selectedDocumentBack, setSelectedDocumentBack] = useState<File | null>(
    null,
  );
  const [isProfileUpdatedSuccessfully, setIsProfileUpdatedSuccessfully] =
    useState(false);
  const [error, setError] = useState("");
  const [err, setErr] = useState("");
  const [userDetails, setUserDetails] = useState(defaultUserDetails);
  const [editProfileError, setEditProfileError] = useState("");
  const [isDocumentEditable, setIsDocumentEditable] = useState(false);

  const userProfile = useSelector((state: RootState) => state.userProfile);

  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const dispatch = useDispatch();

  const { data: session } = useSession();
  const user = session?.user?.user;


  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);

  const isServiceProvider = user?.roles[0] === "SERVICE_PROVIDER";
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const handleRedirect = () => {
    const newRedirectToProvideService = getCookie("redirectToProvideService");
    if (newRedirectToProvideService) {
      router.push(newRedirectToProvideService);
    } else {
      router.push(from || "/marketplace");
    }
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<UserDataType>({
    mode: "onSubmit",
    // resolver: zodResolver(userDataSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: new Date(),
      emailAddress: user?.emailAddress || "",
      postcode: "",
      suburb: "",
      state: "",
      idType: "",
      idNumber: "",
      abn: null,
      bio: "",
      isVerified: false,
    },
  });

  const watchField = watch();
  const watchABN = watch("abn");

  const { isValidABN, error: ABNError } = useValidateABN(watchABN, userDetails);

  const ABNInputRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const url = `${isServiceProvider ? "service_provider" : "customer"}/profile`;
        const { data } = await authInstance.get(url);
        setUserDetails(data);
        setIsDocumentEditable(
          data.verificationStatus === null ||
            data.verificationStatus === "NOT_VERIFIED",
        );
        reset({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
          // phoneNumber: data.phoneNumber || "",
          emailAddress: data.emailAddress || user?.emailAddress || "",
          postcode: data.postalCode || "",
          suburb: data.suburbs || "",
          state: data.state || "",
          idType:
            idTypeObject.find((item) => item.value === data.idType)?.label ||
            "",
          idNumber: data.idNumber || "",
          isVerified: data.isVerified || false,
          idImageFront:
            data.verificationStatus === "VERIFIED" ||
            data.verificationStatus === "PENDING"
              ? data.idImageFront || ""
              : "",
          idImageBack:
            data.verificationStatus === "VERIFIED" ||
            data.verificationStatus === "PENDING"
              ? data.idImageBack || ""
              : "",
          bio: isServiceProvider
            ? data.bio || ""
            : "No Bio needed for customer",
          abn: isServiceProvider ? data.abn || "" : "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setErr("Failed to load user data. Please try again.");
      }
    };

    fetchUserData();
  }, [isServiceProvider, dispatch, reset, isEditingEnabled]);

  const watchPostcode = watch("postcode");

  useEffect(() => {
    const fetchLocationByPostcode = async () => {
      if (!watchPostcode) {
        setSuburbList([]);
        setValue("suburb", "");
        setValue("state", "");
        return;
      }

      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/util/locations/search?postcode=${watchPostcode}`,
        );

        // Map suburbs from the Name field
        const suburbs = data.map((item: { Name: string }) => item.Name);
        setSuburbList(suburbs);

        // Set the first suburb as the default if available
        if (suburbs.length > 0) {
          setValue("suburb", suburbs[0]);
        } else {
          setValue("suburb", "");
        }

        // Set the state if available using the State field
        if (data[0]?.State) {
          setValue("state", data[0].State);
        } else {
          setValue("state", "");
        }

        // Define the type for the location data
        interface LocationData {
          Name: string;
          Postcode: string;
          State: string;
          StateShort: string;
          Type: string;
        }

        // You might also want to store the full location data for reference
        const locationData: LocationData = data[0];

        // If you need to store the state abbreviation somewhere
        const stateShort = locationData.StateShort;
      } catch (error) {
        console.error("Error fetching location data:", error);
        setSuburbList([]);
        setValue("suburb", "");
        setValue("state", "");
      }
    };

    fetchLocationByPostcode();
  }, [watchPostcode, setValue]);

  // const formatDateAsYYYYMMDD = (date: Date | null) => {
  //   if (!date) return "";
  //   return date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
  // };

  const formatDateAsYYYYMMDD = (date: Date): string => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };
  

  const handleSubmitUserData: SubmitHandler<UserDataType> = async (data) => {
    if (isServiceProvider && !isValidABN) {
      if (ABNInputRef.current) {
        ABNInputRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        ABNInputRef.current.focus();
      }
      return;
    }
    (data.idImageBack = "null"), (data.idImageFront = "null");
    if (!isServiceProvider) data.abn = "null";
    // const isIncompleteData = Object.entries(data).some(([key, value]) => {
    //   return value === "" || value == null;
    // });
    // if (isIncompleteData) {
    //   setEditProfileError("Missing required fields");
    //   return;
    // }
    // if (data.idType === "International Passport" && !selectedDocumentFront) {
    //   setEditProfileError("Missing required fields");
    //   return;
    // }
    // if (
    //   data.idType !== "International Passport" &&
    //   (!selectedDocumentBack || !selectedDocumentFront)
    // ) {
    //   setEditProfileError("Missing required fields");
    //   return;
    // }
    const missingFields = Object.entries(data)
    .filter(([key, value]) => value === "" || value == null)
    .map(([key]) => key); // Get only field names

    if (missingFields.length > 0) {
      setEditProfileError(`Missing required fields: ${missingFields.join(", ")}`);
      console.log("Missing fields:", missingFields);
      return;
    }

    if (data.idType === "International Passport" && !selectedDocumentFront) {
      setEditProfileError("Missing required field: idImageFront");
      console.log("Missing field: idImageFront");
      return;
    }

    if (data.idType !== "International Passport" && (!selectedDocumentBack || !selectedDocumentFront)) {
      setEditProfileError("Missing required fields: idImageFront, idImageBack");
      console.log("Missing fields: idImageFront, idImageBack");
      return;
    }

    setEditProfileError("");
    try {
      let submitData: any;
      let url;
      if (isServiceProvider) {
        submitData = Object.entries({
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth ? formatDateAsYYYYMMDD(data.dateOfBirth as Date) : "",
          suburb: data.suburb,
          // phoneNumber: data.phoneNumber,
          state: data.state,
          postCode: data.postcode,
          idImageFront: selectedDocumentFront,
          idImageBack: selectedDocumentBack,
          idType: data.idType,
          idNumber: data.idNumber,
          bio: data.bio,
          abn: data.abn,
        // }).reduce((acc, [key, value]) => {
        //   if (value !== null && value !== undefined && value !== "") {
        //     acc[key] = value;
        //   }
        //   return acc;
        // }, {});
        ...(isServiceProvider ? { abn: data.abn } : {}), // Include ABN only if service provider
      }).reduce((acc, [key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          acc[key] = value;
        }
        return acc;
      }, {});
        url = "service_provider/update";
      } else {
        delete data.abn;
        submitData = Object.entries({
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth ? formatDateAsYYYYMMDD(data.dateOfBirth as Date) : "",
          suburb: data.suburb,
          // phoneNumber: data.phoneNumber,
          state: data.state,
          postCode: data.postcode,
          idImageFront: selectedDocumentFront,
          idImageBack: selectedDocumentBack,
          idType: data.idType,
          idNumber: data.idNumber,
        }).reduce((acc, [key, value]) => {
          if (value !== null && value !== undefined && value !== "") {
            acc[key] = value;
          }
          return acc;
        }, {});
        url = "customer/update";
      }

      await authInstance.patch(url, submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setIsProfileUpdatedSuccessfully(true);
      setIsFormModalShown(true);
      setIsEditingEnabled(true);
    } catch (error: any) {
      console.log(error);
      setEditProfileError("Something went wrong, please try again");
    }
  };

  const handleChangeProfilePicture = () => {
    setIsEditingProfilePicture({ isEditing: true, image: null });
    setIsFormModalShown(true);
  };

  const handleChangeFront = () => {
    if (!isDocumentEditable && userDetails.idImageFront) {
      return; // Prevent changes if not editable and document exists
    }
    setIsEditingImageFront(true);
    setIsEditingImageBack(false);
    setIsFormModalShown(true);
  };

  const handleChangeBack = () => {
    if (!isDocumentEditable && userDetails.idImageBack) {
      return; // Prevent changes if not editable and document exists
    }
    setIsEditingImageBack(true);
    setIsEditingImageFront(false);
    setIsFormModalShown(true);
  };

  return (
    <main className="container py-8 lg:py-16">
      <h5 className="text-2xl font-bold mb-4">Edit your information details</h5>
      {/* <hr/> */}
      <hr className="border-t border-gray-700 my-4" />
      {userDetails && (
        <Notice
          role={isServiceProvider ? "SERVICE_PROVIDER" : "USER"}
          verificationStatus={userDetails.verificationStatus}
        />
      )}
      <section className="relative lg:grid lg:grid-cols-12 lg:items-start lg:gap-6">
        <EditProfileModal
          setIsFormModalShown={setIsFormModalShown}
          setDocumentImageFront={setDocumentImageFront}
          setDocumentImageBack={setDocumentImageBack}
          isFormModalShown={isFormModalShown}
          isEditingProfilePicture={isEditingProfilePicture}
          setisEditingProfilePicture={setIsEditingProfilePicture}
          isEditingImageFront={isEditingImageFront}
          setisEditingImageFront={setIsEditingImageFront}
          isEditingImageBack={isEditingImageBack}
          setisEditingImageBack={setIsEditingImageBack}
          isProfileUpdatedSuccessfully={isProfileUpdatedSuccessfully}
          setIsProfileUpdatedSuccessfully={setIsProfileUpdatedSuccessfully}
          setSelectedDocumentFront={setSelectedDocumentFront}
          setSelectedDocumentBack={setSelectedDocumentBack}
          setDocumentImage={setDocumentImage}
          handleRedirect={handleRedirect}
        />

        {/* Profile Image Section */}
        <section className="col-span-3 flex flex-col items-center justify-center gap-1 pb-8">
          <button
            className="relative mx-auto size-32 rounded-full hover:shadow-md"
            onClick={handleChangeProfilePicture}
          >
            <span className="absolute right-3 top-[80%] z-20 rounded-full bg-[#EBE9F4] p-1 text-violet-normal">
              <BiCamera className="size-5" />
            </span>
            <Image
              src={
                userProfile.profile?.profileImage ??
                "/assets/images/serviceProvider/user.jpg"
              }
              alt="User profile picture"
              width={100}
              height={100}
              className="size-32 h-full w-full rounded-full object-cover"
            />
          </button>
          <h2 className="text-xl font-bold text-slate-900">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="font-medium text-slate-500">
            {user?.address?.state} Australia
          </p>
          <button
            // onClick={() => setIsEditingEnabled((prev) => !prev)}
            onClick={handleChangeProfilePicture}
            className="rounded-full bg-violet-normal px-4 py-2 text-sm text-white transition-all duration-300 hover:opacity-90"
          >
            {/* {isEditingEnabled ? "Editing ..." : "Edit Profile Picture"} */}
            Edit Profile Picture
          </button>
        </section>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit(handleSubmitUserData)}
          className="col-span-9 space-y-10 lg:space-y-12"
        >
          {/* Personal Information */}
          <section className="flex flex-col gap-8">
            <h3 className="text-lg font-bold text-primary">
              Personal Information
            </h3>
            <div className="flex flex-wrap justify-between gap-6 lg:col-span-8 lg:grid lg:grid-cols-2">
              <FormField
                label="First Name"
                name="firstName"
                register={register}
                errors={errors}
                watch={watch}
                disabled
              />
              <FormField
                label="Last Name"
                name="lastName"
                register={register}
                errors={errors}
                watch={watch}
                disabled
              />

              <div className="w-full flex flex-col gap-4">
                <label htmlFor="dob">Date of Birth</label>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  rules={{ required: "Date of Birth is required" }}
                  render={({ field }) => (
                    <Calendar
                      {...field}
                      id="dob"
                      dateFormat="dd/mm/yy"
                      showIcon
                      placeholder="DD/MM/YYYY"
                      maxDate={new Date(new Date().setFullYear(new Date().getFullYear() - 19))}
                      className="p-inputtext border w-full lg:max-w-sm border-slate-100 rounded-xl shadow hover:shadow-md"
                    />
                  )}
                />
                {dateOfBirth && dateOfBirth > maxDate && (
                  <small className="text-red-500">You must be at least 18 years old</small>
                )}
              </div>
            </div>
          </section>

          {/* Bio Section (for Service Providers) */}
          {isServiceProvider && (
            <section>
              <label className="flex w-full flex-col gap-3 text-violet-normal">
                <span className="flex items-center justify-between">
                  <span>Bio Description</span>
                  {!errors.bio && watchField.bio && (
                    <BiCheck className="size-5 rounded-full bg-green-500 p-1 text-white" />
                  )}
                </span>
                <textarea
                  {...register("bio")}
                  disabled={!isEditingEnabled}
                  className="min-h-32 w-full rounded-xl border border-slate-100 p-2 text-slate-700 shadow outline-none transition-shadow duration-300 hover:shadow-md"
                />
              </label>
            </section>
          )}

          {/* Contact Information */}
          <section className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-primary">
              Contact Information
            </h3>
            <div className="flex flex-wrap gap-6 lg:col-span-8 lg:grid lg:grid-cols-2">
              {/* Phone number */}
              {/* <label className="flex w-full flex-col gap-3 text-violet-normal">
              <span className="flex items-center justify-between">
                <span>Phone Number</span>
                <BiCheck className="size-5 rounded-full bg-green-500 p-1 text-white" />
              </span>
              <input
                type="text"
                className="rounded-xl border border-slate-100 p-2 text-slate-700 shadow outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm"
                value={user?.phoneNumber}
                readOnly
                disabled
              />
            </label> */}
              {/* Email Address */}
              <label className="flex w-full flex-col gap-3 text-violet-normal">
                <span className="flex items-center justify-between">
                  <span>Email Address</span>
                  <BiCheck className="size-5 rounded-full bg-green-500 p-1 text-white" />
                </span>
                <input
                  type="text"
                  className="rounded-xl border border-slate-100 p-2 text-slate-700 shadow outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm"
                  value={user?.emailAddress}
                  readOnly
                  disabled
                />
              </label>
            </div>
          </section>

          {/* <Controller
            name="emailAddress"
            control={control}
            defaultValue={user?.emailAddress} // Ensure it's prefilled
            render={({ field }) => (
              <input {...field} disabled className="your-input-styles" />
            )}
          /> */}

          {/* Address Information */}
          <section className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-primary">
              Address Information
            </h3>
            <div className="flex flex-wrap gap-6 lg:col-span-8 lg:grid lg:grid-cols-2">
              <FormField
                label="Postal Code"
                name="postcode"
                watch={watch}
                register={register}
                errors={errors}
                watchField={watchField}
                disabled={!isEditingEnabled || !!userDetails.postalCode}
              />
              <Controller
                name="suburb"
                control={control}
                render={({ field }) => (
                  <div className="flex w-full flex-col gap-3 text-violet-normal">
                    <label
                      htmlFor="suburb"
                      className="flex items-center justify-between"
                    >
                      <span>Suburb</span>
                      {!errors.suburb && field.value && (
                        <BiCheck className="size-5 rounded-full bg-green-500 p-1 text-white" />
                      )}
                    </label>
                    <select
                      {...field}
                      className="rounded-xl border border-slate-100 p-2 py-2.5 text-slate-700 shadow outline-none transition-shadow duration-300 hover:shadow-md"
                      disabled={
                        !isEditingEnabled ||
                        suburbList.length === 0 ||
                        !!userDetails.suburbs
                      }
                    >
                      {suburbList.map((item) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              />
              <FormField
                label="State"
                name="state"
                watch={watch}
                register={register}
                errors={errors}
                watchField={watchField}
                disabled={true}
              />
            </div>
          </section>

          {/* Bio Section (for Service Providers) */}
          {isServiceProvider && (
            <section className="space-y-3">
              <h3 className="mb-5 text-lg font-bold text-primary">
                Verification Information
              </h3>
              <div
                className="flex flex-wrap gap-6 lg:col-span-8 lg:grid lg:grid-cols-2"
                ref={ABNInputRef}
              >
                <FormField
                  label="ABN"
                  name="abn"
                  register={register}
                  errors={errors}
                  watch={watch}
                  watchField={watchField}
                  disabled={!isEditingEnabled || !!userDetails.abn}
                  minLength={9}
                />
              </div>
              {!isValidABN && !userDetails.abn && ABNError && (
                <div className="text-red-500 ">{ABNError}</div>
              )}
              <p className="font-satoshiMedium text-[13px] text-primary">
                Don&apos;t have an ABN? Register easily{" "}
                <a
                  href="https://abnregistration.com.au/?gad_source=1&gclid=Cj0KCQiAwOe8BhCCARIsAGKeD56r4GB5_V_8FDRDVFuKTdv8LYcmwJfIXBC8F99xy66smfnnl6lps1waAqGhEALw_wcB"
                  target="_blank"
                  className="underline"
                >
                  here.
                </a>
              </p>
            </section>
          )}

          {/* Identification Document */}
          <section className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-primary">
              Identification Document
            </h3>

            <div className="flex flex-col gap-6 lg:col-span-8 lg:gap-8">
              <div className="flex flex-wrap gap-6 lg:grid lg:grid-cols-2 lg:gap-8">
                {/* ID Type Select */}
                <div className="flex w-full flex-col gap-2.5">
                  <label
                    htmlFor="idType"
                    className="flex w-full items-center justify-between"
                  >
                    <span>Choose a valid means of ID</span>
                    {!errors.idType && watchField.idType && (
                      <BiCheck className="size-5 rounded-full bg-green-500 p-1 text-white" />
                    )}
                  </label>
                  <select
                    {...register("idType")}
                    className="w-full rounded-xl border border-slate-100 px-2 py-2.5 text-slate-700 shadow outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm"
                    disabled={ !isEditingEnabled || !isDocumentEditable}
                  >
                    {idTypeObject.map((item) => (
                      <option key={item.label} value={item.label}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ID Number Field */}
                <FormField
                  label={
                    watchField.idType
                      ? `${watchField.idType} Number`
                      : "Select ID Type"
                  }
                  name="idNumber"
                  watch={watch}
                  register={register}
                  errors={errors}
                  watchField={watchField}
                  disabled={!isEditingEnabled || !isDocumentEditable}
                  maxLength={12}
                />
              </div>

              {/* Upload Identification Document */}
              <div className="flex w-full flex-col gap-3 text-violet-normal">
                <label className="flex items-center justify-between">
                  <span>Means of ID</span>
                  {(documentImageFront || watchField.idImageFront) && (
                    <BiCheck className="size-5 rounded-full bg-green-500 p-1 text-white" />
                  )}
                </label>
                <div className="flex w-full gap-5">
                  {/* Front View */}
                  <div>
                    {documentImageFront ||
                    watchField.idImageFront ||
                    !isDocumentEditable ? (
                      <button
                        type="button"
                        className="flex items-end justify-center space-x-2"
                        onClick={handleChangeFront}
                        disabled={!isDocumentEditable}
                      >
                        <Image
                          src={
                            documentImageFront ??
                            watchField.idImageFront ??
                            userDetails.idImageFront ??
                            ""
                          }
                          alt="Captured or Selected"
                          width={300}
                          height={300}
                          className="rounded-xl"
                        />
                      </button>
                    ) : (
                      <button
                        type="button"
                        style={{
                          borderColor:
                            userDetails.verificationStatus === "NOT_VERIFIED"
                              ? "#F45757"
                              : "#64748b",
                        }}
                        className="flex h-48 w-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4"
                        onClick={handleChangeFront}
                        disabled={!isDocumentEditable}
                      >
                        <PiFileArrowDownDuotone className="text-2xl text-tc-gray" />
                        <span className="text-center text-tc-gray">
                          Choose a File{" "}
                          <span className="font-clashSemiBold text-[#381F8C]">
                            <br />
                            Front View
                            <br />
                          </span>{" "}
                          Upload supports: JPG, PNG.
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Back View */}
                  {watchField.idType !== "International Passport" && (
                    <div>
                      {documentImageBack ||
                      watchField.idImageBack ||
                      !isDocumentEditable ? (
                        <button
                          type="button"
                          className="flex items-end justify-center space-x-2"
                          onClick={handleChangeBack}
                          disabled={!isDocumentEditable}
                        >
                          <Image
                            src={
                              documentImageBack ?? watchField.idImageBack ?? ""
                            }
                            alt="Captured or Selected"
                            width={300}
                            height={300}
                            className="rounded-xl"
                          />
                        </button>
                      ) : (
                        <button
                          type="button"
                          style={{
                            borderColor:
                              userDetails.verificationStatus === "NOT_VERIFIED"
                                ? "#F45757"
                                : "#64748b",
                          }}
                          className="flex h-48 w-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4"
                          onClick={handleChangeBack}
                          disabled={!isDocumentEditable}
                        >
                          <PiFileArrowDownDuotone className="text-2xl text-tc-gray" />
                          <span className="text-center text-tc-gray">
                            Choose a File{" "}
                            <span className="font-clashSemiBold text-[#381F8C]">
                              <br />
                              Back View
                              <br />
                            </span>{" "}
                            Upload supports: JPG, PNG.
                          </span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {error && (
            <div className="my-1 text-end text-base font-semibold text-status-error-100 lg:px-24">
              {error}
            </div>
          )}

          {editProfileError && (
            <div className="my-1 text-left text-base font-semibold text-status-error-100 lg:px-24 lg:text-end">
              {editProfileError}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex lg:items-end lg:justify-end lg:px-24">
            <Button
              type="submit"
              className="w-fit rounded-full border border-violet-normal bg-violet-light px-6 py-3 font-satoshiBold font-bold text-violet-normal transition-all duration-300 hover:bg-violet-200 hover:shadow-md"
              disabled={!isEditingEnabled}
              loading={isSubmitting}
            >
              Save and Continue
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default EditProfile;
