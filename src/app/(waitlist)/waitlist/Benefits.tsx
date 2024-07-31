import Image from "next/image";
import Link from "next/link";

const Benefits = () => {
  return (
    <section className="space-y-8 py-4 ">
      <h2 className="mx-auto max-w-screen-md text-center font-clashSemiBold text-3xl font-semibold md:text-4xl">
        Discover the <span className="text-violet-normal">benefits</span> that
        awaits you upon joining us
      </h2>
      <article className="flex justify-center gap-6  max-md:flex-wrap lg:justify-between">
        {/* ------- */}
        <div className="flex max-w-sm flex-col gap-4 rounded-md bg-violet-light p-4">
          <span className="w-fit rounded-full bg-violet-normal p-2">
            <Image
              src={"/assets/images/waitlist/Vector.png"}
              alt="image"
              width={20}
              height={20}
            />
          </span>
          <p className="font-clashSemiBold text-lg font-semibold text-violet-normal">
            Seamless connection
          </p>
          <p className="font-satoshiMedium">
            Connect effortlessly with diverse individuals and businesses. Find
            services, products and community. We help you easily find essential
            services and give you access to resources tailored to your needs.
          </p>
        </div>
        {/* ------- */}
        <div className="flex max-w-sm flex-col gap-4 rounded-md bg-violet-light p-4">
          <span className="w-fit rounded-full bg-violet-normal p-2">
            <Image
              src={"/assets/images/waitlist/Vector1.png"}
              alt="image"
              width={20}
              height={20}
            />
          </span>
          <p className="font-clashSemiBold text-lg font-semibold text-violet-normal">
            Thriving Marketplace
          </p>
          <p className="font-satoshiMedium">
            Discover a vibrant marketplace where you can buy, sell and trade.
            From shopfronts to service providers, find everything in one place!
            Immigrants can showcase their skills, offer products and tap into
            new customer bases.
          </p>
        </div>
        {/* ------ */}
        <div className="flex max-w-sm flex-col gap-4 rounded-md bg-violet-light p-4">
          <span className="w-fit rounded-full bg-violet-normal p-2">
            <Image
              src={"/assets/images/waitlist/Vector2.png"}
              alt="image"
              width={20}
              height={20}
            />
          </span>
          <p className="font-clashSemiBold text-lg font-semibold text-violet-normal">
            Empowered Community
          </p>
          <p className="font-satoshiMedium">
            Join a supportive community of like minded individuals, share
            knowledge, experiences and ideas. Our platform offers a welcoming
            space to connect with people, share cultural experiences and access
            valuable resources.
          </p>
        </div>
      </article>
      <div className="mx-auto flex w-fit gap-6">
        <Link
          href={"/waitlist-join"}
          className="rounded-full border border-violet-normal bg-violet-normal px-6 py-3 font-satoshiMedium text-sm font-bold text-white transition-opacity duration-300 hover:opacity-90 "
        >
          Join Waitlist
        </Link>
        <button className="rounded-full border border-violet-normal bg-violet-light px-6 py-3 font-satoshiMedium text-sm font-bold text-violet-normal  transition-colors duration-300 hover:bg-violet-100">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default Benefits;
