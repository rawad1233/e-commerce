export interface RawApiProduct {
  id: string;
  name: string;
  image: string;
  rating: {
    stars: number;
    count: number;
  };
  priceCents: number;
  category: string;
  subCategory: string;
  keywords: string[];
  description: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  subCategory: string;
  image: string;
  images: string[];
  description: string;
  rating: number;
  ratingCount: number;
  stock: number;
  brand: string | null;
  discountPercentage: number;
  keywords: string[];
}