"use client";
import Image from "next/image";
import Ellipse from "/public/images/offers/Eliipse.png";
import OfferCard from "../OfferCards/OfferCard";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@mui/material";

export default function Offers() {
  const [offers, setOffers] = useState([]);

  const fetchOffers = async () => {
    try {
      const offersResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_KEY}/offer`
      );
      const data = offersResponse.data;

      setOffers(data);
    } catch (e) {
      console.log("error while fetching offers", e);
    }
  };

  useEffect(() => {
    const nextArrow = document.querySelector(".slick-next");
    const prevArrow = document.querySelector(".slick-prev");

    nextArrow.addEventListener("click", function () {
      this.classList.add("clicked");
      prevArrow.classList.remove("clicked");
    });
    prevArrow.addEventListener("click", function () {
      this.classList.add("clicked");
      nextArrow.classList.remove("clicked");
    });

    fetchOffers();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    autoplay: false,

    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 3.4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3.2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },

      {
        breakpoint: 2200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 2400,
        settings: {
          slidesToShow: 4.3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 2600,
        settings: {
          slidesToShow: 4.2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },

      {
        breakpoint: 3000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 820, // mobile size
        settings: {
          slidesToShow: 2.2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 620, // mobile size
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 420, // extra small size
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <div className="flex justify-between">
        <div className="m-auto pb-0 lg:pl-64">
          <p
            className="
                text-center 
                text-2xl xl:text-4xl
                font-bold
                pb-3
                "
          >
            Our Most Popular Offers
          </p>
          <div
            className="
            m-auto
            border-primary
            border-b-4
            w-20
            h-1
            pb-2

            "
          ></div>
        </div>
        <div className="lg:block xl:block 2xl:block 3xl:block hidden 3xl:-mt-20">
          <Image src={Ellipse} alt="ellipse" width={300} height={300} />
        </div>
      </div>
      <div
        className="xl:ms-16 xl:mb-24  4xl:px-32 4xxl:px-56 5xl:px-76 6xl:px-96 7xl:px-105 xl:px-14 2xl:px-24 px-4
       3xl:px-40 lg:px-16 4xl:justify-center mb-24 2xl:-mt-16 mt-7 lg:-mt-20 md:ms-10"
      >
        <Slider className="offers_slider" {...settings}>
          {offers?.data?.data?.length > 0 ? (
            offers?.data?.data?.map((o) => {
              const format =
                o?.attributes?.Cover?.data?.attributes?.formats?.small !==
                undefined
                  ? o?.attributes?.Cover?.data?.attributes?.formats?.small?.url
                  : o?.attributes?.Cover?.data?.attributes?.formats?.thumbnail
                      ?.url;
              const logo =
                o?.attributes?.Restaurant?.data?.attributes?.Logo?.data;
              const restaurant_name =
                o?.attributes?.Restaurant?.data?.attributes?.Name;
              const coloredText =
                o?.attributes?.Title?.includes("Buy 1 Get 1 Free") &&
                "Buy 1 Get 1 Free";
              const cardText = o?.attributes?.Title?.replace(
                /Buy 1 Get 1 Free/g,
                ""
              );

              return (
                <div key={o.id}>
                  <OfferCard
                    img={`${format}`}
                    altText="sherton"
                    icon={logo}
                    width={250}
                    height={170}
                    restaurantName={restaurant_name}
                    cardText={cardText  }
                    slug={o?.attributes?.slug}
                    coloredText={coloredText}
                  />
                </div>
              );
            })
          ) : (
            <Skeleton animation="wave" />
          )}
        </Slider>
      </div>
    </div>
  );
}
