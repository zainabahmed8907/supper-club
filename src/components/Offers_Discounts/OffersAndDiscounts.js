
function OffersAndDiscounts({ topText, count, bottomText, bgColor }) {


  return (
    <div
      className={` ${bgColor} rounded-3xl text-white  w-[8.6rem] h-[105px] md:w-[10.6rem]
         lg:w-[11.1rem] lg:h-[8.4rem] flex flex-col justify-center`}
    >
      <p className={`text-sm lg:ml-7 ml-5 lg:pb-2 lg:pt-6 pt-2 xl:block hidden`}>
        {topText}
      </p>
      <p className="lg:text-3xl md:text-2xl text-[24px] lg:ml-7 ml-5 lg:pb-1 lg:pt-4 xl:pt-0 font-bold">
        {count}
      </p>
      <p className="lg:text-sm md:text-sm text-xs lg:ml-7 ml-5 lg:pb-5">{bottomText}</p>
    </div>
  );
}

export default OffersAndDiscounts;
