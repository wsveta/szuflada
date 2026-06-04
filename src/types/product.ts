import type { Language } from "@/content/siteText";

export type LocalizedText = Record<Language, string>;

export type Product = {
    id: string;
    name: LocalizedText;
    price: number;
    image: string;
    description: LocalizedText;
};