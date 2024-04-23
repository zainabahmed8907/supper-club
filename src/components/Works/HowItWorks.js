"use client";
import Image from "next/image";
import WomenEating from "public/images/works/WomenEating.png";
import OffersAndDiscounts from "../Offers_Discounts/OffersAndDiscounts";
import { motion } from "framer-motion";

function HowitWorks() {
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
    <div className="pt-12 px-10 lg:px-16 md:px-16 xl:px-16 2xl:px-28  3xl:px-24 flex justify-center flex-col lg:flex-row items-center">
      <div className="flex justify-center lg:flex-row flex-col lg:w-max">
        <div>
          <p className="text-2xl xl:text-4xl font-bold pb-3 text-center lg:text-start">
            How it Works
          </p>
          <div
            className="
            border-primary  
            border-b-4
            w-20
            h-1
            pb-2
            block m-auto lg:m-0
            "
          ></div>

          <div className="mt-7 border-primary border-b lg:w-3/5 2xl:w-3/5 3xl:w-3/5 ">
            <div className="flex">
              <div>
                <p
                  className="w-7 h-7 
                       flex justify-center items-center
                          text-center
                         bg-primary
                          text-white
                          rounded-full mr-5 text-base "
                >
                  1
                </p>
              </div>
              <div>
                <p className="text-primary text-lg 2xl:text-2xl  pb-1 font-medium">
                  Join
                </p>
                <p
                  className="pr-18 
              lg:w-4/5 2xl:w-5/6 3xl:w-5/6
              text-sm pb-4 xl:text-base font-normal"
                >
                  Choose your membership to unlock all Supperclub discounts.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 border-primary border-b lg:w-3/5  2xl:w-3/5 3xl:w-3/5">
            <div className="flex ">
              <div>
                <p
                  className="w-7 h-7 
              flex justify-center items-center
                
                text-center
               bg-primary
                text-white
                rounded-full mr-5 text-base  "
                >
                  2
                </p>
              </div>

              <div>
                <p className="text-primary text-lg xl:text-2xl  pb-1 font-medium">
                  Book
                </p>
                <p
                  className="pr-18
              lg:w-4/5 2xl:w-5/6 3xl:w-full
               text-sm pb-4 xl:text-base font-normal"
                >
                  Unlimited offers, as often as you want and for unlimited
                  guests.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 lg:w-3/5 2xl:w-3/5 3xl:w-3/5">
            <div className="flex ">
              <div>
                <p
                  className="w-7 h-7 
               
                xl:w-7
                xl:h-7
                text-center
               bg-primary
                text-white
                flex items-center
                justify-center
                rounded-full mr-5 text-base"
                >
                  3
                </p>
              </div>
              <div>
                <p className="text-primary text-lg xl:text-2xl  pb-1 font-medium">
                  Enjoy
                </p>
                <p
                  className="pr-18
              lg:w-4/5 2xl:5/6 3xl:w-full
              pb-4 text-sm xl:text-base font-normal"
                >
                  At the venue, the Superclub discount will automatically be
                  applied to your bill. No card, codes or voucher required.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="xl:pt-0 pt-3">
          <Image
            src={WomenEating}
            alt="women eating"
            className="flex xl:w-[35rem] lg:w-[45rem] md:w-[25rem] w-[256px] float-right lg:float-none"
            width={300}
            height={300}
            loading="lazy"
          />
          <motion.div
            className="flex xl:-mt-52 lg:-mt-56 lg:-ml-14  md:mt-44   mt-14 z-10 absolute "
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
          >
            <motion.div
              className="xl:pr-7 pr-2 xl:-ml-20 pb-3 lg:pb-0 "
              variants={cardVariants}
            >
              <OffersAndDiscounts
                bgColor="bg-primary"
                topText="Lorem Ipsum Dolor"
                bottomText="Exclusive offers every week"
                count="500+"
              />
            </motion.div>
            <motion.div variants={cardVariants}>
              <OffersAndDiscounts
                bgColor="bg-black"
                topText="Lorem Ipsum Dolor"
                bottomText="Exclusive offers every week"
                count="500+"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default HowitWorks;
