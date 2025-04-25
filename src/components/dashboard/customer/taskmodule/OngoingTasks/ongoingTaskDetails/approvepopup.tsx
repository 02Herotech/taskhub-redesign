import Button from "@/components/global/Button";
import Popup from "@/components/global/Popup";
import { useAcceptServiceMutation } from "@/services/bookings";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ApprovePopupProps = {
  approvePaymentPopup: boolean;
  setApprovePaymentPopup: React.Dispatch<React.SetStateAction<boolean>>
  paymentApproved: boolean;
  setPaymentApproved: React.Dispatch<React.SetStateAction<boolean>>
  jobId: number
}

const ApprovePopup = ({ approvePaymentPopup, setApprovePaymentPopup, paymentApproved, setPaymentApproved, jobId }: ApprovePopupProps) => {
  const [paymentError, setPaymentError] = useState("");
  const router = useRouter();
  const [approvePayment, { isLoading: isApproveLoading }] =
    useAcceptServiceMutation();

  const handleApprovePayment = async () => {
    try {
      setPaymentError("");
      const response = await approvePayment({ jobId });

      if (response.error) {
        console.error("Payment approval failed:", response.error);
        setPaymentError("Something went wrong, please try again");
      } else {
        setPaymentApproved(true);
        router.push("/customer/tasks?tab=Completed%20tasks");
      }
    } catch (error) {
      console.error("Payment approval failed:", error);
      setPaymentError("Something went wrong, please try again");
    }
  };
  return (
    //  {approvePaymentPopup && (
    <Popup
      isOpen={approvePaymentPopup}
      onClose={() => setApprovePaymentPopup(false)}
    >
      <div className="relative min-h-[200px] w-full max-w-[600px] overflow-y-auto rounded-2xl bg-white font-satoshi">
        {paymentApproved ? (
          <div className="flex h-full items-center justify-center p-10 font-satoshi">
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
                  fill-opacity="0.6"
                />
                <circle cx="34.5" cy="34.5" r="22.5" fill="#A6F8AA" />
                <path
                  d="M52 34.9924L48.2291 30.742L48.7545 25.1156L43.1755 23.8619L40.2545 19L35 21.2322L29.7455 19L26.8245 23.8619L21.2455 25.1003L21.7709 30.7267L18 34.9924L21.7709 39.2427L21.2455 44.8844L26.8245 46.1381L29.7455 51L35 48.7525L40.2545 50.9847L43.1755 46.1228L48.7545 44.8691L48.2291 39.2427L52 34.9924ZM31.9091 42.6369L25.7273 36.5213L27.9064 34.3655L31.9091 38.3101L42.0936 28.2346L44.2727 30.4056L31.9091 42.6369Z"
                  fill="#4CAF50"
                />
              </svg>
              <h1 className="text-center font-satoshiBold text-3xl font-black text-[#2A1769]">
                Payment Approved!
              </h1>
              <p className="mb-8 text-center font-satoshiMedium text-lg font-medium text-[#140B31]">
                Great! your payment to the service provider has been
                approved.
              </p>
              <div className="items-center justify-center lg:flex">
                <Button
                  className="rounded-full max-lg:text-sm"
                  onClick={() => {
                    setApprovePaymentPopup(false);
                    setPaymentApproved(false);
                  }}
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
              {/* {paymentError && <p className="text-red-600 text-sm mt-4 text-center">{paymentError}</p>} */}
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center p-10 font-satoshi">
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
              <h1 className="font-satoshiBold text-2xl font-extrabold text-[#2A1769]">
                Approve payment
              </h1>
              <p className="mb-8 text-center font-satoshiMedium text-lg font-medium text-[#140B31]">
                Happy with the service? Great! Approve the payment to mark
                it as complete. Revision after this step may attract extra
                charges.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Button
                  className="rounded-full border-none bg-[#E1DDEE] py-3 font-satoshiBold text-sm text-primary"
                  theme="outline"
                  onClick={() => setApprovePaymentPopup(false)}
                  size="sm"
                >
                  Cancel
                </Button>
                <Button
                  loading={isApproveLoading}
                  disabled={paymentError != ""}
                  className="rounded-full py-3 text-sm"
                  size="sm"
                  onClick={handleApprovePayment}
                >
                  Approve
                </Button>
              </div>
              {paymentError && (
                <h4 className="text-center text-sm text-red-500">
                  {paymentError}
                </h4>
              )}
            </div>
          </div>
        )}
      </div>
    </Popup>
  )
}

export default ApprovePopup;