import Carousel from "../Carousel";
import Link from "next/link";
import { Metadata } from "next";
import ResendEmail from "./ResendEmail";

export const metadata: Metadata = {
  title: "Verify Email | Olójà",
};

const Page = ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  const params = new URLSearchParams(searchParams as Record<string, string>);
  const email = params.get("email");
  return (
    <section className="mx-auto flex max-w-[1400px] flex-col p-3 lg:flex-row">
      <Carousel />
      <div className="flex flex-grow items-center justify-center">
        <div className="w-full px-3 pt-8 sm:w-10/12 lg:px-0 lg:pt-0">
          <h2 className="mb-7 font-clashMedium text-xl text-[#190E3F] md:text-4xl">
            Verify Email
          </h2>
          <p className="mb-4 text-sm font-semibold text-[#55535A] md:text-2xl">
            A link has been sent to{" "}
            <span className="text-[#FE9B07]">{email}</span>, click on the link
            to verify email.{" "}
            <Link href="/auth/sign-up" className="text-primary underline">
              Change email
            </Link>
          </p>
          <ResendEmail email={email}/>
        </div>
      </div>
    </section>
  );
};

export default Page;
