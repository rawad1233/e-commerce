import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchProducts,
  fetchProductById,
  fetchProductsByCategory,
  fetchCategories,
} from '@/api/productsApi';

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (params, { rejectWithValue }) => {
    try {
      return await fetchProducts(params);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getProductsByCategory = createAsyncThunk(
  'products/getProductsByCategory',
  async ({ category, ...params }, { rejectWithValue }) => {
    try {
      return await fetchProductsByCategory(category, params);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getProductById = createAsyncThunk(
  'products/getProductById',
  async (id, { rejectWithValue }) => {
    try {
      return await fetchProductById(id);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getCategories = createAsyncThunk(
  'products/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchCategories();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  items: [],
  total: 0,
  categories: [],
  selectedProduct: null,
  status: 'idle',
  detailStatus: 'idle',
  error: null,
 filters: {
  category: 'all',
  sort: 'newest',
  priceRange: [0, 1000],
  search: '',
  sizes: [],
  colors: [],
  availability: 'all', // 'all' | 'inStock' | 'outOfStock'
  tags: [],
  minRating: 0,
},
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters(state) {
      state.filters = initialState.filters;
    },
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items;
        state.total = action.payload.total;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getProductsByCategory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items;
        state.total = action.payload.total;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getProductById.pending, (state) => {
        state.detailStatus = 'loading';
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.detailStatus = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.detailStatus = 'failed';
        state.error = action.payload;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setFilter, resetFilters, clearSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;