import { createSlice } from "@reduxjs/toolkit";

import { postPayment } from "../services/checkout.service";

// Initial state
const initialState = {
  error: null,

  loading_checkout: false,
  data: [],
};

// Reducer
const checkoutSlice = createSlice({
  name: "checkout",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(postPayment.pending, (state) => {
      state.loading_checkout = true;
      state.data = [];
    }),
      builder.addCase(postPayment.fulfilled, (state, action) => {
        state.loading_checkout = false;
        state.data = action.payload.data;
      }),
      builder.addCase(postPayment.rejected, (state) => {
        state.loading_checkout = true;
      });
  },
});

export default checkoutSlice.reducer;
