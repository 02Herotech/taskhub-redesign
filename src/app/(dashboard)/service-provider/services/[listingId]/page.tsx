"use client";
import AiDesciption from "@/components/AiGenerate/AiDescription";
import { typeData } from "@/data/marketplace/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler, Controller, set } from "react-hook-form";
import { BiChevronDown, BiX } from "react-icons/bi";
import { BsTriangle, BsTriangleFill } from "react-icons/bs";
import { PiFileArrowDownDuotone, PiSealCheckFill } from "react-icons/pi";
import { RiPencilLine } from "react-icons/ri";
import { BeatLoader } from "react-spinners";
import { z } from "zod";
import instance from "@/utils/axios.config";
import { instance as authInstance } from "@/utils/axiosInterceptor.config";

const daysData: string[] = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

const EditListing = () => {
  const [currentListing, setCurrentListing] = useState<ListingDataType>();
  const [showDropdown, setShowDropdown] = useState({
    name: "",
    isShown: false,
  });
  const [suburbList, setSuburbList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { listingId } = useParams();
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image3, setImage3] = useState<File | null>(null);
  const [image4, setImage4] = useState<File | null>(null);
  const image1Ref = useRef<HTMLInputElement>(null);
  const image2Ref = useRef<HTMLInputElement>(null);
  const image3Ref = useRef<HTMLInputElement>(null);
  const image4Ref = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState(false);

  const listingZodSchema = z.object({
    listingTitle: z
      .string()
      .min(3, "Minimum of 3 characters")
      .refine((str) => str.split(" ").filter(Boolean).length > 0, {
        message: `Title must have ${1} word or more`,
      }),
    listingDescription: z
      .string()
      .min(10, "Minimum of 10 characters")
      .refine((str) => str.split(" ").filter(Boolean).length >= 5, {
        message: `Description must have ${5} words or more`,
      }),
    // category: z.string(),
    // subCategory: z.string(),
    availableDays: z.array(z.string()),
    available: z.boolean(),
    taskType: z.string(),
    negotiable: z.boolean(),
    planOneDescription: z.string().min(1, "Please write a plan description"),
    planOnePrice: z.number(),
    planTwoDescription: z.string().nullable().optional(),
    planTwoPrice: z.string().nullable().optional(),
    planThreeDescription: z.string().nullable().optional(),
    planThreePrice: z.string().nullable().optional(),
    postcode: z.string().nullable().optional(),
    suburb: z.string().nullable().optional(),
    state: z.string().nullable().optional(),
    image1: z.string().optional(),
    image2: z.string().optional(),
    image3: z.string().optional(),
    image4: z.string().optional(),
  });
  // .refine(
  //   (data) => {
  //     // Check if planTwoDescription is not "", null, or undefined, and ensure planTwoPrice is provided
  //     if (
  //       data.planTwoDescription &&
  //       data.planTwoDescription.trim().length > 0 &&
  //       !data.planTwoPrice
  //     ) {
  //       return false;
  //     }

  //     // Check if planThreeDescription is not "", null, or undefined, and ensure planThreePrice is provided
  //     if (
  //       data.planThreeDescription &&
  //       data.planThreeDescription.trim().length > 0 &&
  //       !data.planThreePrice
  //     ) {
  //       return false;
  //     }

  //     return true;
  //   },
  //   {
  //     message: "Price is required if description is provided",
  //     path: ["planTwoPrice", "planThreePrice"], // This will show error on both fields
  //   },
  // );

  type listingZodType = z.infer<typeof listingZodSchema>;

  useEffect(() => {
    const fetchCurentListing = async () => {
      try {
        const { data } = await instance.get("listing/" + listingId);
        setCurrentListing(data);
      } catch (error: any) {
        console.log(error.response.data);
      }
    };

    fetchCurentListing();
  }, [listingId]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<listingZodType>({
    resolver: zodResolver(listingZodSchema),
  });

  useEffect(() => {
    if (currentListing) {
      reset({
        listingTitle: currentListing.listingTitle,
        // category: currentListing.category.categoryName,
        // subCategory: currentListing.subCategory.name,
        listingDescription: currentListing.listingDescription,
        availableDays: currentListing.availableDays,
        available: currentListing.available,
        taskType: currentListing.taskType,
        negotiable: currentListing.negotiable,
        planOneDescription: currentListing.planOneDescription,
        planOnePrice: currentListing.planOnePrice,
        planTwoDescription: currentListing.planTwoDescription,
        planTwoPrice: currentListing.planTwoPrice?.toString(),
        planThreeDescription: currentListing.planThreeDescription,
        planThreePrice: currentListing.planThreePrice?.toString(),
        postcode: currentListing.postCode,
        suburb: currentListing.suburb,
        state: currentListing.state,
        image1: currentListing.businessPictures[0],
        image2: currentListing.businessPictures[1],
        image3: currentListing.businessPictures[2],
        image4: currentListing.businessPictures[3],
      });
    }
    // eslint-disable-next-line
  }, [currentListing]);

  const watchField = watch();

  const expandDropdown = (name: string) => {
    if (name === showDropdown.name && showDropdown.isShown) {
      setShowDropdown((prev) => ({ ...prev, isShown: false }));
    } else {
      setShowDropdown((prev) => ({ ...prev, isShown: true, name }));
    }
  };

  const handleGetAvailableDays = () => {
    const selectedDays: string[] = watchField.availableDays;
    if (selectedDays) {
      return daysData.filter((day) => !selectedDays.includes(day));
    }
    return daysData;
  };

  useEffect(() => {
    if (watchField.taskType === typeData[0].value) {
      setValue("postcode", "");
      setValue("state", "");
      setValue("suburb", "");
    }
    // eslint-disable-next-line
  }, [watchField.taskType]);

  const handleFectchLocationByPostcode = async () => {
    try {
      const url = `util/locations/search?postcode=${watchField.postcode}`;
      const { data } = await instance.get(url);

      // Map suburbs from the Name field
      const suburbs = data.map((item: { Name: string }) => item.Name);
      setSuburbList(suburbs);

      // Only set the suburb if there isn't already a current suburb value
      // This preserves the existing suburb when editing
      if (!watchField.suburb && suburbs.length > 0) {
        // If no current suburb exists, then default to first in list
        setValue("suburb", suburbs[0]);
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

  useEffect(() => {
    if (watchField.postcode) handleFectchLocationByPostcode();
    // eslint-disable-next-line
  }, [watchField.postcode]);

  const watchImageArray = [
    watchField.image1,
    watchField.image2,
    watchField.image3,
    watchField.image4,
  ];

  const handleOnImageInputChange = ({
    event,
    index,
  }: {
    event: React.ChangeEvent<HTMLInputElement>;
    index: number;
  }) => {
    const imageFieldNames = ["image1", "image2", "image3", "image4"];
    const setImageFuncs = [setImage1, setImage2, setImage3, setImage4];
    const uploadFile = event.target.files?.[0];
    if (uploadFile) {
      const setImage = setImageFuncs[index - 1];
      setImage(uploadFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = reader.result as string;
        // @ts-expect-error "image type fix"
        setValue(imageFieldNames[index - 1], img);
      };
      reader.readAsDataURL(uploadFile);
    }
  };

  const imageRefs = [image1Ref, image2Ref, image3Ref, image4Ref];

  const handleClickImageButton = ({ index }: { index: number }) => {
    const imageRef = imageRefs[index - 1];
    imageRef?.current?.click();
  };

  const handleUpdateListing: SubmitHandler<listingZodType> = async (data) => {
    setErrorMessage("");
    const body = Object.entries({
      listingTitle: data.listingTitle,
      listingDescription: data.listingDescription,
      availableDays: data.availableDays,
      available: data.available,
      taskType: data.taskType,
      negotiable: data.negotiable,
      planOneDescription: data.planOneDescription,
      planOnePrice: data.planOnePrice,
      planTwoDescription: data.planTwoDescription,
      planTwoPrice: Number(data.planTwoPrice),
      planThreeDescription: data.planOneDescription,
      planThreePrice: Number(data.planThreePrice),
      suburb: data.suburb,
      state: data.state,
      postCode: data.postcode,
      image1,
      image2,
      image3,
      image4,
    }).reduce((acc, [key, value]) => {
      if (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        value !== 0
      ) {
        // @ts-expect-error "type of key not known"
        acc[key] = value;
      }
      return acc;
    }, {});
    try {
      const url = `listing/update-listing/` + listingId;
      await authInstance.patch(url, body, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setShowModal(true);
    } catch (error: any) {
      console.log(error.response.data);
      setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    const words = watchField?.listingTitle?.trim().split(/\s+/);
    const count = words?.filter((word) => word).length; // Filter out empty strings

    if (count > 10) {
      const trimmedValue = words.slice(0, 10).join(" ");
      setValue("listingTitle", trimmedValue);
    }

    const description = watchField?.listingDescription?.trim().split(/\s+/);
    const descCount = description?.filter((word) => word).length; // Filter out empty strings

    if (descCount > 50) {
      const trimmedValue = description.slice(0, 50).join(" ");
      setValue("listingDescription", trimmedValue);
    }

    const plan1 = watchField?.planOneDescription?.trim().split(/\s+/);
    const plan1Count = plan1?.filter((word) => word).length; // Filter out empty strings

    if (plan1Count > 50) {
      const trimmedValue = plan1.slice(0, 50).join(" ");
      setValue("planOneDescription", trimmedValue);
    }

    const plan2 = watchField?.planTwoDescription?.trim().split(/\s+/);
    const plan2Count = plan2?.filter((word) => word).length as number; // Filter out empty strings

    if (plan2Count > 50) {
      const trimmedValue = plan2?.slice(0, 10).join(" ");
      setValue("planTwoDescription", trimmedValue);
    }
    const plan3 = watchField?.planThreeDescription?.trim().split(/\s+/);
    const plan3Count = plan3?.filter((word) => word).length as number; // Filter out empty strings

    if (plan3Count > 50) {
      const trimmedValue = plan3?.slice(0, 10).join(" ");
      setValue("planThreeDescription", trimmedValue);
    }
    // eslint-disable-next-line
  }, [watchField]);

  return (
    <main className="relative space-y-8 p-4 lg:p-8">
      {showModal && (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div
            onClick={() => setShowModal(false)}
            className="absolute h-screen w-screen"
          />
          <div className=" relative z-10 flex w-[90vw] max-w-md  flex-col items-center justify-center gap-4 rounded-lg bg-white p-5 ">
            <div className=" flex w-full max-w-lg flex-col items-center justify-center gap-4">
              <div className="flex size-20 items-center justify-center rounded-full bg-[#C1F6C3] bg-opacity-60">
                <div className=" flex size-14 items-center justify-center rounded-full bg-[#A6F8AA] p-2">
                  <PiSealCheckFill className="size-10 text-green-500" />
                </div>
              </div>
              <p className="text-center font-satoshiBold text-2xl font-extrabold text-violet-normal">
                Success
              </p>
              <p className="text-center font-semibold text-violet-darker">
                Great! You can now view the update on the marketplace
              </p>
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-full bg-violet-active px-4 py-2 font-bold text-violet-dark max-sm:text-sm"
                >
                  Close
                </button>
                <Link
                  href={"/marketplace"}
                  className="rounded-full bg-violet-normal px-4 py-2 font-bold text-white max-sm:text-sm"
                >
                  Proceed to marketplace
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
      {showDropdown.isShown && (
        <div
          className="fixed inset-0 h-screen w-screen"
          onClick={() =>
            setShowDropdown((prev) => ({ ...prev, isShown: false }))
          }
        />
      )}
      <h1 className="text-2xl font-extrabold text-orange-normal">
        Edit Service
      </h1>
      <form
        onSubmit={handleSubmit(handleUpdateListing)}
        className="mx-auto  w-full max-w-lg space-y-2 font-satoshiMedium text-violet-normal "
      >
        {/* Service description */}
        <section className="flex flex-col gap-2 font-satoshiMedium">
          <h1 className="my-2 flex items-center gap-2 font-satoshiBold text-2xl font-bold ">
            <span>Service Description</span>
            <span>
              <RiPencilLine className="text-violet-normal" />
            </span>
          </h1>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("available")} />
            <p>Service is Available</p>
          </label>

          {/* title */}

          <label className="flex flex-col gap-2">
            <span className=" text-violet-darker">
              Service Title <span className="text-xl text-red-600">*</span>
            </span>
            <input
              type="text"
              className={`rounded-lg bg-violet-light p-3 outline-none ${errors.listingTitle && "border border-red-500"} `}
              {...register("listingTitle")}
            />
            <div className="grid grid-cols-2">
              {errors.listingTitle && (
                <p className="text-sm  text-red-500">
                  {errors.listingTitle.message}
                </p>
              )}
              <p className="col-start-2 text-right text-sm ">
                {watchField.listingTitle &&
                  String(
                    watchField?.listingTitle?.split(" ").filter(Boolean).length,
                  ) +
                    " /" +
                    " 10"}
              </p>
            </div>
          </label>
          {/* ------------------------- */}
          {/* category */}
          {/* <label className="flex flex-col gap-2">
            <span className=" text-violet-darker">
              Category <span className="text-xl text-red-600"> * </span>
            </span>
            <input
              type="text"
              className="rounded-lg bg-violet-light p-3 outline-none"
              disabled
              {...register("category")}
            />
          </label> */}
          {/* subcategory */}
          {/* <label className="flex flex-col gap-2">
            <span className=" text-violet-darker">
              Subcategory <span className="text-xl text-red-600"> * </span>
            </span>
            <input
              type="text"
              className="rounded-lg bg-violet-light p-3 outline-none"
              disabled
              {...register("subCategory")}
            />
          </label> */}
          {/* Description */}
          {/* -------------------  */}
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-2">
              <span className=" text-violet-darker">
                Description <span className="text-xl text-red-600"> * </span>
              </span>
              <textarea
                className={` small-scrollbar min-h-40 rounded-lg bg-violet-light p-3 outline-none ${errors.listingDescription && "border border-red-500"}`}
                {...register("listingDescription")}
              />
              {errors.listingDescription && (
                <p className="text-sm  text-red-500">
                  {errors.listingDescription.message}
                </p>
              )}
            </label>
            <div className="flex justify-between gap-2">
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg px-4 py-2 font-satoshiBold font-bold hover:bg-violet-100 "
              >
                Generate With Ai
                <Image
                  src={"/assets/images/marketplace/glowing/openaiOrange.png"}
                  alt="openai"
                  width={30}
                  height={30}
                />
              </button>
              <p className="text-right text-sm">
                {watchField.listingTitle &&
                  String(
                    watchField?.listingDescription?.split(" ").filter(Boolean)
                      .length,
                  ) +
                    " /" +
                    " 50"}
              </p>
            </div>
          </div>
          {/* -------------- */}
        </section>
        {/* { Service Details } */}
        <section className="flex flex-col space-y-4 font-satoshiMedium">
          <h1 className=" flex items-center gap-2 font-satoshiBold text-2xl font-bold ">
            <span>Service Details</span>
            <span>
              <RiPencilLine className="text-violet-normal" />
            </span>
          </h1>
          <p className=" text-violet-darker">Pricing Plan</p>
          <div className="flex flex-col gap-4">
            {/* Price is negotiable */}
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("negotiable")} />
              <p> Price is negotiable</p>
            </label>
            {/* Plans */}
            <div className="space-y-2">
              {/* plan 1 */}
              <div className="relative space-y-2">
                <button
                  type="button"
                  onClick={() => expandDropdown("one")}
                  className={` w-full rounded-lg  p-3 text-left outline-none transition-colors duration-300 hover:bg-violet-normal hover:text-white ${showDropdown.name === "one" && showDropdown.isShown ? "bg-violet-normal text-white" : "bg-violet-light"} ${errors.planOnePrice || (errors.planOneDescription && "border border-red-500")} `}
                >
                  Plan One <span className="text-xl text-red-600"> * </span>
                </button>
                <div
                  className={` overflow-hidden transition-all duration-300  ${showDropdown.name === "one" && showDropdown.isShown ? "max-h-96" : "max-h-0"} `}
                >
                  <textarea
                    {...register("planOneDescription")}
                    className={`small-scrollbar min-h-32 w-full rounded-lg bg-violet-light p-3 outline-none ${errors.planOneDescription && "border border-red-500"} `}
                  />
                  {errors.planOneDescription && (
                    <p className="text-sm  text-red-500">
                      {errors.planOneDescription.message}
                    </p>
                  )}
                  <p className="text-right text-sm">
                    {String(
                      watchField?.planOneDescription?.split(" ").filter(Boolean)
                        .length,
                    ) +
                      " /" +
                      " 50"}
                  </p>
                  <div className="flex items-center justify-between gap-6">
                    <div className="relative basis-1/3">
                      <p className="absolute left-3 top-1/2 -translate-y-1/2">
                        $
                      </p>
                      <input
                        type="number"
                        min={5}
                        {...register("planOnePrice", { valueAsNumber: true })}
                        className="w-28 rounded-lg bg-violet-light p-3 pl-6 outline-none"
                      />
                    </div>
                    <p className="basis-2/3 text-sm text-violet-darker">
                      Minimum AUD$5 + 10% GST inclusive
                    </p>
                  </div>
                </div>
              </div>
              {/* plan 2 */}
              <div className="relative space-y-2">
                <button
                  type="button"
                  onClick={() => expandDropdown("two")}
                  className={` w-full rounded-lg  p-3 text-left outline-none transition-colors duration-300 hover:bg-violet-normal hover:text-white ${showDropdown.name === "two" && showDropdown.isShown ? "bg-violet-normal text-white" : "bg-violet-light"} ${(errors.planTwoPrice || errors.planTwoDescription) && "border border-red-500"} `}
                >
                  Plan Two
                </button>
                <div
                  className={` overflow-hidden transition-all duration-300  ${showDropdown.name === "two" && showDropdown.isShown ? "max-h-96" : "max-h-0"} `}
                >
                  <textarea
                    {...register("planTwoDescription")}
                    className="small-scrollbar min-h-32 w-full rounded-lg bg-violet-light p-3 outline-none"
                  />
                  <p className="text-right text-sm">
                    {String(
                      watchField?.planTwoDescription?.split(" ").filter(Boolean)
                        .length,
                    ) +
                      " /" +
                      " 50"}
                  </p>
                  <div className="flex items-center justify-between gap-6">
                    <div className="relative basis-1/3">
                      <p className="absolute left-3 top-1/2 -translate-y-1/2">
                        $
                      </p>
                      <input
                        type="number"
                        min={5}
                        {...register("planTwoPrice")}
                        className={`w-28 rounded-lg bg-violet-light p-3 pl-6 outline-none ${errors.planTwoPrice && "border border-red-500"} `}
                      />
                    </div>
                    <p className="basis-2/3 text-sm text-violet-darker">
                      Minimum AUD$5 + 10% GST inclusive
                    </p>
                  </div>
                  {errors.planTwoPrice && (
                    <p className="text-sm  text-red-500">
                      {errors.planTwoPrice.message}
                    </p>
                  )}
                </div>
              </div>
              {/* plan 3 */}
              <div className="relative space-y-2">
                <button
                  type="button"
                  onClick={() => expandDropdown("three")}
                  className={` w-full rounded-lg  p-3 text-left outline-none transition-colors duration-300 hover:bg-violet-normal hover:text-white ${showDropdown.name === "three" && showDropdown.isShown ? "bg-violet-normal text-white" : "bg-violet-light"} ${(errors.planThreePrice || errors.planThreeDescription) && "border border-red-500"}  `}
                >
                  Plan Three
                </button>
                <div
                  className={` overflow-hidden transition-all duration-300  ${showDropdown.name === "three" && showDropdown.isShown ? "max-h-96" : "max-h-0"} `}
                >
                  <textarea
                    {...register("planThreeDescription")}
                    className="small-scrollbar min-h-32 w-full rounded-lg bg-violet-light p-3 outline-none"
                  />
                  <p className="text-right text-sm">
                    {String(
                      watchField?.planThreeDescription
                        ?.split(" ")
                        .filter(Boolean).length,
                    ) +
                      " /" +
                      " 50"}
                  </p>
                  <div className="flex items-center justify-between gap-6">
                    <div className="relative basis-1/3">
                      <p className="absolute left-3 top-1/2 -translate-y-1/2">
                        $
                      </p>
                      <input
                        type="number"
                        min={5}
                        {...register("planThreePrice")}
                        className={`w-28 rounded-lg bg-violet-light p-3 pl-6 outline-none ${errors.planThreePrice && "border border-red-500"} `}
                      />
                    </div>
                    <p className="basis-2/3 text-sm text-violet-darker">
                      Minimum AUD$5 + 10% GST inclusive
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Type of Service */}
          <div className="my-2 space-y-6 ">
            <span className=" text-violet-darker">Type of service</span>
            <div className="space-x-2">
              {typeData.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  className={`rounded-full border border-violet-normal  px-4 py-2 font-satoshi text-sm font-normal  transition-opacity duration-300 hover:opacity-90 ${item.value === watchField.taskType ? "bg-violet-normal text-white" : "bg-violet-light text-violet-normal"} `}
                  onClick={() => setValue("taskType", item.value)}
                >
                  {item.label} Service
                </button>
              ))}
            </div>

            {/* Physical Service Props */}
            {watchField.taskType === typeData[1].value ? (
              <div className="flex flex-wrap justify-between gap-4 ">
                {/* postcode */}
                <label className="flex flex-col gap-2">
                  <span className=" text-violet-darker">Postcode</span>
                  <input
                    type="number"
                    className="rounded-lg bg-violet-light p-3 pl-4 outline-none lg:w-28"
                    {...register("postcode")}
                  />
                </label>
                {/* State */}
                <label className="flex flex-col gap-2">
                  <span className=" text-violet-darker">State</span>
                  <input
                    type="text"
                    readOnly
                    className=" cursor-default rounded-lg bg-violet-light p-3 pl-4 outline-none lg:w-32"
                    {...register("state")}
                  />
                </label>

                {/* suburb */}
                <div className="relative flex flex-col gap-2">
                  <span className="font-bold text-violet-darker">Suburb</span>
                  <div className="relative">
                    <span className="absolute right-4 top-1/2 -translate-y-1/2">
                      <BsTriangleFill
                        className="size-3 rotate-[60deg] text-violet-normal"
                        fill="rgb(56 31 140)"
                      />
                    </span>
                    <button
                      type="button"
                      onClick={() => expandDropdown("suburb")}
                      className="h-12 min-w-48 rounded-lg bg-violet-light p-3 pl-4 text-left outline-none"
                    >
                      {watchField.suburb ||
                        currentListing?.suburb ||
                        "Select suburb"}
                    </button>
                  </div>
                  <div
                    className={`absolute left-0 top-[calc(100%+0.5rem)] z-10 w-full overflow-hidden rounded-md bg-violet-light transition-all duration-300 ${
                      showDropdown.name === "suburb" && showDropdown.isShown
                        ? "max-h-96"
                        : "max-h-0"
                    }`}
                  >
                    <div className="small-scrollbar max-h-64 overflow-y-auto">
                      {suburbList.map((item) => (
                        <button
                          type="button"
                          onClick={() => {
                            setValue("suburb", item);
                            expandDropdown("suburb");
                          }}
                          key={item}
                          className={`w-full p-3 text-left transition-colors hover:bg-violet-200 ${
                            (watchField.suburb || currentListing?.suburb) ===
                            item
                              ? "bg-violet-normal text-white hover:bg-violet-normal"
                              : ""
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </section>

        {/* Image section */}
        <section className="flex flex-col gap-2 space-y-4 font-satoshiMedium">
          <h1 className="my-2 flex items-center gap-2 font-satoshiBold text-2xl font-bold ">
            <span>Image Upload</span>
            <span>
              <RiPencilLine className="text-violet-normal" />
            </span>
          </h1>
          {/* Availability */}
          <div className=" relative flex min-h-12 justify-between gap-5 rounded-md bg-violet-light p-3 ">
            <button
              type="button"
              className="absolute left-0 top-0 h-full w-full"
              onClick={() => expandDropdown("days")}
            />
            <div className="flex flex-wrap gap-3  ">
              {watchField.availableDays &&
                watchField.availableDays.length > 0 &&
                watchField.availableDays.map((item: string, index: number) => (
                  <button
                    type="button"
                    key={index}
                    className="relative"
                    onClick={() => {
                      const newList = watchField.availableDays.filter(
                        (prevDay: string) => prevDay !== item,
                      );
                      setValue("availableDays", newList);
                    }}
                  >
                    <span className="absolute -right-1 -top-1 rounded-full border border-slate-600 bg-slate-200 p-0.5 text-slate-600">
                      <BiX className="size-3" />
                    </span>
                    <span className="text-orange rounded-full border border-orange-normal bg-[#FFF0DA] px-4 py-2 font-satoshiMedium text-xs font-normal text-orange-normal">
                      {item}
                    </span>
                  </button>
                ))}
            </div>
            <button
              type="button"
              onClick={() => expandDropdown("days")}
              className="px-2 text-violet-normal"
            >
              <BsTriangleFill
                className="size-3 rotate-[60deg] "
                fill="rgb(20 11 49)"
              />
            </button>
            <div
              className={`absolute left-0 top-[calc(100%+0.5rem)] w-full overflow-hidden rounded-md bg-violet-light transition-all duration-300 ${showDropdown.name === "days" && showDropdown.isShown ? "max-h-96" : "max-h-0"} `}
            >
              {handleGetAvailableDays().map((item) => (
                <button
                  type="button"
                  onClick={() =>
                    setValue("availableDays", [
                      ...watchField.availableDays,
                      item,
                    ])
                  }
                  key={item}
                  className="w-full p-3 text-left hover:bg-violet-200"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {/* Upload Image */}
          <span className=" font-satoshiBold text-xl text-violet-darker">
            Upload Image
          </span>
          <div>
            <span className=" text-violet-darker">
              This is the main image that would be seen by customers
            </span>
            <div className="flex w-full flex-col gap-3 text-lg  text-violet-normal lg:max-w-64 ">
              <div>
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg, .gif"
                  className="hidden"
                  onChange={(event) =>
                    handleOnImageInputChange({ event, index: 1 })
                  }
                  ref={imageRefs[0]}
                />
                <button
                  type="button"
                  className="my-2 flex items-end justify-center space-x-2 rounded-xl border border-dashed border-violet-normal"
                  onClick={() => handleClickImageButton({ index: 1 })}
                >
                  {/* Display a disabled input with message */}
                  <Image
                    src={
                      watchField.image1 ??
                      currentListing?.businessPictures?.[0] ??
                      ""
                    }
                    alt="Captured or Selected"
                    width={300}
                    height={300}
                    className="size-40 rounded-xl object-cover"
                  />
                </button>
              </div>
            </div>
          </div>
          {/* add portfolio images */}
          <div>
            <span>Add a portfolio image</span>
            <div className="flex flex-wrap items-center justify-between gap-2 lg:grid lg:grid-cols-3">
              {[2, 3, 4].map((item) => (
                <div key={item}>
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg, .gif"
                    className="hidden"
                    onChange={(event) =>
                      handleOnImageInputChange({ event, index: item })
                    }
                    ref={imageRefs[item - 1]}
                  />
                  <button
                    type="button"
                    className="my-2 flex items-end justify-center space-x-2 rounded-xl border border-dashed border-violet-normal "
                    onClick={() => handleClickImageButton({ index: item })}
                  >
                    {/* Display a disabled input with message */}
                    <Image
                      src={
                        watchImageArray[item - 1] ??
                        currentListing?.businessPictures?.[item - 1] ??
                        "/assets/images/upload-placeholder.png"
                      }
                      alt="Select image"
                      width={300}
                      height={300}
                      className="size-40 rounded-xl object-cover"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <button
          className="rounded-full border border-violet-normal bg-violet-normal px-4 py-2 font-satoshi text-sm font-normal text-white transition-opacity duration-300 hover:opacity-90 "
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? (
            <BeatLoader color="white" loading={isSubmitting} />
          ) : (
            "Save and Exit"
          )}
        </button>
        {errorMessage && (
          <p className="text-sm  text-red-500">{errorMessage}</p>
        )}
      </form>
    </main>
  );
};

export default EditListing;
