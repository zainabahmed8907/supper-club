"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

import styles from "./offer_details.module.css";
import zoomIn from "public/images/offerDetails/maximize.svg";
import send from "public/images/offerDetails/send.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Skeleton, Snackbar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "@/store/services/config";
import HeartIcon from "public/images/offers/heart-icon.svg";
import HeartIconFilled from "public/images/offers/heart-icon-colored.svg";
import { isBigImage } from "@/store/reducers/offer.slice";
import CancelImage from "/public/images/offerDetails/fullimage-cancel.svg";

function OfferDetailsCarousel({ slidesMedia, hotelName, offerId, cityName }) {
  const { user } = useSelector((state) => state.user);

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  const { auth } = useSelector((state) => state.user);
  const [snackbarOpen, setSnackBarOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [successSnackBar, setSuccessSnackBar] = useState(false);
  const [message, setMessage] = useState("");
  const [zoom, setZoom] = useState(false);
  const [socialLinkModal, setSocialLinkModal] = useState(false);
 // const [isBigImage, setBigImage] = useState(false);
  const sliderRef = useRef(null);
  const dispatch = useDispatch();
  const { bigImage } = useSelector((state) => state.offer);

  const savedOffers = user?.savedOffers;
  const isOfferSaved = (offerId) => {
    return savedOffers && savedOffers.includes(offerId);
  };

  const handleSlideChange = () => {
    setZoom(false); // Disable zoom when the carousel slide changes
  };

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2]);

  const settingsMain2 = {
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    vertical: false,
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0); // Go to the first slide initially
    }
  }, []);

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    asNavFor: ".slider-nav",
  };

  const settingsThumbs = {
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    dots: false,
    arrows: true,
    vertical: false,
    autoPlay: true,
    autoplaySpeed: 1000,
    spped: 1000,
    slide: "div",
    cssEase: "linear",
    focusOnSelect: true,
    centerPadding: "0px",
    afterChange: handleSlideChange, // Call handleSlideChange after slide change

    responsive: [
      {
        breakpoint: 2600,
        settings: {
          slidesToShow: Math.min(slidesMedia?.length, 7),
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode: true,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 2200,
        settings: {
          slidesToShow: Math.min(slidesMedia?.length, 7),
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode: true,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: Math.min(slidesMedia?.length, 7),

          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode: true,
          centerPadding: "0px",
        },
      },

      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024, // tablet size
        settings: {
          slidesToShow: 3.3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600, // mobile size
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 420, // extra small size
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };


  const saveOffer = async (id) => {
    try {
      const response = await axiosInstance.patch(`/user/saved-offers/${id}`);
      const data = response.data;
      if (data?.success) {
        setSuccessSnackBar(true);
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

  return (
    <div className="lg:mb-8 mb-4  m-auto">
      {slidesMedia?.length > 0 ? (
        <div>
          <Slider
            {...settingsMain}
            asNavFor={nav2}
            ref={(slider) => setSlider1(slider)}
          >
            {slidesMedia.map((slide) => {
              const url = slide?.attributes?.url;

              return (
                <div
                  className={`slick-slide w-fit-content lg:h-full md:h-[34rem]  h-64 flex 
                  justify-center ${styles.slide_img}`}
                  key={slide?.id}
                >
                  <div className="flex justify-between items-center h-10 absolute lg:mt-6 mt-1 w-full">
                    <div className="w-fit h-fit bg-white rounded-2xl px-4 py-3 ml-3 lg:ml-6 mt-8 lg:mt-4">
                      <p className="uppercase text-lg text-center text-cyan-500">
                        {hotelName?.substring(0, 8)}
                      </p>
                      <p className="uppercase text-xs text-center text-black -mt-1 ">
                        {cityName}
                      </p>
                    </div>
                    <div className="flex lg:mr-6 mr-4 mt-4">
                      {auth &&
                        (isOfferSaved(offerId) && !clicked ? (
                          <Image
                            src={HeartIconFilled}
                            width={40}
                            height={40}
                            className="cursor-pointer"
                            alt="heart icon"
                            onClick={() => {
                              setClicked(!clicked);
                              saveOffer(offerId);
                            }}
                          />
                        ) : !clicked ? (
                          <Image
                            src={HeartIcon}
                            width={40}
                            height={40}
                            className="cursor-pointer"
                            alt="heart icon"
                            onClick={() => {
                              setClicked(!clicked);
                              saveOffer(offerId);
                            }}
                          />
                        ) : isOfferSaved(offerId) && clicked ? (
                          <Image
                            src={HeartIcon}
                            width={40}
                            height={40}
                            alt="heart icon"
                            className="cursor-pointer"
                            onClick={() => {
                              setClicked(!clicked);
                              saveOffer(offerId);
                            }}
                          />
                        ) : (
                          clicked && (
                            <Image
                              src={HeartIconFilled}
                              width={40}
                              height={40}
                              className="cursor-pointer"
                              alt="heart icon"
                              onClick={() => {
                                setClicked(!clicked);
                                saveOffer(offerId);
                              }}
                            />
                          )
                        ))}
                      <div className="bg-white rounded-full w-10 h-10 flex justify-center items-center lg:mr-3 lg:ml-3 ml-1 cursor-pointer">
                        <Image
                          src={send}
                          alt="hotel Name"
                          width={20}
                          height={20}
                          onClick={() => {
                            setSnackBarOpen(true);
                            setSocialLinkModal(true);
                            if (navigator?.share) {
                              navigator?.share({
                                title: document.title,
                                text: "Share",
                                url: window.location.href,
                              });
                            } else {
                              alert(
                                "Share Option is not available in your browser"
                              );
                            }
                          }}
                        />
                      </div>
                      <div className="bg-white rounded-full w-10 h-10 flex justify-center items-center lg:ml-0 ml-1 cursor-pointer">
                        <Image
                          src={zoomIn}
                          alt="hotel Name"
                          width={20}
                          height={20}
                          onClick={() => {
                            dispatch(isBigImage(true));
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full bg-dark flex md:justify-center lg:h-[560px] items-center">
                  <Image
                        src={url}
                        alt="hotel Name"
                        width={500}
                        height={500}
                        loading="lazy"
                      />
                    {/* {!bigImage ? (
                      <Image
                        src={url}
                        alt="hotel Name"
                        width={500}
                        height={500}
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="relative xl:w-[72rem] z-50 w-full
                       2xl:w-[79.8rem] 3xl:w-[95rem] 4xl:w-[105rem]  xl:h-[35rem] 2xl:h-[40.8rem] 3xl:h-[48rem] 4xl:h-[52rem] m-auto
                       "
                      >
                        <Slider
                          ref={sliderRef}
                          {...settingsMain2}
                          className="absolute top-0 left-0 w-full z-50 fullImgSlider"
                        >
                          {slidesMedia?.map((slide, index) => {
                            const url = slide?.attributes?.url;
                            return (
                              <div key={index} className="h-1/2">
                                <div className="flex justify-end">
                                  <Image
                                    src={CancelImage}
                                    alt=""
                                    width={50}
                                    height={50}
                                    className="mt-7 absolute mr-7 cursor-pointer"
                                    onClick={() => {
                                      //localStorage.setItem("bigImg", false);
                                      dispatch(isBigImage(false));

                                    }}
                                  />
                                </div>

                                <Image
                                  className=" xl:w-[72rem] 2xl:w-[79.8rem] 3xl:w-[95rem] 4xl:w-[105rem]  xl:h-[35rem]
                                   2xl:h-[40.8rem] 3xl:h-[48rem] 4xl:h-[52rem] w-full"
                                  src={url}
                                  alt="Hotel Name"
                                  width={500}
                                  height={500}
                                  loading="lazy"
                                />
                              </div>
                            );
                          })}
                        </Slider>
                      </div>
                    )} */}
                  </div>
                </div>
              );
            })}
          </Slider>

          <div className="bg-footerBg offerdetailsCarousel">
            <div className="xl:w-full block">
              <div className="lg:p-10 p-2 xl:w-full flex justify-between  ">
                {slidesMedia?.length > 0 && (
                  <Slider
                    {...settingsThumbs}
                    asNavFor={nav1}
                    ref={(slider) => setSlider2(slider)}
                    className={`m-auto ${
                      slidesMedia?.length <= 7 ? "w-[95%]" : "w-[90%] "
                    } lg:pr-11 lg:pl-11 pr-8 pl-8`}
                  >
                    {slidesMedia.length > 0 &&
                      slidesMedia.map((slide) => {
                        const format =
                          slide?.attributes?.formats?.small !== undefined
                            ? slide?.attributes?.formats?.small?.url
                            : slide?.attributes?.formats.thumbnail.url;
                        return (
                          <div className={styles.slickSlide} key={slide.id}>
                            <Image
                              className="xl:w-[14.5rem] 6xl:w-[18rem] md:w-40
                             md:pr-0 2xl:h-32 xl:h-36 6xl:h-40 h-10 md:h-20 sm:w-64 xs:h-10  cursor-pointer"
                              src={`${format}`}
                              alt=""
                              width={250}
                              height={200}
                              loading="lazy"
                            />
                          </div>
                        );
                      })}
                  </Slider>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Skeleton animation="wave" />
      )}

      {/* <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={() => setSnackBarOpen(false)}
        autoHideDuration={2000}
        message="Link copied to clipboard"
      /> */}
      <Snackbar
        open={successSnackBar}
        message={message}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </div>
  );
}

export default OfferDetailsCarousel;
