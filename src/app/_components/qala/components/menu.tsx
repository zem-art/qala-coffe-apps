"use client";
import { api } from "~/trpc/react";
import { MenuItem } from "../menu_items";
import formatCurrency from "~/utils/hooks/formatCurrency";

// const menuItems = [
//   {
//     image: "/image/menu-1.png",
//     title: "our special coffee",
//     description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, sed.",
//     price: "$8.99",
//   },
//   {
//     image: "/image/menu-2.png",
//     title: "our special coffee",
//     description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, fugit.",
//     price: "$8.99",
//   },
//   {
//     image: "/image/menu-3.png",
//     title: "our special coffee",
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, recusandae.",
//     price: "$8.99",
//   },
//   {
//     image: "/image/menu-4.png",
//     title: "our special coffee",
//     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, quas.",
//     price: "$8.99",
//   },
//   {
//     image: "/image/menu-5.png",
//     title: "our special coffee",
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, vitae.",
//     price: "$8.99",
//   },
//   {
//     image: "/image/menu-6.png",
//     title: "our special coffee",
//     description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, expedita!",
//     price: "$8.99",
//   },
// ];

const categoryImages: Record<string, string> = {
  1: "/image/menu-1.png",
  2: "/image/menu-2.png",
  3: "/image/menu-3.png",
  4: "/image/menu-4.png",
  5: "/image/menu-5.png",
  6: "/image/menu-6.png",
};

const MenuItemSkeleton = () => (
  <div className="w-full max-w-xl h-[10rem] animate-pulse bg-background rounded-lg p-4 flex gap-4">
    {/* Gambar */}
    <div className="w-[10rem] h-full bg-gray-300 rounded-lg"></div>
    {/* Konten */}
    <div className="flex flex-col justify-between flex-1 py-1">
      <div className="space-y-2">
        <div className="h-5 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
      <div className="h-6 bg-gray-300 rounded w-1/4"></div>
    </div>
  </div>
);


// Helper untuk mengacak array
function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export const MenuSection = () => {
  const { data: products, isLoading } = api.product.getProductsPublic.useQuery();

  const randomProducts = products
    ? shuffleArray(products).slice(0, 6)
    : [];

  return (
    <section
      id="menu"
      className="relative bg-[url('/image/menu-bg.jpg')] bg-cover bg-center bg-fixed py-20 px-6 lg:px-[9%]"
    >
      {/* Light overlay for readability */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]"></div>

      <div className="relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-main uppercase tracking-tight mb-2">
            menu kami
          </h1>
          <span className="block text-lg md:text-xl font-medium text-gray-700">
            menu populer
          </span>
        </div>

      <div className="flex flex-wrap justify-center gap-10 lg:gap-14">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <MenuItemSkeleton key={index} />
            ))
          : (randomProducts
              ? randomProducts.map((item, index) => (
                  <MenuItem
                    key={item.id || index}
                    image={categoryImages[String(item.categoryId) as keyof typeof categoryImages] || "/image/menu-1.png"}
                    title={item.name}
                    description={item.description ?? ""}
                    price={item?.price ? formatCurrency(item?.price)?.replace("IDR", 'Rp.') : ""}
                  />
                ))
              : [])}
      </div>
      </div>
    </section>
  );
};
