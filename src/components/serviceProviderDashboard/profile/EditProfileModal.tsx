"use client";

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
import { PiFileArrowDownDuotone } from "react-icons/pi";
import { BeatLoader } from "react-spinners";
import Webcam from "react-webcam";

type ModalPropsTypes = {
  setIsFormModalShown: Dispatch<SetStateAction<boolean>>;
  setDocumentImage: Dispatch<SetStateAction<string | null>>;
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
  setSelectedDocument: React.Dispatch<React.SetStateAction<File | null>>;
  setIsProfileUpdatedSuccessfully: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  isProfileUpdatedSuccessfully: boolean;
};

const EditProfileModal = ({
  setIsFormModalShown,
  isFormModalShown,
  setDocumentImage,
  isEditingProfilePicture,
  setisEditingProfilePicture,
  isProfileUpdatedSuccessfully,
  setIsProfileUpdatedSuccessfully,
  setSelectedDocument,
}: ModalPropsTypes) => {
  // set initial state value
  const [isUploadInitiated, setIsUploadInitiated] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploadImageLoading, setIsUploadImageLoading] = useState(false);

  const session = useSession();
  const token = session?.data?.user?.accessToken;

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImageSrc(imageSrc);
      if (imageSrc) {
        const file = dataURLtoFile(imageSrc, "captured_image.png");
        setSelectedFile(file);
        if (isEditingProfilePicture.isEditing) {
          setisEditingProfilePicture((prev) => ({ ...prev, image: imageSrc }));
        } else {
          setDocumentImage(imageSrc);
        }
        setCameraActive(false);
      }
    }
  }, [isEditingProfilePicture, setDocumentImage, setisEditingProfilePicture]);

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
        } else {
          setDocumentImage(img);
        }
      };
      reader.readAsDataURL(uploadFile);
    }
  };

  const handleCloseModal = () => {
    setImageSrc(null);
    setCameraActive(false);
    setIsFormModalShown(false);
    setIsUploadInitiated(false);
    setSelectedFile(null);
    setisEditingProfilePicture((prev) => ({ ...prev, isEditing: false }));
    setIsProfileUpdatedSuccessfully(false);
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
        const url =
          "https://smp.jacinthsolutions.com.au/api/v1/service_provider/profile_picture";
        const { data } = await axios.post(
          url,
          { image: selectedFile },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );
        console.log(data);
      } else {
        setSelectedDocument(selectedFile);
        console.log(selectedFile);
      }
      handleCloseModal();
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploadImageLoading(false);
    }
  };

  return (
    <section
      className={`fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-60 transition-opacity duration-500 ${isFormModalShown ? "pointer-events-auto opacity-100 " : "pointer-events-none opacity-0"} `}
    >
      <div className="relative w-[90%] max-w-xl rounded-3xl bg-white p-4  lg:p-10 ">
        {/* close modal button */}
        <button
          className="absolute right-6 top-3 rounded-full bg-violet-light p-2"
          onClick={handleCloseModal}
        >
          <BiXCircle className=" h-6 w-6 text-violet-normal" />
        </button>

        {isProfileUpdatedSuccessfully ? (
          <div>
            <h1 className="text-center text-lg font-medium text-violet-darkHover">
              Your Update is received and awaiting Approval
            </h1>
          </div>
        ) : isEditingProfilePicture.isEditing || isUploadInitiated ? (
          <div className=" flex flex-col items-center justify-center gap-5 space-y-3">
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
                    Choose a File Upload supports: JPG, PDF, PNG.
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
        ) : (
          // display this when user sees the modal the first time and
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-violet-dark">
              Upload a Selfie Image with ID
            </h1>
            <div className="space-y-2">
              <h3 className="text-xl  font-bold text-violet-normal">
                Quick Tips
              </h3>
              <p className="flex gap-4">
                <span className="h-fit w-fit rounded-full bg-violet-light p-1 ">
                  <BiCheck className="size-4 text-violet-normal" />
                </span>
                <span className="text-sm font-medium text-slate-500">
                  Take a picture of yourself holding up your preferred document
                  on the left side of your head showing a clear Id number . See
                  example
                </span>
              </p>
              <p className="flex gap-4">
                <span className="h-fit w-fit rounded-full bg-violet-light p-1 ">
                  <BiCheck className="size-4 text-violet-normal" />
                </span>
                <span className="text-sm font-medium text-slate-500">
                  Selfie should be taken on your device.
                </span>
              </p>
              <p className="flex gap-4">
                <span className="h-fit w-fit rounded-full bg-violet-light p-1 ">
                  <BiCheck className="size-4 text-violet-normal" />
                </span>
                <span className="text-sm font-medium text-slate-500">
                  Selfie should be taken in a properly lit room.
                </span>
              </p>
              <p className="flex gap-4">
                <span className="h-fit w-fit rounded-full bg-violet-light p-1 ">
                  <BiCheck className="size-4 text-violet-normal" />
                </span>
                <span className="text-sm font-medium text-slate-500">
                  Note that, the more documents you input for verification, the
                  higher your chances of visibility to potential customers.
                </span>
              </p>
            </div>
            <div>
              <button
                onClick={() => setIsUploadInitiated(true)}
                className="rounded-full bg-violet-normal px-6 py-3 text-white transition-opacity duration-300 hover:opacity-90 "
              >
                Continue
              </button>
              <Link
                href={"/contact"}
                className="my-2 flex items-center gap-2 text-sm text-violet-normal"
              >
                Need help?
                <span className="text-orange-normal underline">Contact us</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EditProfileModal;
