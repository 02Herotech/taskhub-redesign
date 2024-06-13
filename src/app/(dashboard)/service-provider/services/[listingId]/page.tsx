"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { RiPencilLine } from "react-icons/ri";
import { z } from "zod";

const tempData = {
  id: 35,
  state: "",
  postCode: "",
  suburb: "",
  serviceProvider: {
    id: 1,
    user: {
      id: 1,
      fullName: "Anthony Dev",
      profileImage:
        "http://res.cloudinary.com/ddgm9zdnr/image/upload/v1717685216/hzvnxejvpbcaevpxhpgb.png",
    },
    bio: "I am a software developer with years of experience",
  },
  category: {
    id: 3,
    categoryName: "Information and Technology",
  },
  listingTitle: "Casual Danser",
  stripeId: "prod_QGfDM2zd9LlA5E",
  planOneDescription: "Street dancing",
  planOnePrice: 25,
  planTwoDescription: "",
  planTwoPrice: null,
  planThreeDescription: "",
  planThreePrice: null,
  taskType: "REMOTE_SERVICE",
  businessPictures: [
    "http://res.cloudinary.com/ddgm9zdnr/image/upload/v1718024645/xc05hkanpe1usoi2t58k.png",
    "http://res.cloudinary.com/ddgm9zdnr/image/upload/v1718024646/cmy1q0nt8rlyr8rw3bek.png",
    "http://res.cloudinary.com/ddgm9zdnr/image/upload/v1718024647/zjoodtijqrzy2jj6ddpu.png",
    "http://res.cloudinary.com/ddgm9zdnr/image/upload/v1718024647/n7bsgtjoskr5w9uz3nmu.png",
  ],
  availableDays: ["TUESDAY", "MONDAY", "THURSDAY"],
  listingDescription: "You Need A Dancer, I've Got Your Back",
  reviews: [],
  subCategory: {
    name: "House Keeping",
    id: 3,
  },
};

const EditListing = () => {
  const [currentListing, setCurrentListing] =
    // @ts-expect-error "type delcaration"
    useState<ListingDataType>(tempData);

  const listingZodSchema = z.object({
    businessName: z.string(),
    category: z.string(),
    subcategory: z.string(),
    description: z.string(),
  });

  const { listingId } = useParams();

  useEffect(() => {
    const fetchCurentListing = async () => {
      try {
        const url =
          "https://smp.jacinthsolutions.com.au/api/v1/listing/" + listingId;
        const { data } = await axios.get(url);
        console.log(data);
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
        className="mx-auto  w-full max-w-md space-y-2 font-satoshiMedium text-violet-normal "
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
          <div className="flex flex-col gap-2">
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
        <section className="flex flex-col gap-2 font-satoshiMedium">
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
          <div className="my-2 space-y-2 ">
            <span className=" text-violet-darker">Type of service</span>
            <div className="space-x-2">
              <button className="rounded-full border border-violet-normal bg-violet-normal px-4 py-2 font-satoshi text-sm font-normal text-white transition-opacity duration-300 hover:opacity-90 ">
                Pysical Service
              </button>
              <button className="rounded-full border border-violet-normal bg-violet-light px-4 py-2 font-satoshi text-sm font-normal text-violet-normal transition-opacity duration-300 hover:opacity-90 ">
                Remote Service
              </button>
            </div>

            {/* Physical Service Props */}
            <div className="flex justify-between gap-4 ">
              {/* postcode */}
              <label className="flex flex-col gap-2">
                <span className=" text-violet-darker">Postcode</span>
                <input
                  type="text"
                  className="w-28 rounded-lg bg-violet-light p-3 pl-4 outline-none"
                />
              </label>
              {/* State */}
              <label className="flex flex-col gap-2">
                <span className=" text-violet-darker">State</span>
                <input
                  type="text"
                  className=" w-32 rounded-lg bg-violet-light p-3 pl-4 outline-none"
                />
              </label>
              {/* suburb */}
              <label className="flex flex-col gap-2">
                <span className="font-bold text-violet-darker">Suburb</span>
                <select className="min-w-40 rounded-lg bg-violet-light p-3 pl-4 outline-none">
                  <option value="">Suburb</option>
                </select>
              </label>
            </div>
          </div>
        </section>

        {/* Image section */}
        <section className="flex flex-col gap-2 font-satoshiMedium">
          {/* Availability */}
          <div></div>
          {/* Upload Image */}
          <span className=" text-violet-darker">Upload Image</span>
          <span className=" text-violet-darker">
            This is the main image that would be seen by customers
          </span>
          <span>Add image</span>
          <span>Add a portfolio image</span>
        </section>
        <button className="rounded-full border border-violet-normal bg-violet-normal px-4 py-2 font-satoshi text-sm font-normal text-white transition-opacity duration-300 hover:opacity-90 ">
          Save and Exit
        </button>
      </form>
    </main>
  );
};

export default EditListing;
