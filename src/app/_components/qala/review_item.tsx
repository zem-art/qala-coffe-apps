import Image from "next/image";
import { IconRenderer } from "../IconRenderer";
import { Avatar } from "../avatar-api";

interface ReviewItemProps {
  image: string;
  name: string;
  role: string;
  text: string;
  rating: number
}

export const ReviewItem = ({ image, name, role, text, rating }: ReviewItemProps) => {
  return (
    <div className="relative border border-main hover:border-dashed rounded-xl text-center p-4 shadow-md">
      <IconRenderer
        lib="fa"
        name="FaQuoteLeft"
        className="absolute top-4 left-6 text-6xl text-main z-10 transition-all duration-300 group-hover:top-[-6rem]"
        size={35}
      />
      <IconRenderer
        lib="fa"
        name="FaQuoteRight"
        className="absolute bottom-4 right-6 text-6xl text-main z-10 transition-all duration-300 group-hover:bottom-[-6rem]"
        size={35}
      />

      {/* <Image
        src={image}
        alt={name}
        width={80}
        height={80}
        
      /> */}
      <Avatar seed={name} variant="bottts" size={80} />
      <div className="flex justify-center gap-1 mb-2 text-yellow-500">
        {Array.from({ length: rating }).map((_, i) => (
            <IconRenderer
              key={i}
              lib="fa"
              name="FaStar"
              className="text-yellow mt-2"
              size={20}
            />
        ))}
      </div>
      <p className="text-gray-700 text-base leading-relaxed mb-3">{text}</p>
      <h3 className="text-xl font-semibold text-main">{name}</h3>
      <span className="text-sm text-main">{role}</span>
    </div>
  );
};
