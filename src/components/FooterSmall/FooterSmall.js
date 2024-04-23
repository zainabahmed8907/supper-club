import React from "react";
import Link from "next/link";

const FooterSmall = () => {
  return (
    <footer className="relative text-white p-5 text-sm">
      <div className="flex items-center justify-center opacity-80 md:justify-between">
        <div className="lg:-mt-8 2xl:-mt-20 4xl:-mt-40 5xl:mt-24 3xl:-mt-10">&copy;supperclubme.com 2023</div>
        <div className="hidden md:flex lg:-mt-8 2xl:-mt-20 4xl:-mt-40 5xl:mt-24 3xl:-mt-10">
          <Link className="mr-4 hover:text-primary" href="/about_us">About Us/Contact Us</Link>
          <Link className="mr-4 hover:text-primary" href="/terms&conditions">Terms & Conditions</Link>
          <Link className="hover:text-primary" href="/privacy_policy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default FooterSmall;
