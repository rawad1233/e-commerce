import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getProducts } from '@/features/products/productsSlice';
import ProductCard from '@/components/product/ProductCard';
import ch1 from '@/assets/icons/images/ch1.png';
import ch2 from '@/assets/icons/images/ch2.png';

const GENDER_TABS = ['MEN', 'WOMEN', 'KIDS'];
const PAGE_SIZE = 4;

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((s) => s.products);
  const [activeGender, setActiveGender] = useState('MEN');
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(getProducts({ limit: 20 }));
  }, [Dispatch]);

  const totalPages = Math.ceil(items.length / PAGE_SIZE);
  const pageItems = items.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-10 pb-16">
        <div className="flex gap-6 mb-6">
          {GENDER_TABS.map((g) => (
            <button
              key={g}
              onClick={() => setActiveGender(g)}
              className={`text-xs uppercase tracking-widest pb-1 border-b-2 transition-colors ${
                activeGender === g ? 'border-ink text-ink font-medium' : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted mb-3">Summer 2024</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95]">
              {t('home.newCollection')}
            </h1>
            <Link
              to="/products"
              className="inline-flex items-center gap-3 mt-8 text-xs uppercase tracking-widest border border-ink px-6 py-3 hover:bg-ink hover:text-paper transition-colors"
            >
              {t('home.shopNow')}
              <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-[3/4] bg-paper-dim overflow-hidden">
              <img src={ch1} alt="Collection 1" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[3/4] bg-paper-dim overflow-hidden">
              <img src={ch2} alt="Collection 2" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* New this week */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl font-bold flex items-center gap-2">
            {t('home.thisWeek')}
            <span className="text-xs text-muted bg-paper-dim px-2 py-0.5 rounded-full">{items.length}</span>
          </h2>
          <div className="flex items-center gap-3">
            <Link to="/products" className="text-xs uppercase tracking-widest text-muted hover:text-ink">
              {t('home.viewAll')}
            </Link>
            <div className="flex gap-1">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="w-7 h-7 border border-line flex items-center justify-center disabled:opacity-30"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="w-7 h-7 border border-line flex items-center justify-center disabled:opacity-30"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {pageItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Collections banner */}
      <section className="bg-ink text-paper py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-paper/60 mb-3">23-24</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold">{t('home.collections')}</h2>
            </div>
            <div className="flex gap-5 text-xs uppercase tracking-widest text-paper/60">
              {GENDER_TABS.map((g) => (
                <span key={g} className="hover:text-paper cursor-pointer">{g}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.slice(4, 7).map((product) => (
              <div key={product.id} className="aspect-[3/4] overflow-hidden bg-paper/10">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">{t('home.approach')}</h2>
        <p className="text-sm text-muted leading-relaxed">{t('home.newCollectionDesc')}</p>
      </section>
    </div>
  );
};

export default Home;