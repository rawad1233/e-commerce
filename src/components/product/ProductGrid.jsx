import { useTranslation } from 'react-i18next';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  const { t } = useTranslation();

  if (!products?.length) {
    return <p className="text-center text-muted py-16 text-sm">{t('product.noResults')}</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;