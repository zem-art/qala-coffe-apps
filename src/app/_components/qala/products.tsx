type ProductCardProps = {
  name: string;
  image: string;
  price: string | number;
  category?: string;
};

export default function ProductCard({ name, image, price, category }: ProductCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-brown-600 font-bold mt-1">{price}</p>
        {category && (
          <p className="text-sm text-gray-500 mt-2">
            Category: <span className="font-medium">{category}</span>
          </p>
        )}
      </div>
    </div>
  );
}
