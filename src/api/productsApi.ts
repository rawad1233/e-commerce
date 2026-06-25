import axiosClient from './axiosClient';
import type { RawApiProduct, Product } from '../types/Product';

const API_URL = 'https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json';
const STORE_CATEGORY = 'Fashion & Apparel';

let cachedProducts: Product[] | null = null;

const mapProduct = (p: RawApiProduct): Product => ({
  id: p.id,
  name: p.name,
  price: p.priceCents / 100,
  category: p.category,
  subCategory: p.subCategory,
  image: p.image,
  images: [p.image],
  description: p.description,
  rating: p.rating?.stars ?? 0,
  ratingCount: p.rating?.count ?? 0,
  stock: 50,
  brand: null,
  discountPercentage: 0,
  keywords: p.keywords || [],
});

const fetchAllProducts = async (): Promise<Product[]> => {
  if (cachedProducts) return cachedProducts;
  const data: RawApiProduct[] = await axiosClient.get(API_URL);
  cachedProducts = data
    .filter((p) => p.category === STORE_CATEGORY)
    .map(mapProduct);
  return cachedProducts;
};

interface FetchProductsParams {
  limit?: number;
  skip?: number;
  q?: string;
}

interface ProductsResponse {
  items: Product[];
  total: number;
}

export const fetchProducts = async ({
  limit = 20,
  skip = 0,
  q = '',
}: FetchProductsParams = {}): Promise<ProductsResponse> => {
  const all = await fetchAllProducts();
  let filtered = all;
  if (q) {
    const query = q.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.keywords.some((k) => k.toLowerCase().includes(query))
    );
  }
  const sliced = filtered.slice(skip, skip + limit);
  return { items: sliced, total: filtered.length };
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const all = await fetchAllProducts();
  const product = all.find((p) => String(p.id) === String(id));
  if (!product) throw new Error('Product not found');
  return product;
};

export const fetchProductsByCategory = async (
  subCategory: string,
  { limit = 20, skip = 0 }: FetchProductsParams = {}
): Promise<ProductsResponse> => {
  const all = await fetchAllProducts();
  const filtered = all.filter((p) => p.subCategory === subCategory);
  const sliced = filtered.slice(skip, skip + limit);
  return { items: sliced, total: filtered.length };
};

export const fetchCategories = async (): Promise<{ slug: string; name: string }[]> => {
  const all = await fetchAllProducts();
  const subCategories = [...new Set(all.map((p) => p.subCategory))];
  return subCategories.map((name) => ({ slug: name, name }));
};