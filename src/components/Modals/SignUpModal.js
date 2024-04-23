"use client";

import {
  Alert,
  Box,
  CircularProgress,
  FormControl,
  Modal,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import CloseCircle from "public/images/offers/close-drawer.png";
import Image from "next/image";
import { InputAdornment } from "@mui/material";
import MailIcon from "public/images/pricing/sms.png";
import UserIcon from "public/images/pricing/user.png";
import CallIcon from "public/images/pricing/call.png";
import PasswordIcon from "public/images/pricing/lock.png";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as yup from "yup";
import WarningIcon from "public/images/pricing/warning.svg";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "@/store/services/auth.service";
import StripeCheckout from "../StripeCheckout/StripeCheckout";
import { postPayment } from "@/store/services/checkout.service";
import { DIAMOND_PLAN, GOLD_PLAN, PLATINUM_PLAN } from "@/lib/constants";
import { modalStyle, errorPill } from "@/lib/modalStyle";
import SocialButtonGroup from "../SocialButtonGroup/SocialButtonGroup";
import PhoneInput, {
  PhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useRouter } from "next/navigation";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "12.5rem",
    borderRadius: 8,
    position: "absolute",
    zIndex: 10,
  },
  input: {
    borderRadius: "8px",
  },
}));

export default function SignUpModal({
  handleClose,
  open,
  handleSignInOpen,
  type,
}) {
  //call the dispatcher function
  const route = useRouter();

  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowConfrimPassword] = useState(false);
  const [successAAlert, setSuccessAlert] = useState(false);
  const [failedStatus, setFailedStatus] = useState(false);
  const [checkoutOpen, setcheckoutOpen] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [isValidphoneNumer, setIsValidPhoneNumber] = useState(true);

  const offer_slug = localStorage.getItem("offer_slug");
  const dispatch = useDispatch();

  const { data, loading_checkout } = useSelector((state) => state.checkout);
  const { success, auth, message, socialIcon } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const isSubmitDisabled = Object.values(formData).some(
    (value) => value === ""
  );
  const uaePhoneNumberRegex = /^\d{2}-\d{7}$/;

  const signUpSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: yup.string().matches(/^\d{2}-\d{6}$/, "Invalid phone number"),

    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
        "Password must contain 1 uppercase, 1 lowercase and 1 special character and should be atleast 6 to 14 characters long."
      )
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckoutOpen = () => {
    setcheckoutOpen(true);
  };

  //sign up logic
  const handleSignup = async (e) => {
    e.preventDefault();

    if (uaePhoneNumberRegex.test(formData.phone)) {
      setPhoneError("");
    } else {
      setPhoneError("Please enter a valid UAE phone number.");
    }
    try {
      await signUpSchema.validate(formData, {
        abortEarly: false,
      });
      setErrors({});
    } catch (validationErrors) {
      const errorsObject = {};
      validationErrors.inner.forEach((error) => {
        errorsObject[error.path] = error.message;
      });
      setErrors(errorsObject);
    }
    await dispatch(signupUser({ ...formData }));

    if (type === "Gold") {
      if (offer_slug?.length > 0) {
        dispatch(
          postPayment({
            planId: GOLD_PLAN,
            returnUrl: `/offers/${offer_slug}`,

            // webUrl: process.env.NEXT_PUBLIC_APP_URL,
          })
        );
      } else {
        dispatch(
          postPayment({
            planId: GOLD_PLAN,
            returnUrl: `/offers`,
          })
        );
      }
    }
    if (type === "Diamond") {
      if (offer_slug?.length > 0) {
        dispatch(
          postPayment({
            planId: DIAMOND_PLAN,
            returnUrl: `/offers/${offer_slug}`,

            // webUrl: process.env.NEXT_PUBLIC_APP_URL,
          })
        );
      } else {
        dispatch(
          postPayment({
            planId: DIAMOND_PLAN,
            returnUrl: `/offers`,
          })
        );
      }
    }
    if (type === "Platinum") {
      if (offer_slug?.length > 0) {
        dispatch(
          postPayment({
            planId: PLATINUM_PLAN,
            returnUrl: `/offers/${offer_slug}`,

            // webUrl: process.env.NEXT_PUBLIC_APP_URL,
          })
        );
      } else {
        dispatch(
          postPayment({
            planId: PLATINUM_PLAN,
            returnUrl: `/offers`,
          })
        );
      }
    }

    if (success) {
      setSuccessAlert(true);
      setFormData({
        ...formData,
        email: "",
        phone: "",
        fullName: "",
        password: "",
        confirmPassword: "",
      });
      handleCheckoutOpen();
    } else {
      setFailedStatus(true);
      setTimeout(() => {
        setFailedStatus(false);
      }, 4000);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfrimPassword(!showconfirmPassword);
  };

  useEffect(() => {
    if (
      data?.data?.url !== "" &&
      data?.data?.url !== undefined &&
      !data?.data?.client_secret
    ) {
      const dataURL = data?.data?.url;
      route.push(dataURL);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (auth) {
      handleCheckoutOpen();
    }
  }, [auth]);

  return (
    <div>
      {open && (
        <Modal
          className={`h:20 2xl:h-40${classes.modal}`}
          disablePortal
          disableEnforceFocus
          disableAutoFocus
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          sx={{
            "@media screen and (max-width:1220px)": {
              maxHeight: "500px",
            },
          }}
          open={open}
          onClose={handleClose}
        >
          <Box sx={{ ...modalStyle, width: 464 }}>
            {!checkoutOpen && !auth ? (
              <>
                {failedStatus && (
                  <Alert severity="error" className="mb-4">
                    {message?.length > 0 && message}
                  </Alert>
                )}
                <div className="flex justify-end cursor-pointer">
                  <Image src={CloseCircle} alt="" onClick={handleClose} />
                </div>
                <div className="flex justify-center items-center flex-wrap">
                  {successAAlert && (
                    <Alert severity="success">Sign Up Successfully</Alert>
                  )}
                  {phoneError?.length > 0 && (
                    <div className="mr-3 mb-2 flex" style={errorPill}>
                      <Image src={WarningIcon} alt="warning" className="mr-3" />
                      <p className="text-base">{phoneError}</p>
                    </div>
                  )}
                  {errors?.phoneNumber?.length > 0 && (
                    <div className="mr-3 mb-2 flex" style={errorPill}>
                      <Image src={WarningIcon} alt="warning" className="mr-3" />
                      <p className="text-base">{errors.phoneNumber}</p>
                    </div>
                  )}
                  {errors?.email?.length > 0 && (
                    <div className="mr-3 mb-2 flex" style={errorPill}>
                      <Image src={WarningIcon} alt="warning" className="mr-3" />
                      <p className="text-base">{errors.email}</p>
                    </div>
                  )}
                  {errors?.password?.length > 0 && (
                    <div className="mr-3 mb-2 flex" style={errorPill}>
                      <Image src={WarningIcon} alt="warning" className="mr-3" />
                      <p className="text-base">{errors.password}</p>
                    </div>
                  )}
                  {errors?.confirmPassword?.length > 0 && (
                    <div className="mr-3 mb-2 flex" style={errorPill}>
                      <Image src={WarningIcon} alt="warning" className="mr-3" />
                      <p className="text-base">{errors.confirmPassword}</p>
                    </div>
                  )}
                </div>
                <p className="xl:text-2xl text-xl font-medium mt-5 text-center">
                  Get Started With Supperclub{" "}
                </p>
                <div className="flex justify-center my-5">
                  <SocialButtonGroup loginFrom={"modal"} />
                </div>
                <div className="pt-7 lg:max-h-96 2xl:max-h-104 3xl:max-h-108 overflow-y-auto">
                  <form onSubmit={handleSignup} className="px-10">
                    {socialIcon !== "whatsapp" && (
                      <>
                        <TextField
                          labelText=""
                          id="user-name"
                          placeholder="Full Name"
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Image src={UserIcon} alt="" />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root   ": {
                              borderRadius: "8px !important",
                              backgroundColor: "#F9FAFA",
                              width: "23rem",

                              marginBottom: "1rem",
                            },
                            "@media screen and (min-width:1420px)": {
                              "& .MuiOutlinedInput-root   ": {
                                width: "26rem",
                              },
                            },
                            "@media screen and (max-width:1120px)": {
                              "& .MuiOutlinedInput-root   ": {
                                width: "20rem",
                              },
                            },
                            "@media screen and (max-width:768px)": {
                              "& .MuiOutlinedInput-root   ": {
                                width: "22rem",
                              },
                            },
                            "@media screen and (max-width:468px)": {
                              "& .MuiOutlinedInput-root   ": {
                                width: "18rem",
                              },
                            },

                            "@media screen and (min-width:1720px)": {
                              "& .MuiOutlinedInput-root   ": {
                                width: "33rem",
                              },
                            },
                          }}
                        />
                        <TextField
                          labelText=""
                          id="email"
                          placeholder="Email"
                          type="text"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Image src={MailIcon} alt="" />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root   ": {
                              borderRadius: "8px !important",
                              backgroundColor: "#F9FAFA",
                              width: "23rem",
                              border: `1px solid ${errors.email && "red"}`,

                              marginBottom: "1rem",
                            },
                            "@media screen and (min-width:1420px)": {
                              "& .MuiOutlinedInput-root   ": {
                                width: "26rem",
                              },
                            },
                            "@media screen and (max-width:1120px)": {
                              "& .MuiOutlinedInput-root   ": {
                                width: "20rem",
                              },
                            },
                            "@media screen and (max-width:768px)": {
                              "& .MuiOutlinedInput-root   ": {
                                width: "22rem",
                              },
                            },
                            "@media screen and (max-width:468px)": {
                              "& .MuiOutlinedInput-root   ": {
                                width: "18rem",
                              },
                            },
                            "@media screen and (min-width:1720px)": {
                              "& .MuiOutlinedInput-root   ": {
                                width: "33rem",
                              },
                            },
                          }}
                        />
                      </>
                    )}
                    {socialIcon == "whatsapp" && (
                      <>
                        <div className="flex">
                          <PhoneInput
                            className={`4xl:w-[33rem] 2xl:w-[26rem] 3xl:w-[33rem] xl:w-[40rem] outline-none border-secondary50 border-2 p-4 rounded-lg bg-secondary mb-3`}
                            international
                            placeholder="Enter Phone"
                            addInternationalOption={false}
                            countryCallingCodeEditable={false}
                            enableSearch={true}
                            inputProps={{
                              name: "phone",
                            }}
                            value={formData.phone}
                            defaultCountry="AE"
                            onChange={(e) => setFormData({ phone: e })}
                          />
                        </div>
                      </>
                    )}
                    <div className="flex">
                      <PhoneInput
                        className={`4xl:w-[33rem] 2xl:w-[26rem] 3xl:w-[33rem] xl:w-[40rem] w-[40rem]
                        outline-none border-secondary50 border-2 p-4 rounded-lg bg-secondary mb-3`}
                        international
                        placeholder="Enter Phone"
                        addInternationalOption={false}
                        countryCallingCodeEditable={false}
                        enableSearch={true}
                        inputProps={{
                          name: "phone",
                        }}
                        value={formData.phone}
                        defaultCountry="AE"
                        onChange={(e) => setFormData({ phone: e })}
                      />
                    </div>
                    <TextField
                      labelText=""
                      id="password1"
                      placeholder="Password"
                      type={!showPassword ? "text" : "password"}
                      value={formData.password}
                      name="password"
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Image src={PasswordIcon} alt="" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={handleTogglePasswordVisibility}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root   ": {
                          borderRadius: "8px !important",
                          backgroundColor: "#F9FAFA",
                          width: "23rem",
                          border: `1px solid ${errors.password && "red"}`,

                          marginBottom: "1rem",
                        },
                        "@media screen and (min-width:1420px)": {
                          "& .MuiOutlinedInput-root   ": {
                            width: "26rem",
                          },
                        },
                        "@media screen and (max-width:1120px)": {
                          "& .MuiOutlinedInput-root   ": {
                            width: "20rem",
                          },
                        },
                        "@media screen and (max-width:768px)": {
                          "& .MuiOutlinedInput-root   ": {
                            width: "22rem",
                          },
                        },
                        "@media screen and (max-width:468px)": {
                          "& .MuiOutlinedInput-root   ": {
                            width: "18rem",
                          },
                        },
                        "@media screen and (min-width:1720px)": {
                          "& .MuiOutlinedInput-root   ": {
                            width: "33rem",
                          },
                        },
                      }}
                    />

                    {socialIcon !== "whatsapp" && (
                      <>
                        <FormControl>
                          <TextField
                            labelText=""
                            id="password2"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            type={!showconfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Image src={PasswordIcon} alt="" />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    edge="end"
                                    onClick={
                                      handleToggleConfirmPasswordVisibility
                                    }
                                  >
                                    {showconfirmPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root   ": {
                                borderRadius: "8px !important",
                                backgroundColor: "#F9FAFA",
                                width: "23rem",
                                border: `1px solid ${
                                  errors.confirmPassword && "red"
                                }`,

                                marginBottom: "1rem",
                              },
                              "@media screen and (min-width:1420px)": {
                                "& .MuiOutlinedInput-root   ": {
                                  width: "26rem",
                                },
                              },
                              "@media screen and (max-width:1120px)": {
                                "& .MuiOutlinedInput-root   ": {
                                  width: "20rem",
                                },
                              },
                              "@media screen and (max-width:768px)": {
                                "& .MuiOutlinedInput-root   ": {
                                  width: "22rem",
                                },
                              },
                              "@media screen and (max-width:468px)": {
                                "& .MuiOutlinedInput-root   ": {
                                  width: "18rem",
                                },
                              },
                              "@media screen and (min-width:1720px)": {
                                "& .MuiOutlinedInput-root   ": {
                                  width: "33rem",
                                },
                              },
                            }}
                          />
                        </FormControl>
                      </>
                    )}
                    <button
                      type="submit"
                      className={`mt-8 w-full h-12 ${
                        !isSubmitDisabled ? "bg-primary" : "bg-primaryDisabled"
                      }
                                text-white rounded-3xl
                                `}
                      disabled={isSubmitDisabled}
                    >
                      Submit
                    </button>
                  </form>

                  <p className="text-center mt-7 pb-12">
                    Already have an account?
                    <span
                      className="underline font-bold cursor-pointer ml-1"
                      onClick={() => {
                        handleSignInOpen();
                        handleClose();
                      }}
                    >
                      Sign in
                    </span>
                  </p>
                </div>
              </>
            ) : loading_checkout ? (
              <div className="w-full flex justify-center">
                <CircularProgress />
              </div>
            ) : (
              (auth || data?.data?.client_secret?.length > 0) && (
                <StripeCheckout
                  clientSecret={data?.data?.client_secret}
                  close={handleClose}
                />
              )
            )}
          </Box>
        </Modal>
      )}
    </div>
  );
}
