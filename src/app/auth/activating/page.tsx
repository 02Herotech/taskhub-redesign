import axios from "axios";
import Carousel from "../Carousel";
import RedirectLink from "./RedirectLink";

//Todo Error handling
const Page = async ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  const params = new URLSearchParams(searchParams as Record<string, string>);
  const email = params.get("e");
  const token = params.get("t");
  await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/user/verify?t=${token}&e=${email}`,
  );
  return (
    <section className="mx-auto flex max-w-[1400px] flex-col p-3 lg:flex-row">
      <Carousel />
      <div className="flex flex-grow items-center justify-center">
        {/* <div className='bg-[#E1DDEE] rounded-2xl'></div> */}
        <div className="w-full px-3 pt-8 sm:w-10/12 lg:px-0 lg:pt-0">
          <h2 className="mb-2 font-clashMedium text-xl text-[#190E3F] md:text-4xl">
            Email verification complete
          </h2>
          <p className="mb-7 text-sm font-semibold text-[#55535A] md:text-2xl">
            Your email has been successfully verified, proceed to login.
          </p>
          <RedirectLink />
        </div>
      </div>
    </section>
  );
};

export default Page;
