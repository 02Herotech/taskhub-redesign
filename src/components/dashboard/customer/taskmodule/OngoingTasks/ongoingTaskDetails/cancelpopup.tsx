import Button from "@/components/global/Button";
import Popup from "@/components/global/Popup";
import { cancellationReasons } from "@/lib/utils";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

type CancellationPopupProps = {
  cancelPopup: boolean;
  setCancelPopup: React.Dispatch<React.SetStateAction<boolean>>
  jobId: number
}
const CancelPopup = ({ cancelPopup, setCancelPopup, jobId, }: CancellationPopupProps) => {


  const [cancellationReason, setCancellationReason] = useState("");
  const [revisionError, setRevisionError] = useState("");
  const [revisionSent, setRevisionSent] = useState(false);

  const handleRevisionSubmission = async (e: any) => {
    e.preventDefault();

  };

  return (
    <Popup
      isOpen={cancelPopup}
      onClose={() => setCancelPopup(false)}
    >
      <div className="relative min-h-[200px]  max-h-[90vh] overflow-y-auto rounded-2xl bg-white font-satoshi lg:w-[520px]">
        {revisionSent ? (
          <div className="flex h-full items-center justify-center p-5 font-satoshi lg:p-10">
            <div className="flex flex-col items-center space-y-5">
              <svg
                width="70"
                height="70"
                viewBox="0 0 70 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="35"
                  cy="35"
                  r="35"
                  fill="#C1F6C3"
                  fillOpacity="0.6"
                />
                <circle cx="34.5" cy="34.5" r="22.5" fill="#A6F8AA" />
                <path
                  d="M52 34.9924L48.2291 30.742L48.7545 25.1156L43.1755 23.8619L40.2545 19L35 21.2322L29.7455 19L26.8245 23.8619L21.2455 25.1003L21.7709 30.7267L18 34.9924L21.7709 39.2427L21.2455 44.8844L26.8245 46.1381L29.7455 51L35 48.7525L40.2545 50.9847L43.1755 46.1228L48.7545 44.8691L48.2291 39.2427L52 34.9924ZM31.9091 42.6369L25.7273 36.5213L27.9064 34.3655L31.9091 38.3101L42.0936 28.2346L44.2727 30.4056L31.9091 42.6369Z"
                  fill="#4CAF50"
                />
              </svg>
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
                  setCancelPopup(false)
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
              <div className="flex items-start gap-2 p-5 my-2  rounded-3xl bg-[#FFF0DA] text-[#FE9B07] text-sm">
                <HiOutlineExclamationCircle size={25} className="text-xl mt-1" />
                <span>
                  <strong>Cancellation policy:</strong> If you choose to cancel this task, a cancellation fee would be deducted from your payment.
                </span>
              </div>

              <h2 className="font-bold text-primary lg:text-xl">
                Reasons for Cancellation
              </h2>
            </div>
            <form
              onSubmit={handleRevisionSubmission}
              className=" lg:pt-4 w-full px-2"
            >
              <p className="mb-5 font-satoshiMedium  text-primary">
                Just a quick one before you proceed, please leave a reason for canceling the task.
              </p>
              {cancellationReason !== "Others" && (
                <div className="mb-8 space-y-5 font-satoshi text-xl font-medium text-black">
                  {cancellationReasons.map((reason, index) => (
                    <div
                      key={index}
                      onClick={() => setCancellationReason(reason)}
                      className={`w-full cursor-pointer rounded-full px-5 py-3 text-center ${cancellationReason === reason
                        ? "bg-primary text-white"
                        : "bg-[#F1F1F2] text-[#716F78]"
                        }`}
                    >
                      <h4>{reason}</h4>
                    </div>
                  ))}
                </div>
              )}

              {cancellationReason === "Others" && (
                <div className="space-y-2">
                  <label className="text-lg font-bold text-[#140B31]">
                    Others
                  </label>
                  <textarea
                    cols={8}
                    placeholder="Describe your reasons briefly"
                    className="h-24  w-full bg-[#EEEEEF] rounded-[18px]  p-2 "
                  />
                </div>
              )}
              <div className="mt-10 mb-2 flex w-full items-center justify-between gap-2">
                {cancellationReason === "Others" && (
                  <Button
                    theme="outline"
                    className="w-full rounded-full py-6 max-lg:text-sm"
                    type="button"
                    onClick={() => setCancellationReason("")}
                  >
                    Back
                  </Button>
                )}

                <Button
                  className={`w-full rounded-full py-6 max-lg:text-sm ${cancellationReason != "others" && " w-[70%] mx-auto"}`}
                  type="submit"
                  disabled={revisionError != ""}
                // loading={isRevisionLoading}
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

export default CancelPopup