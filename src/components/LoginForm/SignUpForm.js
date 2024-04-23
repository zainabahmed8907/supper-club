"use client";
import * as React from "react";
import { InputAdornment, Snackbar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import CustomInput from "../Input/Input";
import UserIcon from "public/images/hero/user.svg";
import SMSIcon from "public/images/hero/sms.svg";
import LockIcon from "public/images/hero/lock.svg";
import { CallOutlined, TaskAltOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signupUser } from "@/store/services/auth.service";
import { useRouter } from "next/navigation";
import SocialButtonGroup from "../SocialButtonGroup/SocialButtonGroup";
import { MaskedField } from "../MaskInput/MaskInput";
import { clearMessage } from "@/store/reducers/user.slice";
import axios from "axios";
import { CircularProgress } from "@mui/material";


const EmailPasswordSignup = ({
  email,
  handleEmailChange,
  handleFullNameChange,
  fullName,
  validateEmail,
  validateFullName,
  emailError,
  fullNameError,
  password,
  confirmPassword,
  handlePasswordChange,
  handleConfirmPasswordChange,
  validatePassword,
  passwordError,
  confirmPasswordError,
  validateConfirmPassword,
  phone,
  validatePhone,
  phoneError,
  handlePhoneNumberChange,
}) => {
  return (
    <>
      <div className="mb-3 mt-4 md:mb-6 md:mt-8">
        <div className="mb-4">
          <CustomInput
            labelText=""
            id="fullName"
            placeholder="Full Name"
            formClasses="sp-login-form"
            inputClasses="sp-login-input"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Image src={UserIcon} alt="lock" />
                </InputAdornment>
              ),
            }}
            margin="normal"
            value={fullName}
            onChange={handleFullNameChange}
            onBlur={validateFullName}
            error={!!fullNameError}
            helperText={fullNameError}
          />
        </div>
        <div className="mb-4">
          <CustomInput
            labelText=""
            id="email"
            placeholder="Email"
            formClasses="sp-login-form"
            inputClasses="sp-login-input"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Image src={SMSIcon} className="fill-primary" alt="sms" />
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
        <div className="mb-4">
          <MaskedField
            name="phone"
            mask="00-0000000"
            id="phone"
            placeholder="Phone Number"
            formClasses="sp-login-form"
            inputClasses="sp-login-input"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CallOutlined className="fill-primary" />
                  <span className="text-white">+971</span>
                </InputAdornment>
              ),
            }}
            type="number"
            margin="normal"
            value={phone}
            onChange={handlePhoneNumberChange}
            onBlur={validatePhone}
            error={!!phoneError}
            helperText={phoneError}
            variant="standard"
          />
        </div>
      </div>
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
              {/* <CallOutlinedIcon className="fill-primary" /> */}
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

const SignUpForm = ({ signUpfrom }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [showBanner, setShowBanner] = useState(false);
  const [showSnackBar, setShowSnackbar] = useState(false);
  const [checked, setChecked] = useState(false);
  const [newletterSuccessMsg, setNewsLetterSuccessMsg] = useState("");
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const { success, user, loading, message } = useSelector(
    (state) => state.user
  );
  const isFormFilled = true;

  useEffect(() => {
    if (!success) {
      setShowBanner(true);
      setTimeout(() => {
        setShowBanner(false);
      }, 5000);
    }
    if (success) {
      setShowSnackbar(true);

      setTimeout(() => {
        router.push("/profile");
      }, 4000);
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (message?.length > 0) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 4000);
      return () => {
        clearTimeout(timer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

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
  const validateFullName = () => {
    if (!fullName) {
      setFullNameError("Full Name is required");
    } else {
      setFullNameError("");
    }
  };
  const validateConfirmPassword = () => {
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is requried");
    } else {
      setConfirmPasswordError("");
    }
  };

  const validatePhone = () => {
    if (!phone) {
      setPhoneError("Phone is required");
    } else if (!/^\d{2}[\s\-]?\d{7}$/.test(phone)) {
      setPhoneError("Phone Number is Invalid");
    } else {
      setPhoneError("");
    }
  };

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordMatchError("Passwords must match");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) {
      validateEmail();
    }
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
    if (fullNameError) {
      validateFullName();
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

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);

    if (phoneError) {
      validatePhone();
    }
  };
  const subscribeToNewsletter = async () => {
    try {
      const response = await axios.post(
        `${process?.env?.NEXT_PUBLIC_API_KEY}/newsletter`,
        {
          email: email,
        }
      );
      setOpen(true);
      setNewsLetterSuccessMsg(response?.data?.message);

      setTimeout(() => {
        setEmail("");
        setOpen(false);
        setNewsLetterSuccessMsg("");
      }, 4000);

      return response.data;
    } catch (e) {
      throw e;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = phone;
    const strippedValue = inputValue?.replace(/-/g, "");
    let formattedValue = "";

    // Add country code if not already included
    if (!strippedValue.startsWith("+971")) {
      formattedValue = `+971${strippedValue}`;
    } else {
      formattedValue = strippedValue;
    }

    // Validate email and password before submitting
    if (signUpfrom === "whatsapp") {
      validatePhone();
      if (!phoneError) {
        dispatch(loginUser({ phone }));
      }
    } else {
      validateEmail();
      validatePassword();
      validatePhone();
      validatePasswords();
      validateConfirmPassword();
      if (!emailError && !passwordError && !passwordMatchError && !phoneError && !confirmPasswordError) {
        // Add your logic for form submission here
        dispatch(
          signupUser({ email, password, phone: formattedValue, fullName })
        );
        if (checked) {
          subscribeToNewsletter();
        }
      }
    }
  };

  return (
    <>
      {showSnackBar && (
        <div className="w-96 bg-white pb-2 pt-2 mb-2 text-green-600 flex justify-center">
          <TaskAltOutlined color="green" className="mr-2" />
          <p>Sign up Successfully</p>
        </div>
      )}
      {message?.length > 0 && (
        <div className="w-96 bg-white pb-2 pt-2 mb-2 text-red-600 flex justify-center">
          <p>{message}</p>
        </div>
      )}

      <SocialButtonGroup loginFrom={signUpfrom} />

      <form onSubmit={handleSubmit}>
        <p className="text-center mt-4 text-red-600">
          {passwordMatchError.length > 0 && passwordMatchError}
        </p>
        {signUpfrom === "whatsapp" ? (
          <PhoneLogin
            phone={phone}
            handlePhoneChange={handlePhoneChange}
            validatePhone={validatePhone}
            phoneError={phoneError}
          />
        ) : (
          <EmailPasswordSignup
            email={email}
            handleEmailChange={handleEmailChange}
            validateEmail={validateEmail}
            emailError={emailError}
            password={password}
            handlePasswordChange={handlePasswordChange}
            validatePassword={validatePassword}
            passwordError={passwordError}
            handleFullNameChange={handleFullNameChange}
            validateFullName={validateFullName}
            fullName={fullName}
            fullNameError={fullNameError}
            confirmPassword={confirmPassword}
            confirmPasswordError={confirmPasswordError}
            validateConfirmPassword={validateConfirmPassword}
            handleConfirmPasswordChange={handleConfirmPasswordChange}
            phone={phone}
            phoneError={phoneError}
            handlePhoneNumberChange={handlePhoneChange}
            validatePhone={validatePhone}
          />
        )}
        <div className="mb-6 flex flex-col justify-between sm:flex-row sm:items-center">
          <div className="mb-6 sm:mb-0">
            <label className="checkbox-container flex cursor-pointer select-none items-center text-xs font-medium text-white">
              <input
                type="checkbox"
                className={"checkbox"}
                value={email}
                onChange={(e) => setChecked(e?.target?.checked)}
              />
              <span className={"checkmark"}></span>
              Subscribe to email notifications and newsletters
            </label>
          </div>
        </div>

        <div className="mb-6">
          <button
            className={`shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-full
             ${
               isFormFilled ? "bg-primary" : "bg-primaryDisabled"
             } px-5 md:px-9 py-2 md:py-4 text-sm md:text-base font-medium
              text-white duration-300 hover:bg-primary/90 disabled:opacity-50`}
            disabled={!isFormFilled}
          >
            {!loading ? (
              signUpfrom === "whatsapp" ? (
                <span className="flex items-center">Continue</span>
              ) : (
                "Sign Up"
              )
            ) : null}
               {loading ? (
              <CircularProgress size={20} style={{ color: "#fff" }} />
            ) : null}
          </button>
        </div>
      </form>
      <p className="text-center text-xs sm:text-sm font-medium text-white">
        Already have an account?
        <Link
          href="/login"
          className="text-white font-bold hover:underline underline ml-2"
        >
          Sign In!
        </Link>
      </p>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        message={newletterSuccessMsg}
      />
    </>
  );
};

export default SignUpForm;
