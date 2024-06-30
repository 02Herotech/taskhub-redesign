import ChatNavigation from "@/components/main/message/ChatNavigation";
import Image from "next/image";

const ServiceProviderMessage = () => {
  return (
    <main className="container max-w-screen-2xl space-y-5 p-4 lg:p-8">
      <section className="grid gap-10 divide-slate-400 lg:grid-cols-12 lg:divide-x ">
        <section className="col-span-5 h-full max-md:hidden ">
          <ChatNavigation />
        </section>
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
