import Link from "next/link";
import Image from "next/image";

function NewsUpdates() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-6 sm:px-20 md:py-10">
      <h1 className="mb-6 font-clashSemiBold text-xl text-[#381F8C]">
        NEWS AND UPDATES
      </h1>
      <div className="flex flex-col items-start gap-6 md:flex-row">
        <figure className="w-full min-w-[300px] max-w-[400px] md:w-1/3">
          <Image
            src="/assets/images/business-hub/noah-webinar.png"
            alt="Webinar flier"
            className="mb-3 w-full rounded-xl"
            width={386}
            height={374}
          />
          <figcaption className="font-clashSemiBold text-2xl text-[#381F8C]">
            Webinar: How to start a business as an immigrant
          </figcaption>
        </figure>
        <div className="mt-3 flex w-full min-w-[300px] overflow-hidden rounded-lg bg-[#F8E9FE] md:mt-5 md:w-2/5">
          <div className="block w-6 self-stretch bg-[#156A52] md:hidden" />
          <div className="p-3">
            <h3 className="mb-3 font-clashSemiBold text-2xl text-[#E58C06]">
              How to Start a Business in Australia With no Money
            </h3>
            <p className="mb-4 font-clashMedium text-lg text-primary">
              Despite the struggles of the last year, the Australian government
              has provided small company owners....
            </p>
            <button className="rounded-[50px] bg-primary p-2 px-3 font-satoshi font-bold text-[#EBE9F4] hover:bg-[#25135f]">
              <Link href="#">Read more</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsUpdates;
