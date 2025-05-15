import Button from "@/components/global/Button";
import Popup from "@/components/global/Popup";
import { SuccessIcon } from "@/icons/icons";
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
        // router.push("/customer/tasks/ongoing-tasks");
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
              <SuccessIcon />
              <h1 className="text-center font-satoshiBold text-3xl font-black text-[#2A1769]">
                Payment approved!
              </h1>
              <p className="mb-8 text-justify max-w-[500px] mx-auto font-satoshiMedium text-lg font-medium text-[#140B31]">
                Way to gooo!!! you have approved payment to the service provider and they would be notified shortly! Take a minute to leave a review
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
            <div className="flex h-full items-center justify-center p-4 font-satoshi">
              <div className="flex flex-col space-y-3">
                <SuccessIcon />
              <h1 className="font-satoshiBold text-2xl font-extrabold text-[#2A1769]">
                  Satisfied with the service?
              </h1>
                <p className="mb-8  font-satoshiMedium text-lg font-medium text-[#140B31]">
                  Please go ahead to approve payment.
              </p>
                <div className="flex items-center mt-4 space-x-4">
                <Button
                    className="rounded-full border-none bg-[#E1DDEE] py-5 px-8 font-satoshiBold text-sm text-primary"
                  theme="outline"
                  onClick={() => setApprovePaymentPopup(false)}
                  size="sm"
                >
                  Cancel
                </Button>
                <Button
                  loading={isApproveLoading}
                  disabled={paymentError != ""}
                    className="rounded-full py-4 px-8 text-sm"
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