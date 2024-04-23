import Image from "next/image";

import HeartIcon from "public/images/dashboard/heart-icon.svg";


function FavoriteOfferCardMobile({
  img,
  restaurant,
  description,
  handleOpen
}) {

  return (
    <>
      <div className=" xss:w-[9.55rem] xs:w-[10.55rem]  h-[15rem] border-[#F9FAFA] border rounded-2xl ">
        <div className="p-3 flex justify-end w-auto">
          <Image
            src={HeartIcon}
            alt="heart icon"
            width={30}
            height={30}
            onClick={handleOpen}
            className="cursor-pointer absolute z-10"
          />
        </div>
        <Image
          src={img}
          alt="hotel"
          width={80}
          height={80}
          className="w-full -mt-5 h-[6rem]"
        />
        <div className="pt-[1rem] pb-[1.438rem] px-2">
          <p className="text-[15px] text-black font-medium">{restaurant}</p>
          <p className="text-[14px] text-black text-ellipsis overflow-hidden line-clamp-2 mt-2">
            {description}
          </p>
        </div>
      </div>
   
    </>
  );
}

export default FavoriteOfferCardMobile;
