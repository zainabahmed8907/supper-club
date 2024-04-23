//get user profile
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./config";

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (data, { rejectWithValue }) => {
    const userData = await axiosInstance
      .get("/user/profile")
      .then((response) => {
        return response;
      })
      .catch((err) => rejectWithValue(err.response.data));

    return userData;
  }
);

export const getUserMembership = createAsyncThunk(
  "user/getUserMembership",
  async (data, { rejectWithValue }) => {
    const userData = await axiosInstance
      .get("/user/membership")
      .then((response) => {
        return response;
      })
      .catch((err) => rejectWithValue(err.response.data));

    return userData;
  }
);

export const getBillingPortLink = async () => {
  const userData = await axiosInstance
    .get("/user/billing-portal-url")
    .then((response) => {
      return response.data;
    })
    .catch((err) => rejectWithValue(err.response.data));

  return userData;
};

export const getUserWallet = createAsyncThunk(
  "user/getUserWallet",
  async ({ pageSize, limit, pageNo }, { rejectWithValue }) => {
    const userData = await axiosInstance
      .get(`/user/wallet?pageSize=${pageSize}&limit=${limit}&page=${pageNo}`)
      .then((response) => {
        return response;
      })
      .catch((err) => rejectWithValue(err.response.data));

    return userData;
  }
);
