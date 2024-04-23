import {
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
import WarningIcon from "public/images/pricing/warning.svg";
import PasswordIcon from "public/images/pricing/lock.png";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/services/auth.service";
import { postPayment } from "@/store/services/checkout.service";
import { DIAMOND_PLAN, GOLD_PLAN, PLATINUM_PLAN } from "@/lib/constants";
import StripeCheckout from "../StripeCheckout/StripeCheckout";
import { useRouter } from "next/navigation";
import { modalStyle, errorPill } from "@/lib/modalStyle";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5.5rem",
    borderRadius: 8, // Adjust the value to your preference
  },
  input: {
    borderRadius: "8px",
  },
}));

export default function SignInModal({
  handleClose,
  open,
  handleSignUpOpen,
  handleForgotPasswordOpen,
  type,
}) {
  const route = useRouter();

  //Store instances
  const dispatch = useDispatch();
  const { success, auth, message, loading, user } = useSelector(
    (state) => state.user
  );
  const { data, loading_checkout } = useSelector((state) => state.checkout);
  const offer_slug = localStorage.getItem("offer_slug");
  const [statusMessage, setStatusMsg] = useState("");

  //
  const rootRef = React.useRef(null);
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const [checkoutOpen, setcheckoutOpen] = React.useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const isSubmitDisabled = Object.values(formData).some(
    (value) => value === ""
  );

  //Modal Methods
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckoutOpen = () => {
    setcheckoutOpen(true);
  };

  const handleSignin = async (e) => {
    e.preventDefault();

    await dispatch(loginUser({ ...formData }));
    if (!success) {
      setStatusMsg("Invalid Email or Password");
    }

    setTimeout(() => {
      setStatusMsg("");
      setFormData({ email: "", password: "" });
    }, 4000);
    localStorage.setItem("isAuth", true);


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

            //  webUrl: process.env.NEXT_PUBLIC_APP_URL,
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

            //  webUrl: process.env.NEXT_PUBLIC_APP_URL,
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
      handleCheckoutOpen();
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (user?.subscription) {
      setcheckoutOpen(false);
    }
    if (
      data?.data?.url !== "" &&
      data?.data?.url !== undefined &&
      !data?.data?.client_secret
    ) {
      const dataURL = data?.data?.url;
      route?.push(dataURL);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div>
      <Modal
        className={`2xl:h-40${classes.modal}`}
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        container={() => rootRef.current}
        closeAfterTransition
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Box
          sx={{
            ...modalStyle,
            padding: checkoutOpen ? 0 : 2,
            "@media screen and (max-width:620px)": {
              top: "50% !important",
              paddingBottom: "2%",
              maxHeight: "800px",
              overflowY: "scroll",
              left: "50%",
              width: "24.6rem",
              "&::-webkit-scrollbar": {
                width: "12px",
              },
            },
            "@media screen and (max-width:920px)": {
              top: "50%",
              paddingBottom: "2%",
              maxHeight: "800px",
              overflowY: "scroll",
              left: "45%",
              width: "29.6rem",
              "&::-webkit-scrollbar": {
                width: "12px",
              },
            },
          }}
        >
          {!checkoutOpen && !auth ? (
            <div>
              <div className="flex justify-end cursor-pointer">
                <Image src={CloseCircle} alt="" onClick={handleClose} />
              </div>
              {statusMessage?.length > 0 && (
                <div className="flex justify-center items-center">
                  <div className="mr-3 mb-2 flex" style={errorPill}>
                    <Image src={WarningIcon} alt="warning" className="mr-3" />
                    <p className="text-base">{statusMessage}</p>
                  </div>
                </div>
              )}

              <p className="xl:text-2xl text-xl font-medium mt-5 text-center">
                Hi, Welcome Back!
              </p>
              <p className="text-sm  font-normal mt-3 text-center">
                Login to your account
              </p>
              <div className="pt-7 ">
                <form onSubmit={handleSignin} className="lg:px-10 px-6">
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

                        marginBottom: "1rem",
                      },
                      "@media screen and (min-width:1420px)": {
                        "& .MuiOutlinedInput-root   ": {
                          width: "27rem",
                        },
                      },

                      "@media screen and (max-width:1120px)": {
                        "& .MuiOutlinedInput-root   ": {
                          width: "22rem",
                        },
                      },
                      "@media screen and (max-width:620px)": {
                        "& .MuiOutlinedInput-root   ": {
                          width: "19rem",
                        },
                      },
                      "@media screen and (min-width:1720px)": {
                        "& .MuiOutlinedInput-root   ": {
                          width: "33rem",
                        },
                      },
                    }}
                  />
                  <FormControl>
                    <TextField
                      labelText=""
                      id="password"
                      placeholder="Password"
                      name="password"
                      type={!showPassword ? "text" : "password"}
                      value={formData.password}
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

                          marginBottom: "1rem",
                        },
                        "@media screen and (min-width:1420px)": {
                          "& .MuiOutlinedInput-root   ": {
                            width: "27rem",
                          },
                        },
                        "@media screen and (max-width:1120px)": {
                          "& .MuiOutlinedInput-root   ": {
                            width: "22rem",
                          },
                        },
                        "@media screen and (max-width:620px)": {
                          "& .MuiOutlinedInput-root   ": {
                            width: "19rem",
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
                  <p
                    className="underline font-bold cursor-pointer"
                    onClick={() => {
                      handleClose();
                      handleForgotPasswordOpen();
                    }}
                  >
                    Forgot Password?
                  </p>

                  <button
                    type="submit"
                    className={`mt-8 w-full h-12 ${
                      !isSubmitDisabled ? "bg-primary" : "bg-primaryDisabled"
                    } text-white rounded-3xl
                              `}
                    disabled={isSubmitDisabled}
                  >
                    Submit {loading ? <CircularProgress color="info" /> : ""}
                  </button>
                </form>
                <p className="text-center mt-7">
                  Already have an account?{" "}
                  <span
                    className="underline font-bold cursor-pointer"
                    onClick={() => {
                      handleClose();
                      handleSignUpOpen();
                    }}
                  >
                    Sign Up
                  </span>
                </p>
              </div>
            </div>
          ) : loading_checkout ? (
            <div className="w-full flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            (auth ||
              (data?.data?.client_secret?.length > 0 &&
                !user?.subscription)) && (
              <StripeCheckout
                clientSecret={data?.data?.client_secret}
                close={handleClose}
              />
            )
          )}
        </Box>
      </Modal>
    </div>
  );
}
