"use client";
import Image from "next/image";
import FamilyMemberShip from "public/images/membershipOffers/membership_offers.png";
import OffersAndDiscounts from "../Offers_Discounts/OffersAndDiscounts";
import rightIcon from "public/images/rightIcon.png";
import rightArrow from "public/images/membershipOffers/goto_arrow.svg";
import { motion } from "framer-motion";

import Link from "next/link";
import { usePathname } from "next/navigation";

function MembershipShipOffers() {
  const pathname = usePathname();
  const cardVariants = {
    offscreen: {
      y: 300,
    },
    onscreen: {
      y: 50,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };
  return (
    <div
      className={`lg:pt-12 px-6 2xl:px-28  3xl:px-24 flex justify-center flex-col  items-center ${
        pathname == "/memberships" ? "bg-white !important" : "lg:bg-secondary"
      } lg:pb-14 lg:mt-12 pt-16`}
    >
      <div className="flex justify-center  flex-col xl:w-max lg:px-96">
        <div className="flex flex-col justify-center items-center lg:pb-16">
          <p className="text-2xl xl:text-4xl font-bold lg:pb-3 text-center">
            Get Our Club MemberShip Offers
          </p>
          <div className=" border-primary  border-b-4 w-20 h-1 pb-2"></div>
        </div>
        <div className="flex justify-center lg:flex-row flex-col lg:w-max">
          <motion.div
            className="lg:pt-0"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
          >
            <motion.div variants={cardVariants} className="lg:w-[26rem] xl:w-full w-[271px] md:w-[25rem]">
              <Image src={FamilyMemberShip} alt="family" className="lg:ml-0 " />
            </motion.div> 
            <div className="flex xl:-mt-40 lg:-mt-44 lg:-ml-24 xl:-ml-0  -mt-32 ml-40 z-10 absolute flex-row ">
              <motion.div
                className="pr-7 lg:ml-100 md:ml-36  ml-10 pb-3 lg:pb-0"
                variants={cardVariants}
              >
                <OffersAndDiscounts
                  bgColor="bg-[#282723]"
                  topText="Only"
                  bottomText="Access all offers"
                  count="AED 39"
                />
              </motion.div>
            </div>
          </motion.div>
          <div className="lg:pl-32 lg:pt-2 pt-24 lg:mt-16">
            <p className="text-primary xl:text-lg 2xl:text-xl 3xl:text-2xl font-bold text-[1.1rem] leading-[23px]">
              One Month Access
            </p>
            <p className="font-bold lg:text-xl 3xl:text-3xl text-[1.25rem]">
              Access All Offers for One Month
            </p>
            <div className="border-[#C39D63] border-b w-full h-1 pb-2"></div>
            <div className="lg:pt-8 pt-4">
              <div className="flex items-center">
                <Image src={rightIcon} alt="rightIcon" className="w-3" />
                <p className="text-[15px] lg:text-sm text-gray ml-1 p-1 3xl:text-xl 2xl:text-lg">
                  Access to all offers
                </p>
              </div>

              <div className="flex items-center">
                <Image src={rightIcon} alt="rightIcon" className="w-3" />
                <p className="text-[15px] lg:text-sm text-gray ml-1 p-1 3xl:text-xl 2xl:text-lg">
                  Unlimited booking <strong>at 5AED</strong>{" "}
                </p>
              </div>
              <div className="flex items-center">
                <Image src={rightIcon} alt="rightIcon" />
                <p className="text-[15px] lg:text-sm text-gray ml-1 p-1 3xl:text-xl 2xl:text-lg ">
                  Discount automatically applied to all Family and Friends
                </p>
              </div>
              <div className="flex items-center">
                <Image src={rightIcon} alt="rightIcon" className="w-3" />
                <p className="text-[15px] lg:text-sm text-gray ml-1 p-1 3xl:text-xl 2xl:text-lg">
                  Access to SupperClub Concierge{" "}
                </p>
              </div>
            </div>
            <div className="pt-5 flex justify-between lg:items-center lg:flex-row flex-col items-start">
              <p className="font-bold 3xl:text-xl 2xl:text-lg lg:mb-2 mb-5">
                Visiting? Buy Now & Activate Later
              </p>
              <Link
                href="/memberships"
                className="rounded-3xl lg:py-2 lg:px-6 py-3 mb-4 px-9 font-semibold text-white text-sm
                 bg-primary 3xl:text-xl 2xl:text-lg  transition duration-300 ease-in-out hover:hover:bg-buttonHover"
              >
                Join Now
              </Link>
            </div>
            <Link
              href="/memberships"
              className="lg:flex hidden pt-16 justify-end items-center text-primary font-bold 3xl:text-xl 2xl:text-lg "
            >
              <p className="transition duration-300 ease-in-out hover:text-buttonHover">
                View All Memberships
              </p>
              <Image src={rightArrow} alt="" className="pl-4" width={50} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MembershipShipOffers;
