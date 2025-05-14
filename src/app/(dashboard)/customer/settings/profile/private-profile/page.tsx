"use client";
import { FiAlertOctagon } from "react-icons/fi";
import PhoneInput from "react-phone-number-input/react-hook-form";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateProfileSchema, updateProfileSchema } from "./schema";
import { isValidPhoneNumber } from "react-phone-number-input";
import { getImageUrl } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/global/Button";
import { Calendar } from "primereact/calendar";
import "react-phone-number-input/style.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import useAxios from "@/hooks/useAxios";
import { RootState } from "@/store";
import { setBreadCrumbs } from "@/store/Features/breadcrumbs";
import useUserProfileData from "@/hooks/useUserProfileData";
import { formatDateAsYYYYMMDD } from "@/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PiSealCheckFill } from "react-icons/pi";
import Popup from "@/components/global/Popup/PopupTwo";
import { useGetCustomerProfileQuery } from "@/services/user-profile";

const idTypes: { label: string; value: string }[] = [
  { label: "Medicare Card", value: "MEDICARE_CARD" },
  { label: "International Passport", value: "INTERNATIONAL_PASSPORT" },
  { label: "Photo ID", value: "PHOTO_ID" },
  { label: "Driver's License", value: "DRIVERS_LICENSE" },
];

function VerificationStatus({ status }: { status: string }) {
  if (status == null) return null;
  const colors = {
    VERIFIED: { background: "#EAFFF7", button: "#0CB977", text: "Sucessful" },
    PENDING: { background: "#F4ECE1", button: "#E58C06", text: "Pending" },
    NOT_VERIFIED: { background: "#FFF0F0", button: "#B70F0F", text: "Failed" },
  };
  return (
    <div
      style={{ backgroundColor: colors[status].background }}
      className="rounded-xl p-2 px-5"
    >
      <p className="mb-1 text-sm font-semibold">ID Verification</p>
      <span
        style={{ backgroundColor: colors[status].button }}
        className="mx-auto block rounded-full px-3 py-1 text-center text-xs text-white"
      >
        {colors[status].text}
      </span>
    </div>
  );
}

function Page() {
  const [value, setValue] = useState("");
  const frontImageInputRef = useRef<HTMLInputElement>(null);
  const backImageInputRef = useRef<HTMLInputElement>(null);
  const { profile } = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState("");
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const { data: userProfileData } = useGetCustomerProfileQuery();

  useEffect(() => {
    dispatch(
      setBreadCrumbs({
        header: "Private Profile",
        links: [
          { url: "/customer/settings/profile", text: "Profile" },
          {
            url: "/customer/settings/profile/private-profile",
            text: "Private profile",
          },
        ],
      }),
    );
  }, []);

  const methods = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      phoneNumber: profile?.phoneNumber,
      idType: userProfileData?.idType
    },
  });

  const {
    watch,
    control,
    register,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
    setValue: setFormValue,
  } = methods;

  useEffect(() => {
    if (profile) {
      reset({
        phoneNumber: profile.phoneNumber || "",
        email: profile.emailAddress,
      });
      setValue(profile.phoneNumber);
    }
  }, [profile]);

  useEffect(() => {
    if (userProfileData) {
      setFormValue("dateOfBirth", new Date(userProfileData?.dateOfBirth));

      //@ts-ignore
      setFormValue("idType", userProfileData.idType);
      setFormValue("idNumber", userProfileData.idNumber);
    }
  }, [userProfileData]);

  const selectedIdType = watch("idType");
  const imageFront = watch("idImageFront");
  const imageBack = watch("idImageBack");

  //Delete imageIdBackPicture when idType is set to international passport
  useEffect(() => {
    if (selectedIdType == "INTERNATIONAL_PASSPORT") {
      setFormValue("idImageBack", undefined);
      clearErrors("idImageBack");
    }
  }, [selectedIdType]);

  const authInstance = useAxios();

  const onSubmit: SubmitHandler<UpdateProfileSchema> = async (data) => {
    setError("");
    if (userProfileData.idImageFront) clearErrors("idImageFront");
    if (userProfileData.idImageBack) clearErrors("idImageBack");

    const { idImageFront, idImageBack } = data;
    const submitData = {
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      dateOfBirth: formatDateAsYYYYMMDD(data.dateOfBirth as Date),
      phoneNumber: data.phoneNumber,
      idType: data.idType,
      idNumber: data.idNumber,
      ...(idImageFront ? { idImageFront } : {}),
      ...(idImageBack ? { idImageBack } : {}),
    };

    try {
      await authInstance.patch("/customer/update", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setOpenSuccessModal(true);
    } catch (error) {
      console.error(error);
      setError("Something went wrong, please try again");
    }
  };

  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  );
  return (
    <>
      <div className="flex-grow space-y-2 rounded-xl">
        <header>
          <h3 className="mb-3 hidden text-sm font-semibold text-[#140B31] sm:block">
            Update profile information
          </h3>
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
            <div className="flex w-full flex-grow gap-2 rounded-xl border-[#C4BFD4] bg-[#EBE9F4] p-2 sm:w-max sm:border sm:bg-white">
              <FiAlertOctagon
                className="mt-1 rotate-180 scale-x-[-1]"
                color="#381F8C"
              />
              <div className="">
                <p className="font-semibold text-primary">Take note champ!</p>
                <p className="text-sm text-[#546276]">
                  Your personal details are not visible on your public profile.
                </p>
              </div>
            </div>

            {/* Verification status  */}
            <VerificationStatus status={userProfileData?.verificationStatus} />
            {/* <div className="rounded-xl bg-[#F4ECE1] p-2 px-5">
              <p className="mb-1 text-sm font-semibold">ID Verification</p>
              <span className="mx-auto block rounded-full bg-[#E58C06] px-3 py-1 text-center text-xs text-white">
                Pending
              </span>
            </div> */}
          </div>
        </header>

        <form className="pb-2" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="mb-3 space-y-5 rounded-2xl bg-white p-3 sm:bg-[#EBE9F4] sm:p-4">
            <div className="flex flex-col gap-2 sm:flex-row">
              {/* Date of birth Input  */}
              <Controller
                name="dateOfBirth"
                control={methods.control}
                rules={{ required: "You must enter your age" }}
                render={({ field }) => {
                  return (
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-1 block text-sm text-[#4E5158]"
                        htmlFor="date-of-birth"
                      >
                        Date of birth
                      </label>
                      <div className="overflow-hidden rounded-xl bg-white px-3 shadow-md">
                        <Calendar
                          className="h-10 w-full bg-white"
                          inputClassName=""
                          inputId="date-of-birth"
                          value={field.value ? new Date(field.value) : maxDate}
                          dateFormat="dd/mm/yy"
                          placeholder="DD/MM/YYYY"
                          maxDate={maxDate}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                        />
                      </div>
                      {errors.dateOfBirth && (
                        <p className="w-full text-sm font-medium text-red-500">
                          {errors.dateOfBirth.message}
                        </p>
                      )}
                    </div>
                  );
                }}
              />

              {/* Phone number input  */}
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-1 block text-sm text-[#4E5158]"
                  htmlFor="phone-number"
                >
                  Phone number
                </label>

                <PhoneInput
                  id="phone-number"
                  name="phoneNumber"
                  defaultCountry="AU"
                  control={control}
                  placeholder="Enter phone number"
                  defaultValue={(profile?.phoneNumber as unknown as any) || ""}
                  // value={profile?.phoneNumber || ""}
                  international
                  countryCallingCodeEditable={false}
                  country="AU"
                  countrySelectProps={{ disabled: true }}
                  // @ts-ignore
                  onChange={(e) => setValue(e as string)}
                  rules={{ required: true, validate: isValidPhoneNumber }}
                  className="phone-input h-10 appearance-none rounded-xl bg-white p-2 px-3 shadow-md"
                />
                {errors.phoneNumber && (
                  <p className="w-full text-sm font-medium text-red-500">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#4E5158]" htmlFor="email">
                Email
              </label>
              {/* <div className="mb-1 text-xs text-[#878C97]">
                Click{" "}
                <Link href="#" className="text-primary">
                  here
                </Link>{" "}
                to change
              </div> */}
              <input
                id="email"
                type="email"
                className="w-full rounded-xl p-2 px-2 shadow-md outline-none disabled:bg-white sm:shadow-none"
                placeholder="johndoe@gmail.com"
                disabled
                {...register("email")}
              />
            </div>

            {/* Type of identity document and abn */}
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:gap-2">
              <div className="w-full sm:w-1/2">
                <div className="w-full">
                  <label
                    htmlFor="document-type"
                    className="mb-1 block text-sm text-[#4E5158]"
                  >
                    Type of identity document
                  </label>
                  <select
                    id="document-type"
                    className="w-full rounded-xl p-2 px-2 shadow-md outline-none disabled:bg-white sm:shadow-none"
                    {...register("idType")}
                    disabled={
                      userProfileData?.verificationStatus === "PENDING" ||
                      userProfileData?.verificationStatus == "VERIFIED"
                    }
                  >
                    <option value="" disabled>
                      {userProfileData?.idType || "Select ID type"}
                    </option>
                    {idTypes.map((idType) => (
                      <option value={idType.value} key={idType.label}>
                        {idType.label}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.idType && (
                  <p className="w-full text-sm font-medium text-red-500">
                    {errors.idType.message}
                  </p>
                )}
              </div>

              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="id-number"
                  className="mb-1 block text-sm text-[#4E5158]"
                >
                  {selectedIdType
                    ? `${
                        idTypes.find(
                          (idType) => idType.value === selectedIdType,
                        )?.label
                      } number`
                    : "ID number"}
                </label>
                <input
                  id="id-number"
                  type="text"
                  className="w-full rounded-xl p-2 px-2 shadow-md outline-none disabled:bg-white sm:shadow-none"
                  placeholder="123456789"
                  disabled={
                    userProfileData?.verificationStatus === "PENDING" ||
                    userProfileData?.verificationStatus == "VERIFIED"
                  }
                  {...register("idNumber", {
                    value: userProfileData?.idNUmber,
                  })}
                />
                {errors.idNumber && (
                  <p className="w-full text-sm font-medium text-red-500">
                    {errors.idNumber.message}
                  </p>
                )}
              </div>
            </div>

            {/* Upload document  */}
            <div>
              <h4 className="mb-1 text-sm font-medium text-[#4E5158]">
                Upload Verification ID
              </h4>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="w-full sm:w-1/2">
                  <div
                    className="h-36 w-full cursor-pointer overflow-hidden rounded-lg border border-dashed border-[#ADA8BB]"
                    onClick={() => frontImageInputRef.current?.click()}
                  >
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      ref={frontImageInputRef}
                      disabled={
                        userProfileData?.verificationStatus === "PENDING" ||
                        userProfileData?.verificationStatus == "VERIFIED"
                      }
                      onChange={(e) => {
                        clearErrors("idImageFront");
                        setFormValue("idImageFront", e.target.files?.[0], {
                          shouldValidate: true,
                        });
                      }}
                    />
                    {getImageUrl(imageFront) ||
                    userProfileData?.idImageFront ? (
                      <Image
                        src={
                          getImageUrl(imageFront) ||
                          userProfileData?.idImageFront
                        }
                        alt="Front of image ID"
                        className="h-full w-full object-cover"
                        width={400}
                        height={200}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-1 py-7">
                        <HiOutlineDocumentArrowUp color="#11111180" size={25} />
                        <p className="text-[#00000080]">Choose a File</p>
                        {selectedIdType !== "INTERNATIONAL_PASSPORT" && (
                          <p className="font-clashSemiBold text-primary">
                            Front view
                          </p>
                        )}
                        <span className="text-xs text-[#0000004D]">
                          Upload supports: JPG, PDF, PNG.
                        </span>
                      </div>
                    )}
                  </div>
                  {errors.idImageFront && (
                    <p className="w-full text-sm font-medium text-red-500">
                      {errors.idImageFront.message?.toString()}
                    </p>
                  )}
                </div>

                {selectedIdType !== "INTERNATIONAL_PASSPORT" && (
                  <div className=" w-full sm:w-1/2">
                    <div
                      className="h-36 w-full cursor-pointer overflow-hidden rounded-lg border border-dashed border-[#ADA8BB]"
                      onClick={() => backImageInputRef.current?.click()}
                    >
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        ref={backImageInputRef}
                        disabled={
                          userProfileData?.verificationStatus === "PENDING" ||
                          userProfileData?.verificationStatus == "VERIFIED"
                        }
                        onChange={(e) => {
                          clearErrors("idImageBack");
                          setFormValue("idImageBack", e.target.files?.[0], {
                            shouldValidate: true,
                          });
                        }}
                      />
                      {getImageUrl(imageBack) ||
                      userProfileData?.idImageBack ? (
                        <Image
                          width={400}
                          height={200}
                          src={
                            getImageUrl(imageBack) ||
                            userProfileData.idImageBack
                          }
                          alt="Back of image ID"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-1 py-7">
                          <HiOutlineDocumentArrowUp
                            color="#11111180"
                            size={25}
                          />
                          <p className="text-[#00000080]">Choose a File</p>
                          <p className="font-clashSemiBold text-primary">
                            Back view
                          </p>
                          <span className="text-xs text-[#0000004D]">
                            Upload supports: JPG, PDF, PNG.
                          </span>
                        </div>
                      )}
                    </div>
                    {errors.idImageBack && (
                      <p className="w-full text-sm font-medium text-red-500">
                        {errors.idImageBack.message?.toString()}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {error && (
            <p className="mb-3 font-semibold text-status-error-100">{error}</p>
          )}

          <Button
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
            className="w-full rounded-full bg-primary px-7 py-3 font-medium text-white sm:w-max"
          >
            Save changes
          </Button>
        </form>
      </div>
      <Popup
        isOpen={openSuccessModal}
        onClose={() => setOpenSuccessModal(false)}
      >
        <div className="relative mt-10 max-h-[750px] min-w-[320px] max-w-[750px] bg-white p-3 px-4 sm:mt-7 sm:min-w-[560px]">
          <div className=" flex flex-col items-center justify-center gap-4 pb-4">
            <div className="flex size-20 items-center justify-center rounded-full bg-[#C1F6C3] bg-opacity-60">
              <div className=" flex size-14 items-center justify-center rounded-full bg-[#A6F8AA] p-2">
                <PiSealCheckFill className="size-10 text-green-500" />
              </div>
            </div>
            <p className="text-center font-satoshiBold text-2xl font-extrabold text-violet-normal">
              Request Sent!
            </p>
            <p className="text-center font-semibold text-violet-darker">
              Your profile has been updated successfully
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setOpenSuccessModal(false)}
                className="rounded-full bg-violet-active px-4 py-2 font-bold text-violet-dark max-sm:text-sm"
              >
                Close
              </button>
              <button
                onClick={() => router.push("/marketplace")}
                className="rounded-full bg-violet-normal px-4 py-2 font-bold text-white max-sm:text-sm"
              >
                Proceed to marketplace
              </button>
            </div>
          </div>
        </div>
      </Popup>
    </>
  );
}

export default Page;
