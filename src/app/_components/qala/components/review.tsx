"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ReviewItem } from "../review_item";

const reviews = [
  {
    image: "/image/pic-1.png",
    name: "John Deo",
    role: "satisfied client",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, earum quis dolorem quaerat tenetur illum.",
  },
  {
    image: "/image/pic-2.png",
    name: "John Deo",
    role: "satisfied client",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, fugit.",
  },
  {
    image: "/image/pic-3.png",
    name: "John Deo",
    role: "satisfied client",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, recusandae.",
  },
  {
    image: "/image/pic-4.png",
    name: "John Deo",
    role: "satisfied client",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, vitae.",
  },
];

export const ReviewSection = () => {
  return (
    <section id="review" className="py-16 px-4 bg-gray-50">
      <h1 className="text-6xl font-bold text-center text-main mb-12">
        Reviews{" "}
        <span className="block text-main text-2xl font-normal">what people say</span>
      </h1>
      <div className="max-w-7xl mx-auto">
        <Swiper
          modules={[Autoplay, Pagination]}
          // pagination={{ clickable: true }}
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
          {reviews.map((review, idx) => (
            <SwiperSlide key={idx}>
              <ReviewItem {...review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
