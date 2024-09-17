"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

interface Review {
  text: string;
  rating: number;
}

const Reviews = ({ serviceProviderId }: any) => {
  const session = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const token = session?.data?.user.refreshToken;
  const Auth = session.status === "authenticated"

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
          console.log(response.data.review);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [serviceProviderId, token]);


  // Settings for react-slick slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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

  return (
    <section className="space-y-8 bg-status-lightViolet p-4 lg:p-10">
      <h1 className="mx-auto text-center text-2xl font-bold lg:text-4xl">
        Reviews/Testimonials from Satisfied Customers
      </h1>


      {/* Slider to display fetched reviews */}
      {!Auth ? (<div>
        <p className="animate-pulse text-lg font-medium text-center min-h-[30vh]">Please login to view reviews</p>
      </div>): (reviews.length === 0 ? (
        <p className="animate-pulse text-lg font-medium text-center min-h-[50vh]">
            No current reviews...
          </p>
      ) : (
          <Slider {...settings} className="w-full max-w-lg mx-auto">
          {reviews.map((review, index) => (
            <div key={index} className="flex w-full flex-col gap-6">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  {renderStars(review.rating)}
                </div>
                <p className="font-medium">{review.text}</p>
                <div className="flex items-center gap-3">
                  <Image
                    src="/assets/images/marketplace/singleTask/oluchi.png"
                    alt="user"
                    width={70}
                    height={70}
                  />
                  <div className="flex flex-col">
                    <p className="text-lg font-medium">Customer Name</p>
                    <p className="text-slate-600">Date of review drop</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </Slider>
        )
          )
      }
    </section>
  );
};

export default Reviews;
