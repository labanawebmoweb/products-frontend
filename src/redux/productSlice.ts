import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Product {
  id: number;
  name: string;
}

interface ProductResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}

interface ProductState {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  loading: boolean;
  error: string | null;
  search: string;
}

export const fetchProducts = createAsyncThunk<
  ProductResponse,
  { page?: number; limit?: number; search?: string }
>("products/fetchProducts", async ({ page = 1, limit = 10, search = "" }) => {
  const res = await axios.get(`http://localhost:3000/product`, {
    params: { page, limit, search },
  });

  return {
    data: res.data?.data || [],
    total: res.data?.meta?.total || 0,
    page: res.data?.meta?.page || page,
    limit: res.data?.meta?.limit || limit,
  };
});

const initialState: ProductState = {
  items: [],
  total: 0,
  page: 1,
  limit: 10,
  hasMore: true,
  loading: false,
  error: null,
  search: "",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetProducts(state) {
      state.items = [];
      state.page = 1;
      state.total = 0;
      state.hasMore = true;
    },

    updateSearch(state, action) {
      state.search = action.payload;
      state.page = 1;
      state.items = []; // clear items when search changes
      state.hasMore = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        const { data, total, page, limit } = action.payload;

        // If page = 1 → replace items (new search or first load)
        if (page === 1) {
          state.items = data;
        } else {
          // Append only unique items (avoid duplicates)
          const existing = new Set(state.items.map((p) => p.id));
          const newItems = data.filter((p) => !existing.has(p.id));
          state.items.push(...newItems);
        }

        state.total = total;
        state.page = page;
        state.limit = limit;

        // Check if more pages left
        state.hasMore = state.items.length < total;

        state.loading = false;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load products";
      });
  },
});

export const { resetProducts, updateSearch } = productSlice.actions;
export default productSlice.reducer;
