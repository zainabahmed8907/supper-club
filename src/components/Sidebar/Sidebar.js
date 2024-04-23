"use client";

import {
  Box,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import sidebarData from "./sidebardata";

export default function Sidebar() {
  const pathName = usePathname();


  return (
    <>
      <nav>
        <Hidden mdDown>
          <Drawer
            variant="persistent"
            sx={{
              display: { xs: "none", md: "block" },
              flexShrink: 0,

              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                position:"relative",
                background:"#F9FAFA"
              },
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            open
          >
            <Box
              className="mt-28 4xl:ml-56 5xl:ml-60 3xl:ml-40 2xl:ml-[7.5rem] lg:ml-6"
              left='20'
              top='40'
              bottom='20'
               sx={{
                "@media screen and (min-width:960px)":{
                  height:"100%",
                  position:"sticky"

                },
                "@media screen and (min-width:1420px)":{
                  height:"80vh",
                  position:"sticky"

                },
                "@media screen and (min-width:1820px)":{
                  height:"85vh",
                  position:"sticky"
                },
               }}
            >
              <List>
                {sidebarData.map((item, index) => {
                  return (
                    <ListItem key={item.id}>
                      <ListItemButton>
                        <Link
                          href={item.path}
                          className={`h-10 xl:w-56 lg:w-44 py-2 ${
                            item.path == pathName ||
                            (item.path.includes("?") &&
                              item.path.split("?")[0] == pathName)
                              ? "bg-primaryMain rounded-lg"
                              : ""
                          }`}
                          key={item.id}
                          passHref={true}
                        >
                          <div className="flex justify-center pb-16 ">
                            <Image src={item.image} alt="" className="mr-4" />
                            <p className="text-sm font-medium 3xl:w-36 lg:w-32 ">
                              {item.itemName}
                            </p>
                          </div>
                        </Link>
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
}
