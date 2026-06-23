import { useState } from 'react';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { setFilter, resetFilters } from '@/features/products/productsSlice';
import { SIZE_OPTIONS, COLOR_OPTIONS, TAG_OPTIONS } from '@/utils/fakeFilters';

const AccordionRow = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-line py-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between text-xs uppercase tracking-widest"
      >
        {title}
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
};

const ProductFilters = ({ open, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { filters, categories } = useAppSelector((s) => s.products);

  const toggleArrayValue = (key, value) => {
    const current = filters[key];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    dispatch(setFilter({ [key]: next }));
  };

  return (
    <aside
      className={`fixed md:static inset-0 z-40 bg-paper md:bg-transparent transition-transform md:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } w-full md:w-64 flex-shrink-0 overflow-y-auto md:overflow-visible p-6 md:p-0`}
    >
      <div className="flex items-center justify-between mb-6 md:hidden">
        <h3 className="text-sm font-medium">{t('product.filters')}</h3>
        <button onClick={onClose} aria-label="Close filters">
          <X size={18} />
        </button>
      </div>

      <button
        onClick={() => dispatch(resetFilters())}
        className="text-[11px] uppercase tracking-widest text-muted hover:text-ink mb-4 hidden md:block"
      >
        Reset all
      </button>

      {/* Size */}
      <AccordionRow title="Size" defaultOpen>
        <div className="flex flex-wrap gap-2">
          {SIZE_OPTIONS.map((size) => (
            <button
              key={size}
              onClick={() => toggleArrayValue('sizes', size)}
              className={`w-9 h-9 text-xs border flex items-center justify-center transition-colors ${
                filters.sizes.includes(size)
                  ? 'bg-ink text-paper border-ink'
                  : 'border-line text-ink hover:border-ink'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </AccordionRow>

      {/* Availability */}
      <AccordionRow title="Availability" defaultOpen>
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="radio"
              name="availability"
              checked={filters.availability === 'inStock'}
              onChange={() => dispatch(setFilter({ availability: 'inStock' }))}
            />
            Availability
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="radio"
              name="availability"
              checked={filters.availability === 'outOfStock'}
              onChange={() => dispatch(setFilter({ availability: 'outOfStock' }))}
            />
            Out Of Stock
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="radio"
              name="availability"
              checked={filters.availability === 'all'}
              onChange={() => dispatch(setFilter({ availability: 'all' }))}
            />
            All
          </label>
        </div>
      </AccordionRow>

      {/* Category */}
      <AccordionRow title="Category">
        <div className="space-y-2">
          <button
            onClick={() => dispatch(setFilter({ category: 'all' }))}
            className={`block text-sm text-start ${
              filters.category === 'all' ? 'font-medium text-ink' : 'text-muted'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => dispatch(setFilter({ category: cat.slug }))}
              className={`block text-sm capitalize text-start ${
                filters.category === cat.slug ? 'font-medium text-ink' : 'text-muted'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </AccordionRow>

      {/* Colors */}
      <AccordionRow title="Colors">
        <div className="flex flex-wrap gap-3">
          {COLOR_OPTIONS.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleArrayValue('colors', color.name)}
              aria-label={color.name}
              className={`w-7 h-7 rounded-full border-2 transition-all ${
                filters.colors.includes(color.name) ? 'border-ink scale-110' : 'border-line'
              }`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </AccordionRow>

      {/* Price Range */}
      <AccordionRow title="Price Range">
        <div className="space-y-3">
          <input
            type="range"
            min={0}
            max={1000}
            value={filters.priceRange[1]}
            onChange={(e) =>
              dispatch(setFilter({ priceRange: [0, Number(e.target.value)] }))
            }
            className="w-full"
          />
          <p className="text-xs text-muted">$0 — ${filters.priceRange[1]}</p>
        </div>
      </AccordionRow>

      {/* Collections */}
      <AccordionRow title="Collections">
        <p className="text-xs text-muted">XIV Collections 23-24</p>
      </AccordionRow>

      {/* Tags */}
      <AccordionRow title="Tags">
        <div className="space-y-2">
          {TAG_OPTIONS.map((tag) => (
            <label key={tag} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={filters.tags.includes(tag)}
                onChange={() => toggleArrayValue('tags', tag)}
              />
              {tag}
            </label>
          ))}
        </div>
      </AccordionRow>

      {/* Ratings */}
      <AccordionRow title="Ratings">
        <div className="space-y-2">
          {[4, 3, 2, 1].map((r) => (
            <label key={r} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === r}
                onChange={() => dispatch(setFilter({ minRating: r }))}
              />
              {r}+ stars
            </label>
          ))}
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="radio"
              name="rating"
              checked={filters.minRating === 0}
              onChange={() => dispatch(setFilter({ minRating: 0 }))}
            />
            Any
          </label>
        </div>
      </AccordionRow>
    </aside>
  );
};

export default ProductFilters;