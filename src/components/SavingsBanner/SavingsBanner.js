import Image from "next/image";
import Link from "next/link";
const SavingsBanner = ({
  backgroundImage = "url(/images/savings/SavingsBanner.png)",
  backgroundRepeat = "no-repeat",
  backgroundSize = "cover ",
  height = "65vh",
  media,
  mediaType = "image",
  title,
  ctaText,
}) => {
  const style = backgroundImage
    ? {
        backgroundImage: backgroundImage,
        backgroundRepeat: backgroundRepeat,
        backgroundSize: backgroundSize,
        height: height,
      }
    : {};
  const fontStyle = {
    lineHeight: "4.5rem !important",
  };
  return (
    <div
      className="flex flex-col items-center justify-center w-screen lg:mb-20 mb-10 relative pt-20 pb-20"
      // style={style}
      loading="lazy"
    >
      {media ? (
        mediaType === "image" ? (
          <Image
            layout="fill"
            src={media}
            alt="hero"
            className=" object-cover object-top brightness-90"
            style={{
              zIndex: "-1",
            }}
          />
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="object-cover object-top absolute inset-0 w-full h-full brightness-90"
            style={{
              zIndex: "-1",
            }}
          >
            <source src={media} type="video/mp4" />
          </video>
        )
      ) : null}
      <p
        className="text-center
             text-white font-bold pb-10 text-[24px] md:text-[1.5rem] xl:text-[2rem] xl:leading-[64px] w-5/6"
        style={fontStyle.text}
      >
        {title || "Enjoy Extraordinary Savings at 5-Star Hotels"}
      </p>{" "}
      <div className="flex justify-center">
        <Link
          href="/memberships"
          className="rounded-full bg-primary px-10 py-3 text-base md:text-lg font-semibold text-white duration-300 ease-in-out hover:bg-buttonHover"
        >
          {ctaText || "Join SupperClub Now!"}
        </Link>
      </div>
    </div>
  );
};
export default SavingsBanner;
