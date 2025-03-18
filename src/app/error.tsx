"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <section className="mx-auto flex h-[80vh] max-w-[1400px] flex-col items-center justify-center p-3">
      <Image
        src="/assets/images/error-occured.jpg"
        alt="Error image"
        width={2000}
        height={2000}
        className="mx-auto w-10/12 max-w-[400px]"
      />
      <div className="text-center">
        <h4 className="mb-5 font-satoshiBold text-xl font-bold text-[#2A1769] md:text-3xl">
          Opps! something went wrong.
        </h4>
        <p className="mb-2 text-base md:text-2xl">
          We’re sorry, but an unexpected error has occurred.
        </p>
        <p className="text-base md:text-2xl">
          Try refreshing the page or going back to the homepage. If the problem
          persists, please <br />{" "}
          <Link
            href="/contact"
            className="font-satoshiBold font-bold text-primary"
          >
            contact support.
          </Link>
        </p>
        <div className="mx-auto my-3 mt-8 flex w-max gap-3">
          <button
            onClick={() => reset()}
            className="rounded-full bg-primary px-8 py-2 font-satoshiBold font-bold text-white"
          >
            Retry
          </button>
          <Link
            href="/home"
            className="rounded-full border border-primary bg-[#EBE9F4] px-6 py-2 font-satoshiBold font-bold text-primary"
          >
            Go home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Error;
