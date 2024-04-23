"use client";
import Slider from "react-slick";
import CarouselCard from "./CarouselCard";
import { useEffect } from "react";

export default function MembersCarousel() {
  useEffect(() => {
    const membersSlider = document.querySelector(".members_slider");

    const next = membersSlider.querySelector(".slick-next");
    const prev = membersSlider.querySelector(".slick-prev");

    next.addEventListener("click", function () {
      this.classList.add("clicked");
      prev.classList.remove("clicked");
    });
    prev.addEventListener("click", function () {
      this.classList.add("clicked");
      next.classList.remove("clicked");
    });
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: true,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    autoplay: false,
    centerMode: true,
    centerPadding: '5%',
    
    responsive: [
      
    
     
      {
        breakpoint: 3000,
        settings: {
          slidesToShow: 2.7,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },,
      {
        breakpoint: 2600,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
   
      {
        breakpoint: 2200,
        settings: {
          slidesToShow: 2.2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 2.1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
     
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 2.1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 2.2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1220,
        settings: {
          slidesToShow: 2,
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
        breakpoint: 600, // mobile size
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 420, // extra small size
        settings: {
          slidesToShow: 1.15,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="lg:pb-40 pb-24">
      <div className="lg:pt-24 pt-16 flex items-center flex-col pb-16">
        <p className="lg:text-[2.5rem] font-bold pb-3 text-center  text-[24px] px-5">
          Hear It Directly From Our Members
        </p>
        <div className="border-primary border-b-4 w-20 h-1 pb-2"></div>
      </div>
      <div className="xl:ms-16 xl:mb-24 mb-2 4xl:px-72 4xxl:px-86 5xl:px-76 7x:px-80 xl:px-32 2xl:px-48
       3xl:px-60 lg:px-16 xss:-ms-9 xs:-ms-7">
        <Slider {...settings} className="members_slider m-auto">
          <CarouselCard />
          <CarouselCard />
          <CarouselCard />
          <CarouselCard />
          <CarouselCard />
        </Slider>
      </div>
    </div>
  );
}
