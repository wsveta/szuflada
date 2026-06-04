import type { Product } from "@/types/product";

export const products: Product[] = [
    {
        id: "striped-bag",
        name: "Striped Bag",
        price: 49.99,
        image: "/products/striped-bag.png",
        description:
            "Містка текстильна сумка для щоденного використання.",
    },
    {
        id: "shopping-list",
        name: "Shopping List Notepad",
        price: 19.99,
        image: "/products/shopping-list.png",
        description:
            "Блокнот для списків покупок, який завжди під рукою.",
    },
    {
        id: "yellow-notepad",
        name: "Yellow Notepad",
        price: 24.99,
        image: "/products/yellow-notepad.png",
        description:
            "Мінімалістичний блокнот для нотаток та планування.",
    },
    {
        id: "pink-mesh-bag",
        name: "Pink Mesh Bag",
        price: 29.99,
        image: "/products/pink-mesh-bag.png",
        description:
            "Легка багаторазова сумка-сітка для покупок.",
    },
    {
        id: "black-sponges",
        name: "Black Sponges",
        price: 14.99,
        image: "/products/black-sponges.png",
        description:
            "Комплект стильних чорних губок для кухні.",
    },
];