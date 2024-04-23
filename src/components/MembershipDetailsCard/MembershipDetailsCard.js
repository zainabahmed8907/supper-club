import Image from "next/image";
import Card from "public/images/dashboard/membership-card.svg";
import { Suspense, useEffect, useState } from "react";
// import { CircularProgress, Skeleton } from "@mui/material";
// import Spinner from "../Spinner/Spinner";
import SpentCreditsIcon from "/public/images/dashboard/wallet-money.svg";
import { styled } from "@mui/material/styles";
import noBookingCredit from "public/images/dashboard/no-booking-credit.svg";

import ManageBillingBtn from "../ManageBillingBtn/ManageBillingBtn";
import { Alert, FormControlLabel, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Icon from "public/images/dashboard/export.svg";
import Link from "next/link";
import axiosInstance from "@/store/services/config";
import DiamondIcon from "/public/images/pricing/diamond.png";
import GoldIcon from "/public/images/pricing/gold.png";
import PlatinumIcon from "/public/images/pricing/cup.png";
import MobileCardImage from "/public/images/membershipOffers/mobile-credit-card.svg";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 24,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#C39D63",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 20,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

function MembershipDetails({ subscription, loading }) {
  const { user } = useSelector((state) => state.user);
  const planName = subscription?.plan?.name;
  const [alertMessage, setAlertMessage] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [failedAlert, setFailedAlert] = useState(false);
  const [failedMessage, setFailedMessage] = useState("");
  const [checked, setChecked] = useState(false);

  const handleAutoRenewal = async (e) => {
    try {
      const response = await axiosInstance.patch(
        `${process.env.NEXT_PUBLIC_API_KEY}/user/auto-renew`,
        {
          autoRenew: e,
        }
      );
      setSuccessAlert(true);
      setAlertMessage(response?.data?.message);

      setTimeout(() => {
        setSuccessAlert(false);
        setAlertMessage("");
      }, 4000);
      return response.data;
    } catch (e) {
      setFailedAlert(true);
      setFailedMessage(e?.response?.data?.message);

      setTimeout(() => {
        setFailedAlert(false);
        setFailedMessage("");
      }, 4000);
      throw e;
    }
  };

  // useEffect(()=>{
  //    dispatch(getUserProfile());

  // },[handl]);

  return (
    <>
      {successAlert && <Alert severity="success" className="mb-2">{alertMessage}</Alert>}
      {failedAlert && <Alert severity="error" className="mb-2">{failedMessage}</Alert>}
      <div
        className="mt-1 bg-white min-h-[780px] lg:h-[780px] h-[880px] overflow-y-scroll overflow-x-hidden 
    2xl:w-[66rem] lg:w-[60rem] xs:w-[23.5rem]  lg:ml-0 mx-4"
      >
        {subscription != null ? (
          <div className="flex lg:ml-5 ml-2 justify-between lg:flex-row flex-col-reverse">
            <div className="lg:w-[32rem]">
              <div>
                <p className="text-lg font-medium lg:pt-4 mt-4 lg:mt-0">
                  Membership Details
                </p>
              </div>
              <div className="w-[2.5rem] h-[3px] bg-primary mb-7 mt-1"></div>

              <div className="flex justify-between items-center  border bg-secondary border-secondary50 xl:w-[31.4rem] w-[18.7rem] h-[3.13rem] p-3 rounded-lg text-base font-normal mb-2">
                <p className="text-base font-medium leading-[24px] text-textMain">
                  Tier{" "}
                </p>
                <p className="text-base font-normal leading-[24px] text-textMain">
                  {subscription?.plan?.name || ""}
                </p>
              </div>

              <div className="flex justify-between items-center border bg-secondary border-secondary50  xl:w-[31.4rem] w-[18.7rem] h-[3.13rem]  p-3 rounded-lg text-base font-normal mb-2">
                <p className="text-base font-medium leading-[24px] text-textMain">
                  Subscription Status{" "}
                </p>
                <p className="text-base font-normal leading-[24px] text-textMain capitalize">
                  {subscription?.status || ""}
                </p>
              </div>

              <div className="flex justify-between items-center border bg-secondary border-secondary50  xl:w-[31.4rem] w-[18.7rem] h-[3.13rem]  p-3 rounded-lg text-base font-normal mb-2">
                <p className="text-base font-medium leading-[24px] text-textMain">
                  Start Date
                </p>
                <p className="text-base font-normal leading-[24px] text-textMain capitalize">
                  {new Date(subscription?.startDate).toLocaleDateString(
                    "en-US"
                  )}
                </p>
              </div>

              <div className="flex justify-between items-center border bg-secondary border-secondary50  xl:w-[31.4rem] w-[18.7rem] h-[3.13rem]  p-3 rounded-lg text-base font-normal mb-2">
                <p className="text-base font-medium leading-[24px] text-textMain">
                  Expiry Date
                </p>
                <p className="text-base font-normal leading-[24px] text-textMain capitalize">
                  {new Date(subscription?.endDate).toLocaleDateString("en-US")}
                </p>
              </div>

              <div className="mt-10 xl:w-[28.75rem] lg:w-[23.6rem]">
                <p className="text-base font-medium leading-[24px]">
                  Manage your account billings, update payment methods, and
                  explore membership changing options.
                </p>
              </div>

              <div className="pt-5">
                <ManageBillingBtn />
              </div>
            </div>

            <div className="mt-6">
              <div className="lg:mr-4 relative">
                <Image
                  src={Card}
                  alt="card"
                  className="rounded-lg"
                  loading="lazy"
                />

                <div className="absolute inset-0  justify-start ml-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="lg:text-base text-sm font-bold mt-3">
                        SupperClub
                      </p>
                      <p className="lg:text-2xl  lg:w-[283px] w-[171px] text-[1.2rem]">
                        {subscription?.plan?.duration}{" "}
                        {subscription?.plan?.name}
                      </p>
                    </div>
                    <div>
                      {planName == "Gold Plan" && (
                        <Image
                          src={GoldIcon}
                          alt=""
                          width={50}
                          height={50}
                          className="pr-3"
                        />
                      )}
                      {planName == "Platinum Plan" && (
                        <Image
                          src={PlatinumIcon}
                          alt=""
                          width={50}
                          height={50}
                          className="pr-3"
                        />
                      )}
                      {planName == "Diamond Plan" && (
                        <Image
                          src={DiamondIcon}
                          alt=""
                          width={50}
                          height={50}
                          className="pr-3"
                        />
                      )}
                    </div>
                  </div>
                  <div className="2xl:pt-6 xl:pt-2 flex items-center">
                    <Image
                      src={SpentCreditsIcon}
                      alt="credits spent"
                      width={30}
                      height={30}
                    />
                    <p className="lg:pl-4 pl-2 lg:text-base text-sm">
                      Booking Credit 100 AED
                    </p>
                  </div>
                  <div className="flex justify-end pr-2 items-end pb-2">
                    <p className="2xl:text-[2.5rem] xl:text-[1.6rem] xl:mt-4 font-medium ">
                      AED 165
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex">
                <div className="w-[410px]">
                  <p className="text-base font-medium">
                    {" "}
                    Membership Auto Renewal
                  </p>
                  <p className="text-[0.87rem] text-[#7E7E7E] mt-4 pr-5">
                    Choose whether you want your membership to automatically
                    renew at the end of each billing period or prefer to
                    manually renew it yourself.
                  </p>
                </div>
                <div>
                  <Switch
                    checked={
                      !user?.subscription?.cancelAtPeriodEnd ? true : checked
                    }
                    onChange={(e) => {
                      if (!user?.subscription?.cancelAtPeriodEnd) {
                        setChecked(false);
                      }
                      setChecked(e?.target?.checked);
                      handleAutoRenewal(e?.target?.checked);
                    }}
                  />
                  {/* <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} />}
                  checked={
                    !user?.subscription?.cancelAtPeriodEnd ? true : checked
                  }
                  onChange={(e) => {
                    if (!user?.subscription?.cancelAtPeriodEnd) {
                      setChecked(false);
                    }
                    setChecked(e?.target?.checked);
                    handleAutoRenewal(e?.target?.checked);
                  }}
                /> */}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="xl:h-full h-1/2 flex flex-col justify-center items-center">
            {" "}
            <div className=" flex justify-center">
              <Image
                src={noBookingCredit}
                alt="no redits"
                width={150}
                height={200}
              />
            </div>
            <div className="lg:w-[35.8rem] w-full text-center pt-6">
              <p className="text-base font-medium">
                Hi {user?.fullName}! It look’s like you haven’t subscribed to
                any membership yet. Earn credit points by becoming a member and
                avail our amazing offers.
              </p>
            </div>
            <Link
              className="mt-10 flex justify-center    w-[14.68rem] h[2.75rem] bg-primary text-center text-white text-lg font-bold p-[.427rem] rounded-full items-center"
              href="/memberships"
            >
              <>
                <p className="mr-2">Our Memberships</p>
                <Image src={Icon} alt="manage bolling" />
              </>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default MembershipDetails;
