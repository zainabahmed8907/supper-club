"use client";
import { Checkbox, InputAdornment, Snackbar, TextField } from "@mui/material";
import Image from "next/image";
import Logo from "public/images/footer/footer_logo.png";
import MessageIcon from "public/images/footer/MessageIcon.png";
import facebook from "public/images/footer/facebook.png";
import instagram from "public/images/footer/instagram.png";
import linkedin from "public/images/footer/linkedin.png";
import twitter from "public/images/footer/twitter.png";
import Link from "next/link";
import { useState } from "react";
import whatsapp from "public/images/footer/whatsapp.png";
import closeIcon from "public/images/footer/close-circle.svg";
import Ellipse from "public/images/footer/ellipse.svg";
import SendIcon from "public/images/footer/send-icon.svg";
import dot1 from "public/images/footer/dot-1.svg";
import dot2 from "public/images/footer/dot-2.svg";
import dot3 from "public/images/footer/dot-3.svg";

import axios from "axios";
function Footer() {
  const Label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [chat, setChat] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const subscribeToNewsletter = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process?.env?.NEXT_PUBLIC_API_KEY}/newsletter`,
        {
          email: email,
        }
      );
      setOpen(true);
      setSuccessMsg(response?.data?.message);

      setTimeout(() => {
        setEmail("");
        setOpen(false);
        setSuccessMsg("");
      }, 3000);

      return response.data;
    } catch (e) {
      throw e;
    }
  };
  const toggleChatBox = () => {
    setChat(true);
  };

  return (
    <div className="bg-footerBg h-auto pt-20 pb-10  lg:px-2 xl:px-10 4xl:px-20 5xl:px-32 6xl:px-48">
      <div className="lg:px-36 xl:px-40 px-4">
        <div className="flex lg:flex-row xl:flex-row 2xl:flex-row 3xl:flex-row flex-col mb-16">
          <div className="xl:w-2/5">
            <Image src={Logo} alt="footer logo" />
            <p className="lg:mt-4 mt-6 text-[1.1rem] lg:text-lg xl:text-lg 2xl:text-xl 3xl:text-xl text-white mb-6 font-normal">
              Address
            </p>
            <p className="text-[1.1rem] lg:text-base text-white  w-64 mt-6 opacity-80">
              Dubai - 786 15 h street, Office 478 Jumeirah, 81566
            </p>
            <div className="flex mt-8 mb-8">
              <Link
                href="https://www.facebook.com/supperclubm"
                target="_blank"
                className="mr-3"
              >
                <Image
                  src={facebook}
                  alt="fb icon"
                  className="transition-all hover:bg-primary rounded-full"
                  width={40}
                  height={40}
                />
              </Link>
              <Link
                href="https://www.instagram.com/supperclubme/"
                target="_blank"
                className="mr-3"
              >
                <Image
                  src={instagram}
                  className="transition-all hover:bg-primary rounded-full"
                  alt="instagram icon"
                  width={40}
                  height={40}
                />
              </Link>
              <Link href="" target="_blank" className="mr-3">
                <Image
                  src={linkedin}
                  className="transition-all hover:bg-primary rounded-full"
                  alt="linkedin icon"
                  width={40}
                  height={40}
                />
              </Link>
              <Link href="" target="_blank" className="mr-3">
                <Image
                  src={twitter}
                  className="transition-all hover:bg-primary rounded-full"
                  alt="twitter icon"
                  width={40}
                  height={40}
                />
              </Link>
            </div>
          </div>

          <div className="lg:mt-20  xl:w-2/5">
            <p className="mt-4 text-[1.1rem] lg:text-lg xl:text-lg 2xl:text-xl 3xl:text-xl text-white mb-6 font-normal">
              Say Hello
            </p>
            <p className="text-base xl:text-base text-white w-4/5 opacity-80">
              <a href="mailto:support@supperclub.com">info@supperclub.me</a>
            </p>
            <p className="text-base xl:text-base  text-white  mt-2">
              <a href="tel:+971 40 630 6692">+971 40 630 6692</a>
            </p>
          </div>

          <div className="lg:mt-20 mt-6  2xl:w-4/5">
            <p className="mt-4 text-[1.1rem] lg:text-lg xl:text-lg 2xl:text-xl 3xl:text-xl text-white mb-6 font-normal">
              Newsletter
            </p>

            <form onSubmit={subscribeToNewsletter}>
              <TextField
                id="standard-adornment-amount"
                className=" px-4 rounded-full p-2 xl:w-102 md:w-96 w-[23rem] outline-none border-none text-white"
                placeholder="Enter your email address"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setValidEmail(validateEmail(e.target.value));
                }}
                value={email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className="pl-3">
                      <Image src={MessageIcon} alt="messageicon" width={40} />
                    </InputAdornment>
                  ),

                  endAdornment: (
                    <InputAdornment className="my-2">
                      <button
                        type="submit"
                        className={`${
                          !validEmail ? "bg-primary" : "bg-primary"
                        } text-white rounded-full lg:px-10 px-4 lg:py-3 py-2 mr-1 text-lg`}
                        disabled={!validEmail}
                        id="subscribe"
                      >
                        Subscribe
                      </button>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root   ": {
                    borderRadius: "30px !important",
                    backgroundColor: "rgba(139, 137, 135, 0.1)",
                    color: "white",
                    marginLeft: "-22px",
                    marginBottom: "1rem",
                    padding: 0.5,
                  },
                }}
              />
              <p className="text-red-600 -mt-4">
                {email?.length > 0 &&
                  !validEmail &&
                  "please enter a valid email"}
              </p>
            </form>
            <p className="mt-2 text-base xl:text-base text-footerText opacity-80 -ml-10">
              <div className="checkbox-container flex cursor-pointer select-none items-center  font-normal">
                <Checkbox {...Label} />
                <p>
                  I agree to the{" "}
                  <Link
                    href="/privacy_policy"
                    className="mr-7 ml-2 opacity-80 text-base xl:text-base  xl:mb-0 underline"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>{" "}
            </p>
          </div>
        </div>
      </div>

      {chat && (
        <div
          className="lg:w-[342px] w-76 max-h-[378px] h-[388px] bg-white rounded-3xl fixed 
            xl:bottom-14 4xl:bottom-10 lg:right-2  right-10 z-2 bottom-12"
        >
          <div className=" mt-8">
            <Image
              src={Ellipse}
              alt="ellipse"
              className=" h-[191px] w-[342px] "
            />
            <div class="absolute inset-0 w-full h-full flex justify-center flex-col -mt-14 pl-5">
              <p className="text-[14px] font-medium w-[274px] pb-2 pt-4">
                Welcome to <span className="text-primary">SupperClub`s</span>{" "}
                Customer Spport!
              </p>
              <p className="text-xs w-[290px] pb-10">
                Get instant help with any doubts regarding your membership,
                offers and our services.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="flex pl-2 mt-9">
              <Image
                src={dot1}
                alt="dot1"
                className="mt-6"
                width={7}
                height={7}
              />
              <Image
                src={dot2}
                alt="dot1"
                className="mt-4"
                width={9}
                height={10}
              />
              <Image
                src={dot3}
                alt="dot1"
                className="mt-1"
                width={11}
                height={12}
              />
            </div>

            <div className="w-full flex justify-center mb-4 -mt-2 -ml-7">
              <div className="w-[277px] h-[73px] border-2 border-[#DDDDDD] rounded-3xl flex flex-col justify-center">
                <div className="pl-5">
                  <p className="text-xs font-medium">Hello</p>
                  <p className="text-xs font-medium">Can we help you?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex self-end justify-end items-end pb-4 pr-6 ">
            <Link
              href=""
              className="rounded-3xl bg-[#48C95F] text-white px-6 py-3 cursor-pointer flex"
            >
              <p className="mr-3">Open Chat</p>
              <Image src={SendIcon} alt="" />
            </Link>
          </div>

          <div className="h-[60px] bg-[#48C95F] w-full rounded-t-3xl flex items-center justify-between px-8 top-0 bottom-20 absolute mb-20">
            <p className="text-[#FFFFFF] text-base">Support Team</p>
            <Image
              src={closeIcon}
              alt="close-icon"
              width={25}
              height={25}
              className="cursor-pointer"
              onClick={() => {
                setChat(false);
              }}
            />
          </div>
        </div>
      )}

      {!chat && (
        <div
          className="flex items-center lg:ps-10 xl:ps-2 2xl:ps-10 ps-4 lg:pe-16 xl:pe-16 2xl:pe-14 pe-4 cursor-pointer z-20"
          onClick={() => setChat(true)}
        >
          <div className="w-screen flex justify-end">
            <div
              className="lg:w-40 xl:w-40 w-48 bg-white rounded-3xl p-1 flex items-center fixed xl:bottom-14
             4xl:bottom-10 right-10 -mt-10"
            >
              <Image src={whatsapp} alt="get help icon" />
              <p className="ml-2 text-textMain font-semibold">Need Help?</p>
            </div>
          </div>
        </div>
      )}

      {!chat && (
        <div
          className="fixed bottom-10 right-5 z-50 bg-green-500 text-white rounded-full p-3 shadow-lg lg:hidden block"
          onClick={toggleChatBox}
        >
          <svg
            style={{ color: "white" }}
            className="w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 
          222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
              fill="white"
            ></path>
          </svg>
        </div>
      )}

      <div className="border-t-2 border-footerdiv lg:w-4/5 xl:w-10/12 w-11/12 lg:mx-36 xl:mx-20 2xl:mx-36 mx-4 lg:pl-4 pt-5 -mt-8"></div>

      <div
        className=" mt-0 text-white opacity-80 text-xs m-auto flex justify-between flex-wrap
       flex-row lg:px-36 xl:px-36 lg:x-36 px-4"
      >
        <div>
          <p className="opacity-80 mb-2 xl:mb-0 text-xs xl:text-base text-white lg:block hidden">
            {" "}
            &copy;supperclub.me {new Date().getFullYear()}
          </p>
        </div>
        <div className="flex flex-row  flex-wrap">
          <Link
            href="/faqs"
            className="lg:mr-7 mr-4  opacity-80 text-xs xl:text-base mb-2 xl:mb-0 text-white"
          >
            FAQs
          </Link>
          <Link
            href="/about_us"
            className="lg:mr-7 mr-4  opacity-80 text-xs xl:text-base mb-2 xl:mb-0 text-white"
          >
            About Us/Contact Us
          </Link>
          <Link
            href="/terms&conditions"
            className="lg:mr-7  opacity-80 text-xs xl:text-base mb-2 xl:mb-0 text-white"
          >
            Terms & Conditions
          </Link>
          <Link
            href="/privacy_policy"
            className="mr-7  opacity-80 text-xs xl:text-base mb-2 xl:mb-0 text-white"
          >
            Privacy Policy
          </Link>
        </div>
        <div className="block m-auto lg:hidden">
          <p className="opacity-80 mb-2 xl:mb-0 text-xs xl:text-base text-center text-white lg:hidden flex mt-14">
            {" "}
            &copy;supperclub.me {new Date().getFullYear()}
          </p>
        </div>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        message={successMsg}
      />
    </div>
  );
}
export default Footer;
