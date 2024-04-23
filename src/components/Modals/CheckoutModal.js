import {
  Dialog,
  Modal,
  useMediaQuery,
  useTheme,
  DialogActions,
  DialogContent,
  Button,
  DialogContentText,
  AppBar,
  Toolbar,
  IconButton,
  CircularProgress,
  Slide,
  Transitions,
} from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import React, { useState } from "react";
import CloseCircle from "public/images/offers/close-drawer.png";
import { useSelector } from "react-redux";
import StripeCheckout from "../StripeCheckout/StripeCheckout";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 5,

  "@media screen and (max-width:1120px)": {
    top: "50%",
    paddingBottom: "10%",
    width: "700px",
    margin: "20px",
    left: "40%",
    maxHeight: "600px",
  },
  "@media screen and (min-width:1220px) and  (max-width:1420px)": {
    top: "60%",
    paddingBottom: "5%",
    maxHeight: "600px",
    overflowY: "scroll",
    width: "800px",
    "&::-webkit-scrollbar": {
      width: "12px",
    },
  },
  "@media screen and (min-width:1520px)": {
    top: "60%",
    paddingBottom: "5%",
    maxHeight: "600px",
    overflowY: "scroll",
    width: "900px",
    "&::-webkit-scrollbar": {
      width: "12px",
    },
  },
};
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CheckoutModal({ handleClose, open, clientSecret }) {
  const theme = useTheme();

  const { loading } = useSelector((state) => state.checkout);


  return (
    <Dialog
      fullScreen
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      className="mt-20"
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton edge="end" onClick={handleClose} color="inherit">
            <Image src={CloseCircle} alt="" width={20} height={20} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <DialogContent>
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <CircularProgress className="xl:w-56 " />
          </div>
        ) : (
          <StripeCheckout clientSecret={clientSecret} />
        )}
      </DialogContent>
    </Dialog>
    // <Modal
    //   disablePortal
    //   disableEnforceFocus
    //   disableAutoFocus
    //   aria-labelledby="transition-modal-title"
    //   aria-describedby="transition-modal-description"
    //   open={open}
    //   onClose={handleClose}
    //   closeAfterTransition
    //   slotProps={{
    //     backdrop: {
    //       timeout: 500,
    //     },
    //   }}
    // >
    //   <Box sx={{ ...style }}>
    //     {loading ? (
    //      <div className="w-full m-auto ">
    //        <CircularProgress />
    //      </div>
    //     ) : (
    //       <StripeCheckout clientSecret={clientSecret} />
    //     )}
    //   </Box>
    // </Modal>
  );
}
