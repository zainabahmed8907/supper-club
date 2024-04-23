import ProfileImage from "public/images/dashboard/profile-picture.png";
import Image from "next/image";
import WhatsappIcon from "public/images/dashboard/whatsapp.svg";
import FacebookIcon from "public/images/dashboard/facebook-icon.png";
import GoogleIcon from "public/images/dashboard/googleIcon.svg";
import ProfileImageIcon from "public/images/dashboard/profile-image-icon.svg";
import Camera from "public/images/dashboard/camera.png";

import { useEffect, useState } from "react";
import { Avatar, SwipeableDrawer } from "@mui/material";
import { styled } from "@mui/styles";
import { useSelector } from "react-redux";
import styles from "./index.module.css";
import DoneIcon from "@mui/icons-material/Done";

const Puller = styled("div")(({ theme }) => ({
  width: 60,
  height: 6,
  backgroundColor: "#DDDDDD",
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

function UserDetails({ file, image, hanndleImageChange, formData }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [socialLink, setSocialLink] = useState("");
  const token = localStorage.getItem("token");
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const { user } = useSelector((state) => state.user);


  const connectSocialMedia = async (provider) => {
    try {
      window.location.href = `${process.env.NEXT_PUBLIC_API_KEY}/auth/${provider}?user=${token}`;
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    setSocialLink(user?.oAuthProviders?.map((p) => p?.provider));
  }, [user]);

  return (
    <div className="mt-10 4xl:ml-8 xl:ml-2 lg:-ml-0 flex flex-col items-center  gap-[1rem]">
      <div className={styles.image}>
        <label className={styles.label}>
          <input
            type="file"
            name="avatar"
            onChange={hanndleImageChange}
            accept="image/jpeg, image/png"
          />
          <figure className={styles.figure}>
            {user?.avatar ? (
              <>
                <Image
                  src={
                    (typeof file !== undefined && image) ||
                    "https://dp6fqfehej69.cloudfront.net" + "/" + user?.avatar
                  }
                  className={styles.avatar}
                  alt="avatar"
                  width={130}
                  height={100}
                />
                <figcaption className={styles.figcaption}>
                  <Image alt="" src={Camera} width={50} height={50} />
                </figcaption>
              </>
            ) : (
              <>
                <Avatar
                  className={styles.avatar}
                  alt="avatar"
                  sx={{
                    width: "100%",
                    height: "100%",
                    fontSize: 30,
                    background: "#DBC4A1",
                  }}
                >
                  {user?.fullName?.split(" ")[0]?.charAt(0) +
                    " " +
                    user?.fullName?.split(" ")[1]?.charAt(0)}
                </Avatar>
                <figcaption className={styles.figcaption}>
                  <Image alt="" src={Camera} width={50} height={50} />
                </figcaption>
              </>
            )}
            
          </figure>{" "}
        </label>
      </div>

      <Image
        src={ProfileImageIcon}
        alt="user"
        width={50}
        height={20}
        onClick={toggleDrawer}
        className="relative -mt-20 ml-28 xl:hidden block"
      />
      <div className="xl:w-[260px] xl:flex justify-center flex-col hidden">
        <p className="text-center leading-[18px] text-base font-bold pb-[14px]">
          {user?.fullName}
        </p>
        <p className="text-center leading-[16px] text-sm pb-[14px]">
          {user?.email}
        </p>
        <p className="text-xs text-grey text-center leading-[24px] pb-[14px]">
          Ideal dimensions: 100x100 pixels.
        </p>

        <div className="mt-10 lg:w-[260px]">
          <p className="flex-shrink-0 text-[1.125rem] font-medium leading-normal">
            Connect Your Accounts
          </p>
          <div className="w-[2.5rem] h-[3px] bg-primary my-2"></div>
          <div className="flex items-center justify-between py-4 border-b-2 border-secondary50">
            <div className="flex items-center">
              <Image
                src={FacebookIcon}
                width={24}
                height={24}
                alt="facebook"
                className="mr-2"
              />
              <p className="text-sm font-bold">Facebook</p>
            </div>
            <div>
              {socialLink?.includes("FACEBOOK") && (
                <div className="flex items-center">
                  <DoneIcon fontSize="5" className="mr-1" />
                  <p className="text-sm text-[#4A423B] font-bold cursor-pointer">
                    Connected
                  </p>
                </div>
              )}
              {!socialLink?.includes("FACEBOOK") && (
                <p
                  className="text-sm font-medium text-primary cursor-pointer"
                  onClick={() => connectSocialMedia("facebook")}
                >
                  Connect
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between py-4 border-b-2 border-secondary50">
            <div className="flex items-center">
              <Image
                src={GoogleIcon}
                width={24}
                height={24}
                alt="google"
                className="mr-2"
              />
              <p className="text-sm font-bold">Google</p>
            </div>
            <div>
              {socialLink?.includes("GOOGLE") && (
                <div className="flex items-center">
                  <DoneIcon fontSize="5" className="mr-1" />
                  <p className="text-sm text-[#4A423B] font-bold cursor-pointer">
                    Connected
                  </p>
                </div>
              )}
              {!socialLink?.includes("GOOGLE") && (
                <p
                  className="text-sm font-medium flex justify-end text-primary cursor-pointer"
                  onClick={() => connectSocialMedia("google")}
                >
                  Connect
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between py-4 ">
            <div className="flex items-center">
              <Image
                src={WhatsappIcon}
                width={24}
                height={24}
                alt="whatsapp"
                className="mr-2"
              />
              <p className="text-sm font-bold">WhatsApp</p>
            </div>
            <div>
              {socialLink?.includes("WHATSAPP") && (
                <div className="flex items-center">
                  <DoneIcon fontSize="5" className="mr-1" />
                  <p
                    className="text-sm text-[#4A423B] font-bold cursor-pointer"
                    onClick={() => connectSocialMedia("whatsapp")}
                  >
                    Connected
                  </p>
                </div>
              )}
              {!socialLink?.includes("WHATSAPP") && (
                <p
                  className="text-sm font-medium text-primary cursor-pointer"
                  onClick={() => connectSocialMedia("whatsapp")}
                >
                  Connect
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <SwipeableDrawer
        open={drawerOpen}
        variant="persistent"
        anchor="bottom"
        className="w-[25.5rem]"
        sx={{
          "& .MuiDrawer-paper": {
            maxWidth: "100vw",
            borderTopLeftRadius: "24px",
            borderTopRightRadius: "24px",
          },
        }}
      >
        <Puller onClick={toggleDrawer} />
        <div className="flex justify-center flex-col">
          <p className="flex-shrink-0 text-[1.125rem] font-medium leading-normal pt-10 pl-[18px]">
            Edit Profile Picture
          </p>
          <div className="w-[2.5rem] h-[3px] bg-primary my-2 10 ml-[18px]"></div>
          <div className="flex justify-center">
            <Image
              src={ProfileImage}
              alt="profile"
              width={80}
              height={50}
              className="rounded-full mb-1"
              onClick={toggleDrawer}
            />
          </div>
          <p className="text-xs text-grey text-center leading-[24px] pb-[14px]">
            Ideal dimensions: 100x100 pixels.
          </p>

          <button className="border border-primary text-primary w-[10.6rem] py-[6px] px-[2.625rem] text-sm block leading-[24px] m-auto rounded-full">
            Choose File
          </button>

          <div className="mt-10 px-[1.25rem]">
            <p className="flex-shrink-0 text-[1.125rem] font-medium leading-normal">
              Connect Your Accounts
            </p>
            <div className="w-[2.5rem] h-[3px] bg-primary my-2"></div>
            <div className="flex items-center justify-between py-4 border-b-2 border-secondary50">
            <div className="flex items-center">
              <Image
                src={FacebookIcon}
                width={24}
                height={24}
                alt="facebook"
                className="mr-2"
              />
              <p className="text-sm font-bold">Facebook</p>
            </div>
            <div>
              {socialLink?.includes("FACEBOOK") && (
                <div className="flex items-center">
                  <DoneIcon fontSize="5" className="mr-1" />
                  <p className="text-sm text-[#4A423B] font-bold cursor-pointer">
                    Connected
                  </p>
                </div>
              )}
              {!socialLink?.includes("FACEBOOK") && (
                <p
                  className="text-sm font-medium text-primary cursor-pointer"
                  onClick={() => connectSocialMedia("facebook")}
                >
                  Connect
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between py-4 border-b-2 border-secondary50">
            <div className="flex items-center">
              <Image
                src={GoogleIcon}
                width={24}
                height={24}
                alt="google"
                className="mr-2"
              />
              <p className="text-sm font-bold">Google</p>
            </div>
            <div>
              {socialLink?.includes("GOOGLE") && (
                <div className="flex items-center">
                  <DoneIcon fontSize="5" className="mr-1" />
                  <p className="text-sm text-[#4A423B] font-bold cursor-pointer">
                    Connected
                  </p>
                </div>
              )}
              {!socialLink?.includes("GOOGLE") && (
                <p
                  className="text-sm font-medium flex justify-end text-primary cursor-pointer"
                  onClick={() => connectSocialMedia("google")}
                >
                  Connect
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between py-4 ">
            <div className="flex items-center">
              <Image
                src={WhatsappIcon}
                width={24}
                height={24}
                alt="whatsapp"
                className="mr-2"
              />
              <p className="text-sm font-bold">WhatsApp</p>
            </div>
            <div>
              {socialLink?.includes("WHATSAPP") && (
                <div className="flex items-center">
                  <DoneIcon fontSize="5" className="mr-1" />
                  <p
                    className="text-sm text-[#4A423B] font-bold cursor-pointer"
                    onClick={() => connectSocialMedia("whatsapp")}
                  >
                    Connected
                  </p>
                </div>
              )}
              {!socialLink?.includes("WHATSAPP") && (
                <p
                  className="text-sm font-medium text-primary cursor-pointer"
                  onClick={() => connectSocialMedia("whatsapp")}
                >
                  Connect
                </p>
              )}
            </div>
          </div>
          </div>
        </div>
      </SwipeableDrawer>
    </div>
  );
}
export default UserDetails;
