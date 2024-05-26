import Image from "next/image";
import React from "react";

const ViewService = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center space-y-8 p-4 lg:p-8">
      <section className="w-screen max-w-2xl space-y-4 rounded-xl bg-[#EBE9F4] p-4 lg:p-8 ">
        <div className="flex justify-between">
          <div className="space-y-8 font-medium text-[#381F8C]">
            <p>A Catering Service Wanted:</p>
            <div>
              <p>Posted by:</p>
              <p>Kelly Jane</p>
            </div>
            <div>
              <p>Total cost </p>
              <p>Est. Budget: $480 </p>
            </div>
            <div>
              <p>To be done:</p>
              <p>Within 3days</p>
            </div>
          </div>
          <div>
            <div className="rounded-full border border-[#14782F] p-2">
              <Image
                src="/assets/images/serviceProvider/use4.png"
                alt="user"
                width={60}
                height={60}
                className="rounded-full"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ViewService;
