import {
  SwipeableDrawer,
  Box,
  TextField,
  Snackbar,
  Button,
} from "@mui/material";
import { makeStyles, styled } from "@mui/styles";

import Image from "next/image";
import { usePathname } from "next/navigation";

const Puller = styled("div")(({ theme }) => ({
  width: 60,
  height: 6,
  backgroundColor: "#DDDDDD",
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));
const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: "100%",
    height: "70%", // Set the height of the drawer to cover the entire viewport
  },
}));

function CancelDrawerMobile({ open, toggleDrawer, image, handleClose, cancelBooking, cancelOffer, favOfferId}) {
  const classes = useStyles();
  const path=usePathname();


  return (
    <SwipeableDrawer
      open={open}
      variant="persistent"
      anchor="bottom"
      onOpen={() => console.log("I am opened")}
      onClose={toggleDrawer}
      className="w-[25.5rem] h-96"
      classes={{
        paper: classes.drawerPaper,
      }}
      sx={{
        "& .MuiDrawer-paper": {
          maxWidth: "100vw",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
        },
      }}
    >
      <Puller onClick={toggleDrawer} />

      <div className="flex justify-between flex-col">
        <div className="flex justify-center items-center">
          <Image src={image} alt="delete" width={400} height={200} className="pt-10" />
        </div>

        <div className="mt-7 px-8 flex">
          <Button
            type="button"
            className={`mt-10 h-12 mr-4
              text-dark rounded-3xl
              bg-white
               border-solid border border-primary
              capitalize
              text-sm
              w-full`}
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className={`mt-10 h-12   text-white rounded-3xl
              bg-primary
              capitalize
              text-sm
              w-full
            `}
            onClick={() => {
              handleClose();
              if (path == "/favorite_offers") {
                cancelOffer(favOfferId);
              } else {
                cancelBooking();
               

              }
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </SwipeableDrawer>
  );
}
export default CancelDrawerMobile;
