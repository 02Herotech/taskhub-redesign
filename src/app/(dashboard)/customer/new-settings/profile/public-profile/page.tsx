"use client";
import React, { useEffect } from "react";
import { PiShootingStarBold } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setBreadCrumbs } from "@/store/Features/breadcrumbs";
import Popup from "@/components/global/Popup/PopupTwo";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import { RootState } from "@/store";
import { publicProfileSchema, PublicProfileSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useAxios from "@/hooks/useAxios";
import { useSession } from "next-auth/react";
import {
  refreshUserProfile,
  updateUserProfile,
} from "@/store/Features/userProfile";
import axios from "axios";
import Button from "@/components/global/Button";
import useSuburbData, { SurburbInfo } from "@/hooks/useSuburbData";
import { CiLocationOn } from "react-icons/ci";
import useUserProfileData from "@/hooks/useUserProfileData";

function Page() {
  const { profile } = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  const session = useSession();
  const user = session?.data?.user?.user;

  const [openProfilePreview, setOpenProfilePreview] = useState(false);
  const profilePictureInputRef = useRef<HTMLInputElement>(null);
  const [initialImageUrl, setInitialImageUrl] = useState("");
  const [currentSuburb, setCurrentSuburb] = useState<SurburbInfo | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(
      setBreadCrumbs({
        header: "Public Profile",
        links: [
          { url: "/customer/new-settings/profile", text: "Profile" },
          {
            url: "/customer/new-settings/profile/public-profile",
            text: "Public profile",
          },
        ],
      }),
    );
  }, []);

  useEffect(() => {
    if (profile?.profileImage) {
      setInitialImageUrl(profile.profileImage);
    } else {
      setInitialImageUrl("/assets/images/serviceProvider/user.jpg");
    }
    setValue("firstName", profile?.firstName);
    setValue("lastName", profile?.lastName);
  }, [profile]);

  const {
    watch,
    setValue,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PublicProfileSchema>({
    resolver: zodResolver(publicProfileSchema),
    defaultValues: {
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      location: profile?.address?.suburb || "",
    },
  });

  const userProfileData = useUserProfileData();

  useEffect(() => {
    if (userProfileData?.suburbs) {
      setValue("location", userProfileData.suburbs);
    }
  }, [userProfileData]);

  const location = watch("location");

  const {
    suburbList,
    setSuburbList,
    error: suburbError,
    isLoading,
  } = useSuburbData(location, currentSuburb, userProfileData?.suburbs);

  const authInstance = useAxios();

  const imageFile = watch("profileImage");

  const onSubmit: SubmitHandler<PublicProfileSchema> = async (data) => {
    setError("");
    try {
      if (data.profileImage) {
        await authInstance.post(
          "/customer/profile_picture",
          { image: data.profileImage },
          { headers: { "Content-Type": "multipart/form-data" } },
        );
      }

      const submitData = {
        firstName: data.firstName,
        lastName: data.lastName,
        suburb: currentSuburb?.name || "",
        state: currentSuburb?.state.name || "",
        postCode: currentSuburb?.postcode
          ? currentSuburb.postcode.toString().padStart(4, "0")
          : "",
      };

      await authInstance.patch("/customer/update", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      //Update redux value with latest data
      const profileUrl =
        `${process.env.NEXT_PUBLIC_API_URL}/user/user-profile/` + user?.id;
      const { data: profile } = await axios.get(profileUrl);
      dispatch(updateUserProfile(profile));
      dispatch(refreshUserProfile());
    } catch (error) {
      console.error(error);
      setError("Something went wrong, try again later");
    }
  };
  return (
    <>
      <div className="flex-grow space-y-2 rounded-xl">
        <header>
          <h3 className="mb-3 hidden text-sm font-semibold text-[#140B31] sm:block">
            Public profile
          </h3>
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
            <div className="flex w-full flex-grow gap-2 rounded-xl border-[#C4BFD4] bg-[#EBE9F4] p-2 sm:w-max sm:border sm:bg-white">
              <PiShootingStarBold
                className="mt-1 rotate-180 scale-x-[-1]"
                color="#381F8C"
              />
              <div className="">
                <p className="font-semibold text-primary">
                  Stand out with your profile!
                </p>
                <p className="text-[#546276]">
                  The details you add here are visible to everyone
                </p>
              </div>
            </div>
            <button
              className="w-full rounded-xl border border-primary px-5 py-1 font-medium text-primary sm:w-max"
              onClick={() => setOpenProfilePreview(true)}
            >
              Preview profile
            </button>
          </div>
        </header>

        <form className="pb-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 space-y-5 rounded-2xl bg-white p-3 sm:bg-[#EBE9F4] sm:p-4">
            <header>
              <h3 className="mb-2 font-black">Profile picture</h3>
              <p className="mb-3 text-sm font-medium text-[#3C3B3E]">
                Upload a clear picture of yourself to let others know who they
                are communicating with.
              </p>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <Image
                  src={getImageUrl(imageFile) || initialImageUrl}
                  alt="Profile picture"
                  className="size-20 rounded-full object-cover"
                  width={612}
                  height={409}
                />
                <input
                  type="file"
                  accept="image/*"
                  multiple={false}
                  className="hidden"
                  ref={profilePictureInputRef}
                  onChange={(e) => {
                    clearErrors("profileImage");
                    setValue("profileImage", e.target.files?.[0], {
                      shouldValidate: true,
                    });
                  }}
                />
                <button
                  className="text-sm font-semibold text-primary"
                  type="button"
                  onClick={() => profilePictureInputRef.current?.click()}
                >
                  Change photo
                </button>
              </div>
              {errors.profileImage && (
                <p className="w-full text-sm font-medium text-red-500">
                  {errors.profileImage?.message.toString()}
                </p>
              )}
            </header>

            {/* Bio details  */}
            {/* <div>
              <label
                htmlFor="bio-detail"
                className="mb-2 block text-[15px] font-black"
              >
                Bio Details(Optional)
              </label>
              <textarea
                id="bio-detail"
                rows={3}
                {...register("bioDescription")}
                className="block w-full resize-none appearance-none rounded-xl p-2 font-medium shadow-md outline-none placeholder:text-[15px] placeholder:text-[#AEACBB] sm:shadow-none"
                placeholder="Brief intro on who you are and what you do on Olójà"
              ></textarea>
              {errors.bioDescription && (
                <p className="w-full text-sm font-medium text-red-500">
                  {errors.bioDescription.message}
                </p>
              )}
            </div> */}

            {/* First name and last name  */}
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-2">
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="first-name"
                  className="mb-1 block text-sm text-[#4E5158]"
                >
                  First name
                </label>
                <input
                  {...register("firstName")}
                  id="first-name"
                  type="text"
                  className="w-full rounded-xl p-2 px-2 shadow-md outline-none disabled:bg-white sm:shadow-none"
                  placeholder="John"
                  disabled
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="last-name"
                  className="mb-1 block text-sm text-[#4E5158]"
                >
                  Last name
                </label>
                <input
                  id="last-name"
                  type="text"
                  className="w-full rounded-xl p-2 px-2 shadow-md outline-none disabled:bg-white sm:shadow-none"
                  placeholder="Doe"
                  disabled
                  {...register("lastName")}
                />
              </div>
            </div>

            {/* Location  */}
            <div className="">
              <label
                htmlFor="location"
                className="mb-1 block text-sm text-[#4E5158]"
              >
                Location
              </label>
              <div className="relative">
                <div className="flex items-center overflow-hidden rounded-xl bg-white px-2 py-1 shadow-md sm:shadow-none">
                  <IoLocationOutline color="#BFBDC6" />
                  <input
                    id="location"
                    type="text"
                    className="h-full w-full appearance-none p-2 outline-none "
                    placeholder="Enter a suburb"
                    {...register("location", {
                      onChange: (e) => {
                        if (currentSuburb) {
                          setCurrentSuburb(null);
                          const enteredInput = e.target.value.slice(-1);
                          e.target.value = enteredInput;
                          setValue("location", enteredInput);
                        }
                        setValue("location", e.target.value);
                      },
                    })}
                  />
                </div>
                <div className="absolute left-0 z-10 w-full rounded-b-lg bg-white shadow-lg">
                  {isLoading && (
                    <p className="py-2 text-center font-satoshiMedium text-[#76757A61]">
                      Loading...
                    </p>
                  )}
                  {suburbError && !isLoading && (
                    <p className="py-2 text-center font-satoshiMedium text-red-600">
                      Error occured while loading suburb data
                    </p>
                  )}
                  {suburbList.length > 1 && (
                    <ul className="roundeed-lg max-h-52 overflow-y-auto overflow-x-hidden">
                      {suburbList.map((suburb) => (
                        <li
                          className="flex cursor-pointer items-center gap-1 bg-white px-4 py-3 text-[13px]"
                          key={Math.random() * 12345}
                          onClick={() => {
                            setCurrentSuburb(suburb);
                            setValue(
                              "location",
                              `${suburb.name}, ${suburb.state.abbreviation}, Australia`,
                            );
                            setSuburbList([]);
                          }}
                        >
                          <CiLocationOn
                            stroke="#0F052E"
                            size={20}
                            strokeWidth={1}
                          />
                          <span className="text-[#0F052E]">
                            {suburb.name},{" "}
                            {suburb.locality ? `${suburb.locality},` : ""}{" "}
                            {suburb.state.name}, AUS
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Button
            loading={isSubmitting}
            disabled={isSubmitting}
            type="submit"
            className="w-full rounded-full bg-primary px-7 py-3 font-medium text-white sm:w-max"
          >
            Save changes
          </Button>
        </form>
      </div>
      <Popup
        isOpen={openProfilePreview}
        onClose={() => setOpenProfilePreview(false)}
      >
        <section className="relative mt-10 max-h-[700px] min-w-[320px] max-w-[600px] bg-white p-7 pt-2 sm:min-w-[560px]">
          <header className="mb-10 flex items-center gap-5">
            <Image
              src={
                profile?.profileImage ??
                "/assets/images/serviceProvider/user.jpg"
              }
              alt="Profile picture"
              className="size-20 rounded-full object-cover"
              width={612}
              height={409}
            />
            <div className="">
              <h3 className="mb-2 font-semibold">{`${profile?.firstName} ${profile?.lastName}`}</h3>
              <p className="text-sm text-[#857F7F]">
                {`${profile?.address.suburb}, ${profile?.address.state}`}
              </p>
            </div>
          </header>
          <main className="space-y-6">
            <div>
              <h5 className="mb-3 font-black text-black">Bio details</h5>
              <textarea
                id="bio-detail"
                rows={3}
                disabled
                value={"I can do house cleaning and lawn mowing services."}
                className="block w-full resize-none appearance-none rounded-xl p-2 font-medium text-[#AEACBB] shadow-md outline-none placeholder:text-[15px]"
                placeholder="Brief intro on who you are and what you do on Olójà"
              ></textarea>
            </div>
          </main>
        </section>
      </Popup>
    </>
  );
}

export default Page;
