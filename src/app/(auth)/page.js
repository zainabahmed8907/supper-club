import AsSeenOn from "@/components/AsSeenOn/AsSeenOn";
import Categories from "@/components/Categories/Categories";
import Hero from "@/components/Hero/Hero";
import MembershipShipOffers from "@/components/MemberShipOffers/MembershipsOffers";
import MemberShips from "@/components/MemberShips/Memberships";
import MembersCarousel from "@/components/MembersCarousel/MembersCarousel";
import Offers from "@/components/Offers/Offers";
import Partners from "@/components/Partners/Partners";
import SavingsBanner from "@/components/SavingsBanner/SavingsBanner";
import HowitWorks from "@/components/Works/HowItWorks";
import Image from "next/image";
import Link from "next/link";
import bounce from "public/images/hero/hero-bounce.png";
import { Suspense } from "react";
import Loading from "./loading";
import { fetchDynamicContent } from "@/lib/utils";

export default async function Home() {
  const smoothScroll = (target) => {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const contents = await fetchDynamicContent("home");
  const mainBanner =
    contents?.data?.data?.find(
      (content) => content?.attributes?.Type === "HOME"
    ) || {};
  const savingsBanner =
    contents?.data?.data?.find(
      (content) => content?.attributes?.Type === "HOME_BANNER_2"
    ) || {};

  // check banner mime type if image or video, if image add image tag, if video add video tag
  let mainBannerType = "image";
  if (
    mainBanner?.attributes?.Banner?.data?.attributes?.mime?.includes("video")
  ) {
    mainBannerType = "video";
  }
  let savingsBannerType = "image";
  if (
    savingsBanner?.attributes?.Banner?.data?.attributes?.mime?.includes("video")
  ) {
    savingsBannerType = "video";
  }

  return (
    <div>
      <div
        className="bg-primary  sticky z-[9999] 
       h-9  flex justify-center items-center text-[#FFFFFF] lg:text-sm text-[.5rem] w-screen top-0"
      >
        Enjoy Seamless Bookings, Unlimited Guests & Extraordinary Discounts
      </div>

      <Suspense fallback={<Loading/>}>
        <Hero
          extraClasses={" sp-bg-image"}
          mediaType={mainBannerType}
          media={
            mainBanner?.attributes?.Banner?.data?.attributes?.url ||
            "/images/hero/hero.jpeg"
          }
        >
          <div className="container">
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full h-auto pb-20 px-4">
                <p
                  className="dark:text-[#FFFFFF] mb-6 text-[#FFFFFF] !leading-relaxed 
                 sm:text-lg text-lg opacity-80"
                >
                  WELCOME TO THE CLUB
                </p>
                <div className="lg:w-[832px]">
                  <h1
                    className=" mb-5 lg:text-[4rem] font-bold leading-tight text-[#FFFFFF]
                 dark:text-[#FFFFFF] text-[2rem] sm:leading-tight md:text-[2.2rem] md:leading-tight"
                  >
                    Luxury Culinary & Lifestyle Membership.
                  </h1>
                </div>

                <p
                  className="dark:text-[#FFFFFF] mb-12 text-[#FFFFFF] !leading-relaxed
                    sm:text-lg md:text-2xl font-normal opacity-80 xs:px-20 text-center mt-14"
                >
                  Enjoy Seamless Bookings, Unlimited Guests & Extraordinary
                  Discounts
                </p>
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 mdb:space-y-0">
                  <Link
                    href="/offers"
                    className="rounded-full bg-primary px-10 py-4 text-base font-semibold text-[#FFFFFF] duration-300 ease-in-out hover:hover:bg-buttonHover"
                  >
                    Explore Offers
                  </Link>
                </div>
                <div className="flex justify-center animate-bounce w-full mt-14">
                  <Link href="#offers" passHref>
                      <Image
                        src={bounce}
                        alt=""
                        className="animate-bounce cursor-pointer scroll-smooth"
                        width={20}
                        height={1}
                      />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Hero>
      </Suspense>

      <Suspense fallback={null}>
        <Partners />
      </Suspense>

      <Suspense fallback={null}>
        <Categories />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <div id="offers">
          <Offers />
        </div>
      </Suspense>

      <Suspense fallback={null}>
        <SavingsBanner
          media={savingsBanner?.attributes?.Banner?.data?.attributes?.url}
          mediaType={savingsBannerType}
          title={savingsBanner?.attributes?.Title}
          ctaText={savingsBanner?.attributes?.CTA}
        />
      </Suspense>

      <Suspense fallback={null}>
        <HowitWorks />
      </Suspense>

      <Suspense fallback={null}>
        <AsSeenOn />
      </Suspense>

      <Suspense fallback={null}>
        <MemberShips />
      </Suspense>

      <Suspense fallback={null}>
        <MembershipShipOffers />
      </Suspense>

      <Suspense>
        <MembersCarousel />
      </Suspense>

      {/* <DownloadOptionsSection /> */}
    </div>
  );
}
