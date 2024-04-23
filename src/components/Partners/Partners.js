"use client";
import Image from "next/image";
import CourtyardImage from "/public/images/partners/courtyard.png";
import DusitThani from "/public/images/partners/dusit_thani.png";
import HattaFort from "/public/images/partners/hatta_fort.png";
import Marriot from "/public/images/partners/marriot.png";
import LaPara from "/public/images/partners/la_para.png";
import Raddison from "/public/images/partners/radisson.png";
import SlS from "/public/images/partners/sls.png";
import Slider from "react-slick";

function Partners() {

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    arrows: false,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024, // tablet size
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
    
      {
        breakpoint: 620, // extra small size
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },

    ],
  };
  return (
    <div className='bg-secondary'>
      <div className= 'pt-16'>
        <p className="text-center text-[18px] xl:text-2xl 2xl:text-3xl  text-primary font-bold">
          Our 5 Star Partners
        </p>
      </div>

      <Slider {...settings} className="lg:w-4/5 m-auto pt-4 pb-8 px-4 lg:px-0">
        <div className="px-2 lg:px-auto">
          <Image
            src={CourtyardImage}
            alt="courtyard"
            width={100}
            height={100}
            className="lg:w-36 w-76"
          />
        </div>
        <div className="px-2 lg:px-auto">
          <Image
            src={DusitThani}
            alt="dusit thani"
            width={100}
            height={100}
            className="lg:w-36 w-76"
          />
        </div>
        <div className="px-2 lg:px-auto">
          <Image
            src={HattaFort}
            alt="hatta fort"
            width={100}
            height={100}
            className="lg:w-36 w-76"
          />
        </div>
        <div className="px-2 lg:px-auto">
          <Image
            src={Marriot}
            alt="marriot"
            width={100}
            height={100}
            className="lg:w-36 w-76"
          />
        </div>
        <div className="px-2 lg:px-auto">
          <Image
            src={SlS}
            alt="marriot"
            width={100}
            height={100}
            className="lg:w-36 w-76"
          />
        </div>
        <div className="px-2 lg:px-auto">
          <Image
            src={Raddison}
            alt="marriot"
            width={100}
            height={100}
            className="lg:w-36 w-76"
          />
        </div>
        <div className="px-2 lg:px-auto">
          <Image
            src={LaPara}
            alt="marriot"
            width={100}
            height={100}
            className="lg:w-36 w-76"
          />
        </div>
        <div className="px-2 lg:px-auto">
          <Image
            src={SlS}
            alt="marriot"
            width={100}
            height={100}
            className="lg:w-36 w-76"
          />
        </div>
        <div className="px-2 lg:px-auto">
          <Image
            src={Marriot}
            alt="marriot"
            width={100}
            height={100}
            className="lg:w-36 w-76"
          />
        </div>
      </Slider>
    </div>
  );
}

export default Partners;
