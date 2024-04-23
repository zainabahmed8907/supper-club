import Image from "next/image";

export default function OfferPageBanner({
  backgroundImage = "url(/images/offers/offerBanner.png)",
  backgroundRepeat = "no-repeat",
  backgroundSize = "cover",
  height = "100%",
  backgroundPosition = "center center",
  media,
  mediaType = "image",
  title = "",
}) {
  const style = backgroundImage
    ? {
        backgroundImage: backgroundImage,
        backgroundRepeat: backgroundRepeat,
        backgroundSize: backgroundSize,
        height: height,
        backgroundPosition: backgroundPosition,
      }
    : {};
  console.log("media", media, title.replace("\n", "<br />"));
  return (
    <div
      className="h-60 xl:h-76 relative flex items-center"
      // style={style}
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
        className="text-xl lg:text-2xl 2xl:text-3xl leading-10
              font-bold lg:pl-20 pl-8 text-white "
        dangerouslySetInnerHTML={{
          __html:
            title ||
            `Click for Al Fresco Dining, <br />
              Where Flavour Meets Fresh Air!`,
        }}
      ></p>
    </div>
  );
}
