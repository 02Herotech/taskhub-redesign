import { IoIosArrowForward } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setTaskDetail } from "@/store/Features/taskDetails";
import { useRouter } from "next/navigation";

function Header() {
  //Todo Progress calculation
  const progress = 0;
  const dispatch = useDispatch();
  const savedTask = useSelector((state: RootState) => state.taskDetails);
  const { currentStep } = savedTask;
  const router = useRouter();

  const handleBackClick = () => {
    if (currentStep > 1) {
      dispatch(setTaskDetail({ key: "currentStep", value: 1 }));
    } else {
      router.back();
    }
  };
  return (
    <div>
      <div className="fixed left-0 top-20 z-20 hidden w-full border-t-2 bg-white shadow-md lg:block">
        <div className="mb-3 flex justify-center space-x-5 pt-4">
          <div
            className={`${
              currentStep === 1
                ? "text-status-purpleBase"
                : "text-status-purpleBase"
            }`}
          >
            <p className="flex items-center gap-2 text-[12px] md:text-[16px] lg:gap-3">
              <span
                className={`${
                  currentStep === 1
                    ? "bg-status-purpleBase text-white"
                    : "bg-status-purpleBase text-white"
                } flex h-[37px] w-[47px] items-center justify-center rounded-[22px] border-none p-3 font-satoshiBold`}
              >
                01
              </span>{" "}
              Services Details
              <span>
                <IoIosArrowForward />
              </span>
            </p>
          </div>
          <div
            className={`${
              currentStep === 2 ? "text-status-purpleBase" : " text-[#716F78]"
            }`}
          >
            <p className="flex items-center gap-2 text-[12px] md:text-[16px] lg:gap-3">
              <span
                className={`${
                  currentStep === 2
                    ? "bg-status-purpleBase text-white"
                    : "bg-[#EAE9EB] text-[#716F78]"
                } flex h-[37px] w-[47px] items-center justify-center rounded-[22px] border-none p-3 font-satoshiBold`}
              >
                02
              </span>{" "}
              Location and Budget
            </p>
          </div>
        </div>
        <hr className="h-[2px] w-full bg-[#EAE9EB] text-[#EAE9EB]" />
        <div className="flex justify-center pb-4">
          <div
            className="container flex w-80 items-center justify-center space-x-5 border border-[#EAE9EB] p-3 lg:w-2/3"
            style={{
              borderRadius: "0px 0px 20px 20px ",
              borderTop: "none",
            }}
          >
            {/* Progress bar */}
            <div className="h-1 w-2/3 overflow-hidden bg-[#EAE9EB]">
              <div
                className={`h-full ${
                  currentStep === 1
                    ? "bg-status-purpleBase"
                    : currentStep === 2
                      ? "bg-status-purpleBase"
                      : "bg-status-purpleBase"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-status-darkpurple">
              {`${progress}% complete`}
            </p>
          </div>
        </div>
      </div>

      <div className="fixed left-0 top-16 z-10 w-full bg-white py-3 shadow-md lg:hidden">
        <div className="relative p-4">
          <FaArrowLeftLong
            className="absolute cursor-pointer text-2xl text-status-purpleBase"
            onClick={handleBackClick}
          />
          <h2 className="text-center font-clashBold text-xl text-[#381F8C]">
            {currentStep === 1 ? "Task Details" : "Location and Budget"}
          </h2>
        </div>
        <div className="flex items-center px-4">
          <div className="h-1 w-full bg-[#EAE9EB]">
            <div
              className="h-full bg-status-purpleBase"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="flex items-center justify-end px-4">
          <span className="ml-2 text-status-purpleBase">{`Step ${currentStep} of 2`}</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
