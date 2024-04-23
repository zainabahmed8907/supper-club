"use client";

import FavoriteOffersCardContainer from "@/components/FavoriteOffersCardContainer/FavoriteOffersCardContainer";
import {
  Tab,
  Tabs,
  TextField,
  InputAdornment,
  InputProps,
  Alert,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import SearchIcon from "public/images/offers&discounts/searchIcon.png";
import axiosInstance from "@/store/services/config";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}
function FavoriteOffers() {
  const [value, setValue] = useState("0");
  const [favoriteOffers, setFavoriteOffers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [failedMessage, setFailedMessage] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [failedAlert, setFailedAlert] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  const getFavoriteOffers = async () => {
    try {
      const response = await axiosInstance.get("/user/saved-offers");
      const data = response.data;
      setFavoriteOffers(data?.data);

      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const deleteOffer = async (id) => {
    try {
      const response = await axiosInstance.patch(`/user/saved-offers/${id}`);
      const data = response.data;
      setSuccessAlert(true);
      setSuccessMessage(data?.message);

      setTimeout(() => {
        setSuccessAlert(false);
        setSuccessAlert("");
      }, 2000);
      getFavoriteOffers();

      return data;
    } catch (e) {
      console.log(e);
      setFailedAlert(true);
      setFailedMessage(e?.response?.data?.message);

      setTimeout(() => {
        setFailedAlert(false);
        setFailedMessage("");
      }, 4000);
    }
  };

  useEffect(() => {
    getFavoriteOffers();
  }, []);

  return (
    <>
      <div className=" xl:ml-4  lg:w-11/12  lg:flex-row lg:pb-10 ">
        <div
          className=" flex lg:flex-row  flex-col mx-4 justify-between 
        2xl:w-[66rem] lg:w-[60rem] lg:items-center sticky pb-6 mt-10  scroll-smooth scroll appearance-none overflow-x-auto"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
            sx={{
              "& .MuiTabs-indicator": { display: "none" },
              "& .Mui-selected": {
                borderLeft: 0,
                borderRadius: 0,
                color: " #C39D63 !important",
                borderBottom: "2px solid #C39D63 !important",
              },
              "& .MuiTab-root": {
                padding: "4px 24px !important",
                marginRight: "12px",
                color: "#444237",
              },
              "@media (max-width:768px)": {
                "& .MuiTab-root": {
                  paddingBottom: "5px",
                },
              },
            }}
          >
            <Tab
              value="0"
              label="MY FAVORITES"
              wrapped
              className="text-base font-medium"
            />
          </Tabs>
          <TextField
            className="rounded-xl"
            placeholder="Search Offers"
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "22px",
                color: "#444237",
                backgroundColor: "white",
                "@media screen and (max-width:1054px)": {
                  marginTop: "1.9rem",
                },
              },
              "& .MuiOutlinedInput-input": {
                width: "28.75rem",
                padding: "12px",
                "@media screen and (max-width:1054px)": {
                  width: "18.6rem",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" className="pl-3">
                  <Image
                    src={SearchIcon}
                    alt="messageicon"
                    width={30}
                    height={30}
                  />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      <TabPanel value={value} index={"0"}>
        {successAlert && <Alert className="mb-10 mt-2 ml-4 center lg:w-1/2 w-full">{successMessage}</Alert>}
        {failedAlert && <Alert className="mb-10 mt-2  ml-4  flex center lg:w-1/2 w-full">{failedMessage}</Alert>}

        <div className="mb-10">
          <FavoriteOffersCardContainer
            favoriteOffers={favoriteOffers}
            deleteOffer={deleteOffer}
          />
        </div>
      </TabPanel>
    </>
  );
}

export default FavoriteOffers;
