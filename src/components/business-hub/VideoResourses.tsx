"use client";
import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

const PlayButton = () => {
  return (
    <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EBE9F4] opacity-70">
      <svg
        width="30"
        height="34"
        viewBox="0 0 30 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-1/2 top-1/2 w-1/2 -translate-x-[46%] -translate-y-1/2"
      >
        <path
          d="M28.4204 14.2547L4.84835 0.436135C2.93312 -0.686085 0 0.402933 0 3.1786V30.8091C0 33.2993 2.72552 34.8 4.84835 33.5516L28.4204 19.7397C30.5232 18.5112 30.5299 15.4832 28.4204 14.2547Z"
          fill="#E58C06"
        />
      </svg>
    </div>
  );
};

function VideoResources() {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      //When API is initialized
      emblaApi.on("init", () => {
        setCanScrollPrevious(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
      });

      //When Slides change
      emblaApi.on("select", () => {
        setCanScrollPrevious(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
        // console.log('Slide changed');
        // console.log('Number of nodes: ', emblaApi.slideNodes().length);
        // console.log('Current Node: ', emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  return (
    <section className="mx-auto max-w-7xl px-5 py-6 sm:px-20 md:py-10">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="font-clashSemiBold text-xl text-[#381F8C]">
          VIDEO RESOURCES
        </h1>
        <Link
          href="#"
          className="hidden font-bold text-[#E58C06] underline md:block"
        >
          View more...
        </Link>
      </header>
      <div className="hidden justify-between md:flex">
        <div className="relative w-[32%]">
          <Image
            src="/assets/images/business-hub/video-one.jpg"
            width={260}
            height={386}
            alt="#"
            className="w-full rounded-lg"
          />
          <PlayButton />
        </div>
        <div className="relative w-[32%]">
          <Image
            src="/assets/images/business-hub/video-two.jpg"
            width={260}
            height={386}
            alt="#"
            className="w-full rounded-lg"
          />
          <PlayButton />
        </div>
        <div className="relative w-[32%]">
          <Image
            src="/assets/images/business-hub/video-three.jpg"
            width={260}
            height={386}
            alt="#"
            className="w-full rounded-lg"
          />
          <PlayButton />
        </div>
      </div>

      <div className="relative md:hidden">
        <div className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              <div className="embla__slide relative">
                <Image
                  src="/assets/images/business-hub/video-one.jpg"
                  width={260}
                  height={386}
                  alt=""
                  className="rounded-xl w-full"
                />
                <PlayButton />
              </div>
              <div className="embla__slide relative">
                <Image
                  src="/assets/images/business-hub/video-two.jpg"
                  width={260}
                  height={386}
                  alt=""
                  className="rounded-xl w-full"
                />
                <PlayButton />
              </div>
              <div className="embla__slide relative">
                <Image
                  src="/assets/images/business-hub/video-three.jpg"
                  width={260}
                  height={386}
                  alt=""
                  className="rounded-xl w-full"
                />
                <PlayButton />
              </div>
            </div>
          </div>
        </div>
        <button
          className={
            "embla__prev absolute -left-4 top-1/2 -translate-y-1/2 rounded-full p-2 " +
            (canScrollPrevious
              ? "bg-[#381F8C] text-white"
              : "bg-[#E1DDEE] text-black")
          }
          onClick={scrollPrev}
        >
          <FaArrowLeftLong />
        </button>
        <button
          className={
            "embla__next absolute -right-4 top-1/2 -translate-y-1/2 rounded-full p-2 " +
            (canScrollNext
              ? "bg-[#381F8C] text-white"
              : "bg-[#E1DDEE] text-black")
          }
          onClick={scrollNext}
        >
          <FaArrowRightLong />
        </button>
      </div>
    </section>
  );
}

export default VideoResources;
