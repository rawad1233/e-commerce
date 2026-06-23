import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { removeFromCart, updateQty, selectCartItems, selectCartTotal } from '@/features/cart/cartSlice';
import Button from '@/components/ui/Button';

const Cart = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);

  if (!items.length) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <p className="text-muted text-sm mb-6">{t('cart.empty')}</p>
        <Link to="/products">
          <Button>{t('home.shopNow')}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="font-display text-3xl font-bold mb-10">{t('cart.title')}</h1>
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 border-b border-line pb-6">
            <div className="w-24 h-32 bg-paper-dim overflow-hidden flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-muted mt-1">${item.price}</p>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-xs text-muted">{t('cart.quantity')}</label>
                <input
                  type="number"
                  min={1}
                  value={item.qty}
                  onChange={(e) => dispatch(updateQty({ id: item.id, qty: Number(e.target.value) }))}
                  className="w-14 border border-line text-sm px-2 py-1"
                />
              </div>
            </div>
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-xs uppercase tracking-widest text-muted hover:text-ink self-start"
            >
              {t('cart.remove')}
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-10 pt-6 border-t border-line">
        <p className="text-sm uppercase tracking-widest">{t('cart.subtotal')}</p>
        <p className="text-xl font-medium">${total.toFixed(2)}</p>
      </div>

      <Link to="/checkout">
        <Button className="w-full mt-8">{t('cart.checkout')}</Button>
      </Link>
    </div>
  );
};

export default Cart;