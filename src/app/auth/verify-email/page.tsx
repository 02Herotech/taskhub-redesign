import Carousel from "../Carousel";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email | Olójà",
};

const Page = ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  const isVerificationComplete = false;
  const params = new URLSearchParams(searchParams as Record<string, string>);
  const email = params.get("email");
  return (
    <section className="mx-auto flex max-w-[1400px] flex-col p-3 lg:flex-row">
      <Carousel />
      <div className="flex flex-grow items-center justify-center">
        {/* <div className='bg-[#E1DDEE] rounded-2xl'></div> */}
        {isVerificationComplete ? (
          <div className="w-full px-3 pt-8 sm:w-10/12 lg:px-0 lg:pt-0">
            <h2 className="mb-2 font-clashMedium text-xl text-[#190E3F] md:text-4xl">
              Verify complete
            </h2>
            <p className="mb-7 text-sm font-semibold text-[#55535A] md:text-2xl">
              Your email has been successfully verified, proceed to login.
            </p>
            <Link
              href="/auth/login"
              className="rounded-full bg-primary px-10 py-3 font-satoshiBold font-bold text-white"
            >
              Login
            </Link>
          </div>
        ) : (
          <div className="w-full px-3 pt-8 sm:w-10/12 lg:px-0 lg:pt-0">
            <h2 className="mb-2 font-clashMedium text-xl text-[#190E3F] md:text-4xl">
              Verify Email
            </h2>
            <p className="mb-5 text-sm font-semibold text-[#55535A] md:text-2xl">
              A Link has been sent to{" "}
              <span className="text-[#FE9B07]">{email}</span>, click on the link
              to verify Email.{" "}
              <Link href="/auth/sign-up" className="text-primary">
                Change email
              </Link>
            </p>
            <p className="text-sm font-bold text-[#55535A] md:text-lg">
              If you did not receive an email,{" "}
              <Link href="/resend-email" className="text-primary">
                resend email.
              </Link>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
