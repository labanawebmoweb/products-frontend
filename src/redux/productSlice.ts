import { createSlice } from "@reduxjs/toolkit";

interface ProductFormData {
  name: any;
  batchNo: string;
  quantity: number;
  expireDate: string | null;
}

interface ProductState {
  items: ProductFormData[];
}

const initialState: ProductState = {
  items: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    // updateProduct: (state, action) => {
    //   const { index, data } = action.payload;
    //   state.items[index] = data;
    // },
    updateProduct: (state, action) => {
      const { index, updated } = action.payload;
      state.items[index] = updated;
    },

    deleteProduct: (state, action) => {
      state.items.splice(action.payload, 1);
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } =
  productSlice.actions;

export default productSlice.reducer;
