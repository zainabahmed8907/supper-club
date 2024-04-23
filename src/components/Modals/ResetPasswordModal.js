import {
  Box,
  FormControl,
  Modal,
  TextField,
  Backdrop,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { makeStyles, useTheme } from "@mui/styles";
import CloseCircle from "public/images/offers/close-drawer.png";
import Image from "next/image";
import { InputAdornment } from "@mui/material";
import PasswordIcon from "public/images/pricing/lock.png";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as yup from "yup";
import ArrowLeft from "public/images/pricing/arrow-left.svg";

import WarningIcon from "public/images/pricing/warning.svg";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "@/store/services/auth.service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
  p: 2,

  "@media screen and ( min-width:1220px and max-width:1620px)": {
    top: "60%",
    paddingBottom: "5%",
    maxHeight: "600px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "12px",
    },
  },

  "@media screen and (max-width:1120px)": {
    top: "70%",
    paddingBottom: "10%",
    width: "400px",
    margin: "20px",
    left: "40%",
  },
};
const errorPill = {
  background:
    "linear-gradient(0deg, rgba(195, 157, 99, 0.05) 0%, rgba(195, 157, 99, 0.05) 100%), #FFF",
  padding: "1rem",
  borderRadius: "12px",
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "7.5rem",
    borderRadius: 8,
    position: "absolute",
    zIndex: 10,
  },
  input: {
    borderRadius: "8px",
  },
}));

export default function ResetPasswordModal({
  handleClose,
  open,
  handleSignInOpen,
  handleCongratulateModalopen,
}) {
  const rootRef = React.useRef(null);
  const classes = useStyles();
  const { verificationData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowConfrimPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const isSubmitDisabled = Object.values(formData).some(
    (value) => value === ""
  );

  const resetPasswordSchema = yup.object().shape({
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,14}$/,
        "Password must be 8-14 characters long, contain at least one uppercase letter, one special character, and one number"
      )
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Both passwords must match"),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  //handle Blur logic
  const handleBlur = () => {
    resetPasswordSchema
      .validate(formData, { abortEarly: false })

      .then(() => {
        setErrors({ ...errors, [name]: "" });
      })
      .catch((validationErrors) => {
        const newErrors = {};
        validationErrors.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors({ ...errors, ...newErrors });
      });
  };

  //reset password logic
  const handleResetPassword = async (e) => {
    e.preventDefault();

    dispatch(
      resetPassword({
        ...formData,
        email: verificationData.email,
        code: verificationData.resetCode,
      })
    );

    try {
      await resetPasswordSchema.validate(formData, { abortEarly: false });
      setErrors({});
      if (Object.keys(errors).length == 0) {
        handleCongratulateModalopen();
        handleClose();
      }
      handleCongratulateModalopen();
    } catch (validationErrors) {
      const errorsObject = {};
      validationErrors.inner.forEach((error) => {
        errorsObject[error.path] = error.message;
      });
      setErrors(errorsObject);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfrimPassword(!showconfirmPassword);
  };

  return (
    <div>
      {open && (
        <Modal
          className={`xl: 2xl:h-40${classes.modal}`}
          sx={{
            "@media screen and (max-width:1220px)": {
              maxHeight: "500px",
              left:"5%"
            },
          }}
          open={open}
          onClose={handleClose}
        >
          <Box sx={{ ...style, width: 464, height: 550 }}>
            <div className="flex justify-end cursor-pointer">
              <Image src={CloseCircle} alt="" onClick={handleClose} />
            </div>
            <div className="flex justify-center items-center flex-wrap">
              {errors?.confirmPassword?.length > 0 && (
                <div className="mr-3 mb-2 flex" style={errorPill}>
                  <Image src={WarningIcon} alt="warning" className="mr-3" />
                  <p className="text-base">{errors.confirmPassword}</p>
                </div>
              )}
            </div>
            <div className="flex justify-center items-center flex-wrap">
              {errors?.password?.length > 0 && (
                <div className="mr-3 mb-2 flex" style={errorPill}>
                  <Image src={WarningIcon} alt="warning" className="mr-3" />
                  <p className="text-base">{errors.password}</p>
                </div>
              )}
            </div>
            <p className="xl:text-2xl text-xl font-medium mt-5 text-center">
              Reset Password
            </p>

            <p className="text-sm  font-normal mt-3 text-center">
              Please set your new password
            </p>

            <div className="mt-7">
              <form onSubmit={handleResetPassword} className="px-10">
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
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root   ": {
                      borderRadius: "8px !important",
                      backgroundColor: "#F9FAFA",
                      width: "22rem",

                      marginBottom: "1rem",
                    },
                    "@media screen and (max-width:1120px)": {
                      "& .MuiOutlinedInput-root   ": {
                        width: "18rem",
                      },
                    },
                  }}
                />

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
                            onClick={handleToggleConfirmPasswordVisibility}
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
                        width: "22rem",

                        marginBottom: "1rem",
                      },
                      "@media screen and (max-width:1120px)": {
                        "& .MuiOutlinedInput-root   ": {
                          width: "18rem",
                        },
                      },
                    }}
                  />
                </FormControl>
                <div className="mt-2">
                  <p className="text-gray600 text-sm mr-2">
                    Password must be minimum of 6 characters
                  </p>
                </div>
                <Button
                  type="submit"
                  className={`mt-10 w-full h-12 ${
                    !isSubmitDisabled ? "bg-primary" : "bg-primaryDisabled"
                  }
                                text-white rounded-3xl
                                `}
                >
                  <p className="capitalize">Reset Password</p>
                </Button>
              </form>

              <div className="text-center mt-7 flex justify-center ">
                <Image src={ArrowLeft} alt="arrow left" className="mr-2" />
                <span
                  className="underline font-bold cursor-pointer"
                  onClick={() => {
                    handleClose();
                    handleSignInOpen();
                  }}
                >
                  Go back to Login{" "}
                </span>
              </div>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
}
