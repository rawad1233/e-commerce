import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectWishlistItems, toggleWishlist } from '@/features/wishlist/wishlistSlice';
import { addToCart } from '@/features/cart/cartSlice';
import { HeartIcon } from '@/assets/icons';

const Wishlist = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectWishlistItems);

  const name = "";

  if (!items.length) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 text-center">
        <h1 className="font-display text-2xl font-bold mb-3">Your Wishlist is Empty</h1>
        <p className="text-sm text-muted mb-8">Save items you love by tapping the heart icon.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest border border-ink px-6 py-3 hover:bg-ink hover:text-paper transition-colors"
        >
          {t('home.shopNow') || 'Shop Now'}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
      <h1 className="font-display text-3xl font-bold mb-8">Wishlist</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {items.map((product) => (
          <div key={product.id} className="group">
            <div className="relative aspect-[3/4] overflow-hidden bg-paper-dim">
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <button
                onClick={() => dispatch(toggleWishlist(product))}
                className="absolute top-3 end-3 bg-paper/90 p-2 rounded-full"
                aria-label="Remove from wishlist"
              >
                <HeartIcon className="w-4 h-4 fill-ink stroke-ink" />
              </button>
            </div>
            <div className="pt-3 flex items-center justify-between">
              <div>
                <Link to={`/products/${product.id}`} className="text-sm font-medium block hover:underline">
                  {product.name}
                </Link>
                <p className="text-xs text-muted mt-0.5">${product.price}</p>
              </div>
              <button
                onClick={() => dispatch(addToCart({ ...product, qty: 1 }))}
                className="text-[11px] uppercase tracking-widest border border-ink px-3 py-1.5 hover:bg-ink hover:text-paper transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;