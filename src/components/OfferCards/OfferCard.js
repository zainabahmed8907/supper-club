"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import HeartIcon from "public/images/offers/heart-icon.svg";
import HeartIconFilled from "public/images/offers/heart-icon-colored.svg";
import { useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import OfferFallbackImage from "/public/images/offer-fallback.svg";
import axiosInstance from "@/store/services/config";
import { Snackbar } from "@mui/material";
import { getUserProfile } from "@/store/services/user.service";

export default function OfferCard({
  img,
  icon,
  cardText,
  altText,
  coloredText,
  width,
  height,
  slug,
  restaurantName,
  id,
}) {
  const pathName = usePathname();
  const [clicked, setClicked] = useState(false);
  const { auth, user } = useSelector((state) => state.user);

  const [successSnackBar, setSuccessSnackBar] = useState(false);
  const [message, setMessage] = useState("");

  //const savedOffers = user?.savedOffers;
  const [savedOffers, setSavedOffer] = useState([]);

  const dispatch = useDispatch();

  const saveOffer = async (id) => {
    try {
      const newOffer=[...savedOffers];

      const index = newOffer?.indexOf(id);
      if (index === -1) {
        newOffer?.push(id)
      } else {
        newOffer.splice(index, 1)
      }
      setSavedOffer(newOffer);

      const response = await axiosInstance.patch(`/user/saved-offers/${id}`);
      const data = response.data;
      if (data?.success) {
        setSuccessSnackBar(true);
        // await dispatch(getUserProfile());
      }
      setTimeout(() => {
        setSuccessSnackBar(false);
      }, 4000);
      setMessage(data?.message);

      return data;
    } catch (e) {
      console.log("e", e);
    }
  };

  const isOfferSaved = (offerId) => {
    return savedOffers && savedOffers.includes(offerId);
  };

  useEffect(() => {
    if (user?.savedOffers) {
      setSavedOffer(user?.savedOffers);
    }
  }, [user]);


  return (
    <>
      <Snackbar
        open={successSnackBar}
        message={message}
        color="green"
        autoHideDuration={2000}
        sx={{
          backgroundColor: "seagreen",
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
      <div className="p-2 2xl:p-2 3xl:p-3 cursor-pointer offerCard">
        <div
          className={`border border-primary border-opacity-40 
        rounded-3xl

        mb-10
        ${pathName == "/offers" && "2xl:w-[23.4rem]"}
        2xl:w-[384px] 2xl:h-[484px]
        xl:w-[330px] xl:h-[450px]
       w-[300px] h-[309px]
      `}
        >
          <div className="relative">
            <div className="w-full px-5 mt-7 bg-transparent h-20 absolute z-10">
              <div className="flex justify-between">
                <p
                  className={` bg-white p-2 rounded-lg
                text-sm xl:text-base h-10

                font-medium ${pathName == "/offers" ? "block" : "hidden"}`}
                >
                  15% off
                </p>
                {auth &&
                  pathName == "/offers" &&
                  (isOfferSaved(id) ? (
                    <Image
                      src={HeartIconFilled}
                      width={40}
                      height={40}
                      alt="heart icon"
                      onClick={() => {
                        setClicked(!clicked);
                        saveOffer(id);
                      }}
                    />
                  ) : (
                    <Image
                      src={HeartIcon}
                      width={40}
                      height={40}
                      className="unsaved"
                      alt="heart icon"
                      onClick={() => {
                        setClicked(!clicked);
                        saveOffer(id);
                      }}
                    />
                  ))
                  //  : isOfferSaved(id) && clicked ? (
                  //   <Image
                  //     src={HeartIcon}
                  //     width={40}
                  //     height={40}
                  //     alt="heart icon"
                  //     onClick={() => {
                  //       setClicked(!clicked);
                  //       saveOffer(id);
                  //     }}
                  //   />
                  // ) : (
                  //   clicked && (
                  //     <Image
                  //       src={HeartIconFilled}
                  //       width={40}
                  //       height={40}
                  //       alt="heart icon"
                  //       onClick={() => {
                  //         setClicked(!clicked);
                  //         saveOffer(id);
                  //       }}
                  //     />
                  //   )
                  // )
                }
              </div>
            </div>
          </div>

          <Link
            href={`/offers/${slug}`}
            onClick={() => localStorage.setItem("offer_slug", slug)}
          >
            <Image
              src={img !== "undefined" ? img : OfferFallbackImage}
              alt={altText}
              className={`w-full
               3xl:h-72 lg:h-72 object-cover
               h-[10rem] ${pathName == "/" && "3xl:h-96"}${
                pathName == "/" && "4xl:h-72 "
              } rounded-t-3xl`}
              width={250}
              height={250}
              loading="lazy"
            />
            <div className="w-[194.7px] h-[4rem] pt-[27px] lg:pb-[5.9rem]  m-auto">
              {icon == null ? (
                <p className="text-center xl:text-xl md:text-lg font-bold lg:-mt-0 -mt-3 lg:text-base text-lg">
                  {restaurantName}
                </p>
              ) : (
                <Image
                  src={icon}
                  alt={altText}
                  className=""
                  width={width}
                  height={height}
                  loading="lazy"
                />
              )}
            </div>

            <p
              className={`${
                pathName == "/offers" && "xl:w-full"
              }  5xl:text-lg px-[17px]  text-center w-full pb-2  xl:h-14 5xl:h-12 h-10  
            xl:text-[1rem] lg:text-[0.8rem]  
            text-[15px]
            lg:leading-[25px]
            xl:w-full  line-clamp-3 text-ellipsis  -mt-1 lg:-mt-14 xl:-mt-4`}
            >
              <span
                className="xl:text-[1rem]  lg:text-[0.8rem] xl:leading-[20px]
                text-[15px]
                text-primary pr-1"
              >
                {coloredText}
              </span>
              {cardText}
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}
