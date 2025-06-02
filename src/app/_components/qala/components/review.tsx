"use client";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { ReviewItem } from "../review_item";
import { api } from "~/trpc/react";
import { ReviewSkeleton } from "../../skeleton/review-skeleton";

export const ReviewSection = () => {
  const { data: testimonials, isLoading } = api.review.getAll.useQuery();

  return (
    <section id="review" className="py-16 px-4 bg-gray-50">
      <h1 className="text-6xl font-bold text-center text-main mb-12 capitalize">
        reviews{" "}
        <span className="block text-main text-2xl font-normal">
          what people say
        </span>
      </h1>
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
            : testimonials?.map((review, idx) => (
                <SwiperSlide key={idx}>
                  <ReviewItem
                    image={review.image ?? ""}
                    name={review.name}
                    role={review.role ?? ""}
                    text={review.message}
                    rating={review.rating}
                  />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </section>
  );
};
