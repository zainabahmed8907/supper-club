"use client";

import OfferDetailsCarousel from "@/components/OfferDetailsCarousel/OfferDetailsCarousel";
import OfferDetailsDescription from "@/components/OfferDetailsDescription/OfferDetailsDescription";
import OfferDetailsIntro from "@/components/OfferDetailsIntroduction/OfferDetailsIntro";
import ReviewForm from "@/components/ReviewForm/ReviewForm";
import ReviewsList from "@/components/Reviews/ReviewsList";
import Image from "next/image";
import Star from "public/images/offerDetails/star.png";
import { Suspense, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import CancelImage from "/public/images/offerDetails/fullimage-cancel.svg";
import { isBigImage } from "@/store/reducers/offer.slice";

function OfferDetails({ params }) {
  const slug = params.slug[0];

  const [offer_detail, setOfferDetail] = useState([]);
  const [offer_id, setOfferId] = useState("");

  const [reviews, setReviews] = useState([]);
  const sliderRef = useRef(null);
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
  };

  const fetchOfferDetails = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_KEY}/offer?slug=${slug}`
      );
      const data = res?.data;
      setOfferDetail(data);
      setOfferId(data?.data?.data[0]?.id);
    } catch (e) {
      throw e;
    }
  };

  const fetchReviews = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_KEY}/review/${id}`
      );
      const data = response?.data;
      setReviews(data);
    } catch (e) {
       console.log(e);
    }
  };

  useEffect(() => {
    fetchOfferDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchReviews(offer_id);
  }, [offer_id]);

  const name =
    offer_detail?.data?.data[0]?.attributes?.Restaurant?.data?.attributes?.Name;
  const title = offer_detail?.data?.data[0]?.attributes?.Title;
  const short_description =
    offer_detail?.data?.data[0]?.attributes?.ShortDescription;
  const description = offer_detail?.data?.data[0]?.attributes?.Description;
  const slidesMedia = offer_detail?.data?.data[0]?.attributes?.Media?.data;
  const availableTime = offer_detail?.data?.data[0]?.attributes?.AvailableTime;
  const amount = offer_detail?.data?.data[0]?.attributes?.Amount;

  const days = offer_detail?.data?.data[0]?.attributes?.days?.data;
  const hotelName =
    offer_detail?.data?.data[0]?.attributes?.Restaurant?.data?.attributes?.Name;
  const cityName =
    offer_detail?.data?.data[0]?.attributes?.Cities?.data[0]?.attributes?.Name;

  const price =
    offer_detail?.data?.data[0]?.attributes?.price?.data?.attributes?.Range;

  const { bigImage } = useSelector((state) => state.offer);
  const dispatch = useDispatch();

  return (
    <>
      {bigImage && (
        <div
          className="relative xl:w-[72rem] z-50 2xl:w-[79.8rem] 3xl:w-[95rem] 4xl:w-[105rem] xl:h-[35rem] 2xl:h-[40.8rem]
         3xl:h-[48rem] 4xl:h-[52rem] m-auto overflow-hidden"
        >
          {/* Blurred background */}
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="bg-gray-100 bg-opacity-50 backdrop-filter backdrop-blur-lg blur-xl absolute inset-0"></div>
          </div>

          {/* Slider content */}
          <Slider
            ref={sliderRef}
            {...settingsMain}
            className="w-full z-50 fullImgSlider lg:top-10  relative"
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
                        dispatch(isBigImage(false));
                      }}
                    />
                  </div>

                  <Image
                    className="xl:w-[72rem] 2xl:w-[79.8rem] 3xl:w-[95rem] 4xl:w-[105rem] xl:h-[35rem] 2xl:h-[40.8rem] 3xl:h-[48rem] 4xl:h-[52rem] w-full"
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
      )}
      <div className={`lg:px-28 2xl:px-40 4xl:px-72 5xl:px-96 px-4 `}>
        <div className="pt-36">
          <h1 className="lg:text-4xl  3xl:text-5xl text-2xl font-bold">
            {name}
          </h1>
          <div className="flex justify-between lg:flex-row flex-col">
            <p className="lg:text-lg text-base text-gray font-medium lg:w-8/12">
              {title}
            </p>
            <div className="mt-3 lg:mt-0">
              <div className="flex space-x-2 mb-2">
                <Image src={Star} alt="star" />
                <Image src={Star} alt="star" />
                <Image src={Star} alt="star" />
                <Image src={Star} alt="star" />
                <Image src={Star} alt="star" />
              </div>
              <p className="font-normal font-xs">
                {reviews?.data?.totalReviews} Customer Reviews
              </p>
            </div>
          </div>
        </div>
        <div
          className={`${
            bigImage ? "blur-lg backdrop-blur-md bg-slate-400" : ""
          }`}
        >
          <div className="pt-2">
            <Suspense>
              <OfferDetailsCarousel
                slidesMedia={slidesMedia}
                hotelName={hotelName}
                offerId={offer_id}
                cityName={cityName}
              />
            </Suspense>
          </div>

          <div className="pt-2">
            <OfferDetailsIntro
              short_desc={short_description}
              availableTime={availableTime}
              offer_id={offer_id}
              amount={amount}
              disableDays={days}
            />
          </div>
          <div className="pt-2">
            <Suspense>
              <OfferDetailsDescription
                description={description}
                cities={cityName}
                hotelName={hotelName}
                price={price}
              />
            </Suspense>
          </div>
          <div className="pt">
            <Suspense>
              <ReviewsList offerID={offer_id} />
            </Suspense>
          </div>

          <div className="pt-2">
            <ReviewForm offerId={offer_id} />
          </div>
        </div>
      </div>
    </>
  );
}
export default OfferDetails;
