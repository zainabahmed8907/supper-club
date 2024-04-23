"use client";
import MembershipDetails from "@/components/MembershipDetailsCard/MembershipDetailsCard";
import ProfileSettings from "@/components/ProfileSettingsCard/ProfileSettingsCard";
import ReferAFriendContainer from "@/components/ReferAFriendContainer/ReferAFriendContainer";
import { getUserMembership,  } from "@/store/services/user.service";
import { Tab, Tabs } from "@mui/material";

import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

export default function User() {
  const [value, setValue] = useState("0");
  const dispatch = useDispatch();
  const { subscription, user } = useSelector((state) => state.user);


  useEffect(() => {
    dispatch(getUserMembership());
  }, [dispatch]);



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className=" xl:ml-4  lg:w-11/12  lg:flex-row pb-10 ">
      <div className=" flex lg:flex-row mx-4  sticky pb-6 mt-10  scroll-smooth scroll appearance-none overflow-x-auto">
        {/* <Tabs
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
          }}
        >
          <Tab
            value="0"
            label="PROFILE SETTINGS"
            wrapped
            className="text-base font-medium"
          />
          <Tab
            value="1"
            label="MY MEMBERSHIP PLAN"
            className="text-base font-medium"
          />
        </Tabs> */}
      </div>

      <TabPanel value={value} index={"0"}>
        <Suspense >
         <ReferAFriendContainer/>
        </Suspense>
      </TabPanel>
      <TabPanel value={value} index={"1"}>
        {/* <Suspense >
          <MembershipDetails subscription={subscription} />
        </Suspense> */}
      </TabPanel>
    </div>
  );
}
