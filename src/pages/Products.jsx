import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getProducts, getProductsByCategory, getCategories, setFilter } from '@/features/products/productsSlice';
import ProductFilters from '@/components/product/ProductFilters';
import ProductGrid from '@/components/product/ProductGrid';
import Spinner from '@/components/ui/Spinner';
import { getFakeAttributes } from '@/utils/fakeFilters';

const QUICK_PILLS = ['NEW', 'SHIRTS', 'POLO SHIRTS', 'BEST SELLERS', 'T-SHIRTS', 'JEANS'];

const Products = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { items, status, filters } = useAppSelector((s) => s.products);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activePill, setActivePill] = useState('NEW');

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (filters.category === 'all') {
      dispatch(getProducts({ limit: 20 }));
    } else {
      dispatch(getProductsByCategory({ category: filters.category, limit: 20 }));
    }
  }, [dispatch, filters.category]);

  const filteredItems = useMemo(() => {
    let result = items.map((p) => ({ ...p, _fake: getFakeAttributes(p) }));

    if (filters.search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.sizes.length) {
      result = result.filter((p) => p._fake.sizes.some((s) => filters.sizes.includes(s)));
    }
    if (filters.colors.length) {
      result = result.filter((p) =>
        p._fake.colors.some((c) => filters.colors.includes(c.name))
      );
    }
    if (filters.tags.length) {
      result = result.filter((p) => filters.tags.includes(p._fake.tag));
    }
    if (filters.availability === 'inStock') {
      result = result.filter((p) => p._fake.inStock);
    } else if (filters.availability === 'outOfStock') {
      result = result.filter((p) => !p._fake.inStock);
    }
    if (filters.minRating > 0) {
      result = result.filter((p) => p._fake.ratingBucket >= filters.minRating);
    }
    result = result.filter((p) => p.price <= filters.priceRange[1]);

    if (filters.sort === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (filters.sort === 'price-desc') result.sort((a, b) => b.price - a.price);

    return result;
  }, [items, filters]);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
      <p className="text-xs text-muted mb-2">
        <Link to="/" className="hover:text-ink">{t('nav.home')}</Link> / <span className="text-ink">{t('nav.products')}</span>
      </p>
      <h1 className="font-display text-3xl font-bold mb-6">{t('nav.products').toUpperCase()}</h1>

      <div className="relative mb-6 max-w-md">
        <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="Search"
          value={filters.search}
          onChange={(e) => dispatch(setFilter({ search: e.target.value }))}
          className="w-full border border-line ps-9 pe-4 py-2.5 text-sm bg-transparent outline-none focus:border-ink"
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setFiltersOpen(true)}
          className="md:hidden flex items-center gap-2 text-xs uppercase tracking-widest"
        >
          <SlidersHorizontal size={14} />
          {t('product.filters')}
        </button>

        <div className="hidden md:block" />

        <select
          value={filters.sort}
          onChange={(e) => dispatch(setFilter({ sort: e.target.value }))}
          className="border border-line text-xs px-3 py-2 bg-transparent outline-none"
        >
          <option value="newest">{t('product.newest')}</option>
          <option value="price-asc">{t('product.priceLowHigh')}</option>
          <option value="price-desc">{t('product.priceHighLow')}</option>
        </select>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-2">
        {QUICK_PILLS.map((pill) => (
          <button
            key={pill}
            onClick={() => setActivePill(pill)}
            className={`text-[11px] uppercase tracking-widest px-3 py-1.5 border whitespace-nowrap transition-colors ${
              activePill === pill ? 'bg-ink text-paper border-ink' : 'border-line text-muted hover:border-ink hover:text-ink'
            }`}
          >
            {pill}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        <ProductFilters open={filtersOpen} onClose={() => setFiltersOpen(false)} />
        <div className="flex-1">
          {status === 'loading' ? (
            <div className="flex justify-center py-20">
              <Spinner size={32} />
            </div>
          ) : (
            <ProductGrid products={filteredItems} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;