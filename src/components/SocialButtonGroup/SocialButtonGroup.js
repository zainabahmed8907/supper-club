"use client";
import { handleOAuth } from "@/lib/constants";
import { setSocialIcon } from "@/store/reducers/user.slice";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function SocialButtonGroup({ loginFrom }) {
  const path = usePathname();
  const dispatch = useDispatch();

  const handleWhatsAppBtnClick = (icon) => {
    dispatch(setSocialIcon(icon));
  };

  useEffect(() => {
    if (loginFrom == "modal") {
      localStorage.setItem("socialMediaModal", true);
    }
  }, [loginFrom]);

  return (
    <div>
      {path == "/memberships" ? (
        <Button
          variant="contained"
          className={`auth-social-btn mr-2 sm:mr-6 ${
            loginFrom === "whatsapp" ? "bg-primary" : ""
          }`}
          onClick={() => {
            handleWhatsAppBtnClick("whatsapp");
            localStorage.setItem("loginFrom", "whatsApp");
          }}
        >
          <Image
            src="/images/social/whatsapp.png"
            width={24}
            height={24}
            alt="whatsapp"
          />
        </Button>
      ) : (
        <Button
          variant="contained"
          className={`auth-social-btn mr-2 sm:mr-6 ${
            loginFrom === "whatsapp" ? "bg-primary" : ""
          }`}
          onClick={() => {
            handleWhatsAppBtnClick("whatsapp");

            localStorage.setItem("loginFrom", "whatsApp");
          }}
        >
          <Link href="/login?from=whatsapp">
            <Image
              src="/images/social/whatsapp.png"
              width={24}
              height={24}
              alt="whatsapp"
            />
          </Link>
        </Button>
      )}

      <Button
        variant="contained"
        className="auth-social-btn mr-2 sm:mr-6"
        onClick={() => {
          localStorage.setItem("loginFrom", "facebook");
          handleOAuth("facebook");
        }}
      >
        <Image
          src="/images/social/facebook-1.svg"
          width={29}
          height={29}
          alt="facebook"
        />
      </Button>

      <Button
        variant="contained"
        className="auth-social-btn mr-2 sm:mr-6"
        onClick={() => {
          localStorage.setItem("loginFrom", "google");

          handleOAuth("google");
        }}
      >
        <Image
          src="/images/social/google-1.svg"
          width={25}
          height={25}
          alt="google"
        />
        {/* </Link> */}
      </Button>
      <Button
        variant="contained"
        className={`auth-social-btn ${
          loginFrom !== "whatsapp" ? "bg-primary" : ""
        }`}
      >
        <Link href="/login?from=email">
          <Image
            src="/images/social/email.png"
            width={26}
            height={26}
            alt="email"
          />
        </Link>
      </Button>
    </div>
  );
}
