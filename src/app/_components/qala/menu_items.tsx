"use client";
import Image from "next/image";

interface MenuItemProps {
  image: string;
  title: string;
  description: string;
  price: string;
}

export const MenuItem = ({ image, title, description, price }: MenuItemProps) => {
  const lengthLimit = 70;
  return (
    <a
      href="#"
      className="flex items-center gap-6 p-8 border border-gray-300 rounded-lg hover:border-main hover:border-dashed transition-all w-full max-w-xl bg-background shadow-md"
    >
      <Image src={image} alt={title} width={40} height={40} className="h-16 w-auto object-contain" />
      <div className="text-main">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-base mb-2">{description.length > lengthLimit ? `${description.substring(0, lengthLimit)}...` : description}</p>
        <span className="text-xl font-bold">{price}</span>
      </div>
    </a>
  );
};
