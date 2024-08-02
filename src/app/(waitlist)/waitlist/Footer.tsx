import Image from "next/image";
import ScrollToTop from "./ScrollToTop";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="space-y-10 rounded-tl-3xl rounded-tr-3xl bg-violet-normal md:rounded-tl-[5rem] md:rounded-tr-[5rem]  ">
      <section className="grid gap-10 px-4 py-8 text-white md:px-12 lg:grid-cols-2 lg:gap-28 lg:px-20 lg:py-20">
        <div className="space-y-4">
          <h2 className="font-clashSemiBold text-4xl font-semibold">
            Be a part of our online community
          </h2>
          <p className=" text-violet-light">
            Oloja is an AI-driven platform that transcends boundaries,
            connecting diverse communities with a world of authentic products
            and services
          </p>
        </div>
        <div className="space-y-4">
          <Link
            href={"https://www.instagram.com/oloja_au?igsh=NTFoZ2s5YTY0aXdt"}
            target="_blank"
            className="flex flex-col gap-4"
          >
            <Image
              src="/assets/images/waitlist/instagram.png"
              alt="instagram"
              width={20}
              height={20}
              quality={100}
            />
            <span>Connect with us on instagram</span>
          </Link>
          <div className="flex flex-col gap-4">
            <Image
              src="/assets/images/waitlist/twitter.png"
              alt="twitter"
              width={20}
              height={20}
              quality={100}
            />
            <p>Connect with us on x ( formerly twitter)</p>
          </div>
          <div className="flex flex-col gap-4">
            <Image
              src="/assets/images/waitlist/facebook.png"
              alt="Facebook"
              width={20}
              height={20}
              quality={100}
            />
            <p>Connect with us on Facebook</p>
          </div>
        </div>
      </section>
      <div className="flex items-center justify-center">
        <ScrollToTop />
      </div>
      <Image
        src={"/assets/images/waitlist/Olojà.png"}
        alt="oloja"
        width={1500}
        height={1500}
        quality={100}
      />
    </footer>
  );
};

export default Footer;
