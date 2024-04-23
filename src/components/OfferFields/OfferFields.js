"use client";

import {
  Autocomplete,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Paper,
  Radio,
  Select,
  TextField,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import SearchIcon from "public/images/offers&discounts/searchIcon.png";
import filterIcon from "public/images/offers&discounts/filterIcon.png";

import FilterDrawer from "../FilterDrawer/FilterDrawer";
import useDebounce from "@/lib/useDebounce";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  fetchSearchedOffers,
  sortedOffers,
} from "@/store/reducers/offer.slice";

function OfferFields({ totalRestaurants }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const [searchlist, setSearchlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const debounce = useDebounce(searchQuery, 500);
  const [selectedOption, setSelectedOption] = useState("");

  const handleMenuItemClick = (event) => {
    setSelectedOption(event.target); // Update the selected option when menu item is clicked
  };

  const filterHotels = async () => {
    try {
      const offer = await axios.get(
        `${process.env.NEXT_PUBLIC_API_KEY}/offer/filters`
      );
      const data = offer.data.data;
      setSearchlist(data?.restaurants?.map((r) => r?.attributes));
      return offer;
    } catch (e) {
      console.log(e);
    }
  };

  const searchResults = async (e) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_KEY}/offer/search?query=${debounce}`
      );
      const data = response.data;
      dispatch(fetchSearchedOffers(data));
    } catch (e) {
      throw e;
    }
  };
  const sortedResults = async (e) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_KEY}/offer/search?query=${selectedOption}`
      );
      const data = response.data;
      dispatch(sortedOffers(data));
    } catch (e) {
      throw e;
    }
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  useEffect(() => {
    filterHotels();

    if (debounce) {
      searchResults();
    }
    if (selectedOption) {
      sortedResults();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, debounce, selectedOption]);

 

  return (
    <div className="w-screen">
      <div
        className="flex flex-wrap items-center lg:flex-nowrap lg:px-20 xl:px-36 2xl:px-40 3xl:px-60 4xl:px-80 w-screen
        5xl:px-[34.5rem] 6xl:px-[27rem] 7xl:px-[34rem]   md:px-44 px-6  lg:w-screen 5xl:pt-20 4xl:pt-16 3xl:pt-15 xl:pt-12"
      >
        <div className="flex items-center">
          <div className="4xl:w-96 4xxl:w-104 2xl:w-60 3xl:w-72 lg:w-15 5xl:w-60 6xl:w-104">
            <p
              className="text-textMain lg:text-2xl  text-lg pt-10 pb-7 font-semibold 3xl:ml-6
             4xl:ml-10 4xxl:ml-[8.5rem] 5xl:ml-[2.5rem] 2xl:mll-2"
            >
              {totalRestaurants} Restaurants
            </p>
          </div>
          <div className="m-1 lg:hidden block">
            <Select
              name="sort"
              className="bg-white rounded-3xl 5xl:rounded-full 4xl:rounded-full
              border border-inputBorder 
              outline-none 
              text-base 
               w-[200px]
               p-3  text-gray "
              sx={{
                height: 50,
                borderRadius: "8px",
                background: "#F9FAFA",
                ".MuiSelect-select": {
                  color: "#7E7E7E",
                  marginLeft: "-12px",
                  fontWeight: 100,
                  opacity: "0.7",
                },
                ".MuiOutlinedInput-root": {
                  color: "#000",
                },
              }}
              displayEmpty
              renderValue={(value) =>
                value?.length
                  ? Array.isArray(value)
                    ? value.join(", ")
                    : value
                  : "Sort by price low to high"
              }
            >
              <MenuItem
                value={"Sort by popularity"}
                className="p-0 mx-3 my-2 text-sm  hover:bg-[#FCFAF7]"
                onClick={handleMenuItemClick}
              >
                <FormControlLabel
                  control={<Radio />}
                  label="Sort by popularity"
                  value="Sort by popularity"
                  checked={selectedOption === "Sort by popularity"}
                />
              </MenuItem>

              <MenuItem
                value={"Sort by average rating"}
                className="p-0 mx-3 my-2 text-sm  hover:bg-[#FCFAF7]"
                onClick={handleMenuItemClick}
              >
                <FormControlLabel
                  control={<Radio />}
                  label="Sort by average rating"
                  value="Sort by average rating"
                />
              </MenuItem>

              <MenuItem
                value={"Sort by latest"}
                className="p-0 mx-3 my-2 text-sm  hover:bg-[#FCFAF7]"
                onClick={handleMenuItemClick}
              >
                <FormControlLabel
                  control={<Radio />}
                  label="Sort by latest"
                  value="Sort by latest"
                />
              </MenuItem>

              <MenuItem
                value={"Sort by price: low to high"}
                className="p-0 mx-3 my-2 text-sm  hover:bg-[#FCFAF7]"
                onClick={handleMenuItemClick}
              >
                <FormControlLabel
                  control={<Radio />}
                  label="Sort by price: low to high"
                  value="Sort by price: low to high"
                />
              </MenuItem>

              <MenuItem
                value={"Sort by price: high to low"}
                className="p-0 mx-3 my-2 text-sm  hover:bg-[#FCFAF7]"
                onClick={handleMenuItemClick}
              >
                <FormControlLabel
                  control={<Radio />}
                  label="Sort by price: high to low"
                  value="Sort by price: high to low"
                />
              </MenuItem>

              <MenuItem
                value={"Random"}
                className="p-0 mx-3 my-2 text-sm  hover:bg-[#FCFAF7]"
                onClick={handleMenuItemClick}
              >
                <FormControlLabel
                  control={<Radio />}
                  label="Random"
                  value="Random"
                />
              </MenuItem>
            </Select>
          </div>
        </div>
        <div className="flex 5xl:pl-40 6xl:pl-60 4xl:pl-5 3xl:pl-44 xl:pl-44 lg:pl-28 ">
          <div className="m-1 -ml-2 lg:-ml-0">
            <Autocomplete
              disablePortal
              onChange={(e) => setSearchQuery(e.target.value)}
              options={
               searchlist
              }
              getOptionLabel={(option)=>option?.Name}
              inputValue={searchQuery}
              
              // getOptionLabel={(option) => (
              //   <div>
              //     <div className="text-[14px] font-bold">{option?.Name}</div>
              //     <div className="text-[14px] font-normal text-[#7E7E7E]">
              //       {option?.cities?.data
              //         .map((city) => city.attributes.Name)
              //         .join(", ")}
              //     </div>
              //   </div>
              // )}
              onInputChange={(e, v) => {
                e?.preventDefault();
                setSearchQuery(v);
              }}
              className="bg-white rounded-full border border-inputBorder p-1 h-[3rem] font-lg 5xl:text-2xl outline-none text-gray w-[16rem] lg:w-[20rem] 2xl:w-[25rem] 4xl:w-[25rem] 5xl:w-[26rem] 6xl:w-[29rem]"
              PaperComponent={Paper}
              sx={{
                ".MuiInput-root": {
                  padding: "5px 0 5px",
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  placeholder="Search for venue"
                  name="query"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start" className="pl-3">
                        <Image src={SearchIcon} alt="messageicon" width={30} />
                      </InputAdornment>
                    ),
                    disableUnderline: true,
                    endAdornment: <></>,
                  }}
                />
              )}
            />
          </div>
          <div
            className="lg:w-[3rem] xl:w-[7.8rem] 
            w-[4rem] p-1  border border-inputBorder 
            rounded-full
            flex items-center
            text-base 5xl:text-lg
             m-1  
             cursor-pointer
           "
            onClick={handleDrawerOpen}
          >
            <Image
              src={filterIcon}
              alt="filterIcon"
              className="xl:ml-4 lg:mr-2 block  m-auto"
            />
            <p className="font-normal text-gray xl:block hidden">Filters</p>
          </div>
          <div className="m-1 lg:block hidden">
            <Select
              name="sort"
              className="bg-white rounded-3xl 5xl:rounded-full 4xl:rounded-full
              border border-inputBorder 
              outline-none 
              text-base 
              lg:w-[14.6rem]
              4xl:w-[18rem]
            
              6xl:w-[19rem]
               p-3 5xl:p-4 text-gray "
              sx={{
                height: 50,
                borderRadius: "8px",
                background: "#F9FAFA",
                ".MuiSelect-select": {
                  color: "#7E7E7E",
                  marginLeft: "-12px",
                  fontWeight: 100,
                  opacity: "0.7",
                },
                ".MuiOutlinedInput-root": {
                  color: "#000",
                },
              }}
              displayEmpty
              renderValue={(value) =>
                value?.length
                  ? Array.isArray(value)
                    ? value.join(", ")
                    : value
                  : "Sort by price low to high"
              }
            >
              <MenuItem
                value={"Sort by popularity"}
                className="p-0 mx-3 my-2 text-sm  hover:bg-[#FCFAF7]"
                onClick={handleMenuItemClick}
              >
                <FormControlLabel
                  control={<Radio />}
                  label="Sort by popularity"
                  value="Sort by popularity"
                  checked={selectedOption === "Sort by popularity"}
                />
              </MenuItem>

              <MenuItem
                value={"Sort by average rating"}
                className="p-0 mx-3 my-2 text-sm  hover:bg-[#FCFAF7]"
                onClick={handleMenuItemClick}
              >
                <FormControlLabel
                  control={<Radio />}
                  label="Sort by average rating"
                  value="Sort by average rating"
                />
              </MenuItem>

              <MenuItem
                value={"Sort by latest"}
                className="p-0 mx-3 my-2 text-sm  hover:bg-[#FCFAF7]"
                onClick={handleMenuItemClick}
              >
                <FormControlLabel
                  control={<Radio />}
                  label="Sort by latest"
                  value="Sort by latest"
                />
              </MenuItem>

              <MenuItem
                value={"Sort by price: low to high"}
                className="p-0 mx-3 my-2 text-sm  hover:bg-[#FCFAF7]"
                onClick={handleMenuItemClick}
              >
                <FormControlLabel
                  control={<Radio />}
                  label="Sort by price: low to high"
                  value="Sort by price: low to high"
                />
              </MenuItem>

              <MenuItem
                value={"Sort by price: high to low"}
                className="p-0 mx-3 my-2 text-sm  hover:bg-[#FCFAF7]"
                onClick={handleMenuItemClick}
              >
                <FormControlLabel
                  control={<Radio />}
                  label="Sort by price: high to low"
                  value="Sort by price: high to low"
                />
              </MenuItem>

              <MenuItem
                value={"Random"}
                className="p-0 mx-3 my-2 text-sm  hover:bg-[#FCFAF7]"
                onClick={handleMenuItemClick}
              >
                <FormControlLabel
                  control={<Radio />}
                  label="Random"
                  value="Random"
                />
              </MenuItem>
            </Select>
          </div>
        </div>
      </div>

      <FilterDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </div>
  );
}

export default OfferFields;
