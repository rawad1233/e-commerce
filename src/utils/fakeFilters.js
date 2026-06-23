const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL'];
const COLORS = [
  { name: 'Black', hex: '#0a0a0a' },
  { name: 'White', hex: '#f4f3f1' },
  { name: 'Beige', hex: '#d8cdb8' },
  { name: 'Olive', hex: '#5c5a45' },
  { name: 'Navy', hex: '#1f2a44' },
];
const TAGS = ['New', 'Best Seller', 'Limited'];

const hashId = (id) => {
  let hash = 0;
  const str = String(id);
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

export const getFakeAttributes = (product) => {
  const h = hashId(product.id);
  return {
    sizes: SIZES.filter((_, i) => (h + i) % 3 !== 0), // each product gets a subset
    colors: [COLORS[h % COLORS.length], COLORS[(h + 2) % COLORS.length]],
    tag: TAGS[h % TAGS.length],
    ratingBucket: Math.min(5, Math.round(product.rating || (h % 5) + 1)),
    inStock: product.stock > 0,
  };
};

export const SIZE_OPTIONS = SIZES;
export const COLOR_OPTIONS = COLORS;
export const TAG_OPTIONS = TAGS;