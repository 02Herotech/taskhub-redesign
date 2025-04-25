/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { BiCalendarCheck, BiLocationPlus } from "react-icons/bi";
import PricingPlan from "@/components/matkeplaceSingleTask/PricingPlan";
import ImageModal from "@/components/main/marketplace/ImageModal";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import MessageButton from "@/components/global/MessageButton";
import Link from "next/link";
import ShareTask from "@/components/dashboard/general/ShareTask";
import Button from "@/components/global/Button";
import { ShareModal } from "@/components/dashboard/general/ShareModal";
import { ShareSvg } from "@/lib/svgIcons";
import { useGetServiceByIdQuery } from "@/services/listings";
import Loading from "@/shared/loading";

const Page = ({ params }: { params: { id: string } }) => {
  const [email, setEmail] = useState("");
  const [isInviteLoading, setIsInviteLoading] = useState(false);
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [showImageModal, setShowImageModal] = useState({
    state: false,
    image: "",
  });
  const id = params.id.split("-")[0];
  const pathname = usePathname();

  const {
    data: displayData,
    isLoading,
    error,
  } = useGetServiceByIdQuery(id as unknown as number);
  const [shareDropdownOpen, setShareDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShareDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInviteError(null);

    // Email validation
    if (!email) {
      setInviteError("Please enter an email address");
      return;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setInviteError("Please enter a valid email address");
      return;
    }

    try {
      setIsInviteLoading(true);
      setInviteError("");

      // Create mailto link with subject and body
      const subject = encodeURIComponent("Check out this task on Oloja");
      const body = encodeURIComponent(
        `I thought you might be interested in this: ${process.env.NEXT_PUBLIC_URL}${pathname}`,
      );
      const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

      // Open the mailto link
      window.location.href = mailtoLink;

      setEmail("");
      setShareDropdownOpen(false);
    } catch (err) {
      setInviteError("Failed to open email client. Please try again.");
    } finally {
      setIsInviteLoading(false);
    }
  };

  const { userProfileAuth: auth } = useSelector(
    (state: RootState) => state.userProfile,
  );

  if (isLoading) {
    return (
      <div className="flex h-[full] w-full flex-col items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <div className="space-y-4">
          <h2 className="font-satoshiBold text-xl  font-bold text-primary lg:text-3xl">
            Listing not found!
          </h2>
          <p className="font-satoshiMedium text-lg text-[#140B31] lg:text-xl">
            Something went wrong, please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="relative py-16 font-satoshiMedium text-[#221354]">
        <ImageModal
          showImageModal={showImageModal}
          setShowImageModal={setShowImageModal}
        />
        <section className="grid gap-4 lg:grid-cols-12 lg:gap-4">
          {/* left handside */}
          <article className="space-y-4 lg:col-span-7">
            <header className=" mx-auto bg-slate-200  p-4 lg:rounded-br-[2rem] lg:rounded-tr-[2rem] lg:px-10 lg:py-10 ">
              <div className="flex items-center   ">
                <Image
                  src={displayData?.businessPictures[0] ?? ""}
                  alt={displayData?.businessPictures[0] ?? ""}
                  width={1600}
                  height={1600}
                  quality={100}
                  onClick={() =>
                    setShowImageModal({
                      state: true,
                      image: displayData?.businessPictures[0] ?? "",
                    })
                  }
                  className="mx-auto max-h-[400px] w-full max-w-screen-xl cursor-pointer  rounded-lg object-cover "
                />
              </div>
            </header>

            <div className="space-y-8 lg:p-6">
              {/* Main Service Information */}
              <div className="p-6">
                <div className="mb-6 pb-4">
                  <h3 className="font-satoshiBold text-2xl font-bold first-letter:uppercase lg:text-3xl">
                    {displayData?.listingTitle}
                  </h3>
                </div>

                <div className="space-y-6">
                  {/* Service Description */}
                  <div className="space-y-3">
                    <h4 className="font-satoshiMedium text-lg font-semibold underline underline-offset-4">
                      Service Description
                    </h4>
                    <p className="font-satoshiMedium leading-relaxed text-gray-700">
                      {displayData?.listingDescription}
                    </p>
                  </div>

                  {/* Share Service */}
                  <div className="w-full items-center justify-between rounded-xl bg-[#F8F7FA] px-5 py-3 lg:flex">
                    <ShareTask
                      pathname={pathname}
                      title={displayData?.listingTitle || ""}
                      description={displayData?.listingDescription || ""}
                      image={displayData?.businessPictures[0] || ""}
                    />
                    <div className="relative max-sm:my-4" ref={dropdownRef}>
                      <div
                        onClick={() => setShareDropdownOpen(true)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            setShareDropdownOpen(!shareDropdownOpen);
                          }
                        }}
                        className="transform cursor-pointer transition-transform duration-300 group-hover:scale-110"
                      >
                        {ShareSvg}
                      </div>

                      <ShareModal
                        isOpen={shareDropdownOpen}
                        onClose={() => setShareDropdownOpen(false)}
                        pathname="/current-path"
                      >
                        <h5 className="text-start">
                          Invite more friends to join
                        </h5>
                        <form action="" onSubmit={handleSubmit}>
                          <input
                            type="email"
                            placeholder="Enter e-mail address"
                            className="mt-4 w-full rounded-lg bg-[#EEEEEF] px-4 py-2 outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isInviteLoading}
                            aria-label="Email address"
                            aria-describedby={
                              inviteError ? "email-error" : undefined
                            }
                          />
                          {inviteError && (
                            <p
                              id="email-error"
                              className="mt-1 text-sm text-red-500"
                            >
                              {inviteError}
                            </p>
                          )}
                          <div className="mb-3 mt-5 flex items-center justify-center">
                            <Button
                              theme="secondary"
                              className="rounded-full font-satoshiMedium text-white"
                              size="sm"
                              type="submit"
                              disabled={isInviteLoading}
                              loading={isInviteLoading}
                            >
                              Send Invite
                            </Button>
                          </div>
                        </form>
                      </ShareModal>
                    </div>
                  </div>

                  {/* Location Section */}
                  {displayData?.suburb && (
                    <div className="space-y-2  pt-4">
                      <h4 className="font-satoshiBold text-xl font-semibold lg:text-2xl">
                        Location
                      </h4>
                      <div className="flex items-center gap-x-2 text-slate-600">
                        <BiLocationPlus className="text-xl" />
                        <span>
                          {displayData.suburb}, {displayData.state}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Availability */}
                  <div className="space-y-4 pt-4">
                    <h4 className="font-satoshiBold text-xl font-semibold lg:text-2xl">
                      Available days
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-x-2 text-slate-600">
                        <BiCalendarCheck className="text-xl" />
                        <span>{displayData?.availableDays?.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Provider Information */}
              <div className="p-6">
                <div className="mb-6 pb-4">
                  <h2 className="font-satoshiBold text-2xl font-bold lg:text-3xl">
                    About the Provider
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Image
                          src={
                            displayData?.serviceProvider?.user.profileImage ??
                            "/assets/images/serviceProvider/user.jpg"
                          }
                          alt="Provider Profile"
                          width={80}
                          height={80}
                          quality={100}
                          className="size-20 rounded-full object-cover ring-2 ring-gray-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="font-satoshiBold text-xl">
                          {displayData?.serviceProvider?.user?.fullName}
                        </p>
                        <Link
                          href={`/marketplace/${displayData?.id}/about`}
                          className="inline-block font-medium text-[#e58c06] underline transition-colors hover:text-[#cc7c05]"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>

                    {displayData &&
                      auth?.token &&
                      auth?.role?.[0] === "CUSTOMER" && (
                        <div className="md:self-start">
                          <MessageButton
                            recipientId={displayData.serviceProvider.user.id.toString()}
                            recipientName={
                              displayData?.serviceProvider.user.fullName
                            }
                          />
                        </div>
                      )}
                  </div>

                  {/* @ts-ignore */}
                  {displayData?.serviceProvider?.bio && (
                    <div className=" pt-4">
                      <p className="font-medium leading-relaxed text-gray-700">
                        {/* @ts-ignore */}
                        {displayData?.serviceProvider.bio}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
          {/* ----------------- pricing plan ---------------- */}
          {displayData && displayData && (
            <PricingPlan
              planOnePrice={displayData.planOnePrice}
              planTwoPrice={displayData.planTwoPrice}
              planThreePrice={displayData.planThreePrice}
              planOneDescription={displayData.planOneDescription}
              planTwoDescription={displayData.planTwoDescription}
              planThreeDescription={displayData.planThreeDescription}
              listingId={displayData.id}
              listingTitle={displayData.listingTitle}
              negotiable={displayData.negotiable}
            />
          )}
        </section>

        {/* Portfolio
        <section className="mx-auto w-full space-y-4 p-4  py-8 lg:p-16 ">
          <h1 className="text-3xl font-bold text-violet-darkHover">
            Portfolio
          </h1>
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12">
            <Image
              src={displayData?.businessPictures[0] ?? ""}
              alt={displayData?.businessPictures[0] ?? ""}
              width={1600}
              height={1600}
              quality={100}
              onClick={() =>
                setShowImageModal({
                  state: true,
                  image: displayData?.businessPictures[0] ?? "",
                })
              }
              className="mx-auto h-96 w-full rounded-xl  object-cover lg:col-span-6 "
            />
            <div className="flex flex-col gap-5 md:grid md:grid-cols-2 lg:col-span-6">
              {displayData?.businessPictures
                .slice(1, 4)
                .map((item, index) => (
                  <Image
                    key={item}
                    src={item}
                    alt={item}
                    width={1600}
                    height={1600}
                    quality={100}
                    onClick={() =>
                      setShowImageModal({ state: true, image: item })
                    }
                    className={`mx-auto h-44 w-full rounded-xl object-cover ${index === 0 && "md:col-span-2"} `}
                  />
                ))}
            </div>
          </div>
        </section> */}
      </main>
    </>
  );
};

export default Page;
