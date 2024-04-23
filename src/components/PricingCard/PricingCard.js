"use client";

import Image from "next/image";
import rightIcon from "public/images/rightIcon.png";
import { useEffect, useState } from "react";
import SignUpModal from "../Modals/SignUpModal";
import SignInModal from "../Modals/SignInModal";
import ForgotPasswordModal from "../Modals/ForgotPasswordModal";
import VerificationCodeModal from "../Modals/VerificationCodeModal";
import ResetPasswordModal from "../Modals/ResetPasswordModal";
import CongratulationsModal from "../Modals/CongratulationsModal";
import { useDispatch, useSelector } from "react-redux";
import { postPayment } from "@/store/services/checkout.service";
import { DIAMOND_PLAN, GOLD_PLAN, PLATINUM_PLAN } from "@/lib/constants";
function PricingCard({ type, icon, price, text }) {
  const { auth, user } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);

  const [openSignIn, setOpenSignIn] = useState(false);
  const [openForgotPassword, setForgotPasswordOpen] = useState(false);
  const [verificationCodeModalOpen, setverificationCodeModalOpen] =
    useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [congratulateModalOpen, setCongratulateModalopen] = useState(false);
  const offer_slug = localStorage.getItem("offer_slug");
  const [subscription, setSubscription] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.subscription) {
      setSubscription(user?.subscription?.name?.split(" "));
    }
  }, [user]);

  const handleSignUpOpen = () => {
    setOpen(true);
    localStorage.setItem("membership_type", type);
    if (auth) {
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
    }
  };
  const handleSignUpClose = () => setOpen(false);

  const handleSignInOpen = () => setOpenSignIn(true);
  const handleSignInClose = () => setOpenSignIn(false);

  const handleForgotPasswordOpen = () => setForgotPasswordOpen(true);
  const handleForgotPasswordClose = () => setForgotPasswordOpen(false);

  const handleVerifyModalopen = () => setverificationCodeModalOpen(true);
  const handleVerifyModalClose = () => setverificationCodeModalOpen(false);

  const handleResetPasswordOpen = () => setResetPasswordOpen(true);
  const handleResetPasswordClose = () => setResetPasswordOpen(false);

  const handleCongratulateModalOpen = () => setCongratulateModalopen(true);
  const handleCongratulateModalClose = () => setCongratulateModalopen(false);

  return (
    <div>
      {type == "Diamond" && (
        <div className="w-72 m-auto text-white bg-primary  px-0  rounded-t-3xl h-14">
          <p className="text-center pt-2">Most Popular</p>
        </div>
      )}

      <div
        className={`w-72 h-102 p-2 rounded-3xl bg-white m-7 py-8 px-5 ${
          type == "Diamond" && "-mt-4"
        }`}
      >
        <div className="flex justify-between items-center">
          <p className="lg:text-xl text-[1.37rem] text-primary font-semibold  pr-6">
            {type}
          </p>
          <Image src={icon} alt="type icon" />
        </div>
        <div className="pt-2">
          <p className="lg:text-3xl text-[2rem] font-bold">{price}</p>
        </div>
        <div className="pt-2">
          <p className="text-[0.87rem]  text-gray opacity-80 border-b border-primary pb-4">
            {text}
          </p>
        </div>

        <div className="description pt-7 h-40">
          {type == "Gold" && (
            <>
              <div className="flex items-center">
                <Image src={rightIcon} alt="rightIcon" />
                <p className="text-[0.9rem]  text-gray ml-1 p-1 opacity-80">
                  Includes AED 50 Booking Credit{" "}
                </p>
              </div>
              <div className="flex items-center">
                <Image src={rightIcon} alt="rightIcon" />
                <p className="text-[0.9rem]  text-gray ml-1 p-1 opacity-80">
                  Unlimited Discounts for Unlimited Guests{" "}
                </p>
              </div>
            </>
          )}
          {type == "Diamond" && (
            <>
              <div className="flex items-center">
                <Image src={rightIcon} alt="rightIcon" />
                <p className="text-[0.9rem]  text-gray ml-1 p-1 opacity-80">
                  Includes AED 100 Booking Credit{" "}
                </p>
              </div>
              <div className="flex items-center">
                <Image src={rightIcon} alt="rightIcon" />
                <p className="text-[0.9rem]  text-gray ml-1 p-1 opacity-80">
                  Unlimited Discounts for Unlimited Guests{" "}
                </p>
              </div>
            </>
          )}

          {type == "Platinum" && (
            <>
              <div className="flex items-center">
                <Image src={rightIcon} alt="rightIcon" />
                <p className="text-[0.9rem]  text-gray ml-1 p-1 opacity-80">
                  Includes AED 250 Booking Credit{" "}
                </p>
              </div>
              <div className="flex items-center">
                <Image src={rightIcon} alt="rightIcon" />
                <p className="text-[0.9rem]  leading-4 text-gray ml-1 p-1 opacity-80">
                  Two Complimentary Dinner or Lunch{" "}
                </p>
              </div>
              <div className="flex items-center">
                <Image src={rightIcon} alt="rightIcon" />
                <p className="text-[0.9rem]  leading-5 text-gray ml-1 p-1 opacity-80">
                  Breakfast of Pool Passes for Two{" "}
                </p>
              </div>
            </>
          )}
        </div>
        <div className="lg:mt-16  pb-14 mt-10 flex justify-center">
          <button
            className={`border-none rounded-3xl px-10 py-2 text-white  ${
              (subscription?.length > 0 &&
                subscription[0] == "Gold" &&
                type == "Gold") ||
              (subscription?.length > 0 &&
                subscription[0] == "Platinum" &&
                type == "Platinum") ||
              (subscription?.length > 0 &&
                subscription[0] == "Diamond" &&
                type == "Diamond")
                ? "bg-primaryDisabled"
                : "bg-primary"
            }`}
            disabled={
              (subscription[0] == "Gold" && type == "Gold") ||
              (subscription[0] == "Platinum" && type == "Platinum") ||
              (subscription[0] == "Diamond" && type == "Diamond")
            }
            onClick={handleSignUpOpen}
          >
            Get started
          </button>
        </div>
      </div>
      {open && (
        <SignUpModal
          open={open}
          handleClose={handleSignUpClose}
          handleSignInOpen={handleSignInOpen}
          type={type}
        />
      )}
      {openSignIn && (
        <SignInModal
          open={openSignIn}
          handleClose={handleSignInClose}
          handleSignUpOpen={handleSignUpOpen}
          handleForgotPasswordOpen={handleForgotPasswordOpen}
          type={type}
        />
      )}
      {openForgotPassword && (
        <ForgotPasswordModal
          open={openForgotPassword}
          handleClose={handleForgotPasswordClose}
          handleSignInOpen={handleSignInOpen}
          handleVerifyModalOpen={handleVerifyModalopen}
        />
      )}
      {verificationCodeModalOpen && (
        <VerificationCodeModal
          open={verificationCodeModalOpen}
          handleClose={handleVerifyModalClose}
          handleSignInOpen={handleSignInOpen}
          handleResetPasswordOpen={handleResetPasswordOpen}
        />
      )}
      {resetPasswordOpen && (
        <ResetPasswordModal
          open={resetPasswordOpen}
          handleClose={handleResetPasswordClose}
          handleSignInOpen={handleSignInOpen}
          handleCongratulateModalopen={handleCongratulateModalOpen}
        />
      )}
      {congratulateModalOpen && (
        <CongratulationsModal
          open={congratulateModalOpen}
          handleClose={handleCongratulateModalClose}
          handleSignInOpen={handleSignInOpen}
        />
      )}
    </div>
  );
}

export default PricingCard;
