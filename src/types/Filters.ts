export interface ProductFilters {
  category: string;
  sort: 'newest' | 'price-asc' | 'price-desc';
  priceRange: [number, number];
  search: string;
  sizes: string[];
  colors: string[];
  availability: 'all' | 'inStock' | 'outOfStock';
  tags: string[];
  minRating: number;
}