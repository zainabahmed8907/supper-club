"use client";

import { FormControl } from "@mui/base";
import { Alert, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import Ellipse from "public/images/offerDetails/ellipse.png";
import { useState } from "react";

function AboutUsForm() {
  const [formData, setFormData] = useState({
    questionType: "",
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [error, setError] = useState(false);
  const [errorText, setErrortext] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (formData?.phone?.length > 0) {
      if (formData?.phone?.length > 0) {
        if (!formData.phone.match("[0-9]{10}")) {
          setPhoneError("Please enter a valid phone number");
          console.log("ererer");
        } else {
          setPhoneError("");
          setFormData({ ...formData, [name]: value });
        }
      }
    }
  };
  const isSubmitDisabled = Object.values(formData).some(
    (value) => value === ""
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_KEY}/contact-us`,
        formData
      );
      setSuccessAlert(true);
      setSuccessMsg(response?.data?.message);

      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          message: "",
          questionType: "",
          phone: "",
        });
        setSuccessAlert(false);
        setSuccessMsg("");
      }, 2500);
      return response.data;
    } catch (e) {
      setError(true);
      setErrortext(e?.response?.data?.message);

      setTimeout(() => {
        setError(false);
        setErrortext("");
        setFormData({
          fullName: "",
          email: "",
          message: "",
          questionType: "",
          phone: "",
        });
      }, 4000);

      console.log(e);
    }
  };

  return (
    <div
      className="lg:mt-24 mt-10 bg-secondary   pt-12
      xl:px-20 2xl:px-32 4xl:px-40 6xl:px-56 px-4 lg:pb-20"
    >
      {successAlert && (
        <Alert severity="success" className="mb-4 text-center lg:w-1/2 w-full">
          {successMsg}
        </Alert>
      )}
      {error && (
        <Alert severity="error" className="mb-4 text-center lg:w-1/2 w-full">
          {errorText}
        </Alert>
      )}
      <div>
        <p className="lg:text-4xl text-2xl font-semibold">Drop Us A Line</p>
        <div className="border-primary  border-b-4 w-20 h-1 pb-2 pt-4"></div>
      </div>
      <div className="mt-10">
        <p className="text-base">
          Don’t be shy. Let us know if you have any questions!
        </p>
      </div>

      <div className=" mt-7 flex justify-between w-full h-full">
        <form onSubmit={handleSubmit}>
          <div className="flex xl:flex-row lg:flex-col flex-col pb-6">
            <div className="flex flex-col">
              <label className="mb-2 font-bold">Question Type</label>

              <FormControl
                sx={{
                  mt: -1,
                  width: 300,
                  "@media screen and (max-width:768px)": {
                    width: 400,
                  },
                  "@media screen and (max-width:1024px)": {
                    width: 227,
                  },
                }}
              >
                <Select
                  name="questionType"
                  className="outline-none  bg-white 5xl:w-[50rem] 4xxl:w-[45rem] 4xl:w-[40rem] 2xl:w-[33rem] 3xl:w-[37rem] xl:w-102 lg:w-118 md:w-116  w-80 p-3 rounded-lg"
                  sx={{
                    height: 50,
                    borderRadius: "8px",
                    background: "#F9FAFA",
                    ".MuiSelect-select": {
                      color: "#7E7E7E",
                      marginLeft: "-12px",
                      fontWeight: 100,
                      opacity: "0.7",
                    },
                    ".MuiOutlinedInput-root": {
                      color: "#000",
                    },
                  }}
                  value={formData?.questionType}
                  onChange={handleInputChange}
                  displayEmpty
                  renderValue={(value) =>
                    value?.length
                      ? Array.isArray(value)
                        ? value.join(", ")
                        : value
                      : "Select Question Type"
                  }
                >
                  <MenuItem
                    value={"How can we help you?"}
                    className="p-4 mx-3 my-2 text-sm font-bold hover:bg-[#FCFAF7]"
                  >
                    How can we help you?
                  </MenuItem>
                  <MenuItem
                    value={"SupperClub membership enquiry"}
                    className="p-4 mx-3 my-2  text-sm font-bold hover:bg-[#FCFAF7]"
                  >
                    SupperClub membership enquiry
                  </MenuItem>
                  <MenuItem
                    value={"Customer support - Billing"}
                    className="p-4 mx-3 my-2  text-sm font-bold hover:bg-[#FCFAF7]"
                  >
                    Customer support - Billing
                  </MenuItem>
                  <MenuItem
                    value={"Customer support - Guest cards"}
                    className="p-4 mx-3 my-2  text-sm font-bold hover:bg-[#FCFAF7]"
                  >
                    Customer support - Guest cardsy
                  </MenuItem>
                  <MenuItem
                    value={"Customer support - Renewals"}
                    className="p-4 mx-3 my-2  text-sm font-bold hover:bg-[#FCFAF7]"
                  >
                    Customer support - Renewals
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="flex flex-col xl:ml-5 lg:ml-0 xl:mt-0 lg:mt-5 mt-5">
              <label className="mb-2 font-bold">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter Full Name"
                className="outline-none border-2 border-secondary50 bg-white 5xl:w-[50rem] 4xxl:w-[45rem] 4xl:w-[40rem] 2xl:w-[33rem] 3xl:w-[37rem] xl:w-102 lg:w-118 md:w-116  w-80 p-3 rounded-lg"
              />
            </div>
          </div>
          <div className="flex xl:flex-row lg:flex-col flex-col ">
            <div className="flex flex-col">
              <label className="mb-2 font-bold">Email Address</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter Email Address"
                className="outline-none bg-white border-2 border-secondary50 5xl:w-[50rem] 4xxl:w-[45rem] 4xl:w-[40rem] 2xl:w-[33rem] 3xl:w-[37rem] xl:w-102 lg:w-118 md:w-116 w-80 p-3 rounded-lg"
              />
            </div>
            <div className="flex flex-col xl:ml-5 lg:ml-0 xl:mt-0 lg:mt-5 mt-5">
              <label className="mb-2 font-bold" htmlFor="phone">
                Phone (Optional)
              </label>

              <input
                type="tel"
                pattern="[0-9]*"
                value={formData.phone}
                name="phone"
                onChange={handleInputChange}
                placeholder="Enter Phone Number"
                className="outline-none border-2 border-secondary50 bg-white 5xl:w-[50rem] 4xxl:w-[45rem] 4xl:w-[40rem] 2xl:w-[33rem] 3xl:w-[37rem] xl:w-102 lg:w-118 md:w-116  w-80 p-3 rounded-lg"
              />
              <div className="mt-2">
                {phoneError && (
                  <span className="text-red-500 ">{phoneError}</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-10">
            <label className="mb-2 font-bold">Message</label>
            <textarea
              rows="5"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Write A Message"
              className="outline-none border-2 border-secondary50 bg-white xl:w-[57rem] 2xl:w-[67.2rem] 3xl:w-[75rem] 4xl:w-[81.2rem]
              4xxl:w-[91rem] 
              5xl:w-[101rem] md:w-116 w-80 p-3 rounded-lg resize-none"
            ></textarea>
          </div>

          <div
            className="mt-10 flex lg:flex-row flex-col justify-end xl:w-[57rem] 2xl:w-[67.2rem] 3xl:w-[75rem] 4xl:w-[81.2rem]
              4xxl:w-[91rem] 
              5xl:w-[101rem]"
          >
            <div className="flex justify-end">
              <button
                type="submit"
                className={`  ${
                  !isSubmitDisabled ? "bg-primary" : "bg-primaryDisabled"
                } w-40 rounded-3xl p-3 text-white lg:mt-0 mt-5`}
                disabled={isSubmitDisabled}
              >
                Send
              </button>
            </div>
          </div>
        </form>
        <div className="justify-self-end self-end w-[45rem] lg:block hidden mt-10">
          <Image
            src={Ellipse}
            width={850}
            alt="ellipse"
            className="mt-10 ml-32 4xl:ml-40 6xl:ml-56 object-contain relative top-20"
          />
        </div>
      </div>
      <div className="flex justify-end w-screen lg:hidden">
        <Image src={Ellipse} alt="ellipse" width={150} />
      </div>
    </div>
  );
}
export default AboutUsForm;
