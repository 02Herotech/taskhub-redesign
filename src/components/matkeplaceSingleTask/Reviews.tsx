import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { FaStar, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Image from "next/image";

interface Review {
  comment: string;
  rating: number;
  customer: {
    user: {
      firstName: string;
      lastName: string;
      profileImage: string;
    };
  };
  createdAt: string;
}

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute right-[-40px] top-1/2 -translate-y-1/2 transform cursor-pointer rounded-full bg-status-purpleBase p-2"
      onClick={onClick}
    >
      <FaArrowRight className="text-xl text-white" />
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute left-[-40px] top-1/2 -translate-y-1/2 transform cursor-pointer rounded-full bg-status-purpleBase p-2"
      onClick={onClick}
    >
      <FaArrowLeft className="text-xl text-white" />
    </div>
  );
};

const Reviews = ({ serviceProviderId }: any) => {
  const session = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const token =
    session?.data?.user.accessToken || session?.data?.user.refreshToken;

  useEffect(() => {
    const fetchReviews = async () => {
      if (!serviceProviderId || !token) return;
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/service_provider/get-profile/${serviceProviderId}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setReviews(response.data.review);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [serviceProviderId, token]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: reviews.length < 2 ? 1 : 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: reviews.length > 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          arrows: false,
        },
      },
    ],
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar key={i} fill={i <= rating ? "gold" : "rgb(203 213 225)"} />,
      );
    }
    return stars;
  };

  const formatDate = (createdAtArray: any) => {
    if (!createdAtArray || createdAtArray.length < 3) {
      return "Flexible";
    }

    const year = createdAtArray[0];
    const month = createdAtArray[1].toString().padStart(2, "0");
    const day = createdAtArray[2].toString().padStart(2, "0");

    return `${day}-${month}-${year}`;
  };

  return (
    <section className="space-y-8 bg-status-lightViolet p-4 lg:p-10">
      <h1 className="mx-auto text-center text-2xl font-bold lg:text-4xl">
        Ratings & Reviews
      </h1>

      {reviews.length === 0 ? (
        <p className="min-h-[50vh] animate-pulse text-center text-lg font-medium">
          No current reviews...
        </p>
      ) : (
        <Slider {...settings} className="relative mx-auto w-full max-w-6xl">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex justify-center rounded-lg bg-transparent p-12"
            >
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={
                        review.customer.user.profileImage ||
                        "/assets/images/serviceProvider/user.jpg"
                      }
                      alt="user"
                      width={50}
                      height={50}
                      className="size-[46px] rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <p className="text-lg font-bold">
                        {review.customer.user.firstName}{" "}
                        {review.customer.user.lastName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(review.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="text-base font-medium lg:text-lg">
                  {review.comment}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </section>
  );
};

export default Reviews;
