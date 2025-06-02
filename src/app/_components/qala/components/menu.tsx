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
      className="bg-[url('/image/menu-bg.jpg')] bg-cover bg-center py-16 px-4"
    >
      <h1 className="text-6xl font-bold text-center text-main mb-12 uppercase">
        our menu{" "}
        <span className="block text-main text-2xl font-normal">
          popular menu
        </span>
      </h1>

      <div className="flex flex-wrap justify-center gap-14">
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
                    price={formatCurrency(item.price).replace("IDR", 'Rp.')}
                  />
                ))
              : [])}
      </div>
    </section>
  );
};
