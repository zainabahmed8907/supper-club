import Image from "next/image";

import HeartIcon from "public/images/dashboard/heart-icon.svg";
import OfferFallbackImage from "/public/images/offer-fallback.svg";

import Link from "next/link";

function FavoriteOfferCard({
  img,
  logo,
  restaurant,
  description,
  handleOpen,
  id
}) {
  return (
    <>
      <div
        className="2xl:w-[63rem] lg:w-[57rem]  border-solid border border-secondary50 rounded-xl 
      flex justify-between h-[10.6rem] mb-5 "
      >
        <div>
          <Image
              src={typeof img=="undefined" ? OfferFallbackImage :img }
              alt="hotel"
            width={218}
            height={250}
            className="rounded-l-xl  object-cover"
            style={{
              height: "-webkit-fill-available",
            }}
          />
          {logo ? (
            <Image
              src={logo}
              width={119}
              height={100}
              alt="hotel"
              className="relative -mt-11 ml-20 rounded"
            />
          ) : (
           <div className="flex justify-center -mt-4">
             <p className="text-center xl:text-base md:text-sm font-bold text-base relative -mt-11 bg-white w-fit px-2 py-2 rounded">
              {restaurant}
            </p>
            </div>
          )}
        </div>
        <div className=" h-[3.563rem] pl-5 pt-[1rem] pb-[1.938rem]  2xl:-ml-[16.8rem] lg:-ml-[11rem]">
          <p className="text-base text-black font-bold  leading-[30px] ">
            {restaurant}
          </p>
          <p className="text-base  leading-[30px] max-w-[25.25rem] w-[20rem] ">
            {description}
        
          </p>
        </div>
        <div className="w-[10rem]">
          <div className="p-3 ml-24">
            <Image
              src={HeartIcon}
              alt="heart icon"
              width={36}
              height={30}
              onClick={()=>{
                handleOpen();
                localStorage.setItem("fav_id",id);
              }}
              className="cursor-pointer"
          
            />
          </div>
          <div>
            <Link href="">
              <button
                type="button"
                className="w-[9.124rem] h-[2.37rem] bg-primary rounded-full mt-7 text-sm text-white text-center  font-bold"
              >
                View Offer
              </button>
            </Link>
          </div>
        </div>
      </div>
     
    </>
  );
}

export default FavoriteOfferCard;
