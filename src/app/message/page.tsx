import ChatNavigation from "@/components/main/message/ChatNavigation";
import Image from "next/image";

const ServiceProviderMessage = () => {
  return (
    <main className="space-y-5 p-4 lg:p-8">
      <section className="grid min-h-[calc(100vh-10rem)] gap-10 divide-x divide-slate-400 lg:grid-cols-12 ">
        <ChatNavigation />
        <section className="col-span-7 flex items-center justify-center max-md:hidden">
          <div className="flex h-full min-h-64 items-center justify-center">
            <Image src="/message.svg" width={200} height={200} alt="message" />
          </div>
        </section>
      </section>
    </main>
  );
};

export default ServiceProviderMessage;
