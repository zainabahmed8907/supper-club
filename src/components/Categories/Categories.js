"use client";
import Image from "next/image";
import Bar from "/public/images/categories/Bar.png";
import Beach from "/public/images/categories/Beach.png";
import Pool from "/public/images/categories/Pool.png";
import Restaurant from "/public/images/categories/Restaurant.png";
import SPA from "/public/images/categories/SPA.png";
import StayCation from "/public/images/categories/StayCation.png";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function Categories() {
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const offset = window.innerHeight / 1.5;

      if (scrollY > offset) {
        controls.start({ opacity: 1, y: 0 });
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [controls]);

  const initial = { opacity: 0, y: 50 };

  return (
    <section className="lg:mb-2 mb-20">
      <div className="pt-20">
        <h1
          className=" xl:text-[1.5rem] text-[20px] w-full
                text-center
                font-bold lg:leading-8 leading-[28px]  px-4
               "
          initial={initial}
          animate={controls}
          whileInView="visible"
          viewport={{ once: true }}
        >
          Discover over 350
          <span className="text-primary ml-1">Buy One Get one Free</span> offers
          and <br />
          discounts across the finest hotels in the Middle East.
        </h1>
      </div>
      <div
        className="pt-6
            lg:w-[770px]
            lg:px-20
            m-auto"
      >
        <p className="text-[15px] text-center xl:text-[1rem] lg:px-1 px-4">
          Inspired by the glistening Arabian Gulf, Rosewood Abu Dhabi is a
          palatial luxury hotel delivering peerless extravagance and service to
          the United Arab Emirates.
        </p>
      </div>

      <motion.div
        className="
            xl:w-max
            w-[20.2rem]
            m-auto
            px-24 
            lg:px-0
            mt-10"
        initial={initial}
        animate={controls}
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="flex  justify-center ">
          <Image
            src={Restaurant}
            alt="restaurant icon"
            width={250}
            height={250}
            className="border-r border-b border-primaryDisabled p-3 "
          />
          <Image
            src={SPA}
            alt="spa icon"
            width={250}
            height={250}
            className="border-r border-b border-primaryDisabled p-3 self-center"
          />
          <Image
            src={Bar}
            alt="bar icon"
            width={250}
            height={250}
            className=" border-b border-primaryDisabled p-3 self-center"
          />
        </div>
        <div className="flex justify-center">
          <Image
            width={250}
            height={250}
            src={Beach}
            alt="restaurant icon"
            className="border-r  border-primaryDisabled p-3"
          />
          <Image
            width={250}
            height={250}
            src={Pool}
            alt="spa icon"
            className="border-r  border-primaryDisabled p-3 "
          />
          <Image
            width={250}
            height={250}
            src={StayCation}
            alt="bar icon"
            className=" border-primaryDisabled lg:border-b-0 p-3"
          />
        </div>
      </motion.div>
    </section>
  );
}
