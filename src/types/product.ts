export type Product = {
  id: string;
  sku: string;
  slug: string;

  name: {
    pl: string;
    uk: string;
  };

  description: {
    pl: string;
    uk: string;
  };

  price: number;

  images: string[];

  category: string;

  stock: number;

  isAvailable: boolean;
};