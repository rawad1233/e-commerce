import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getProductById, clearSelectedProduct } from '@/features/products/productsSlice';
import { addToCart } from '@/features/cart/cartSlice';
import Spinner from '@/components/ui/Spinner';
import { getFakeAttributes, SIZE_OPTIONS } from '@/utils/fakeFilters';

const ProductDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedProduct, detailStatus } = useAppSelector((s) => s.products);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    dispatch(getProductById(id));
    return () => dispatch(clearSelectedProduct());
  }, [dispatch, id]);

  if (detailStatus === 'loading' || !selectedProduct) {
    return (
      <div className="flex justify-center py-32">
        <Spinner size={32} />
      </div>
    );
  }

  const product = selectedProduct;
  const fake = getFakeAttributes(product);
  const images = product.images?.length ? product.images : [product.image];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs text-muted hover:text-ink mb-4">
        <ArrowLeft size={14} />
      </button>

      <p className="text-xs text-muted mb-6">
        <Link to="/" className="hover:text-ink">{t('nav.home')}</Link> /{' '}
        <Link to="/products" className="hover:text-ink">{t('nav.products')}</Link>
      </p>

      <div className="grid md:grid-cols-[80px_1fr_400px] gap-6">
        {/* Thumbnail rail */}
        <div className="hidden md:flex flex-col gap-3 order-1">
          {images.slice(0, 5).map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`w-full aspect-[3/4] overflow-hidden border ${
                activeImage === idx ? 'border-ink' : 'border-line'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Main image */}
        <div className="order-2">
          <div className="aspect-[3/4] bg-paper-dim overflow-hidden mb-3">
            <img src={images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-2 md:hidden">
            {images.slice(0, 5).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-16 h-20 overflow-hidden border ${
                  activeImage === idx ? 'border-ink' : 'border-line'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info panel */}
        <div className="order-3">
          <h1 className="font-display text-2xl font-bold uppercase mb-2">{product.name}</h1>
          <p className="text-xs text-muted mb-4">MRP incl. of all taxes</p>
          <p className="text-xl font-medium mb-6">${product.price}</p>

          <p className="text-sm text-muted leading-relaxed mb-8">{product.description}</p>

          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest text-muted mb-3">Color</p>
            <div className="flex gap-2">
              {fake.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  aria-label={color.name}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === color.name ? 'border-ink scale-110' : 'border-line'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-muted mb-3">{t('product.size') || 'Size'}</p>
            <div className="flex flex-wrap gap-2">
              {SIZE_OPTIONS.map((size) => {
                const available = fake.sizes.includes(size);
                return (
                  <button
                    key={size}
                    disabled={!available}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 text-xs border flex items-center justify-center transition-colors ${
                      !available
                        ? 'border-line text-muted/40 line-through cursor-not-allowed'
                        : selectedSize === size
                        ? 'bg-ink text-paper border-ink'
                        : 'border-line hover:border-ink'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={() =>
              dispatch(
                addToCart({
                  ...product,
                  qty: 1,
                  size: selectedSize,
                  color: selectedColor,
                })
              )
            }
            disabled={product.stock === 0}
            className="w-full bg-ink text-paper py-4 text-xs uppercase tracking-widest hover:bg-ink/85 transition-colors disabled:opacity-40"
          >
            {product.stock === 0 ? t('product.outOfStock') : 'ADD'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;