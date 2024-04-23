import Image from "next/image";

const Hero = ({ media, mediaType = "image", children, extraClasses = "" }) => {
  // const style = backgroundImage
  //   ? {
  //       backgroundImage: backgroundImage,
  //       backgroundRepeat: backgroundRepeat,
  //       backgroundSize: backgroundSize,
  //       backgroundPosition: backgroundPosition,
  //       height: "100vh",
  //     }
  //   : {};
  const bounceAnimation = {
    y: [0, -20, 0], // Bounce animation on the y-axis
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      times: [0, 0.5, 1],
      loop: Infinity,
    },
  };
  return (
    <>
      <section
        id="home"
        className={`-z-1 pt-[120px] md:pt-[150px] xl:pt-[180px] 2xl:pt-[170px] ${extraClasses} relative`}
        // style={style}
        loading="lazy"
      >
        {media ? (
          mediaType === "image" ? (
            <Image
              layout="fill"
              src={media}
              alt="hero"
              className=" object-cover object-top brightness-50"
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

        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div
                className="wow fadeInUp mx-auto max-w-[800px] text-center"
                data-wow-delay=".2s"
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
