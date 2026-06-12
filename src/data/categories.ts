export type Category = {
    id: number;
    slug: string;
    name_pl: string;
    name_uk: string;
};

export const categories: Category[] = [
    {
        id: 1,
        slug: "kitchen",
        name_pl: "Kuchnia",
        name_uk: "Кухня",
    },
    {
        id: 2,
        slug: "bathroom",
        name_pl: "Łazienka",
        name_uk: "Ванна",
    },
    {
        id: 3,
        slug: "organization",
        name_pl: "Organizacja",
        name_uk: "Організація",
    },
    {
        id: 4,
        slug: "home-care",
        name_pl: "Dom i pielęgnacja",
        name_uk: "Дім і догляд",
    },
];