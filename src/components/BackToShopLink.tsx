"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function BackToShopLink() {
  const { t } = useLanguage();

  return (
    <Link href="/" className="text-sm text-gray-500 hover:text-black">
      {t.product.backToShop}
    </Link>
  );
}