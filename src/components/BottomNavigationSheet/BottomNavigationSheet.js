"use client";
import HomeIcon from "public/images/dashboard/home.svg";
import CreditsIcon from "public/images/dashboard/credits.svg";
import BookingsIcon from "public/images/dashboard/bookings.svg";
import MoreIcon from "public/images/dashboard/more.svg";
import ManageAccount from "public/images/dashboard/manage-account.svg";
import ReferAFriend from "public/images/dashboard/refer-a-friend.svg";
import FavoriteOffers from "public/images/dashboard/favorite-offers.svg";

import { Paper, BottomNavigation } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
// import ManageIcon from "public/images/dashboard/";

function BottomNavigationSheet() {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <div className="z-10 absolute">
      {open && (
        <Paper
          className="rounded-full"
          sx={{
            position: "fixed",
            bottom: 50,
            left: 0,
            right: 0,
            borderRadius: "12px",
            width: "100vw",
          }}
        >
          <BottomNavigation
          
            sx={{
              height: 100,
              display: "flex",
              alignItems: "center",
              borderRadius: "12px",
            }}
          >
            <Link href="/profile" className="w-48 p-2">
              <Image src={ManageAccount} alt="" width={100} />
            </Link>

            <Link href="/favorite_offers" className="w-48 p-2">
              <Image src={FavoriteOffers} alt="" width={100} />
            </Link>
            <Link href="" className="w-48 p-2">
              <Image src={ReferAFriend} alt="" width={100} />
            </Link>
          </BottomNavigation>
        </Paper>
      )}
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100vw",
          maxHeight: "120px",
        }}
        elevation={1}
        className="lg:hidden block"
      >
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <Link href="/" className="w-48 p-2">
            <Image src={HomeIcon} alt="" width={80} />
          </Link>

          <Link href="/wallet" className="w-48 p-2">
            <Image src={CreditsIcon} alt="" width={80} />
          </Link>
          <Link href="/bookings?type=upcoming" className="w-48 p-2">
            <Image src={BookingsIcon} alt="" width={80} />
          </Link>
          <Link href="" className="w-48 p-2">
            <Image
              src={MoreIcon}
              alt=""
              width={80}
              onClick={() => setOpen(!open)}
            />
          </Link>
        </BottomNavigation>
      </Paper>
    </div>
  );
}
export default BottomNavigationSheet;
