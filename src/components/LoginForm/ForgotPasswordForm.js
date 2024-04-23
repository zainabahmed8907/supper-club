"use client";
import * as React from "react";
import { Button, InputAdornment } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import CustomInput from "../Input/Input";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import { useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "@/store/services/auth.service";
import Spinner from "../Spinner/Spinner";
import { useRouter } from "next/navigation";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showBanner, setShowBanner] = useState(false);
  const router = useRouter();

  const { success, message, loading, user } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const showError = () => {
    if (message?.length > 0 || emailError.length > 0) {
      setShowBanner(true);
      setTimeout(() => {
        setShowBanner(false);
      }, 5000);
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) {
      validateEmail();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showError();
    validateEmail();
    if (!emailError) {
      dispatch(forgotPassword({ email }));
      router.push("/verificationcode");
    }
  };

  return (
    <>
      {showBanner ? (
        <Banner bannerQuote={message} bannerBG={`bg-[#faebd7]`} />
      ) : null}

      {showBanner ? (
        <Banner bannerQuote={emailError} bannerBG={`bg-[#faebd7]`} />
      ) : null}

      <form onSubmit={handleSubmit}>
        <CustomInput
          labelText=""
          id="email"
          placeholder="Email"
          formClasses="sp-login-form"
          inputClasses="sp-login-input"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineIcon className="fill-primary" />
              </InputAdornment>
            ),
          }}
          margin="normal"
          value={email}
          onChange={handleEmailChange}
          onBlur={validateEmail}
          error={!!emailError}
        />

        <div className="mt-8">
          <button
            type="submit"
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

export default ForgotPasswordForm;
