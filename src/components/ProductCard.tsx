import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import AddToCartButton from "./AddToCartButton";
import { useLanguage } from "@/context/LanguageContext";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { language } = useLanguage();

  return (
    <article className="border border-gray-200 rounded-2xl overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square bg-gray-100">
          <Image
            src={product.image}
            alt={product.name[language]}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link
          href={`/products/${product.id}`}
          className="font-medium text-gray-900 hover:underline"
        >
          {product.name[language]}
        </Link>

        <p className="mt-2 text-gray-600">{product.price.toFixed(2)} zł</p>

        <AddToCartButton />
      </div>
    </article>
  );
}