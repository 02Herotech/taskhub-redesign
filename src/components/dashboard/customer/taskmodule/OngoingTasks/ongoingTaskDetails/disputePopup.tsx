import Button from "@/components/global/Button";
import Popup from "@/components/global/Popup";
import { SuccessIcon } from "@/icons/icons";
import { disputeReasons } from "@/lib/utils";
import { useCreateDisputeMutation } from "@/services/dispute";
import { AxiosError } from "axios";
import { useState } from "react";

type DisputePopupProps = {
  disputePopup: boolean;
  setDisputePopup: React.Dispatch<React.SetStateAction<boolean>>
  jobId: number
}
const DisputePopup = ({ disputePopup, setDisputePopup, jobId, }: DisputePopupProps) => {
  const [createDispute, { isLoading }] = useCreateDisputeMutation()

  const [disputeReason, setDisputeReason] = useState("");
  const [revisionError, setRevisionError] = useState("");
  const [disputeSent, setDisputeSent] = useState(false);
  const [files, setFiles] = useState<File | null>(null)

  const handleRevisionSubmission = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();



    try {
      formData.append("reason", disputeReason)
      formData.append("jobId", jobId.toString())
      const res = await createDispute(formData).unwrap()
      setDisputeSent(true)
    } catch (error: AxiosError | any) {
      setRevisionError(error.data.message)
    }
  };

  return (
    <Popup
      isOpen={disputePopup}
      onClose={() => setDisputePopup(false)}
    >
      <div className="relative min-h-[200px]  max-h-[90vh] overflow-y-auto rounded-2xl bg-white font-satoshi lg:w-[520px]">
        {disputeSent ? (
          <div className="flex h-full items-center justify-center p-5 font-satoshi lg:p-10">
            <div className="flex flex-col items-center space-y-5">
              <SuccessIcon />
              <h1 className="text-center text-2xl font-black text-[#2A1769] lg:text-3xl">
                Request Successful
              </h1>
              <p className="text-md mb-8 text-center font-satoshiMedium font-medium text-primary lg:text-lg">
                Your request for revision has been sent, in a short time you
                will get a response as to the date it starts and ends.
              </p>
              <Button
                className="w-[125px] rounded-full border-none bg-[#E1DDEE] py-3 font-satoshiBold text-sm text-primary"
                onClick={() => {
                  setDisputePopup(false)
                  setDisputeSent(false)
                  setDisputeReason("")
                }}
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="  space-x-3 px-2  py-4">
              <h2 className="font-bold text-primary lg:text-xl">
                Reasons for Dispute
              </h2>
            </div>
            <form
              onSubmit={handleRevisionSubmission}
              className=" lg:pt-4 w-full px-2"
            >
              <p className="mb-5 font-satoshiMedium  text-primary">
                Just a quick one before you proceed, please leave a reason for initating the dispute.
              </p>
              {disputeReason !== "Others" && (
                <div className="mb-8 space-y-5 font-satoshi text-xl font-medium text-black">
                  {disputeReasons.map((reason, index) => (
                    <div
                      key={index}
                      onClick={() => setDisputeReason(reason.value)}
                      className={`w-full cursor-pointer rounded-full px-5 py-3 text-center ${disputeReason === reason.value
                        ? "bg-primary text-white"
                        : "bg-[#F1F1F2] text-[#716F78]"
                        }`}
                    >
                      <h4>{reason.label}</h4>
                    </div>
                  ))}
                </div>
              )}

              {disputeReason === "Others" && (
                <div className="space-y-2">
                  <label className="text-lg font-bold text-[#140B31]">
                    Others
                  </label>
                  <textarea
                    cols={8}
                    rows={8}
                    placeholder="Describe your reasons briefly"
                    className="h-24  w-full bg-[#EEEEEF] rounded-[18px]  p-2 "
                  />
                </div>
              )}
              <div className="mt-10 mb-2 flex w-full items-center justify-between gap-2">
                {disputeReason === "Others" && (
                  <Button
                    theme="outline"
                    className="w-full rounded-full py-6 max-lg:text-sm"
                    type="button"
                  // onClick={() => setDisputeReason("")}
                  >
                    Back
                  </Button>
                )}

                <Button
                  className={`w-full rounded-full py-6 max-lg:text-sm ${disputeReason != "others" && " w-[70%] mx-auto"}`}
                  type="submit"
                  disabled={isLoading}
                  loading={isLoading}
                >
                  Submit
                </Button>
              </div>
              {revisionError && (
                <p className="mt-4 text-center text-sm text-red-600">
                  {revisionError}
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </Popup>
  )
}

export default DisputePopup