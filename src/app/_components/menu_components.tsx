import { MenuItem } from "./menu_items";

const menuItems = [
  {
    image: "/image/menu-1.png",
    title: "our special coffee",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, sed.",
    price: "$8.99",
  },
  {
    image: "/image/menu-2.png",
    title: "our special coffee",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, fugit.",
    price: "$8.99",
  },
  {
    image: "/image/menu-3.png",
    title: "our special coffee",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, recusandae.",
    price: "$8.99",
  },
  {
    image: "/image/menu-4.png",
    title: "our special coffee",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, quas.",
    price: "$8.99",
  },
  {
    image: "/image/menu-5.png",
    title: "our special coffee",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, vitae.",
    price: "$8.99",
  },
  {
    image: "/image/menu-6.png",
    title: "our special coffee",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, expedita!",
    price: "$8.99",
  },
];

export const MenuSection = () => {
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
        {menuItems.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </div>
    </section>
  );
};
