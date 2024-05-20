"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { BiCheck, BiXCircle } from "react-icons/bi";
import { PiFileArrowDownDuotone } from "react-icons/pi";

type ModalPropsTypes = {
  setIsFormModalShown: Dispatch<SetStateAction<boolean>>;
  isFormModalShown: boolean;
};

const EditProfileModal = ({
  setIsFormModalShown,
  isFormModalShown,
}: ModalPropsTypes) => {
  const [isUploadInitiated, setIsUploadInitiated] = useState(false);
  const [isUploadCompleted, setIsUploadCompleted] = useState(false);
  const [documentImage, setDocumentImage] = useState<{ image: File | null }>({
    image: null,
  });

  const handleSetDocumentImage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setDocumentImage({ image: uploadedFile });
    }
  };

  const handleCloseModal = () => {
    setIsFormModalShown(false);
    setIsUploadInitiated(false);
    setDocumentImage({ image: null });
    setIsUploadCompleted(false);
  };

  const handleRemoveDocumentImage = () => {
    setDocumentImage({ image: null });
  };

  const handleUploadAllDocument = () => {
    setIsUploadCompleted(true);
    // setIsFormModalShown(false);
    // setIsUploadInitiated(false);
    // setDocumentImage({ image: null });
  };

  return (
    <section
      className={`fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-black bg-opacity-60 transition-opacity duration-500 ${isFormModalShown ? "pointer-events-auto opacity-100 " : "pointer-events-none opacity-0"} `}
    >
      <div className="relative w-[90%] max-w-xl  space-y-10 rounded-3xl bg-white p-4  lg:p-10 ">
        <button
          className="absolute right-6 top-3 rounded-full bg-violet-light p-2"
          onClick={handleCloseModal}
        >
          <BiXCircle className=" h-6 w-6 text-violet-normal" />
        </button>
        {isUploadInitiated ? (
          isUploadCompleted ? (
            <div className="min-h-89 flex flex-col items-center justify-center gap-4">
              <h2 className="text-center text-3xl font-bold text-violet-normal">
                Document Recieved and Awaiting validation
              </h2>
              <p className="text-center text-violet-normal">
                We will get back to you shortly
              </p>
            </div>
          ) : (
            <div className=" flex flex-col items-center justify-center space-y-3">
              <label className=" text-slate-500">Upload Profile Picture</label>
              {/* Check if taskImage is uploaded */}
              {documentImage.image ? (
                <div className="flex flex-col items-center justify-center gap-2">
                  {/* Display a disabled input with message */}
                  <label
                    htmlFor="file-upload"
                    className="flex h-48 w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 p-4"
                  >
                    <PiFileArrowDownDuotone className="text-xl text-tc-gray" />
                    <span className="w-full min-w-80 text-center text-tc-gray">
                      Image Uploaded
                    </span>
                  </label>
                  <button
                    className="rounded-lg bg-tc-gray px-3 py-1 text-white"
                    onClick={handleRemoveDocumentImage}
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                // If no taskImage is uploaded, render the file input
                <label
                  htmlFor="file-upload"
                  className="flex h-48 w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-500 p-4"
                >
                  <PiFileArrowDownDuotone className="text-xl text-tc-gray" />
                  <span className="text-center text-tc-gray">
                    Choose a File Upload supports: JPG, PDF, PNG.
                  </span>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".png, .jpg, .jpeg, .gif"
                    className="hidden"
                    onChange={(e) => handleSetDocumentImage(e)}
                    disabled={!isUploadInitiated}
                  />
                </label>
              )}
              <button
                onClick={handleUploadAllDocument}
                className="my-3 rounded-full bg-violet-normal px-4 py-2 text-white transition-opacity duration-300 hover:opacity-90 "
                disabled={!documentImage.image}
              >
                Upload Document
              </button>
            </div>
          )
        ) : (
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
                  Selfie should be taken on a mobile phone.
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
              <button className="my-2 flex items-center gap-2 text-sm text-violet-normal">
                Need help?
                <span className="text-orange-normal underline">Contact us</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EditProfileModal;
