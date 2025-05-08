"use client";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useSearchParams } from "next/navigation";
import { setTaskDetail } from "@/store/Features/taskDetails";

//Components
import Header from "./Header";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

function PostTask() {
  const searchParams = useSearchParams();
  const savedTask = useSelector((state: RootState) => state.taskDetails);
  const marketplaceDescription = searchParams.get("marketplaceDescription");
  const dispatch = useDispatch();

  useEffect(() => {
    if (marketplaceDescription) {
      dispatch(setTaskDetail({ key: "currentStep", value: 1 }));
    }
  }, []);
  return (
    <div className="relative z-40">
      <Header />
      <div className="pt-32 lg:pt-44">
        <div className="mt-8 flex items-center justify-center p-4 font-medium lg:p-0">
          <div>
            <div className="mb-10 space-y-2">
              <h2 className="text-4xl text-status-darkpurple">Post a Task</h2>
              <p className="text-[12px] text-[#716F78]">
                Please fill out the information below to post a new task.
              </p>
            </div>
            {/* Form component steps  */}
            <AnimatePresence initial={false}>
              {savedTask.currentStep === 1 ? <StepOne /> : <StepTwo />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostTask;
