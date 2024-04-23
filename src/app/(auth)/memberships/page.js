import PricingCard from "@/components/PricingCard/PricingCard";
import GoldIcon from "public/images/pricing/gold.png";
import PlatinumIcon from "public/images/pricing/cup.png";
import DiamondIcon from "public/images/pricing/diamond.png";
import MembershipShipOffers from "@/components/MemberShipOffers/MembershipsOffers";
import Partners from "@/components/Partners/Partners";
import BenifitsTable from "@/components/BenifitsTable/BenifitsTable";
import LeftVector from "public/images/pricing/LeftVector.png";
import Image from "next/image";
import { Suspense } from "react";
import { CircularProgress } from "@mui/material";

function Pricing() {
  return (
    <div className="bg-secondary">
      <Suspense fallback={null}>
        <div className="w-screen bg-footerBg h-103">
          <div className="flex justify-center items-center">
            <p className="text-white text-center pt-44 pb-20 lg:text-2xl text-[1.5rem] leading-[42px] w-80 lgleading-8 font-bold">
              Explore and Choose Your Memberships Tier
            </p>
          </div>
          <Image
            src={LeftVector}
            width={500}
            height={200}
            className="blur-[300px] ml-10 w-auto h-auto"
            alt="icon"
          />
        </div>
      </Suspense>

      {/**Pricing cards Component*/}

      <div className="lg:mb-20 flex justify-center w-screen lg:flex-row flex-col items-center -mt-40 ">
        <Suspense fallback={null}>
          <PricingCard
            type="Gold"
            icon={GoldIcon}
            price="AED 165"
            text="6 Months Access to All Offers"
          />
        </Suspense>

        <Suspense fallback={null}>
          <PricingCard
            type="Diamond"
            icon={DiamondIcon}
            price="AED 295"
            text="12 Months Access to All Offers"
          />
        </Suspense>
        <Suspense fallback={null}>
          <PricingCard
            type="Platinum"
            icon={PlatinumIcon}
            price="AED 695"
            text="12 Months Access to All Offers"
          />
        </Suspense>
      </div>
      <Image
        src={LeftVector}
        width={500}
        height={200}
        className="blur-[300px] ml-10  w-auto h-auto"
        alt="icon"
      />

      {/**Table component */}

      <div className="4xl:px-44 5xl:px-72 6xl:px-102 7xl:px-108 3xl:px-2">
        <Suspense fallback={null}>
          <BenifitsTable />
        </Suspense>
      </div>

      <Suspense fallback={null}>
        <MembershipShipOffers />
      </Suspense>

      <Suspense fallback={<CircularProgress />}>
        <Partners />
      </Suspense>
      {/* <Footer/> */}
    </div>
  );
}

export default Pricing;
