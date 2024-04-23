"use client";
import * as React from "react";
import { InputAdornment } from "@mui/material";
import Link from "next/link";
import CustomInput from "../Input/Input";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/services/auth.service";
import { useRouter } from "next/navigation";
import SocialButtonGroup from "../SocialButtonGroup/SocialButtonGroup";
import { MaskedField } from "../MaskInput/MaskInput";
import { CircularProgress } from "@mui/material";

const EmailPasswordLogin = ({
  email,
  handleEmailChange,
  validateEmail,
  emailError,
  password,
  handlePasswordChange,
  validatePassword,
  passwordError,
}) => {
  return (
    <>
      <div className="mb-3 mt-4 md:mb-6 md:mt-8">
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
          helperText={emailError}
        />
      </div>
      <div className="mb-6">
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
                <LockOutlinedIcon className="fill-primary" />
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
    </>
  );
};

const PhoneLogin = ({
  phone,
  handlePhoneChange,
  validatePhone,
  phoneError,
}) => {
  return (
    <div className="mb-3 mt-4 md:mb-6 md:mt-8">
      <MaskedField
        name="phone"
        mask="000-0000"
        definitions={{
          "#": /[1-9]/,
        }}
        id="phone"
        placeholder="Enter your whatsapp number"
        formClasses="sp-login-form"
        inputClasses="sp-login-input"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CallOutlinedIcon className="fill-primary" />
              <span className="text-white">+971</span>
            </InputAdornment>
          ),
        }}
        type="number"
        margin="normal"
        value={phone}
        onChange={handlePhoneChange}
        onBlur={validatePhone}
        error={!!phoneError}
        helperText={phoneError}
        variant="standard"
      />
    </div>
  );
};

const LoginForm = ({ loginFrom }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [showBanner, setShowBanner] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const { success, user, message, loading } = useSelector(
    (state) => state.user
  );
  const [statusMessage, setStatusMsg] = useState(message);

  useEffect(() => {
    if (success && localStorage.getItem("token")?.length > 0) {
      router.push("/profile");
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const validatePassword = () => {
    if (!password.trim()) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
  };

  const validatePhone = () => {
    if (!phone) {
      setPasswordError("Phone is required");
    } else {
      setPasswordError("");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) {
      validateEmail();
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) {
      validatePassword();
    }
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    if (phoneError) {
      validatePhone();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  
    // Validate email and password before submitting
    if (loginFrom === "whatsapp") {
      validatePhone();
      if (!phoneError) {
        dispatch(loginUser({ phone }));
      }
    } else {
      validateEmail();
      validatePassword();

      // If there are no errors, proceed with form submission logic
      if (!emailError && !passwordError) {
        // Add your logic for form submission here
        dispatch(loginUser({ email, password }));
        setTimeout(() => {
          if (!success) {
            setStatusMsg("Invalid Email or Password");
    
            setTimeout(() => {
              setStatusMsg("");
            }, 5000);
          }
        }, 1000);
        localStorage.setItem("isAuth", true);
      }
    }
  };

  return (
    <>
      <SocialButtonGroup loginFrom={loginFrom} />
      {statusMessage?.length > 0 ? (
        <Banner bannerQuote={statusMessage} bannerBG={`bg-[#faebd7]`} />
      ) : null}

      <form onSubmit={handleSubmit}>
        {loginFrom === "whatsapp" ? (
          <PhoneLogin
            phone={phone}
            handlePhoneChange={handlePhoneChange}
            validatePhone={validatePhone}
            phoneError={phoneError}
          />
        ) : (
          <EmailPasswordLogin
            email={email}
            handleEmailChange={handleEmailChange}
            validateEmail={validateEmail}
            emailError={emailError}
            password={password}
            handlePasswordChange={handlePasswordChange}
            validatePassword={validatePassword}
            passwordError={passwordError}
          />
        )}
        <div className="mb-4 flex flex-col justify-between sm:flex-row sm:items-center">
          <div className="mb-4 sm:mb-0">
            <label className="checkbox-container flex cursor-pointer select-none items-center justify-start -ml-8 text-xs font-medium text-white">
              <input
                type="checkbox"
                class="accent-[#C39D63] focus:accent-[#C39D63] mr-2 w-5 h-4 rounded border-none cursor-pointer"
              />
              Subscribe to email notifications and newsletters
            </label>
          </div>
        </div>
        <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
          {loginFrom !== "whatsapp" ? (
            <div>
              <Link
                href="/forgotpassword"
                className="text-sm font-medium text-primary hover:underline underline sm:no-underline"
              >
                Forgot Password?
              </Link>
            </div>
          ) : null}
        </div>
        <div className="mb-6">
          <button
            className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-full bg-primary px-5 md:px-9 py-2 md:py-4 text-sm md:text-base font-medium text-white duration-300 hover:bg-primary/90 disabled:opacity-50"
            disabled={loading}
          >
            {!loading ? (
              loginFrom === "whatsapp" ? (
                <span className="flex items-center">
                  Continue
                  <EastOutlinedIcon
                    fontSize="small"
                    className="text-white ml-2"
                  />{" "}
                </span>
              ) : (
                "Sign In"
              )
            ) : null}

            {loading ? (
              <CircularProgress size={20} style={{ color: "#fff" }} />
            ) : null}
          </button>
        </div>
      </form>
      <p className="text-center text-xs sm:text-sm font-medium text-white">
        Don’t you have an account?{" "}
        <Link
          href="/signup"
          className="text-white font-bold hover:underline underline"
        >
          Sign up!
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
