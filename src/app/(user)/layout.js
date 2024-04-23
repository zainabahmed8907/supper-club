'use client';
import BottomNavigationSheet from "@/components/BottomNavigationSheet/BottomNavigationSheet";
import Footer from "@/components/Footer/Footer";
import IsAuthenticated from "@/components/IsAuthenticated/IsAuthenticated";
import NavBar from "@/components/NavBar/NavBar";
import Sidebar from "@/components/Sidebar/Sidebar";
import StoreProvider from "@/components/StoreProvider/StoreProvider";
import { Grid, Tabs, Tab } from "@mui/material";

export default function UserLayout({ children }) {
  return (
    <>
      <StoreProvider>
        <IsAuthenticated>
          <div className="h-20 sticky  z-[9999]  shadow-sticky backdrop-blur-sm top-0">
            <NavBar />
          </div>

          <Grid
            container
            spacing={1}
            className="bg-secondary h-screen top-0 bottom-0"
          >

            <Grid
              item
              lg={2.5}
              xl={3.2}
              md={3}
              className="bg-secondary lg:border-r-2 border-inputBorder lg:block hidden"
            >
              <Sidebar />
            </Grid>
            <Grid
              item
              lg={9.5}
              xl={8.8}
              md={9}
              className="bg-secondary lg:w-full w-full m-auto"
            >
              <BottomNavigationSheet />

              {children}

            </Grid>
            <div className="w-full">
              <Footer />
            </div>
          </Grid>
        </IsAuthenticated>
      </StoreProvider>
    </>
  );
}
