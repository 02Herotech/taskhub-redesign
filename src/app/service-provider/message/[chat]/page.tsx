import ChatNavigation from "@/components/serviceProviderDashboard/message/ChatNavigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ServiceProviderChat = () => {
  const handleReschedule = () => {};
  return (
    <main className="space-y-5 p-4 lg:p-8">
      <section className="grid gap-10 divide-slate-400 lg:grid-cols-12 lg:divide-x ">
        <section className="col-span-5 max-md:hidden ">
          <ChatNavigation />
        </section>

        {/* Organize this */}
        <section className="w-full space-y-4 lg:col-span-7 lg:px-4">
          <div className="flex cursor-pointer gap-3 ">
            <Image
              src="/assets/images/serviceProvider/jobs/kelly.png"
              alt="user"
              width={60}
              height={60}
              className="size-16 rounded-full"
            />
            <div className="w-full space-y-4">
              <div className="flex w-full cursor-pointer items-center justify-between">
                <p className="cursor-pointer font-medium text-violet-normal">
                  Drain Blockage fix Service Request
                </p>
                <p className="cursor-pointer text-sm text-slate-500 ">$480</p>
              </div>
              <div className="flex w-full cursor-pointer items-center justify-between">
                <p className="cursor-pointer text-sm font-medium text-violet-dark ">
                  Kelly M
                </p>
                <p className="cursor-pointer rounded-md bg-violet-light p-1 text-xs">
                  In Progress
                </p>
              </div>
            </div>
          </div>
          {/* ==== */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/service-proider/dashboard/services"
              className={`rounded-full border border-violet-normal bg-violet-light px-4 py-2 font-medium text-violet-normal transition-all duration-300 hover:bg-violet-200 hover:opacity-90 `}
            >
              View Task
            </Link>
            <button
              className={`rounded-full border border-violet-normal bg-violet-light px-4 py-2 font-medium text-violet-normal transition-all duration-300 hover:bg-violet-200 hover:opacity-90 `}
              // onClick={() => handleReschedule()}
            >
              Reschedule
            </button>
          </div>
        </section>
      </section>
    </main>
  );
};

export default ServiceProviderChat;
