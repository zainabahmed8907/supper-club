import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./config";

//post payment
export const postPayment = createAsyncThunk(
  "checkout/postPayment",
  async (data, { rejectWithValue }) => {
    const paymentData = await axiosInstance
      .post(`/user/payment-url`, data)
      .then((response) => {
        return response;
      })
      .catch((err) => rejectWithValue(err));
    return paymentData;
  }
);
