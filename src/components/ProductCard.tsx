import Image from "next/image";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
  onAddToCart: () => void;
};

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const { name, price, image } = product;

  return (
    <article className="border border-gray-200 rounded-2xl overflow-hidden">
      <div className="relative aspect-square bg-gray-100">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-900">{name}</h3>

        <p className="mt-2 text-gray-600">{price.toFixed(2)} zł</p>

        <button
          onClick={onAddToCart}
          className="mt-4 w-full rounded-full bg-black text-white py-3 text-sm"
        >
          Додати в кошик
        </button>
      </div>
    </article>
  );
}