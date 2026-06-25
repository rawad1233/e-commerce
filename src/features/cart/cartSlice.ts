import { createSlice } from '@reduxjs/toolkit';

const loadCart = () => {
  try {
    const raw = localStorage.getItem('cart');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const persist = (items) => {
  localStorage.setItem('cart', JSON.stringify(items));
};

const initialState = {
  items: loadCart(), // { id, name, price, image, qty }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id, qty = 1, ...rest } = action.payload;
      const existing = state.items.find((item) => item.id === id);
      if (existing) {
        existing.qty += qty;
        
      } else {
        state.items.push({ id, qty, ...rest });
      }
      persist(state.items);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      persist(state.items);
    },
    updateQty(state, action) {
      const { id, qty } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) item.qty = Math.max(1, qty);
      persist(state.items);
    },
    clearCart(state) {
      state.items = [];
      persist(state.items);
    },
  },
});

export const { addToCart, removeFromCart, updateQty, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.qty, 0);

export default cartSlice.reducer;