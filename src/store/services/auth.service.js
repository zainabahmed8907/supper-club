import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./config";


export const signupUser = createAsyncThunk(
  "user/signup",
  async (data, { rejectWithValue }) => {
  
    const signinData = await axiosInstance
      .post("/auth/signup", data)
      .then((response) => {
        localStorage.setItem("token", response.data?.data?.token);
        localStorage.setItem("refreshToken", response.data?.data?.refreshToken);
        return response;
      })

      .catch((err) => rejectWithValue(err.response.data));

    return signinData;
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data, { rejectWithValue }) => {
  
    const logindata = await axiosInstance
      .post("/auth/login", data)
      .then((response) => {
        localStorage.setItem("token", response.data?.data?.token);
        localStorage.setItem("refreshToken", response.data?.data?.refreshToken);
        return response;
      })

      .catch((err) => rejectWithValue(err.response.data));

    return logindata;
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (data, { rejectWithValue }) => {
    const forgotPasswordData = await axiosInstance
      .post("/user/forget-password/send", data)
      .then((response) => {
        return response;
      })
      .catch((err) => rejectWithValue(err));
    return forgotPasswordData;
  }
);

export const verificationCode = createAsyncThunk(
  "user/verification",
  async (code, { rejectWithValue }) => {
    const forgotPasswordData = await axiosInstance
      .get(`/user/forget-password/verify?code=${code}`)
      .then((response) => {
        return response;
      })
      .catch((err) => rejectWithValue(err));
    return forgotPasswordData;
  }
);


export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    const resetPasswordData = await axiosInstance
      .post(`/user/reset-password`, data)
      .then((response) => {
        return response;
      })
      .catch((err) => rejectWithValue(err));
    return resetPasswordData;
  }
);
