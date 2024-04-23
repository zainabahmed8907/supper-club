import Image from "next/image";

function DistributorCard({ img, altText, linkImage }) {
  return (
    <div
      className="bg-white sm:w-[11.7rem] md:w-[15.7rem] lg:w-64 lg:h-28 xl:w-56 2xl:w-68 3xl:w-72 4xl:w-80  xl:h-20 h-[3.6rem] 
        3xl:h-28 xl:rounded-3xl rounded-2xl lg:p-5 md:p-9 p-3 m-3 flex items-center justify-center
         border border-solid border-[rgb(224,225,225)]"
    >
      <div className="flex items-center justify-center">
        <Image src={img} alt={altText} className="xl:p-2 p-5 lg:p-0 4xl:p-4 " width={300} height={100} loading="lazy"/>
      </div>
      <div className="hidden hover:block absolute top-0 ">
        <Image src={linkImage} alt="" />
      </div>
    </div>
  );
}
export default DistributorCard;
