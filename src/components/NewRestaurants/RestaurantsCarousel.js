"use client";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import NewRestaurants from "./NewRestaurantCard";
import axios from "axios";


function RestaurantsCarousel() {

  const [offers, setOffers] = useState([]);

  const fetchOffers = async () => {
    try {
      const offersResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_KEY}/offer?new=1`
      );
      const data = offersResponse.data;
      setOffers(data);
    } catch (e) {
      console.log("error while fetching offers", e);
    }
  };

  useEffect(() => {


    fetchOffers();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,

    autoplay: false,
    centerpadding: true,
    autoplaySpeed: 2000,
    centerPadding: "10px",

    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 2.25,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },

      {
        breakpoint: 2200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 2400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 2600,
        settings: {
          slidesToShow: 3.2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },

      {
        breakpoint: 3000,
        settings: {
          slidesToShow: 3.5,
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
        breakpoint: 700, // mobile size
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 420, // extra small size
        settings: {
          slidesToShow: 0.8,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    const restaurantSlider = document.querySelector(".restaurants_carousel");

    const next = restaurantSlider.querySelector(".slick-next");
    const prev = restaurantSlider.querySelector(".slick-prev");

    next?.addEventListener("click", function () {
      this.classList.add("clicked");
      prev.classList.remove("clicked");
    });
    prev?.addEventListener("click", function () {
      this.classList.add("clicked");
      next.classList.remove("clicked");
    });
  }, []);
  return (
    <div className="w-full ">
      <Slider
        {...settings}
        className="restaurants_carousel  mt-12 xs:-ml-1 -ml-32"
      >

        {offers?.data?.data?.length > 0 && (
          offers?.data?.data?.map((o) => {
            const format =
              o?.attributes?.Cover?.data?.attributes?.formats?.small !==
                'undefined'
                ? o?.attributes?.Cover?.data?.attributes?.formats?.small?.url
                : o?.attributes?.Cover?.data?.attributes?.formats?.thumbnail
                  ?.url;
            const logo =
              o?.attributes?.Restaurant?.data?.attributes?.Logo?.data;
            const restaurant_name =
              o?.attributes?.Restaurant?.data?.attributes?.Name;
            const coloredText = o?.attributes?.Title?.includes("Buy 1 Get 1 Free") && 'Buy 1 Get 1 Free'
            const cardText=o?.attributes?.Title?.replace(/Buy 1 Get 1 Free/g, "")
            return (
              <div key={o?.id}>
                <NewRestaurants
                  img={format}
                  width={200}
                  cardText={cardText}
                  hotelName={restaurant_name}
                  icon={logo}
                  coloredText={coloredText}
                  altText={'new offer'}
                />
              </div>

            )
          })
        )}




      </Slider>
    </div>
  );
}

export default RestaurantsCarousel;
