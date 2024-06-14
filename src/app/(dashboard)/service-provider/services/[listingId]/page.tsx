"use client";
import { typeData } from "@/data/marketplace/data";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { BiChevronDown, BiX } from "react-icons/bi";
import { BsTriangleFill } from "react-icons/bs";
import { PiFileArrowDownDuotone } from "react-icons/pi";
import { RiPencilLine } from "react-icons/ri";
import { z } from "zod";

const EditListing = () => {
  const [currentListing, setCurrentListing] = useState<ListingDataType>();

  const [image, setImage] = useState("");

  const listingZodSchema = z.object({
    businessName: z.string(),
    category: z.string(),
    subcategory: z.string(),
    description: z.string(),
    availableDays: z.array(z.string()),
    bannerImage: z.string(),
    postcode: z.string(),
    suburb: z.string(),
    state: z.string(),
    typeOfService: z.string(),
  });

  const { listingId } = useParams();

  useEffect(() => {
    const fetchCurentListing = async () => {
      try {
        const url =
          "https://smp.jacinthsolutions.com.au/api/v1/listing/" + listingId;
        const { data } = await axios.get(url);
        setCurrentListing(data);
      } catch (error: any) {
        console.log(error.response.data);
      }
    };

    fetchCurentListing();
  }, [listingId]);

  type listingZodType = z.infer<typeof listingZodSchema>;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(listingZodSchema),
  });

  useEffect(() => {
    if (currentListing) {
      reset({
        businessName: currentListing.listingTitle,
        category: currentListing.category.categoryName,
        subcategory: currentListing.subCategory.name,
        description: currentListing.listingDescription,
        availableDays: currentListing.availableDays,
        bannerImage: currentListing.businessPictures[0],
        postcode: currentListing.postCode,
        suburb: currentListing.suburb,
        state: currentListing.state,
        typeOfService: currentListing.taskType,
      });
    }
    // eslint-disable-next-line
  }, [currentListing]);

  const watchField = watch();

  const handleUpdateListing: SubmitHandler<listingZodType> = async (data) => {
    console.log(data);
  };

  return (
    <main className="space-y-8 p-4 lg:p-8">
      <h1 className="text-2xl font-extrabold text-orange-normal">
        Edit Service
      </h1>
      <form
        // onSubmit={handleSubmit(handleUpdateListing)}
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
          {/* title */}
          <label className="flex flex-col gap-2">
            <span className=" text-violet-darker">Service Title</span>
            <input
              type="text"
              className="rounded-lg bg-violet-light p-3 outline-none"
              {...register("businessName")}
            />
          </label>
          {/* category */}
          <label className="flex flex-col gap-2">
            <span className=" text-violet-darker">Category</span>
            <input
              type="text"
              className="rounded-lg bg-violet-light p-3 outline-none"
              disabled
              {...register("category")}
            />
          </label>
          {/* subcategory */}
          <label className="flex flex-col gap-2">
            <span className=" text-violet-darker">Subcategory</span>
            <input
              type="text"
              className="rounded-lg bg-violet-light p-3 outline-none"
              disabled
              {...register("subcategory")}
            />
          </label>
          {/* Description */}
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-2">
              <span className=" text-violet-darker">Description</span>
              <textarea
                className="min-h-40 rounded-lg bg-violet-light p-3 outline-none"
                {...register("description")}
              />
            </label>
            <div className=" flex items-center gap-2">
              <button
                type="button"
                className="rounded-lg px-4 py-2 font-satoshiBold font-bold hover:bg-violet-100 "
              >
                Generate With Ai
              </button>
              <Image
                src={"/assets/images/marketplace/glowing/openaiOrange.png"}
                alt="openai"
                width={30}
                height={30}
              />
            </div>
          </div>
        </section>
        {/* { Service Details } */}
        <section className="flex flex-col gap-2 space-y-4 font-satoshiMedium">
          <h1 className="my-2 flex items-center gap-2 font-satoshiBold text-2xl font-bold ">
            <span>Service Details</span>
            <span>
              <RiPencilLine className="text-violet-normal" />
            </span>
          </h1>
          {/* Pricing Plan */}
          <label className="flex flex-col gap-2">
            <span className=" text-violet-darker">Pricing Plan</span>
            <input
              type="text"
              className="rounded-lg bg-violet-light p-3 outline-none"
            />
          </label>
          {/* Pricing */}
          <div className="flex flex-col gap-2">
            <span className=" text-violet-darker">Price</span>
            <div className="flex items-center justify-between gap-6">
              <div className="relative basis-1/3">
                <p className="absolute left-3 top-1/2 -translate-y-1/2">$</p>
                <input
                  type="number"
                  className="w-28 rounded-lg bg-violet-light p-3 pl-4 outline-none"
                />
              </div>
              <p className="basis-2/3 text-sm text-violet-darker">
                Minimum AUD$25 + 10% GST inclusive
              </p>
            </div>
          </div>

          {/* Type of Service */}
          <div className="my-2 space-y-6 ">
            <span className=" text-violet-darker">Type of service</span>
            <div className="space-x-2">
              {typeData.map((item, index) => (
                <button
                  key={index}
                  className={`rounded-full border border-violet-normal  px-4 py-2 font-satoshi text-sm font-normal  transition-opacity duration-300 hover:opacity-90 ${item.value === watchField.typeOfService ? "bg-violet-normal text-white" : "bg-violet-light text-violet-normal"} `}
                  onClick={() => setValue("typeOfService", item.value)}
                >
                  {item.label} Service
                </button>
              ))}
            </div>

            {/* Physical Service Props */}
            {watchField.typeOfService === typeData[1].value ? (
              <div className="flex flex-wrap justify-between gap-4 ">
                {/* postcode */}
                <label className="flex flex-col gap-2">
                  <span className=" text-violet-darker">Postcode</span>
                  <input
                    type="text"
                    disabled
                    className="w-28 rounded-lg bg-violet-light p-3 pl-4 outline-none"
                    {...register("postcode")}
                  />
                </label>
                {/* State */}
                <label className="flex flex-col gap-2">
                  <span className=" text-violet-darker">State</span>
                  <input
                    type="text"
                    disabled
                    className=" w-32 rounded-lg bg-violet-light p-3 pl-4 outline-none"
                    {...register("state")}
                  />
                </label>
                {/* suburb */}
                <label className="flex flex-col gap-2">
                  <span className="font-bold text-violet-darker">Suburb</span>
                  <input
                    type="text"
                    disabled
                    className=" w-48 rounded-lg bg-violet-light p-3 pl-4 outline-none"
                    {...register("suburb")}
                  />
                </label>
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
          <div className=" relative flex justify-between gap-5 rounded-md bg-violet-light p-3 ">
            <div className="absolute inset-0 h-full w-full" />
            <div className="flex flex-wrap gap-3  ">
              {watchField.availableDays &&
                watchField.availableDays.length > 0 &&
                watchField.availableDays.map((item: string, index: number) => (
                  <div key={index} className="relative">
                    <button className="absolute -right-1 -top-1 rounded-full border border-slate-600 bg-slate-200 p-0.5 text-slate-600">
                      <BiX className="size-3" />
                    </button>
                    <button className="text-orange rounded-full border border-orange-normal bg-[#FFF0DA] px-4 py-2 font-satoshiMedium text-xs font-normal text-orange-normal">
                      {item}
                    </button>
                  </div>
                ))}
            </div>
            <button className="px-2 text-violet-normal">
              <BsTriangleFill
                className="size-3 rotate-[60deg] "
                fill="rgb(20 11 49)"
              />
            </button>
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
                <button
                  type="button"
                  className="my-2 flex items-end justify-center space-x-2 rounded-xl border border-dashed border-violet-normal "
                >
                  {/* Display a disabled input with message */}
                  <Image
                    src={currentListing?.businessPictures[0] ?? ""}
                    alt="Captured or Selected"
                    width={300}
                    height={300}
                    className="rounded-xl"
                  />
                </button>
              </div>
            </div>
          </div>
          {/* add portfolio images */}
          <div>
            <span>Add a portfolio image</span>
            <div className="flex flex-wrap items-center justify-between gap-2 lg:grid lg:grid-cols-3">
              {currentListing &&
                currentListing.businessPictures
                  .slice(1, 4)
                  .map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      className="my-2 flex items-end justify-center space-x-2 rounded-xl border border-dashed border-violet-normal "
                    >
                      {/* Display a disabled input with message */}
                      <Image
                        src={item}
                        alt="Captured or Selected"
                        width={300}
                        height={300}
                        className="size-40 rounded-xl object-cover"
                      />
                    </button>
                  ))}
            </div>
          </div>
        </section>
        <button className="rounded-full border border-violet-normal bg-violet-normal px-4 py-2 font-satoshi text-sm font-normal text-white transition-opacity duration-300 hover:opacity-90 ">
          Save and Exit
        </button>
      </form>
    </main>
  );
};

export default EditListing;
