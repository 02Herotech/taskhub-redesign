"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

interface Review {
  comment: string;
  rating: number;
  customer: {
    user: {
      firstName: string
      lastName: string
      profileImage: string;
    }
  }
}

const Reviews = ({ serviceProviderId }: any) => {
  const session = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const token = session?.data?.user.refreshToken;
  const Auth = session.status === "authenticated";

  useEffect(() => {
    const fetchReviews = async () => {
      if (!serviceProviderId) return;
      console.log(serviceProviderId)
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
    slidesToShow: 2, // Show 2 reviews per slide to match the image
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <div className="next-arrow">→</div>,
    prevArrow: <div className="prev-arrow">←</div>,
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
      {!Auth ? (
        <div>
          <p className="animate-pulse text-lg font-medium text-center min-h-[30vh]">
            Please login to view reviews
          </p>
        </div>
      ) : reviews.length === 0 ? (
        <p className="animate-pulse text-lg font-medium text-center min-h-[50vh]">
          No current reviews...
        </p>
      ) : (
        <Slider {...settings} className="w-full max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <div key={index} className="p-6 rounded-lg shadow-lg bg-white w-[487px] h-[240px]">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">{renderStars(review.rating)}</div>
                <p className="text-base lg:text-lg font-medium">{review.comment}</p>
                <div className="flex items-end">
                <div className="flex items-center gap-3">
                  <Image
                    src={review.customer.user.profileImage}
                    alt="user"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div className="flex flex-col">
                    <p className="text-lg font-bold">{review.customer.user.firstName}{" "}{review.customer.user.lastName }</p>
                    <p className="text-sm text-gray-500">Date of review drop</p>
                  </div>
                  </div>
                  </div>
              </div>
            </div>
          ))}
      </Slider>
      )}
    </section>
  );
};

export default Reviews;
