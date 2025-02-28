"use client";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

//Components
import Header from "./Header";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

function PostTask() {
  const savedTask = useSelector((state: RootState) => state.taskDetails);

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
