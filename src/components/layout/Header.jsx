import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { toggleMobileMenu, closeMobileMenu } from '@/features/ui/uiSlice';
import { selectCartCount } from '@/features/cart/cartSlice';
import { selectWishlistItems } from '@/features/wishlist/wishlistSlice';
import { UserIcon, CartIcon, HeartIcon, Logo } from '@/assets/icons';

const Header = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const mobileMenuOpen = useAppSelector((s) => s.ui.mobileMenuOpen);
  const cartCount = useAppSelector(selectCartCount);
  const wishlistCount = useAppSelector(selectWishlistItems).length;

  const switchLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="sticky top-0 z-50 bg-paper border-b border-line">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16">
        <button className="md:hidden text-ink" onClick={() => dispatch(toggleMobileMenu())} aria-label="Menu">
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" className="text-xs uppercase tracking-widest text-muted hover:text-ink">
            {t('nav.home')}
          </NavLink>
          <NavLink to="/products" className="text-xs uppercase tracking-widest text-muted hover:text-ink">
            Collections
          </NavLink>
          <NavLink to="/products" className="text-xs uppercase tracking-widest text-muted hover:text-ink">
            New
          </NavLink>
        </nav>

        <Link to="/" className="flex items-center">
  <Logo className="h-9 w-auto text-ink" />
</Link>

        <div className="flex items-center gap-5">
          <button
            onClick={switchLanguage}
            className="text-xs uppercase tracking-widest text-muted hover:text-ink transition-colors"
            aria-label="Switch language"
          >
            {i18n.language === 'en' ? 'AR' : 'EN'}
          </button>

          <Link to="/wishlist" className="relative text-ink hover:opacity-60 transition-opacity" aria-label="Wishlist">
            <HeartIcon className="w-[18px] h-[18px] fill-none stroke-ink" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -end-2 bg-ink text-paper text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative text-ink hover:opacity-60 transition-opacity" aria-label={t('nav.cart')}>
            <CartIcon className="w-[18px] h-[18px]" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -end-2 bg-ink text-paper text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/login" className="text-ink hover:opacity-60 transition-opacity" aria-label={t('nav.login')}>
            <UserIcon className="w-[18px] h-[18px]" />
          </Link>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-line bg-paper px-6 py-4 flex flex-col gap-4">
          <NavLink to="/" onClick={() => dispatch(closeMobileMenu())} className="text-sm uppercase tracking-widest">
            {t('nav.home')}
          </NavLink>
          <NavLink to="/products" onClick={() => dispatch(closeMobileMenu())} className="text-sm uppercase tracking-widest">
            Collections
          </NavLink>
          <NavLink to="/products" onClick={() => dispatch(closeMobileMenu())} className="text-sm uppercase tracking-widest">
            New
          </NavLink>
        </nav>
      )}
    </header>
  );
};

export default Header;