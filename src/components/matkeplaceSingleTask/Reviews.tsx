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
    }
  }
  createdAt: string
}

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 bg-status-purpleBase p-2 rounded-full cursor-pointer"
      onClick={onClick}
    >
      <FaArrowRight className="text-white text-xl" />
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 bg-status-purpleBase p-2 rounded-full cursor-pointer"
      onClick={onClick}
    >
      <FaArrowLeft className="text-white text-xl" />
    </div>
  );
};

const Reviews = ({serviceProviderId}: any) => {
  const session = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const token = session?.data?.user.refreshToken;
  const Auth = session.status === "authenticated";

  useEffect(() => {
    const fetchReviews = async () => {
      if (!serviceProviderId) return;
      try {
        const response = await axios.get(
          `https://smp.jacinthsolutions.com.au/api/v1/service_provider/get-profile/${serviceProviderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReviews(response.data.review);
       
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [serviceProviderId, token]);

console.log(reviews)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: true,
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
        <FaStar key={i} fill={i <= rating ? "gold" : "rgb(203 213 225)"} />
      );
    }
    return stars;
  };

  const formatDate = (createdAtArray: any) => {
    if (!createdAtArray || createdAtArray.length < 3) {
      return 'Invalid Date'; 
    }

    const year = createdAtArray[0];
    const month = createdAtArray[1].toString().padStart(2, '0'); 
    const day = createdAtArray[2].toString().padStart(2, '0');  

    return `${day}-${month}-${year}`; 
  };


 

  return (
    <section className="space-y-8 bg-status-lightViolet p-4 lg:p-10">
      <h1 className="mx-auto text-center text-2xl font-bold lg:text-4xl">
        Reviews/Testimonials from Satisfied Customers
      </h1>

      {reviews.length === 0 ? (
        <p className="animate-pulse text-lg font-medium text-center min-h-[50vh]">
          No current reviews...
        </p>
      ) : (
        <Slider {...settings} className="w-full max-w-6xl mx-auto relative ">
          {reviews.map((review, index) => (
            <div key={index} className="p-12 rounded-lg bg-transparent flex justify-center">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={review.customer.user.profileImage || ""}
                      alt="user"
                      width={50}
                      height={50}
                      className="rounded-full"
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
                <p className="text-base lg:text-lg font-medium">
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
