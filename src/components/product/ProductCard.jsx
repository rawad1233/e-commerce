import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { addToCart } from '@/features/cart/cartSlice';
import { toggleWishlist, selectIsWishlisted } from '@/features/wishlist/wishlistSlice';
import { HeartIcon } from '@/assets/icons';

const ProductCard = ({ product }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const wishlisted = useAppSelector(selectIsWishlisted(product.id));

  return (
    <div className="group">
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
          aria-label={t('product.addToWishlist')}
        >
          <HeartIcon
            className={`w-4 h-4 transition-colors ${wishlisted ? 'fill-ink stroke-ink' : 'fill-none stroke-ink'}`}
          />
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
  className="text-[10px] font-semibold uppercase tracking-wider bg-ink text-paper px-3 py-1.5 rounded-full hover:bg-ink/80 active:scale-95 transition-all"
>
  {t('product.addToCart')}
</button>
      </div>
    </div>
  );
};

export default ProductCard;