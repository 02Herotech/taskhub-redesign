"use client";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { MdArrowOutward } from "react-icons/md";
import { useGetAllTaskByCustomerIdQuery } from "@/services/tasks";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Image from "next/image";
import { truncateText } from "@/utils/marketplace";
import Link from "next/link";

function Tasks() {
  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const userId = user?.customerId;
  const { data, isLoading, error } = useGetAllTaskByCustomerIdQuery(userId!, {
    skip: !userId,
  });

  type TaskType = NonNullable<typeof data>[number];

  function displayTaskStatus(task: TaskType) {
    if (task.taskStatus == "COMPLETED") {
      return <div className="mb-2 text-sm sm:text-xs text-[#34B367]">Completed</div>;
    } else if (task.taskStatus == "ONGOING") {
      return <div className="mb-2 text-sm sm:text-xs text-[#FEA621]">Ongoing</div>;
      //@ts-ignore
    } else if (task.assignedTo) {
      return <div className="mb-2 text-sm sm:text-xs text-primary">Assigned</div>;
    } else {
      return <div className="mb-2 text-sm sm:text-xs text-[#045AA6]">Open</div>;
    }
  }
  return (
    <section className="w-full md:w-2/5">
      <h3 className="mb-1 font-semibold text-[#0000009E]">My Tasks</h3>
      <div className="relative h-[550px] overflow-y-auto rounded-2xl border border-[#0000001A] px-3">
        {isLoading && (
          <div className="flex h-full w-full items-center justify-center">
            <Image
              src="/assets/images/marketplace/loader.gif"
              alt="loader"
              width={80}
              height={80}
            />
          </div>
        )}
        {data && (
          <>
            {data.length < 1 ? (
              <div className=" py-10">
                <Image
                  src="/assets/images/dashboard/empty-task.jpg"
                  alt="Empty Transaction history"
                  width={958}
                  height={948}
                  className="mx-auto mb-14 w-1/2"
                />
                <p className="mb-4 text-center font-semibold text-[#2A1769]">
                  You have no tasks yet. Add a task to find <br /> the perfect
                  service provider
                </p>

                <button className="mx-auto flex gap-2 rounded-full bg-[#E58C06] px-4 py-2 font-bold text-white">
                  <span>Post A Task</span>
                  <div className="rounded-full bg-white p-1">
                    <MdArrowOutward color="#E58C06" />
                  </div>
                </button>
              </div>
            ) : (
              <ul className="space-y-3 py-3">
                {data.slice(0, 6).map((task) => (
                  <li
                    className="flex justify-between rounded-2xl border border-[#00000003] bg-[#EBE9F44D] p-3"
                    key={Math.random() * 1234}
                  >
                    <div>
                      {displayTaskStatus(task)}
                      <p className="mb-4 font-satoshiBold text-base font-bold text-[#01353D] sm:text-xs">
                        {task.taskBriefDescription}
                      </p>
                      <p className="max-w-[200px] text-sm text-[#00323A] sm:text-xs">
                        {truncateText(task.taskDescription, 66)}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="mb-3 text-right font-satoshiBold text-2xl font-bold text-[#E58C06]">
                        ${task.customerBudget}
                      </div>
                      <div className="mb-1 flex items-center gap-2 text-[#716F78]">
                        <IoLocationOutline />
                        <span className="text-[10px] font-medium">
                          {task.state ? task.state : "Remote"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[#716F78]">
                        <CiCalendar />
                        <span className="text-[10px] font-medium">
                          Sat, June 8th
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
                <div className="w-full bg-white">
                  <Link
                    href="/customer/tasks"
                    className="ml-auto block w-max font-satoshiBold font-bold text-primary"
                  >
                    View all
                  </Link>
                </div>
              </ul>
            )}
          </>
        )}
      </div>
    </section>
  );
}

Tasks.displayName = "ProfileTaskPreview";
export default Tasks;
