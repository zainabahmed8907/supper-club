"use client";

import { Chip } from "@mui/material";
import gpsIcon from "public/images/offers/gps.png";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import LocationModal from "../Modals/LocationModal";
import axios from "axios";
import { useDispatch } from "react-redux";
import { saveFilteredOffer } from "@/store/reducers/offer.slice";

function OffersOptions() {
  const [locateModalOpen, setLocateModalopen] = useState(false);

  const handleLocateMOdalOpen = () => setLocateModalopen(true);
  const handleLocateMOdalClose = () => setLocateModalopen(false);

  const [popularExperiences, setPopularExperiences] = useState([]);

  const [expId, setExpId] = useState(null);

  const dispatch = useDispatch();

  const handleExpClick = (id) => {
    setExpId(id);
  };

  const getFilters = async () => {
    try {
      const offer = await axios.get(
        `${process.env.NEXT_PUBLIC_API_KEY}/offer/filters`
      );
      const data = offer.data.data;

      setPopularExperiences(
        data?.experiences?.filter((exp) => exp?.attributes?.Popular)
      );
    } catch (e) {
      console.log(e);
    }
  };

  const getOffers = async () => {
    let offerURL = process.env.NEXT_PUBLIC_API_KEY;
    if (expId) {
      offerURL += `/offer?experience=${expId?.toString()}`;
    }
    try {
      const response = await axios.get(offerURL);
      const data = response.data;
      dispatch(saveFilteredOffer(data?.data));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getFilters();
  }, []);
  useEffect(() => {
    getOffers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expId]);

  return (
    <div className="w-screen">
      <div
        className="m-auto lg:px-20  xl:px-36 2xl:px-40 3xl:px-60 4xl:px-86 4xxl:px-100
       5xl:px-[34.5rem] 6xl:px-[27rem] 7xl:pl-[34rem] 7xl:pr-[41rem] px-5 bg-secondary 3xl:ml-5 4xl:-ml-3 4xxl:ml-3"
      >
        <div className="flex justify-between items-center">
          <p className="text-primary text-xl lg:text-2xl xl:text-4xl 5xl:text-5xl pt-10 pb-7  font-semibold">
            Supper Club Offers
          </p>
          <div className="lg:-ml-32 lg:hidden block ">
            <div className="bg-gray w-10 mr-7 p-2 flex justify-center rounded-full text-white">
              <Image src={gpsIcon} alt="gps" />
            </div>
          </div>
        </div>
        <div className="flex justify-between  scroll-smooth scroll appearance-none overflow-x-auto lg:flex-row pb-10 items-center">
          <div className=" flex lg:flex-row">
            {popularExperiences?.map((exp) => {
              return (
                <div
                  key={exp?.id}
                  className={`lg:w-fit w-max h-fit text-center px-5 py-2 border border-[#DDDDDD] text-base rounded-3xl mr-2 lg:mb-2 cursor-pointer
                  ${exp?.id == expId && "bg-primary text-white"}

                `}
                  onClick={() => handleExpClick(exp?.id)}
                >
                  {exp?.attributes?.Name}
                </div>
              );
            })}
          </div>
          <div
            className=" lg:block hidden cursor-pointer 3xl:w-[13rem] 2xl:w-[12rem] 4xl:w-[11.5rem] 4xxl:w-[15rem]"
            onClick={handleLocateMOdalOpen}
          >
            <Chip
              icon={<Image src={gpsIcon} alt="gps" />}
              label="Locate me"
              variant="outlined"
              size="medium"
              className="bg-gray text-white p-6  rounded-3xl text-sm  lg:w-[10.25rem]  4xl:w-[12.3rem]"
            />
          </div>
        </div>
        {locateModalOpen && (
          <LocationModal
            open={locateModalOpen}
            handleClose={handleLocateMOdalClose}
          />
        )}
      </div>
    </div>
  );
}

export default OffersOptions;
