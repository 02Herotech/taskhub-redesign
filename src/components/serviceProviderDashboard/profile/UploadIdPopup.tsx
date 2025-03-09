"use client";
import {
  refreshUserProfile,
  updateUserProfile,
} from "@/store/Features/userProfile";
import { dataURLtoFile } from "@/utils/service-provider";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import { BiCheck, BiXCircle } from "react-icons/bi";
import { PiFileArrowDownDuotone, PiSealCheckFill } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import Webcam from "react-webcam";
import useAxios from "@/hooks/useAxios";
import Popup from "@/components/global/Popup/PopupTwo";
import { CiSearch } from "react-icons/ci";
import { IoMdCheckmark } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

type ModalPropsTypes = {
  setIsFormModalShown: Dispatch<SetStateAction<boolean>>;
  setDocumentImage: Dispatch<SetStateAction<string | null>>;
  setDocumentImageFront: Dispatch<SetStateAction<string | null>>;
  setDocumentImageBack: Dispatch<SetStateAction<string | null>>;
  isFormModalShown: boolean;
  setisEditingProfilePicture: React.Dispatch<
    React.SetStateAction<{
      isEditing: boolean;
      image: string | null;
    }>
  >;
  isEditingProfilePicture: {
    isEditing: boolean;
    image: string | null;
  };
  setisEditingImageFront: Dispatch<SetStateAction<boolean>>;
  isEditingImageFront: boolean;
  setisEditingImageBack: Dispatch<SetStateAction<boolean>>;
  isEditingImageBack: boolean;
  setSelectedDocumentFront: React.Dispatch<React.SetStateAction<File | null>>;
  setSelectedDocumentBack: React.Dispatch<React.SetStateAction<File | null>>;
  setIsProfileUpdatedSuccessfully: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  isProfileUpdatedSuccessfully: boolean;
  handleRedirect: () => void;
};

const instructions = [
  "Identity documents are in color",
  "Not a copy of a copy, photos of a photo, or photo pasted into a document",
  "Details including signatures (when required) are clearly visible",
  "Identity documents are in JPG or PNG format and are 5MB or less.",
];

const quickTips = [
  "Clean your camera and take a clear picture of your ID in a well lit room.",
  "Ensure both sides of identity documents are included and not password protected.",
  "Ensure the Information on the ID matches your profile details.",
  "Images of legal entity documents should include all pages.",
];

function UploadIdPopup({
  setIsFormModalShown,
  isFormModalShown,
  setDocumentImageFront,
  setDocumentImageBack,
  setDocumentImage,
  isEditingProfilePicture,
  isEditingImageBack,
  isEditingImageFront,
  setisEditingImageBack,
  setisEditingImageFront,
  setisEditingProfilePicture,
  isProfileUpdatedSuccessfully,
  setIsProfileUpdatedSuccessfully,
  setSelectedDocumentFront,
  setSelectedDocumentBack,
  handleRedirect,
}: ModalPropsTypes) {
  const [isUploadInitiated, setIsUploadInitiated] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploadImageLoading, setIsUploadImageLoading] = useState(false);

  const session = useSession();
  const user = session?.data?.user?.user;
  const isServiceProvider = user?.roles[0] === "SERVICE_PROVIDER";
  const dispatch = useDispatch();
  const authInstance = useAxios();

  const [step, setStep] = useState(0);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImageSrc(imageSrc);
      if (imageSrc) {
        const file = dataURLtoFile(imageSrc, "captured_image.png");
        setSelectedFile(file);
        if (isEditingProfilePicture.isEditing) {
          setisEditingProfilePicture((prev) => ({
            ...prev,
            image: imageSrc,
          }));
        } else if (isEditingImageFront) {
          setDocumentImageFront(imageSrc);
        } else if (isEditingImageBack) {
          setDocumentImageBack(imageSrc);
        }
        setCameraActive(false);
      }
    }
  }, [
    isEditingProfilePicture,
    setDocumentImageFront,
    setDocumentImageBack,
    setisEditingProfilePicture,
    isEditingImageFront,
    isEditingImageBack,
  ]);

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadFile = event.target.files?.[0];
    if (uploadFile) {
      setSelectedFile(uploadFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = reader.result as string;
        setImageSrc(img);
        if (isEditingProfilePicture.isEditing) {
          setisEditingProfilePicture((prev) => ({ ...prev, image: img }));
        } else if (isEditingImageFront) {
          setDocumentImageFront(img);
        } else if (isEditingImageBack) {
          setDocumentImageBack(img);
        }
      };

      // console.log(isEditingImageFront, isEditingImageBack, isEditingProfilePicture.isEditing)
      reader.readAsDataURL(uploadFile);
    }
  };

  const handleCloseModal = () => {
    setIsFormModalShown(false);
    setImageSrc(null);
    setCameraActive(false);
    const newTimeout = setTimeout(() => {
      setisEditingProfilePicture((prev) => ({ ...prev, isEditing: false }));
      setSelectedFile(null);
      setIsProfileUpdatedSuccessfully(false);
      setIsUploadInitiated(false);
    }, 400);
  };

  const handleRemoveDocumentImage = () => {
    setImageSrc(null);
    setCameraActive(false);
    setDocumentImage(null);
    setSelectedFile(null);
  };

  const handleUploadAllDocument = async () => {
    try {
      if (selectedFile && isEditingProfilePicture.isEditing) {
        setIsUploadImageLoading(true);
        let url = isServiceProvider
          ? "service_provider/profile_picture"
          : "customer/profile_picture";
        try {
          await authInstance.post(
            url,
            { image: selectedFile },
            { headers: { "Content-Type": "multipart/form-data" } },
          );
          const profileUrl =
            `${process.env.NEXT_PUBLIC_API_URL}/user/user-profile/` + user?.id;
          const { data } = await axios.get(profileUrl);
          dispatch(updateUserProfile(data));
          dispatch(refreshUserProfile());
        } catch (error: any) {
          console.error(error.response.data);
        } finally {
          dispatch(refreshUserProfile());
        }
      } else if (selectedFile && isEditingImageFront) {
        setSelectedDocumentFront(selectedFile);
      } else if (selectedFile && isEditingImageBack) {
        setSelectedDocumentBack(selectedFile);
      }
      handleCloseModal();
    } catch (error: any) {
      console.error(error.response.data);
    } finally {
      setIsUploadImageLoading(false);
    }
  };
  return (
    <Popup
      isOpen={isFormModalShown}
      onClose={handleCloseModal}
      popUpTitle={
        <h3 className="max-w-[320px] font-clashSemiBold text-lg text-[#140B31] sm:max-w-full lg:text-2xl">
          Upload your identification document
        </h3>
      }
    >
      <div className="relative mt-10 max-h-[750px] min-w-[320px] max-w-[750px] bg-white p-3 px-4 sm:mt-7 sm:min-w-[560px]">
        {isProfileUpdatedSuccessfully ? (
          <div className=" flex flex-col items-center justify-center gap-4">
            <div className="flex size-20 items-center justify-center rounded-full bg-[#C1F6C3] bg-opacity-60">
              <div className=" flex size-14 items-center justify-center rounded-full bg-[#A6F8AA] p-2">
                <PiSealCheckFill className="size-10 text-green-500" />
              </div>
            </div>
            <p className="text-center font-satoshiBold text-2xl font-extrabold text-violet-normal">
              Request Sent!
            </p>
            <p className="text-center font-semibold text-violet-darker">
              You profile request has been sent and awaiting approval
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={handleCloseModal}
                className="rounded-full bg-violet-active px-4 py-2 font-bold text-violet-dark max-sm:text-sm"
              >
                Close
              </button>
              <button
                onClick={handleRedirect}
                className="rounded-full bg-violet-normal px-4 py-2 font-bold text-white max-sm:text-sm"
              >
                Proceed to marketplace
              </button>
            </div>
          </div>
        ) : (
          !isUploadInitiated && (
            <AnimatePresence mode="wait" initial={false}>
              {step == 0 ? (
                <motion.section
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  key="tips-one"
                >
                  <div className="relative my-4 mb-3 h-[150px] rounded-2xl bg-primary">
                    <svg
                      width="688"
                      height="164"
                      viewBox="0 0 688 164"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute -right-2 left-0 h-full w-full"
                    >
                      <path
                        d="M-22 140.427C135.2 72.0269 132.833 22.5936 112 6.42689C91.1667 -9.73977 106.845 58.9374 112 91.9269C144.389 299.199 685 7.5 685 7.5"
                        stroke="#EBE9F4"
                        stroke-opacity="0.18"
                        stroke-width="16"
                      />
                    </svg>
                    <div className="relative z-10 mx-auto flex w-max items-center">
                      <Image
                        src="/assets/images/serviceProvider/id-image.png"
                        alt="ID"
                        width={234}
                        height={136}
                      />
                      <CiSearch
                        strokeWidth={4}
                        size={80}
                        className="absolute left-1/2 top-[40%] -translate-x-1/2 opacity-90"
                        fill="#140B31"
                        color="#140B31"
                      />
                    </div>
                  </div>
                  <h4 className="mb-1 font-satoshiMedium text-base text-[#140B31] sm:text-xl">
                    Before you proceed, check your ID for the following:
                  </h4>
                  <div className="mb-4 px-1">
                    <h5 className="mb-3 text-lg font-semibold text-primary opacity-80">
                      Quick Tips
                    </h5>
                    <ul className="mb-5 space-y-3">
                      {instructions.map((ins) => (
                        <li
                          className="flex items-center gap-2"
                          key={Math.random() * 1234}
                        >
                          <div className="rounded-full bg-[#E6E8EB] p-1">
                            <IoMdCheckmark color="#8A93A1" />
                          </div>
                          <p className="text-[#403E44]">{ins}</p>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setStep(1)}
                      className="rounded-full bg-primary px-6 py-2 font-satoshiBold font-bold text-[#EBE9F4]"
                    >
                      Continue
                    </button>
                  </div>

                  <hr className="mb-3" />

                  <p className="text-sm text-[#546276]">
                    Need help?{" "}
                    <Link href="/contact" className="text-[#FE9B07]">
                      Contact Us
                    </Link>
                  </p>
                </motion.section>
              ) : (
                <motion.section
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  key="tips-two"
                >
                  <div className="relative my-4 mb-3 flex h-[150px] items-center rounded-2xl bg-primary">
                    <svg
                      width="688"
                      height="164"
                      viewBox="0 0 688 164"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute -right-2 left-0 h-full w-full"
                    >
                      <path
                        d="M-22 140.427C135.2 72.0269 132.833 22.5936 112 6.42689C91.1667 -9.73977 106.845 58.9374 112 91.9269C144.389 299.199 685 7.5 685 7.5"
                        stroke="#EBE9F4"
                        stroke-opacity="0.18"
                        stroke-width="16"
                      />
                    </svg>
                    <div className="relative z-10 mx-auto w-10/12  md:w-1/2">
                      <Image
                        src="/assets/images/serviceProvider/id-front-back.png"
                        alt="ID"
                        width={368}
                        height={129}
                        className="absolute left-1/2 top-1/2 z-10 h-[129px] -translate-x-1/2 -translate-y-1/2 object-cover"
                      />
                      <Image
                        src="/assets/images/serviceProvider/face-id.png"
                        alt="ID"
                        width={551}
                        height={146}
                        className="absolute left-1/2 top-1/2 z-20 size-20 -translate-x-1/2 -translate-y-1/2 object-cover brightness-[0.3]"
                      />
                    </div>
                  </div>
                  <h4 className="mb-1 font-satoshiMedium text-base text-[#140B31] sm:text-xl">
                    Before you proceed, check your ID for the following:
                  </h4>
                  <div className="mb-4 px-1">
                    <h5 className="mb-3 text-lg font-semibold text-primary opacity-80">
                      Quick Tips
                    </h5>
                    <ul className="mb-5 space-y-2 sm:space-y-3">
                      {quickTips.map((ins) => (
                        <li
                          className="flex items-center gap-2"
                          key={Math.random() * 1234}
                        >
                          <div className="rounded-full bg-[#E6E8EB] p-1">
                            <IoMdCheckmark color="#8A93A1" />
                          </div>
                          <p className="text-sm text-[#403E44] sm:text-base">
                            {ins}
                          </p>
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setStep(0)}
                        className="rounded-full border border-primary bg-[#EBE9F4] px-6 py-2 font-satoshiBold font-bold text-primary"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setIsUploadInitiated(true)}
                        className="rounded-full bg-primary px-6 py-2 font-satoshiBold font-bold text-[#EBE9F4]"
                      >
                        Proceed
                      </button>
                    </div>
                  </div>

                  <hr className="mb-3" />

                  <p className="text-sm text-[#546276]">
                    Need help?{" "}
                    <Link href="/contact" className="text-[#FE9B07]">
                      Contact Us
                    </Link>
                  </p>
                </motion.section>
              )}
            </AnimatePresence>
          )
        )}
        {isUploadInitiated &&
          (isEditingProfilePicture.isEditing ||
            isEditingImageFront ||
            isEditingImageBack) && (
            <div className=" z-50 my-10 flex flex-col items-center justify-center gap-5 space-y-3 bg-white">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <button
                    className=" rounded-full bg-violet-light px-4 py-2 font-medium text-violet-normal transition-all duration-300 hover:bg-violet-200"
                    onClick={() => {
                      setCameraActive(true);
                    }}
                  >
                    Take a Picture
                  </button>
                  <button
                    className=" rounded-full bg-violet-light px-4 py-2 font-medium text-violet-normal transition-all duration-300 hover:bg-violet-200"
                    onClick={() => {
                      setCameraActive(false);
                      fileInputRef.current?.click();
                    }}
                  >
                    Choose from Documents
                  </button>
                  {/* Handle a form request */}
                  <label className=" hidden h-48 w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-500 p-4">
                    <PiFileArrowDownDuotone className="text-xl text-tc-gray" />
                    <span className="text-center text-tc-gray">
                      Choose a File Upload supports: JPG, PNG.
                    </span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".png, .jpg, .jpeg, .gif"
                      className="hidden"
                      onChange={handleFileInputChange}
                    />
                  </label>
                </div>
                {cameraActive && !imageSrc && (
                  <div>
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      className="mx-auto size-64 object-contain"
                    />
                    <button
                      onClick={capture}
                      className="my-2 rounded-md bg-violet-darkHover p-1 text-sm text-white"
                    >
                      Capture
                    </button>
                  </div>
                )}
                {imageSrc && (
                  <div>
                    <Image
                      src={imageSrc}
                      alt="Captured or Selected"
                      width={400}
                      height={400}
                      className="mx-auto size-64 object-contain"
                    />
                    <button
                      onClick={handleRemoveDocumentImage}
                      className="my-2 rounded-md bg-violet-darkHover p-1 text-sm text-white"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={handleUploadAllDocument}
                className="my-3 flex min-w-32 items-center justify-center rounded-full bg-violet-normal px-4 py-2 text-center text-white transition-opacity duration-300 hover:opacity-90 "
                disabled={!imageSrc}
              >
                {isUploadImageLoading ? (
                  <BeatLoader
                    color={"white"}
                    loading={isUploadImageLoading}
                    size={14}
                  />
                ) : (
                  "Upload Document"
                )}
              </button>
            </div>
          )}
      </div>
    </Popup>
  );
}

export default UploadIdPopup;
