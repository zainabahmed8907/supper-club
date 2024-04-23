import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import CloseCircle from "public/images/offers/close-drawer.png";
import Image from "next/image";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function StripeCheckout({ clientSecret, close }) {

  return (
    <div id="checkout">
      <div className="flex justify-between  px-5 py-2 items-center h-14 bg-white rounded-lg">
        <p className="text-[0.938rem] font-medium">Checkout</p>
        <Image
          src={CloseCircle}
          alt=""
          width={20}
          height={20}
          onClick={close}
          className="cursor-pointer"
        />
      </div>
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        
          
        >
          <EmbeddedCheckout className="xl:max-h-102 2xl:max-h-104 
           4xl:max-h-112 5xl:max-h-120 max-h-86 overflow-y-auto rounded-lg"/>
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
}
