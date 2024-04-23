"use client";
import { setUser } from "@/store/reducers/user.slice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { postPayment } from "@/store/services/checkout.service";
import { DIAMOND_PLAN, GOLD_PLAN, PLATINUM_PLAN } from "@/lib/constants";
import {useSelector} from "react-redux";


function VerifyCode({ data }) {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const {auth}=useSelector(state=>state.user);

  const offer_slug = localStorage.getItem("offer_slug");
  const type = localStorage.getItem("membership_type");
  useEffect(() => {
    if (data && data.user) {
      dispatch(setUser(data));
      push("/profile");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const router = useRouter();
  const path = useSearchParams();
  const is_modal_signin = localStorage.getItem("socialMediaModal");

  useEffect(() => {
    if (path?.has("code") && is_modal_signin) {
      router?.push("/memberships");
    }
    if (path?.has("code") && is_modal_signin && offer_slug?.length > 0 && auth) {
      router?.push(`/offers/${offer_slug}`);

    }

    if (path?.has("code") && is_modal_signin && offer_slug?.length > 0) {
      if (type === "Gold") {
        if (offer_slug?.length > 0) {
          dispatch(
            postPayment({
              planId: GOLD_PLAN,
              returnUrl: `/offers/${offer_slug}`,

              
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, router, auth]);
  return <div></div>;
}

export default VerifyCode;
