"use client";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { ReviewItem } from "../review_item";
import { api } from "~/trpc/react";
import { ReviewSkeleton } from "../../skeleton/review-skeleton";

export const ReviewSection = () => {
  const { data: testimonials, isLoading } = api.review.getAllDashboard.useQuery();

  return (
    <section id="review" className="py-20 px-6 lg:px-[9%] bg-white">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-main capitalize tracking-tight mb-2">
          ulasan
        </h1>
        <span className="block text-lg md:text-xl font-medium text-gray-500">
          apa kata mereka
        </span>
      </div>
      <div className="max-w-7xl mx-auto">
        <Swiper
          modules={[Autoplay, Pagination]}
          loop={true}
          grabCursor={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          spaceBetween={20}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
          }}
        >
          {isLoading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <SwiperSlide key={`skeleton-${idx}`}>
                  <ReviewSkeleton />
                </SwiperSlide>
              ))
            : (
              testimonials ? 
                testimonials?.map((review, idx) => (
                  <SwiperSlide key={idx}>
                    <ReviewItem
                      image={review.image ?? ""}
                      name={review.name}
                      role={review.role ?? ""}
                      text={review.message}
                      rating={review.rating}
                    />
                  </SwiperSlide>
                )): []
            )}
        </Swiper>
      </div>
    </section>
  );
};
