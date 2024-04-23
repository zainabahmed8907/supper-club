"use client";

import CloseIcon from "@mui/icons-material/Close";

import { IconButton, Alert } from "@mui/material";
import { Suspense, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "@/store/services/config";
import ChangePasswordCard from "../ChangePasswordCard/ChangePasswordCard";
import UserDetailFields from "../UserDetailFields/UserDetailFields";
import axios from "axios";
import { headers } from "../../../next.config";

function ProfileSettingsCard() {
  const [passwordSettingsView, setPasswordSettingsView] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowConfrimPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [phoneValidateMsg, setPhoneValidateMsg] = useState("");
  const uaePhoneNumberRegex = /^(?:(\+971|971|00971)|(\+966|966|00966)|(\+965|965|00965))(-)?(\d{2}|\d{3})(-)?\d{7}$/;
  

  const token = localStorage.getItem("token");

  const { user } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    username: user?.fullName,
    phone: user?.phone,
    gender: user?.gender,
    country: user?.country,
    streetAddress: user?.streetAddress,
    nationality: user?.nationality,
    apartment: user?.apartment,
    city: user?.city,
    avatar: user?.avatar,
  });

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfrimPassword(!showconfirmPassword);
  };

  const handleToggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const isSubmitDisabled = Object.values(formData).every(
    (value) => value === ""
  );
  const [file, setFile] = useState();
  const [image, setImage] = useState();

  function handleImageChange(e) {
    setFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
    setFormData({
      ...formData,
      avatar: "https://dp6fqfehej69.cloudfront.net/" + e.target.files[0]?.name,
    });
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (formData.phone?.length > 0) {
      if (uaePhoneNumberRegex.test(formData.phone)) {
        setPhoneValidateMsg("");
      } else {
        setPhoneValidateMsg("Please enter a valid UAE phone number.");
      }
    }
    if (phoneValidateMsg?.length == 0) {
      try {
        const response = await axiosInstance.patch(
          "/user/update-profile",
          {
            ...formData,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const data = response.data;
        if (response.status == 200) {
          setSuccess(true);
        }
        setTimeout(() => {
          setSuccess(false);
        }, 4000);

        return data;
      } catch (e) {
        console.log(e);
      }
    }
  };

  return !passwordSettingsView ? (
    <>
      {success && (
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setSuccess(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Profile Updated Successfully
        </Alert>
      )}

      <Suspense fallback={null}>
        <UserDetailFields
          formData={formData}
          user={user}
          handleInputChange={handleInputChange}
          isSubmitDisabled={isSubmitDisabled}
          handleUpdate={handleUpdate}
          setPasswordSettingsView={setPasswordSettingsView}
          validPhoneNumberMessage={phoneValidateMsg}
          image={image}
          file={file}
          handleImageChange={handleImageChange}
        />
      </Suspense>
    </>
  ) : (
    <Suspense fallback={null}>
      <ChangePasswordCard
        showOldPassword={showOldPassword}
        handleToggleConfirmPasswordVisibility={
          handleToggleConfirmPasswordVisibility
        }
        handleToggleOldPasswordVisibility={handleToggleOldPasswordVisibility}
        handleTogglePasswordVisibility={handleTogglePasswordVisibility}
        showconfirmPassword={showconfirmPassword}
        showPassword={showPassword}
        setPasswordSettingsView={setPasswordSettingsView}
      />
    </Suspense>
  );
}
export default ProfileSettingsCard;
