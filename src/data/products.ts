import type { Product } from "@/types/product";

export const products: Product[] = [
    {
        id: "striped-bag",
        name: {
            pl: "Torba w paski",
            uk: "Сумка в смужку",
        },
        price: 49.99,
        image: "/products/striped-bag.png",
        description: {
            pl: "Pojemna tekstylna torba do codziennego użytku.",
            uk: "Містка текстильна сумка для щоденного використання.",
        },
    },
    {
        id: "shopping-list",
        name: {
            pl: "Notes na listę zakupów",
            uk: "Блокнот для списку покупок",
        },
        price: 19.99,
        image: "/products/shopping-list.png",
        description: {
            pl: "Notes na listy zakupów, który zawsze jest pod ręką.",
            uk: "Блокнот для списків покупок, який завжди під рукою.",
        },
    },
    {
        id: "yellow-notepad",
        name: {
            pl: "Żółty notes",
            uk: "Жовтий блокнот",
        },
        price: 24.99,
        image: "/products/yellow-notepad.png",
        description: {
            pl: "Minimalistyczny notes do notatek i planowania.",
            uk: "Мінімалістичний блокнот для нотаток та планування.",
        },
    },
    {
        id: "pink-mesh-bag",
        name: {
            pl: "Różowa torba siatkowa",
            uk: "Рожева mesh bag",
        },
        price: 29.99,
        image: "/products/pink-mesh-bag.png",
        description: {
            pl: "Lekka torba wielorazowa na zakupy.",
            uk: "Легка багаторазова сумка-сітка для покупок.",
        },
    },
    {
        id: "black-sponges",
        name: {
            pl: "Czarne gąbki kuchenne",
            uk: "Чорні кухонні губки",
        },
        price: 14.99,
        image: "/products/black-sponges.png",
        description: {
            pl: "Zestaw stylowych czarnych gąbek do kuchni.",
            uk: "Комплект стильних чорних губок для кухні.",
        },
    },
];