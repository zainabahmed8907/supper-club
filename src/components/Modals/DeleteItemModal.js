import { Box, Button, Modal, Slide, Slider } from "@mui/material";
import React, { useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import CloseCircle from "public/images/offers/close-drawer.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import axiosInstance from "@/store/services/config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: 5,

  "@media screen and (max-width:1120px)": {
    paddingBottom: "10%",
    width: "400px",
    margin: "20px",
    left: "40%",
  },
};
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5.5rem",
    borderRadius: 8, // Adjust the value to your preference
  },
  container: {
    display: "flex",
    gap: theme.spacing(1),
  },
  inputBox: {
    width: "64px",
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  input: {
    borderRadius: "8px",
  },
}));

export default function DeleteItemModal({
  handleClose,
  open,
  image,
  deleteFavOffer,
  id,
  cancelBooking
}) {
  const rootRef = React.useRef(null);

  const classes = useStyles();
  const path = usePathname();
  return (
    <div>
      <Modal
        className={`xl: 2xl:h-40${classes.modal}`}
        disablePortal
        disableEnforceFocus
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        container={() => rootRef.current}
        closeAfterTransition
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Box sx={{ ...style, width: 464 }}>
          <div className="flex justify-end cursor-pointer">
            <Image src={CloseCircle} alt="" onClick={handleClose} />
          </div>
          <div className="flex justify-center items-center">
            <Image src={image} alt="delete" width={400} height={200} />
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
                  deleteFavOffer(id);
                } else {
                  cancelBooking();
                }
              }}
            >
              Confirm
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
