import { useState, useRef, ChangeEvent } from "react";
import Popup from "@/components/global/Popup/PopupTwo";
import useAxios from "@/hooks/useAxios";
import { PiFileArrowDownDuotone } from "react-icons/pi";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  refreshUserProfile,
  updateUserProfile,
} from "@/store/Features/userProfile";
import Button from "@/components/global/Button";

type Props = {
  isOpenModal: boolean;
  closeModal: () => void;
};

function UploadProfilePicture({ isOpenModal, closeModal }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const authInstance = useAxios();
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const session = useSession();
  const user = session?.data?.user?.user;
  const isServiceProvider = user?.roles[0] === "SERVICE_PROVIDER";

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadFile = event.target.files?.[0];
    if (uploadFile) {
      setSelectedFile(uploadFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = reader.result as string;
        setImageSrc(img);
      };
      reader.readAsDataURL(uploadFile);
    }
  };

  const handleUploadPicture = async () => {
    if (!selectedFile) return;
    try {
      setIsLoading(true);
      let url = isServiceProvider
        ? "service_provider/profile_picture"
        : "customer/profile_picture";
      await authInstance.post(
        url,
        { image: selectedFile },
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      const profileUrl =
        `${process.env.NEXT_PUBLIC_API_URL}/user/user-profile/` + user?.id;
      const { data } = await authInstance.get(profileUrl);

      dispatch(updateUserProfile(data));
      dispatch(refreshUserProfile());

      setImageSrc("");
      setSelectedFile(null);
      closeModal();
    } catch (error: any) {
      console.error(error.response.data);
    } finally {
      dispatch(refreshUserProfile());
      setIsLoading(false);
    }
  };

  return (
    <Popup
      isOpen={isOpenModal}
      onClose={() => {
        setImageSrc("");
        setSelectedFile(null);
        closeModal();
      }}
      popUpTitle={
        <h3 className="font-clashSemiBold text-xl text-primary lg:text-2xl">
          Upload your profile picture
        </h3>
      }
    >
      <div className="mt-10 max-h-[750px] min-w-[320px] max-w-[750px] bg-white p-3 px-4 sm:mt-7 sm:min-w-[560px]">
        <div className="my-10 mb-5 flex flex-col items-center justify-center gap-4">
          <button
            className=" rounded-xl bg-violet-light px-4 py-2 font-medium text-violet-normal transition-all duration-300 hover:bg-violet-200"
            onClick={() => fileInputRef.current?.click()}
          >
            Choose from file
          </button>
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
        {imageSrc && (
          <div>
            <Image
              src={imageSrc}
              alt="Selected image"
              width={250}
              height={250}
              className="mx-auto mb-3 size-[250px] object-cover"
            />
            <button
              onClick={() => {
                setImageSrc("");
                setSelectedFile(null);
              }}
              className="mx-auto mb-2 block w-max rounded-md bg-violet-darkHover p-1 px-3 text-sm text-white"
              type="button"
            >
              Remove
            </button>
          </div>
        )}
        <Button
          className="mx-auto mt-5 rounded-full"
          disabled={isLoading}
          loading={isLoading}
          onClick={handleUploadPicture}
        >
          Upload profile picture
        </Button>
      </div>
    </Popup>
  );
}

export default UploadProfilePicture;
