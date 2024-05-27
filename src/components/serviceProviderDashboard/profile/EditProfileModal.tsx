"use client";

import Image from "next/image";
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
import Webcam from "react-webcam";

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

  // handlig image upload
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImageSrc(imageSrc);
      setCameraActive(false);
    }
  }, [webcamRef]);

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  //  ----------------------

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

  const handleFileUpload = () => {
    setCameraActive(false);
    fileInputRef.current?.click();
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

        {isUploadInitiated ? (
          <div className=" flex flex-col items-center justify-center gap-5 space-y-3">
            <label className=" text-slate-500">Upload Profile Picture</label>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <button
                  className=" rounded-full bg-violet-light px-4 py-2 font-medium text-violet-normal transition-all duration-300 hover:bg-violet-200"
                  onClick={() => setCameraActive(true)}
                >
                  Take a Picture
                </button>
                <button
                  className=" rounded-full bg-violet-light px-4 py-2 font-medium text-violet-normal transition-all duration-300 hover:bg-violet-200"
                  onClick={handleFileUpload}
                >
                  Choose from Documents
                </button>
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
                  />
                  <button onClick={capture}>Capture</button>
                </div>
              )}
              {imageSrc && (
                <div>
                  <Image
                    src={imageSrc}
                    alt="Captured or Selected"
                    width={400}
                    height={400}
                  />
                </div>
              )}
            </div>
            <button
              onClick={handleUploadAllDocument}
              className="my-3 rounded-full bg-violet-normal px-4 py-2 text-white transition-opacity duration-300 hover:opacity-90 "
              disabled={!documentImage.image}
            >
              Upload Document
            </button>
          </div>
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
