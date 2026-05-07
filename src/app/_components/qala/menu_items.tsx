"use client";
import Image from "next/image";

interface MenuItemProps {
  image: string;
  title: string;
  description: string;
  price: string;
}

export const MenuItem = ({ image, title, description, price }: MenuItemProps) => {
  const lengthLimit = 110;
  return (
    <a
      href="#"
      className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 border border-gray-100 rounded-2xl transition-all w-full max-w-xl bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 group"
    >
      <div className="bg-gray-50 p-4 rounded-2xl group-hover:scale-105 transition-transform shrink-0">
        <Image src={image} alt={title} width={80} height={80} className="h-20 w-auto object-contain drop-shadow-md" />
      </div>
      <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-main transition-colors">{title}</h3>
        <p className="text-gray-500 text-sm md:text-base mb-3 leading-relaxed">{description.length > lengthLimit ? `${description.substring(0, lengthLimit)}...` : description}</p>
        <span className="text-xl font-extrabold text-main block mt-2">{price}</span>
      </div>
    </a>
  );
};
