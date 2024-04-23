import { Menu, MenuItem, Divider, Button } from "@mui/material";
import Link from "next/link";
import ManageAccountIcon from "public/images/drawer/categories.svg";
import BookingIcon from "public/images/drawer/booking-credits.svg";
import FavoriteOffersIcon from "public/images/drawer/favorite-offers.svg";
import LogoutIcon from "public/images/dashboard/logout.svg";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { logout } from "@/store/reducers/user.slice";
import { useRouter } from "next/navigation";

const ProfileDropDown = ({ anchorEl, handleClose, open }) => {
  const dispatch = useDispatch();
  const route = useRouter();

  const signout = () => {
    dispatch(logout());
    route.push("/");
  };
  return (
    <>
      <Menu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        elevation={1}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPaper-root": {
            maxWidth: 200,
            width: "13rem",
            marginTop: "4rem",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            height: "10rem",
            zIndex: 10,
            "@media screen and (min-width:1440px)": {
              marginLeft: "-5rem",
            },
            "@media screen and (min-width:1640px)": {
              marginLeft: "-5rem",
            },
          },
        }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{
            padding: 1,
            cursor: "pointer",
          }}
          disableRipple
        >
          <Link href="/profile" className="flex text-sm">
            <Image
              src={ManageAccountIcon}
              alt="menu icon"
              width={20}
              height={30}
              className="mr-2"
            />
            <p>Manage Account</p>
          </Link>
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            padding: 1,
            cursor: "pointer",
          }}
          disableRipple
        >
          <Link href="/bookings?type=upcoming" className="flex text-sm">
            <Image
              src={BookingIcon}
              alt="menu icon"
              width={20}
              height={30}
              className="mr-2"
            />

            <p> My Bookings</p>
          </Link>
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            padding: 1,
            cursor: "pointer",
          }}
          disableRipple
        >
          <Link href="/favorite_offers" className="flex text-sm">
            <Image
              src={FavoriteOffersIcon}
              alt="menu icon"
              width={20}
              height={30}
              className="mr-2"
            />
            <p>Favorite Offers</p>
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            signout();
          }}
          sx={{
            padding: 1,
            width: "100%",
            cursor: "pointer",
          }}
          disableRipple
        >
          <div className="text-sm flex border-none bg-transparent w-full">
            <Image
              src={LogoutIcon}
              alt="menu icon"
              width={20}
              height={30}
              className="mr-2"
            />
            <p>Logout</p>
          </div>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileDropDown;
