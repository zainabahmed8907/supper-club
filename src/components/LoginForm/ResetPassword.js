"use client";
import * as React from "react";
import { Button, InputAdornment } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import CustomInput from "../Input/Input";
import LockIcon from 'public/images/hero/lock.svg'

import { useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPassword,
  loginUser,
  resetPassword,
  verificationCode,
} from "@/store/services/auth.service";
import Spinner from "../Spinner/Spinner";
import { useRouter } from "next/navigation";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const [showBanner, setShowBanner] = useState(false);
  const router = useRouter();

  const { success, message, loading, verificationData } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    if (!password.trim()) {
      setPasswordError("Password is required");
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password should be 8 to 16 characters long and must contain 1 uppercase, 1 lowercase and 1 special character"
      );
    } else {
      setPasswordError("");
    }
  };
  const validateConfirmPassword = () => {
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is requried");
    } else {
      setConfirmPasswordError("");
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) {
      validatePassword();
    }
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (confirmPasswordError) {
      validateConfirmPassword();
    }
  };
  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordMatchError("Passwords must match");
    }
  };

  const showError = () => {
    if (
      message?.length > 0 ||
      passwordError ||
      passwordMatchError ||
      confirmPasswordError
    ) {
      setShowBanner(true);
      setTimeout(() => {
        setShowBanner(false);
      }, 5000);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    showError();
    validatePassword();

    if (!passwordError || !confirmPasswordError || !passwordError) {
      dispatch(
        resetPassword({
          password: password,
          confirmPassword: confirmPassword,
          email: verificationData.email,
          code: verificationData.resetCode,
        })
      );

      router.push("/");
    }
  };

  return (
    <>
      {showBanner ? (
        <Banner bannerQuote={message} bannerBG={`bg-[#faebd7]`} />
      ) : null}

      {showBanner ? (
        <Banner bannerQuote={passwordError} bannerBG={`bg-[#faebd7]`} />
      ) : null}
      {showBanner ? (
        <Banner bannerQuote={passwordMatchError} bannerBG={`bg-[#faebd7]`} />
      ) : null}
      {showBanner ? (
        <Banner bannerQuote={confirmPasswordError} bannerBG={`bg-[#faebd7]`} />
      ) : null}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <CustomInput
            labelText=""
            id="password"
            placeholder="Password"
            type="password"
            formClasses="sp-login-form"
            inputClasses="sp-login-input"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Image src={LockIcon} alt="lockicon" />
                </InputAdornment>
              ),
            }}
            margin="normal"
            value={password}
            onChange={handlePasswordChange}
            onBlur={validatePassword}
            error={!!passwordError}
            helperText={passwordError}
          />
        </div>
        <div className="mb-6">
          <CustomInput
            labelText=""
            id="confirmPassword"
            placeholder="Password"
            type="password"
            formClasses="sp-login-form"
            inputClasses="sp-login-input"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Image src={LockIcon} alt="lockicon" />
                </InputAdornment>
              ),
            }}
            margin="normal"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            onBlur={validateConfirmPassword}
            error={!!confirmPasswordError}
            helperText={confirmPasswordError}
          />
        </div>

        <div className="mt-8">
          <button
            className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-full bg-primary px-5 md:px-9 py-2 md:py-4 text-sm md:text-base font-medium text-white duration-300 hover:bg-primary/90 disabled:opacity-50"
            disabled={loading}
          >
            Reset Password
            {loading ? <Spinner /> : null}
          </button>
        </div>
      </form>
      <p className="text-center text-xs sm:text-sm font-medium text-white mt-8">
        Go back to
        <Link
          href="/login"
          className="text-white font-bold hover:underline underline ml-2"
        >
          Login!
        </Link>
      </p>
    </>
  );
};

export default ResetPasswordForm;
