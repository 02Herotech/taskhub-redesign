"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

type Image = { imageUrl: string; title: string; description: string };

const slides: Image[] = [
  {
    imageUrl: "/assets/images/onboarding/login-lesbians.jpg",
    title: "Get tasks done in few clicks",
    description: "Get tasks done in few clicks",
  },
  {
    imageUrl: "/assets/images/onboarding/login-delivery-man.jpg",
    title: "Monetize your skills",
    description:
      "Get paid by doing what you love. find customers in need of your expertise!",
  },
  {
    imageUrl: "/assets/images/onboarding/login-friends.jpg",
    title: "Get connected!",
    description:
      "Find your ideal customer and the best service provider, get connected in no time!",
  },
];

function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 }),
  ]);

  const [numberOfSlides, setNumberOfSlides] = useState<number>(0);
  //@ts-ignore
  const [currentIndex, setCurrentIndex] = useState(0);

  //@ts-ignore
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap()); // Get the active slide index
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setNumberOfSlides(emblaApi.slideNodes().length);
    // emblaApi.on('select', onSelect);
    // return () => {
    //   emblaApi?.off('select', onSelect);
    // };
  }, [emblaApi]);

  return (
    <section className="relative z-10 h-[300px] max-h-[1000px] w-full min-w-[320px] overflow-hidden rounded-xl lg:h-screen lg:min-h-[600px] lg:w-[45%] lg:max-w-[600px]">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full">
          {slides.map((slide) => (
            <div
              className="embla__slide relative h-full w-2/3"
              key={Math.random() * 1234}
            >
              <Image
                src={slide.imageUrl}
                alt="Slider image one"
                className="h-full object-cover object-top"
                width={4096}
                height={2371}
              />
              <div className="absolute bottom-5 left-1/2 z-30 w-11/12 -translate-x-1/2 rounded-xl border-red-500 bg-[#878490D9] p-3 text-white md:bottom-8 md:p-5">
                <div className="mb-4 text-center text-white lg:text-left">
                  <h5 className="mb-2 text-base font-semibold md:mb-4 md:text-2xl">
                    {slide.title}
                  </h5>
                  <p className="mx-auto max-w-[307px] text-sm md:max-w-[437px] md:text-xl lg:mx-0">
                    {slide.description}
                  </p>
                </div>
                <div className="flex justify-center gap-2 md:gap-3">
                  {Array.from({ length: numberOfSlides }).map((_, index) => (
                    <button
                      className={
                        "size-2 rounded-full md:size-3 " +
                        (currentIndex === index ? "bg-white" : "bg-[#716F78]")
                      }
                      key={index}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Carousel.displayName = "OnboardingCarousel";

export default Carousel;
