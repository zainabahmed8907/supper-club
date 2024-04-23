import { createSlice } from "@reduxjs/toolkit";
import {
  getUserMembership,
  getUserProfile,
  getUserWallet,
} from "../services/user.service";
import {
  forgotPassword,
  loginUser,
  resetPassword,
  signupUser,
  verificationCode,
} from "../services/auth.service";

// Initial state
const initialState = {
  error: null,
  loading: null,
  user: null,
  success: null,
  message: "",
  subscription: null,
  wallet: null,
  auth: false,
  walletTransactions: [],
  code:"",
  socialIcon:""
};

// Reducer
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: (create) => ({
    setUser: create.reducer((state, action) => {
      if (action.payload?.token) {
        localStorage.setItem("token", action.payload?.token);
        localStorage.setItem("refreshToken", action.payload?.refreshToken);
      }
      state.user = action.payload?.user;
      state.auth = true;
    }),
    logout() {
      localStorage.clear();

      return initialState;
    },
    setSocialIcon:create.reducer((state, action)=>{
      state.socialIcon=action.payload;
    }),
    clearMessage:create.reducer((state,action)=>{
      state.message=null;
    })
  }),
  extraReducers: (builder) => {
    //SIGN UP
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.auth = false;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.success = true;
     // state.message=action.payload;
      state.auth=true;
      state.user = action.payload.data?.data?.user;


    });
    builder.addCase(signupUser.rejected, (state,action) => {
      state.loading = false;
      state.user = null;
      state.success = false;
      state.message=action.payload.message;
     
    });

    //SIGN IN
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.data?.data?.user;
      state.auth = true;
      state.loading = false;
      state.success = true;
   
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.auth = false;
      state.success = false;
      state.user = null;
      state.loading = false;
     
    });

    //FORGOT PASSWORD
    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.code = action.payload?.data?.data?.code;
      state.loading = false;
      state.success = true;
     
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.message = action.payload?.response?.data?.message;
     
    });

    //VERIFICATION CODE

    builder.addCase(verificationCode.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(verificationCode.fulfilled, (state, action) => {
      state.loading = false;
      state.verificationData = action.payload.data?.data;
      state.success = true;
    });
    builder.addCase(verificationCode.rejected, (state) => {
      state.loading = false;
    });

    //RESET PASSWORD
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(resetPassword.rejected, (state) => {
      state.loading = false;
    });

    //get user data
    builder.addCase(getUserProfile.pending, (state) => {
      state.loading = true;
      state.auth = false;
    }),
      builder.addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data?.data;
        state.success = true;
        state.auth = true;
      }),
      builder.addCase(getUserProfile.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.success = false;
      });

    //get user membership
    builder.addCase(getUserMembership.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getUserMembership.fulfilled, (state, action) => {
        state.loading = false;
        state.subscription = action.payload.data?.data;
      }),
      builder.addCase(getUserMembership.rejected, (state) => {
        state.loading = false;
      });

    //get user membership
    builder.addCase(getUserWallet.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getUserWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.wallet = action.payload.data?.data?.wallet;
        state.walletTransactions = [
          ...action.payload.data?.data?.transactions?.data,
        ];
      }),
      builder.addCase(getUserWallet.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const {logout, setSocialIcon, clearMessage}=userSlice.actions;

export default userSlice.reducer;

export const { setUser } = userSlice.actions;