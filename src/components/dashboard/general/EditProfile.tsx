"use client";

import { useEffect, useState } from "react";
import { useForm, Controller, UseFormRegister, FieldErrors, UseFormWatch, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { BeatLoader } from "react-spinners";
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


const userDataSchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  dateOfBirth: z.date().nullable().optional(),
  phoneNumber: z.string().optional(),
  emailAddress: z.string().email().optional(),
  postcode: z.string().optional(),
  suburb: z.string().optional(),
  state: z.string().optional(),
  idType: z.string().optional().nullable(),
  abn: z.string().nullable().optional(),
  idNumber: z.string().optional(),
  bio: z.string().nullable().optional(),
  idImageFront: z.string().nullable().optional(),
  idImageBack: z.string().nullable().optional(),
});

const idTypeObject = [
  { label: "Medicare Card", value: "MEDICARE_CARD" },
  { label: "International Passport", value: "INTERNATIONAL_PASSPORT" },
  { label: "Photo ID", value: "PHOTO_ID" },
  { label: "Driver's License", value: "DRIVERS_LICENSE" },
];

type UserDataType = z.infer<typeof userDataSchema>;

const EditProfile = () => {
  const [isEditingEnabled, setIsEditingEnabled] = useState(false);
  const [isFormModalShown, setIsFormModalShown] = useState(false);
  const [isEditingProfilePicture, setIsEditingProfilePicture] = useState({ isEditing: false, image: null as string | null });
  const [isEditingImageFront, setIsEditingImageFront] = useState<boolean>(false);
  const [isEditingImageBack, setIsEditingImageBack] = useState<boolean>(false);
  const [documentImageFront, setDocumentImageFront] = useState<string | null>(null);
  const [documentImageBack, setDocumentImageBack] = useState<string | null>(null);
  const [documentImage, setDocumentImage] = useState<string | null>(null);
  const [suburbList, setSuburbList] = useState<string[]>([]);
  const [selectedDocumentFront, setSelectedDocumentFront] = useState<File | null>(null);
  const [selectedDocumentBack, setSelectedDocumentBack] = useState<File | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<File | null>(null);
  const [isProfileUpdatedSuccessfully, setIsProfileUpdatedSuccessfully] = useState(false);
  const [error, setError] = useState("");
  const [err, setErr] = useState("");
  const [userDetails, setUserDetails] = useState(defaultUserDetails);

  const userProfile = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();

  const { data: session } = useSession();
  const user = session?.user?.user;
  const token = session?.user?.accessToken;
  const isServiceProvider = user?.roles[0] === "SERVICE_PROVIDER";
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const [isABNValid, setIsABNValid] = useState<boolean>(false);

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
      dateOfBirth: null,
      phoneNumber: "",
      emailAddress: "",
      postcode: "",
      suburb: "",
      state: "",
      idType: "",
      idNumber: "",
    abn: null,
      bio: "",
    },
  });

  const watchField = watch();
  const watchABN = watch("abn");

  useEffect(() => {
    const validateABN = async () => {
      if (watchABN) {
        try {
          const url = `${process.env.NEXT_PUBLIC_API_URL}/service_provider/abn/validate/${watchABN}`;
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          if (response.data) {
            setIsABNValid(true);
          }
        } catch (error) {
          console.error("Error validating ABN:", error);
          setIsABNValid(false);
          setErr('Please enter a valid 11-digit ABN.')
        }
      } else {
        setIsABNValid(false);
        
      }
    };
    const debounceValidation = setTimeout(() => {
      validateABN();
    }, 500);

    return () => clearTimeout(debounceValidation);
  }, [watchABN, token]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/${isServiceProvider ? 'service_provider' : 'customer'}/profile`;
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setUserDetails(data);
        reset({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
          phoneNumber: data.phoneNumber || "",
          emailAddress: data.emailAddress || "",
          postcode: data.postalCode || "",
          suburb: data.suburbs || "",
          state: data.state || "",
          idType: idTypeObject.find((item) => item.value === data.idType)?.label || "",
          idNumber: data.idNumber || "",
          idImageFront: data.idImageFront || "",
          idImageBack: data.idImageBack || "",
          bio: isServiceProvider ? data.bio || "" : "No Bio needed for customer",
          abn: isServiceProvider ? data.abn || "" : "No ABN needed for customer",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setErr("Failed to load user data. Please try again.");
      }
    };

    fetchUserData();
  }, [token, isServiceProvider, dispatch, reset]);

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
        const url = `${process.env.NEXT_PUBLIC_API_URL}/util/locations/search?postcode=${watchPostcode}`;
        const { data } = await axios.get(url);

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

  const handleSubmitUserData: SubmitHandler<UserDataType> = async (data) => {
    try {
      let submitData: any;

      let url;
      if (isServiceProvider && isABNValid) {
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
        })
          .reduce((acc, [key, value]) => {
          if (value !== null && value !== undefined && value !== "") {
            // @ts-expect-error "type of key not know"
            acc[key] = value;
          }
          return acc;
        }, {});
        url =
          `${process.env.NEXT_PUBLIC_API_URL}/service_provider/update`;
      } else {
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
        })
          .reduce((acc, [key, value]) => {
          if (value !== null && value !== undefined && value !== "") {
            // @ts-expect-error "type of key not know"
            acc[key] = value;
          }
          return acc;
        }, {});
        url = `${process.env.NEXT_PUBLIC_API_URL}/customer/update`;
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
      console.log(submitData);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleChangeProfilePicture = () => {
    setIsEditingProfilePicture({ isEditing: true, image: null });
    setIsFormModalShown(true);
  };
  const handleChangeFront = () => {
    setIsEditingImageFront(true);
    setIsEditingImageBack(false);
    setIsFormModalShown(true);
  };
  const handleChangeBack = () => {
    setIsEditingImageBack(true);
    setIsEditingImageFront(false);
    setIsFormModalShown(true);
  };

  return (
    <main className="relative px-4 py-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-6 lg:py-16">
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
        handleRedirect = {handleRedirect}
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
            src={userProfile.profile?.profileImage ?? "/assets/images/serviceProvider/user.jpg"}
            alt=""
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
          onClick={() => setIsEditingEnabled((prev) => !prev)}
          className="rounded-full bg-violet-normal px-4 py-2 text-sm text-white transition-all duration-300 hover:opacity-90"
        >
          {isEditingEnabled ? "Editing ..." : "Edit Profile"}
        </button>
      </section>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit(handleSubmitUserData)}
        className="col-span-9 space-y-10 lg:space-y-12"
      >
        {/* Personal Information */}
        <section className="flex flex-col gap-8">
          <h3 className="text-lg font-bold text-primary">Personal Information</h3>
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
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field }) => (
                <div className="flex w-full flex-col gap-3 text-violet-normal">
                  <label htmlFor="dateOfBirth" className="flex items-center justify-between">
                    <span>Date of Birth</span>
                    {!errors.dateOfBirth && field.value && (
                      <BiCheck className="size-5 rounded-full bg-green-500 p-1 text-white" />
                    )}
                  </label>
                  <DatePicker
                    id="dateOfBirth"
                    selected={field.value || null} // Use null if there's no date
                    onChange={(date) => field.onChange(date ? date : '')}
                    disabled={!isEditingEnabled || !!userDetails.dateOfBirth} // Disable if date exists and not in editing mode
                    maxDate={new Date(new Date().setFullYear(new Date().getFullYear() - 18))}
                    className="w-full rounded-xl border border-slate-100 p-2 text-slate-700 shadow outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm"
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
              )}
            />
          </div>
        </section>

        {/* Bio Section (for Service Providers) */}
        {isServiceProvider && (
          <section>
            <h3 className="text-lg font-bold text-primary">Bio</h3>
            <FormField
              label="Bio Description"
              name="bio"
              register={register}
              watch={watch}
              errors={errors}
              watchField={watchField}
              disabled={!isEditingEnabled}
              as="textarea"
              className="min-h-32 w-full rounded-xl border border-slate-100 p-2 text-slate-700 shadow outline-none transition-shadow duration-300 hover:shadow-md"
            />
          </section>
        )}

        {/* Contact Information */}
        <section className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-primary">Contact Information</h3>
          <div className="flex flex-wrap gap-6 lg:col-span-8 lg:grid lg:grid-cols-2">
            {/* Phone number */}
            <label className="flex w-full flex-col gap-3 text-violet-normal">
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
            </label>
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

        {/* Address Information */}
        <section className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-primary">Address Information</h3>
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
                  <label htmlFor="suburb" className="flex items-center justify-between">
                    <span>Suburb</span>
                    {!errors.suburb && field.value && (
                      <BiCheck className="size-5 rounded-full bg-green-500 p-1 text-white" />
                    )}
                  </label>
                  <select
                    {...field}
                    className="rounded-xl border border-slate-100 p-2 py-2.5 text-slate-700 shadow outline-none transition-shadow duration-300 hover:shadow-md"
                    disabled={!isEditingEnabled || suburbList.length === 0 || !!userDetails.suburbs }
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
            <h3 className="text-lg font-bold text-primary mb-5">Verification Information</h3>
            <div className="flex flex-wrap gap-6 lg:col-span-8 lg:grid lg:grid-cols-2">
            <FormField
              label="ABN Number"
              name="abn"
              register={register}
              errors={errors}
                watch={watch}
                watchField = {watchField}
              disabled={!isEditingEnabled || !!userDetails.abn}
              minLength={11}
              />
            </div>
            {!isABNValid && !userDetails.abn && err && <div className="text-red-500 ">Please enter a valid 11-digit ABN.</div>}
          </section>
        )}

        {/* Identification Document */}
        <section className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-primary">Identification Document</h3>
          <div className="flex flex-col gap-6 lg:col-span-8 lg:gap-8">
            <div className="flex flex-wrap gap-6 lg:grid lg:grid-cols-2 lg:gap-8">

              {/* ID Type Select */}
              <div className="flex w-full flex-col gap-2.5">
                <label htmlFor="idType" className="flex w-full items-center justify-between">
                  <span>Choose a valid means of ID</span>
                  {!errors.idType && watchField.idType && (
                    <BiCheck className="size-5 rounded-full bg-green-500 p-1 text-white" />
                  )}
                </label>
                <select
                  {...register("idType")}
                  className="w-full rounded-xl border border-slate-100 px-2 py-2.5 text-slate-700 shadow outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm"
                  disabled={!isEditingEnabled || !!userDetails.idType}
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
                label={watchField.idType ? `${watchField.idType} Number` : "Select ID Type"}
                name="idNumber"
                watch={watch}
                register={register}
                errors={errors}
                watchField={watchField}
                disabled={!isEditingEnabled || !!userDetails.idNumber}
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
              <div className="flex gap-5 w-full">
                {/* Front View */}
                <div>
                  {documentImageFront || watchField.idImageFront ? (
                    <button
                      type="button"
                      className="flex items-end justify-center space-x-2"
                      onClick={handleChangeFront}
                      disabled={!isEditingEnabled || !!userDetails.idImageFront}
                    >
                      <Image
                        src={documentImageFront ?? watchField.idImageFront ?? userDetails.idImageFront ?? ""}
                        alt="Captured or Selected"
                        width={300}
                        height={300}
                        className="rounded-xl"
                      />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="flex h-48 w-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-500 p-4"
                      onClick={handleChangeFront}
                      disabled={!isEditingEnabled}
                    >
                      <PiFileArrowDownDuotone className="text-2xl text-tc-gray" />
                      <span className="text-center text-tc-gray">
                        Choose a File <span className="text-[#381F8C] font-clashSemiBold"><br />Front View<br /></span> Upload supports: JPG, PDF, PNG.
                      </span>
                    </button>
                  )}
                </div>

                {/* Back View */}
                {watchField.idType !== 'International Passport' && (
                  <div>
                    {documentImageBack || watchField.idImageBack ? (
                      <button
                        type="button"
                        className="flex items-end justify-center space-x-2"
                        onClick={handleChangeBack}
                        disabled={!isEditingEnabled || !!userDetails.idImageBack}
                      >
                        <Image
                          src={documentImageBack ?? watchField.idImageBack ?? ""}
                          alt="Captured or Selected"
                          width={300}
                          height={300}
                          className="rounded-xl"
                        />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="flex h-48 w-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-500 p-4"
                        onClick={handleChangeBack}
                        disabled={!isEditingEnabled}
                      >
                        <PiFileArrowDownDuotone className="text-2xl text-tc-gray" />
                        <span className="text-center text-tc-gray">
                          Choose a File <span className="text-[#381F8C] font-clashSemiBold"><br />Back View<br /></span> Upload supports: JPG, PDF, PNG.
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
          <div className="my-1 text-base text-end lg:px-24 font-semibold text-status-error-100">
            {error}
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
    </main>
  );
};

interface FormFieldProps {
  label: string;
  name: keyof UserDataType;
  register: UseFormRegister<UserDataType>;
  errors: FieldErrors<UserDataType>;
  watch: UseFormWatch<UserDataType>;
  disabled: boolean;
  readonly?: boolean;
  as?: 'input' | 'textarea';
  defaultValue?: string
  [key: string]: any;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  register,
  errors,
  watch,
  disabled,
  readonly = false,
  as = "input",
  defaultValue,
  ...props
}) => {
  const watchedValue = watch(name);

  return (
    <label className="flex w-full flex-col gap-3 text-violet-normal">
      <span className="flex items-center justify-between">
        <span>{label}</span>
        {!errors[name] && watchedValue && String(watchedValue).length >= 2 && (
          <BiCheck className="size-5 rounded-full bg-green-500 p-1 text-white" />
        )}
      </span>
      {as === "input" ? (
        <input
          type="text"
          disabled={disabled}
          readOnly={readonly}
          className="rounded-xl border border-slate-100 p-2 text-slate-700 shadow outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm"
          {...register(name)}
          defaultValue={defaultValue}
          {...props}
        />
      ) : (
        <textarea
          disabled={disabled}
          className="rounded-xl border border-slate-100 p-2 text-slate-700 shadow outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm"
          {...register(name)}
          {...props}
        />
      )}
    </label>
  );
};

export default EditProfile;