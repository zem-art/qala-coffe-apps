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
    <div className="relative bg-gray-50 border border-gray-100 rounded-3xl text-center p-8 shadow-sm hover:shadow-lg transition-all duration-300 mx-2 mb-10 mt-4">
      <IconRenderer
        lib="fa"
        name="FaQuoteLeft"
        className="absolute top-6 left-8 text-4xl text-main/20"
        size={35}
      />
      <IconRenderer
        lib="fa"
        name="FaQuoteRight"
        className="absolute bottom-6 right-8 text-4xl text-main/20"
        size={35}
      />

      <div className="flex justify-center mb-4 relative z-10">
        <div className="ring-4 ring-white rounded-full overflow-hidden shadow-sm bg-white">
          <Avatar seed={name} variant="bottts" size={80} />
        </div>
      </div>
      
      <p className="text-gray-600 text-base leading-relaxed mb-6 italic relative z-10 font-medium">"{text}"</p>
      
      <div className="flex justify-center gap-1 mb-4 text-yellow-400 relative z-10">
        {Array.from({ length: rating }).map((_, i) => (
            <IconRenderer
              key={i}
              lib="fa"
              name="FaStar"
              className="drop-shadow-sm"
              size={18}
            />
        ))}
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 relative z-10">{name}</h3>
      <span className="text-sm font-medium text-main relative z-10">{role}</span>
    </div>
  );
};
