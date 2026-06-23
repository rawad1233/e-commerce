import axiosClient from './axiosClient';

const API_URL = 'https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json';
const STORE_CATEGORY = 'Fashion & Apparel';

let cachedProducts = null;

const fetchAllProducts = async () => {
  if (cachedProducts) return cachedProducts;
  const data = await axiosClient.get(API_URL);
  // Only keep Fashion & Apparel items — this is a clothing store, not a general marketplace.
  cachedProducts = data.filter((p) => p.category === STORE_CATEGORY);
  return cachedProducts;
};

const mapProduct = (p) => ({
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

export const fetchProducts = async ({ limit = 20, skip = 0, q = '' } = {}) => {
  const all = await fetchAllProducts();
  let filtered = all;
  if (q) {
    const query = q.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.keywords?.some((k) => k.toLowerCase().includes(query))
    );
  }
  const sliced = filtered.slice(skip, skip + limit);
  return {
    items: sliced.map(mapProduct),
    total: filtered.length,
  };
};

export const fetchProductById = async (id) => {
  const all = await fetchAllProducts();
  const product = all.find((p) => String(p.id) === String(id));
  if (!product) throw new Error('Product not found');
  return mapProduct(product);
};

export const fetchProductsByCategory = async (subCategory, { limit = 20, skip = 0 } = {}) => {
  const all = await fetchAllProducts();
  const filtered = all.filter((p) => p.subCategory === subCategory);
  const sliced = filtered.slice(skip, skip + limit);
  return {
    items: sliced.map(mapProduct),
    total: filtered.length,
  };
};

export const fetchCategories = async () => {
  const all = await fetchAllProducts();
  const subCategories = [...new Set(all.map((p) => p.subCategory))];
  return subCategories.map((name) => ({ slug: name, name }));
};