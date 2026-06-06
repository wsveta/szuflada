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
    <article className="border border-gray-200 dark:border-zinc-600 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900">
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
          className="font-medium text-gray-900 dark:text-white hover:underline"
        >
          {product.name[language]}
        </Link>

        <p className="mt-2 text-gray-600 dark:text-zinc-400">{product.price.toFixed(2)} zł</p>

        <AddToCartButton />
      </div>
    </article>
  );
}