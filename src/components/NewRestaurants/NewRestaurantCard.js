import Image from "next/image";
import OfferFallbackImage from "/public/images/offer-fallback.svg";

export default function NewRestaurants({
  img,
  icon,
  cardText,
  altText,
  coloredText,
  hotelName,
}) {
  return (
    <div className="xl:m-4 ">
      <div
        className="w-[22.7rem] 
        h-[9.25rem]
        md:w-[22.9rem]
        lg:w-[26rem] lg:h-[9.2rem]
        xl:w-[31.5rem] xl:h-[14rem]
        2xl:w-[36.5rem] 2xl:h-[14rem]
          4xl:w-[33.5rem]
          4xxl:w-[36rem]
         5xl:w-[39rem]
         6xl:w-[40rem] 6xl:h-56
      
          
       border-cardColor border-2   rounded-3xl pl-0 pr-4 mr-3"
      >
        <div className="flex">
          <Image
            src={typeof img == "undefined" ? OfferFallbackImage : img}
            alt={altText}
            className="5xl:w-96   5xl:h-68
              xl:w-[20.063rem] xl:h-[13.8rem]
              4xl:w-72
              w-[20.063rem] h-36
              p-2 rounded-3xl object-cover"
            width={150}
            height={250}
            loading="lazy"
          />

          <div className="lg:pl-1 md:pl-2  4xl:pl-4 ">
            <p
              className="xl:text-[1.5rem] lg:text-[1.1rem] text-[1.5rem]  text-base xl:leading-[30px] leading-[24px] block w-[15rem] pr-20 lg:pr-0
             
            text-dark font-semibold xl:pt-[28px] pt-[12px] 5xl:pt-8"
            >
              {hotelName}
            </p>

            <p
              className="xl:text-[1rem] lg:text-[0.8rem] 
              xl:leading-[20px] 2xl:leading-[30px] lg:leading-[28px] leading-[16px] text-xs
            lg:pr-0 md:pr-0 pr-1
            pt-2 5xl:pt-5
            2xl:pb-0 text-textMain w-[9.6rem] md:w-40 2xl:w-56  lg:w-40 mb-4 font-normal 
            text-ellipsis 2xl:line-clamp-3 line-clamp-2  overflow-hidden"
            >
              <span
                className="xl:text-[1rem]  lg:text-[0.8rem] xl:leading-[20px]
               2xl:leading-[30px] leading-[16px] text-xs  text-primary pr-1"
              >
                {coloredText}
              </span>
              {cardText}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl lg:-mt-20  xl:-mt-16  -mt-16 ml-5 absolute z-10">
          <div className="flex justify-center items-center h-12 xl:w-fit px-3 w-fit">
            {icon == null ? (
              <p className="text-center xl:text-base md:text-lg font-bold lg:-mt-0  text-sm">
                {hotelName}
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
        </div>
      </div>
    </div>
  );
}
