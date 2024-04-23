import React, { useEffect, useState } from "react";
import {
  useMediaQuery,
  SwipeableDrawer,
  useTheme,
  CssBaseline,
} from "@mui/material";
import Image from "next/image";
import SettingsIcon from "public/images/offers/setting.png";
import CloseIcon from "public/images/offers/close-circle.png";
import CancelChipIcon from "public/images/drawer/drawerDelete.svg";
import CancelDrawerIcon from "public/images/offers/close-drawer.png";

import axios from "axios";
import { useDispatch } from "react-redux";
import { saveFilteredOffer } from "@/store/reducers/offer.slice";

function FilterDrawer({ isDrawerOpen, setIsDrawerOpen }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const isBigScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const drawerAnchor = isBigScreen ? "right" : "bottom";

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const drawerWidth = isBigScreen ? 650 : "100%";
  const drawerheight = isBigScreen ? "100%" : 550;

  const [cities, setCities] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [prices, setPrices] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    city: "",
    experience: [],
    price: "",
  });
  const [showClearFilters, setShowClearFilters] = useState(false);

  const getFilters = async () => {
    try {
      const offer = await axios.get(
        `${process.env.NEXT_PUBLIC_API_KEY}/offer/filters`
      );
      const data = offer.data.data;
      setCities(data?.cities);
      setExperiences(data?.experiences);
      setPrices(data?.prices);
    } catch (e) {
      console.log(e);
    }
  };

  const constructQueryString = (filters) => {
    let queryString = "";
    Object.keys(filters).forEach((key) => {
      if (filters[key].length > 0) {
        const filterValue = filters[key].join(",");
        queryString += `&${key}=${filterValue}`;
      }
    });
    return queryString;
  };

  const handleDeleteExperience = (experienceId) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      experience: prevFilters?.experience?.filter((id) => id !== experienceId),
    }));
  };

  const getOffers = async () => {
    try {
      const endpoint = `${
        process.env.NEXT_PUBLIC_API_KEY
      }/offer?${constructQueryString(selectedFilters)}`;
      const response = await axios.get(endpoint);
      const data = response.data;
      dispatch(saveFilteredOffer(data?.data));
      setIsDrawerOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  const clearFilters = () => {
    setSelectedFilters({ city: "", experience: [], price: "" });
 
  };

  useEffect(() => {
    getFilters();
  }, []);

  useEffect(() => {
    const anyFilterSelected =
      selectedFilters.city ||
      selectedFilters.experience.length > 0 ||
      selectedFilters.price;
  
    setShowClearFilters(anyFilterSelected);
  }, [selectedFilters]);

  const handleChipClick = (filterType, filterValue) => {
    setSelectedFilters((prevFilters) => {
      let updatedFilters = { ...prevFilters };
      if (filterType === "city" || filterType === "price") {
        // If the filter type is 'cities' or 'prices', clear the previous selection and set the new value
        updatedFilters[filterType] = [filterValue];
      } else {
        // If the filter type is 'experiences', toggle the selection of the value
        if (prevFilters[filterType].includes(filterValue)) {
          // Remove the filter value if already selected
          updatedFilters[filterType] = prevFilters[filterType].filter(
            (value) => value !== filterValue
          );
        } else {
          // Add the filter value if not already selected
          updatedFilters[filterType] = [
            ...prevFilters[filterType],
            filterValue,
          ];
        }
      }
      return updatedFilters;
    });
  };
  return (
    <SwipeableDrawer
      anchor={drawerAnchor}
      open={isDrawerOpen}
      onOpen
      onClose={handleDrawerClose}
      onKeyDown={handleDrawerClose}
      disableSwipeToOpen={true}
      variant={isBigScreen ? "temporary" : "persistent"}
      hideBackdrop={true}
      style={{ borderRadius: "10px", zIndex: 10000 }}
      ModalProps={{
        onBackdropClick: handleDrawerClose,
      }}
      sx={{
        width: drawerWidth,
        maxHeight: 250,
        overflowY: "scroll",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,

          overflowY: isBigScreen ? "scroll" : "hidden",
          height: drawerheight,
          borderTopLeftRadius: isBigScreen ? 0 : 28,
          borderTopRightRadius: isBigScreen ? 0 : 28,
        },
      }}
    >
      <CssBaseline />
      <div className="overflow-y-auto overflow-x-hidden  flex flex-col  h-full">
        <div className="h-1 w-full bg-secondary block">
          <div
            className="h-1 w-20 bg-[#DDDDDD] block mx-auto"
            onClick={handleDrawerClose}
          ></div>
        </div>
        <div
          className="h-20 max-h-40 py-6 mb-6 flex justify-between items-center border-b-4
         border-secondary bg-secondary rounded-tl-2xl"
        >
          <div className="flex ml-4">
            <Image src={SettingsIcon} alt="filter" />
            <p className="xl:text-xl ml-2">Filter your search</p>
          </div>
          {showClearFilters ? (
            <div className="ml-20 flex cursor-pointer" onClick={clearFilters}>
              <Image src={CloseIcon} alt="clear filters" />
              <p className="xl:text-base text-sm ml-2 text-textRed pr-2 lg:pr-0 ">
                Clear Filters
              </p>
            </div>
          ) : (
            ""
          )}
          <div
            className="mr-7 cursor-pointer lg:block hidden"
            onClick={handleDrawerClose}
          >
            <Image
              src={CancelDrawerIcon}
              alt="close drawer"
              width={25}
              height={25}
            />
          </div>
        </div>
        <div className="ml-4 max-h-32 h-28 mb-6">
          <p className="lg:text-[1.2rem] xl:text-[1.3rem] font-bold">City</p>
          <div className="flex lg:flex-row mt-4  flex-wrap">
            {cities?.map((city) => (
              <div
                key={city?.id}
                className={`w-fit px-4 py-1 border border-[#DDDDDD] text-base rounded-2xl mr-2 mb-2 cursor-pointer
                 ${
                   city?.id == selectedFilters?.city?.toString() &&
                   "bg-primary text-white"
                 }
                `}
                onClick={() => handleChipClick("city", city?.id)}
              >
                {city?.attributes?.Name}
              </div>
            ))}
          </div>
        </div>
        <div className="ml-4 max-h-28 h-28 mb-6">
          <p className="lg:text-[1.2rem] xl:text-[1.3rem] font-bold lg:mt-4 mt-10">
            Price
          </p>
          <div className="flex lg:flex-row mt-4 w-106 flex-wrap">
            {prices?.map((price) => (
              <div
                key={price?.id}
                className={`w-fit px-4 py-1 border border-[#DDDDDD] text-base rounded-2xl mr-2 mb-2 cursor-pointer
                 ${
                   price?.id == selectedFilters?.price?.toString() &&
                   "bg-primary text-white"
                 }
                `}
                onClick={() => handleChipClick("price", price?.id)}
              >
                {price?.attributes?.Range}
              </div>
            ))}
          </div>
        </div>

        <div className="ml-4 y h-full">
          <p className="lg:text-[1.2rem] xl:text-[1.3rem] font-bold mt-4">
            Experience
          </p>
          <div className="flex lg:flex-row mt-4  flex-wrap max-h-[25rem] overflow-y-auto">
            {experiences?.map((exp) => (
              <div key={exp?.id} className="flex items-center">
                <div
                  className={`w-fit px-4 py-[5px] border border-[#DDDDDD] text-base rounded-3xl items-center mr-3
                mb-2 cursor-pointer  ${
                  selectedFilters?.experience?.includes(exp.id)
                    ? "bg-primary text-white"
                    : "bg-white text-dark"
                }`}
                  onClick={() => handleChipClick("experience", exp?.id)}
                >
                  <p
                    className={` ${
                      selectedFilters?.experience?.includes(exp.id)
                        ? "pr-2 mr-3"
                        : "mr-0"
                    }`}
                  >
                    {exp?.attributes?.Name}
                  </p>
                </div>
                <Image
                  src={CancelChipIcon}
                  alt=""
                  width={35}
                  height={30}
                  className={`-ml-10 pr-5 -mt-2 cursor-pointer ${
                    selectedFilters?.experience?.includes(exp?.id)
                      ? "block"
                      : "hidden"
                  }`}
                  onClick={() => handleDeleteExperience(exp?.id)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end lg:pr-10 pr-7 pl-7 lg:pl-0 lg:mt-4 mb-4 mt-20">
          <button
            className="bg-primary rounded-full lg:w-40 w-full px-4 py-3 text-white"
            onClick={()=>{
              getOffers();
              localStorage.setItem("filterApplied", true);

            }}
          >
            Apply
          </button>
        </div>
      </div>
    </SwipeableDrawer>
  );
}

export default FilterDrawer;
