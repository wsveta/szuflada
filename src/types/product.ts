export type Product = {
  id: string;

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

  image: string;

  category: string;

  stock: number;

  isAvailable: boolean;
};