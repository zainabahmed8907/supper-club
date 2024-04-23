import { TextField, InputAdornment, IconButton, Alert } from "@mui/material";

import ArrowLeftIcon from "public/images/dashboard/arrow-left.svg";
import PasswordIcon from "public/images/pricing/lock.png";
import WarningIcon from "public/images/pricing/warning.svg";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axiosInstance from "@/store/services/config";
import { useSelector } from "react-redux";
const errorPill = {
  background:
    "linear-gradient(0deg, rgba(195, 157, 99, 0.05) 0%, rgba(195, 157, 99, 0.05) 100%), #FFF",
  padding: "1rem",
  maxWidth: "fit-content",
  borderRadius: "12px",
};

export default function ChangePasswordCard({
  showOldPassword,
  handleTogglePasswordVisibility,
  handleToggleConfirmPasswordVisibility,
  handleToggleOldPasswordVisibility,
  showPassword,
  showconfirmPassword,
  setPasswordSettingsView,
}) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPasswordError, setCcurrentPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [failedAlert, setFailedAlert] = useState(false);
  const [failedAlertMessage, setFailedAlertMessage] = useState("");
  const loginFrom = localStorage.getItem("loginFrom");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const isSubmitDisabled =
    loginFrom == "google" || loginFrom == "facebook" || loginFrom == "whatsApp"
      ? formData?.newPassword == ""
      : Object.values(formData).some((value) => value === "");

  const validatePassword = () => {
    if (!formData.currentPassword) {
      setCcurrentPasswordError("Current Password is requried");
    } else {
      setCcurrentPasswordError("");
    }
  };
  const validateNewPassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    if (!formData.newPassword.trim()) {
      setPasswordError("Password is required");
    } else if (!passwordRegex.test(formData.newPassword)) {
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

  const validatePasswords = () => {
    if (confirmPassword !== "") {
      if (formData.newPassword !== confirmPassword) {
        setPasswordMatchError("Passwords must match");
      }
    }
  };

  const changePassword = async () => {
    try {
      // if (
      //   loginFrom == "google" ||
      //   loginFrom == "facebook" ||
      //   loginFrom == "whatsApp"
      // ) {
      //   const response = await axiosInstance.patch(
      //     `/user/change-password`,
      //     formData?.newPassword
      //   );
      //   const data = response.data;

      //   if (response.status == 200) {
      //     setSuccessAlert(true);
      //     setTimeout(() => {
      //       setSuccessAlert(false);
      //     }, 2000);
      //   }
      //   return data;
      // }
      const response = await axiosInstance.patch(
        `/user/change-password`,
        formData
      );
      const data = response.data;

      if (response.status == 200) {
        setSuccessAlert(true);
        setTimeout(() => {
          setSuccessAlert(false);
          setFormData({ newPassword: "", currentPassword: "" });
          setConfirmPassword("")
        }, 4000);
      
      }
      return data;
    } catch (e) {
      setFailedAlert(true);
      setTimeout(() => {
        setFailedAlert(false);
      }, 4000);
      setFailedAlertMessage(e?.response?.data?.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (
    //   loginFrom == "google" ||
    //   loginFrom == "facebook" ||
    //   loginFrom == "whatsApp"
    // ) {
    //   validateNewPassword();
    //   validateConfirmPassword();
    //   if (
    //     passwordError == "" &&
    //     passwordMatchError == "" &&
    //     confirmPasswordError == ""
    //   ) {
    //     changePassword();
    //   }
    // }

    validatePassword();
    validateNewPassword();
    validateConfirmPassword();
    validatePasswords();
    if (
      passwordError == "" &&
      passwordMatchError == "" &&
      confirmPasswordError == "" &&
      currentPasswordError == ""
    ) {
      changePassword();
    } else {
      console.log(
        "errors",
        passwordError,
        passwordMatchError,
        confirmPasswordError,
        currentPasswordError
      );
    }
  };

  return (
    <div
      className="mt-1 bg-white min-h-[780px]
    h-[780px]   overflow-y-scroll 2xl:w-[66rem] lg:w-[56rem]  lg:ml-0 mx-4  m-auto"
    >
      <div className="flex flex-col items-end">
        {confirmPasswordError && (
          <div className="mr-3 mt-2 mb-2 flex float-right" style={errorPill}>
            <Image src={WarningIcon} alt="warning" className="mr-3" />
            <p className="text-base">{confirmPasswordError}</p>
          </div>
        )}
        {passwordError && (
          <div className="mr-3 mt-2 mb-2 flex float-right" style={errorPill}>
            <Image src={WarningIcon} alt="warning" className="mr-3" />
            <p className="text-base">{passwordError}</p>
          </div>
        )}
        {passwordMatchError && (
          <div className="mr-3 mt-2 mb-2 flex float-right " style={errorPill}>
            <Image src={WarningIcon} alt="warning" className="mr-3" />
            <p className="text-base">{passwordMatchError}</p>
          </div>
        )}
      </div>
      {successAlert && (
        <Alert severity="success">Password Changed Successfully</Alert>
      )}
      {failedAlert && <Alert severity="error">{failedAlertMessage}</Alert>}
      <div className="lg:ml-5 lg:mt-5 p-5">
        <div className="flex pb-12">
          <p
            className="mr-2 text-base text-primary font-medium flex cursor-pointer"
            onClick={() => setPasswordSettingsView(false)}
          >
            <Image
              src={ArrowLeftIcon}
              width={24}
              height={24}
              className="mr-2"
              alt="arrow icon"
            />{" "}
            Go Back /
          </p>
          <p className="text-base font-medium">Change Password</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="pb-2 text-base font-bold">Old Password</label>
            <TextField
              labelText=""
              id="password1"
              placeholder="Enter old password"
              type={!showOldPassword ? "password" : "text"}
              name="currentPassword"
              onChange={handleInputChange}
              value={formData.currentPassword}
              // disabled={
              //   loginFrom == "google" ||
              //   loginFrom == "facebook" ||
              //   loginFrom == "whatsApp"
              // }
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
                      onClick={handleToggleOldPasswordVisibility}
                    >
                      {showOldPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root   ": {
                  borderRadius: "8px !important",
                  backgroundColor: "#F9FAFA",
                  width: "22rem",

                  marginBottom: "2rem",
                },
                "@media screen and (max-width:1120px)": {
                  "& .MuiOutlinedInput-root   ": {
                    width: "22rem",
                  },
                },
                "@media screen and (max-width:420px)": {
                  "& .MuiOutlinedInput-root   ": {
                    width: "19rem",
                  },
                },
              }}
              className="xss:w-[19.75rem] xs:w-[22.8rem]  xl:w-76 lg:w-[14rem]"
            />
            <label className="pb-2 text-base font-bold">New Password</label>

            <TextField
              labelText=""
              id="password2"
              placeholder="Password"
              type={!showPassword ? "password" : "text"}
              value={formData.newPassword}
              name="newPassword"
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
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root   ": {
                  borderRadius: "8px !important",
                  backgroundColor: "#F9FAFA",
                  width: "22rem",

                  marginBottom: "2rem",
                },
                "@media screen and (max-width:1120px)": {
                  "& .MuiOutlinedInput-root   ": {
                    width: "22rem",
                  },
                },
                "@media screen and (max-width:420px)": {
                  "& .MuiOutlinedInput-root   ": {
                    width: "19rem",
                  },
                },
              }}
              className="xss:w-[19.75rem] xs:w-[22.8rem]  xl:w-76 lg:w-[14rem]"
            />
            <label className="pb-2 text-base font-bold">
              Confirm new Password
            </label>
            <TextField
              labelText=""
              id="password3"
              placeholder="Confirm Password"
              type={!showconfirmPassword ? "password" : "text"}
              value={confirmPassword}
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                      {showconfirmPassword ? <Visibility /> : <VisibilityOff />}
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
                    width: "22rem",
                  },
                },
                "@media screen and (max-width:420px)": {
                  "& .MuiOutlinedInput-root   ": {
                    width: "19rem",
                  },
                },
              }}
              className="xss:w-[19.75rem] xs:w-[22.8rem]  xl:w-76 lg:w-[14rem]"
            />
          </div>

          <div className="lg:mt-6 mt-56">
            <button
              type="submit"
              className={`${
                !isSubmitDisabled ? "bg-primary" : "bg-primaryDisabled"
              }
              } lg:w-[13.83rem] w-full h-[2.75rem] p-[6.83px] rounded-3xl text-white text-lg lg:mt-0 mt-5`}
              disabled={isSubmitDisabled}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
