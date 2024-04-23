"use client";
import React, { useRef } from "react";
import { TextField } from "@mui/material";
import Link from "next/link";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import Banner from "../Banner/Banner";
import { useDispatch, useSelector } from "react-redux";
import { verificationCode } from "@/store/services/auth.service";
import Spinner from "../Spinner/Spinner";
import { useRouter } from "next/navigation";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5.5rem",
    borderRadius: 8, // Adjust the value to your preference
  },
  container: {
    display: "flex",
    gap: theme.spacing(1),
  },
  inputBox: {
    width: "54px",
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginRight: "10px",

    color: "white !important",
    "@media screen and (max-width:1120px)": {
      width: "44px",
      marginRight: "10px",
    },
  },
  input: {
    borderRadius: "8px",
  },
}));
const VerificationCodeForm = () => {
  const [codeError, setCodeError] = useState("");
  const [showBanner, setShowBanner] = useState(false);
  const router = useRouter();
  const classes = useStyles();

  const inputRefs = {
    digit1: useRef(null),
    digit2: useRef(null),
    digit3: useRef(null),
    digit4: useRef(null),
    digit5: useRef(null),
  };

  const { message, loading, code } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const showError = () => {
    if (message?.length > 0 || codeError) {
      // console.log("success");
      setShowBanner(true);
      setTimeout(() => {
        setShowBanner(false);
      }, 5000);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    showError();

    if (!codeError) {
      dispatch(verificationCode(code));

      router.push("/resetpassword");
    }
  };

  return (
    <>
      {showBanner ? (
        <Banner bannerQuote={message} bannerBG={`bg-[#faebd7]`} />
      ) : null}

      {showBanner ? (
        <Banner bannerQuote={codeError} bannerBG={`bg-[#faebd7]`} />
      ) : null}

      <form onSubmit={handleSubmit} className="text-white">
        {code.split("").map((value, index) => {
          return (
            <TextField
              key={index}
              className={classes.inputBox}
              variant="outlined"
              size="small"
              placeholder="-"
              name="code"
              value={value}
              inputRef={inputRefs}
              onChange={(e) => handleInputChange(e, value)}
              inputProps={{
                maxLength: 1,
                style: { textAlign: "center", color:"white" },
              }}
            />
          );
        })}

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

export default VerificationCodeForm;
