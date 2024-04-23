import { Modal, Box, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRef } from "react";
import CloseIcon from "public/images/offers/close-drawer.png";
import Image from "next/image";
import UserImg from "/public/images/dashboard/user.svg";
import PhoneImg from "/public/images/dashboard/call.svg";
import SMSimg from "/public/images/dashboard/sms.svg";
import HomeImg from "/public/images/dashboard/home-2.svg";

import dayjs from "dayjs";
import { useSelector } from "react-redux";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,

  "@media screen and (max-width:1320px)": {
    paddingBottom: "10%",
    width: "400px",
    margin: "20px",
    left: "50%",
    maxHeight: "26rem",
    overflowY: "scroll",
  },

  "@media screen and (max-width:1620px)": {
    width: "480px",
    margin: "20px",
    left: "50%",
    maxHeight: "34rem",
    overflowY: "scroll",
  },
  "@media screen and (min-width:1720px)": {
    paddingBottom: "4%",
    width: "680px",
    margin: "20px",
    left: "50%",
    maxHeight: "44rem",
    overflowY: "scroll",
  },
};
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5.5rem",
    borderRadius: 8,
  },
  input: {
    borderRadius: "8px",
  },
}));
function BookingDetailsModal({ open, handleClose, bookingdetails }) {
  const classes = useStyles();
  const rootRef = useRef(null);
  const { user } = useSelector((state) => state?.user);

  return (
    <Modal
      className={`mt-10 ${classes.modal}`}
      disablePortal
      disableEnforceFocus
      disableAutoFocus
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
      <Box sx={{ ...style, width: 582, maxHeight: 1000 }}>
        <div className="flex justify-between">
          <p className="text-2xl font-medium">Booking Details</p>

          <div onClick={handleClose} className="cursor-pointer">
            <Image src={CloseIcon} alt="close" width={20} height={20} />
          </div>
        </div>
        <div className="mt-8">
          <div className="flex items-center font-normal pb-4">
            <p className="text-base pr-3 font-bold">Order ID:</p>
            <p className="text-sm">{bookingdetails[0]?.id}</p>
          </div>
          <div className="flex items-center font-normal pb-4">
            <p className="text-base pr-3 font-bold">Start Date:</p>
            <p className="text-sm">
              {dayjs(bookingdetails[0]?.startDate).format("DD/MM/YYYY")}
              <span className="pr-2"> {bookingdetails[0]?.startTime}</span>
            </p>
          </div>

          <div className="flex items-center font-normal">
            <p className="text-base pr-3 font-bold">Status:</p>
            <p className="text-sm text-textMain">{bookingdetails[0]?.status}</p>
          </div>
        </div>

        <div className="mt-5 4xl:min-w-[25.7rem] 2xl:min-w-[20.5rem] min-h-[20.9rem] border-solid border border-secondary50 block m-auto rounded-lg">
          <div className="flex w-full  border-solid border-b  border-secondary50 items-center ">
            <div className="py-[20px] 2xl:px-[12px]   border-solid  border-r border-secondary50">
              <p className="text-sm xl:w-[14.9rem] 4xl:w-[20.9rem] block text-primary">
                <span className="font-bold text-dark">Item</span> <br />
                {bookingdetails[0]?.offer}
              </p>
            </div>
            <div className="flex justify-end w-full">
              <p className="pt-[20px] pr-[12px] pb-[20px] pl-[20px] text-textMain text-sm font-medium">
                {bookingdetails[0]?.offerPoints} AED
              </p>
            </div>
          </div>

          <div className="flex w-full border-solid border-b border-secondary50">
            <div className="py-[20px] px-[12px]  border-solid border-r border-secondary50 ">
              <p className="text-sm font-bold xl:w-[14.9rem] 4xl:w-[20.9rem] block ">
                Subtotal
              </p>
            </div>
            <div className="flex justify-end w-full">
              <p className="pt-[20px] pr-[12px] pb-[20px] pl-[20px] text-textMain text-sm font-medium">
                {bookingdetails[0]?.subPoints} AED
              </p>
            </div>
          </div>

          <div className="flex w-full border-solid border-b border-secondary50">
            <div className="py-[20px] px-[12px]  border-solid border-r border-secondary50 ">
              <p className="text-sm font-bold xl:w-[14.9rem] 4xl:w-[20.9rem] block ">
                VAT
              </p>
            </div>
            <div className="flex justify-end w-full">
              <p className="pt-[20px] pr-[12px] pb-[20px] pl-[20px] text-textMain text-sm font-medium">
                {" "}
                {bookingdetails[0]?.vat} AED
              </p>
            </div>
          </div>

          <div className="flex w-full border-solid border-b border-secondary50">
            <div className="py-[20px] px-[12px]  border-solid border-r border-secondary50 ">
              <p className="text-sm font-bold xl:w-[14.9rem] 4xl:w-[20.9rem] block ">
                Booking Credit Used
              </p>
            </div>
            <div className="flex justify-end w-full">
              <p className="pt-[20px] pr-[12px] pb-[20px] pl-[20px] text-textMain text-sm font-medium">
                {bookingdetails[0]?.creditsUsed} AED
              </p>
            </div>
          </div>

          <div className="flex w-full border-solid border-b border-secondary50">
            <div className="py-[20px] px-[12px]  border-solid border-r border-secondary50 ">
              <p className="text-sm font-bold xl:w-[14.9rem] 4xl:w-[20.9rem] block ">
                Total
              </p>
            </div>
            <div className="flex justify-end w-full">
              <p className="pt-[20px] pr-[12px] pb-[20px] pl-[20px] text-textMain text-sm font-medium">
                {" "}
                {bookingdetails[0]?.totalPoints} AED
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-[25.6rem]  pt-6">
          <p className="bg-secondary text-base font-bold pl-3 py-2">
            Member Details
          </p>
        </div>

        <div className="min-w-[25.6rem]  mt-6">
          <div className="flex justify-between">
            <div className="text-base pb-2 flex items-center">
              <Image src={UserImg} alt="user" width={20} height={20} />
              <p className="pl-2">{user?.fullName}</p>
            </div>
            {user?.phone && (
              <div className="flex items-center">
                <Image src={PhoneImg} alt="user" width={20} height={20} />

                <p className="pl-2">{user?.phone}</p>
              </div>
            )}
          </div>

          {user?.email && (
            <div className="flex items-center pb-2">
              <Image src={SMSimg} alt="user" width={20} height={20} />

              <p className="text-base pl-2">{user?.email}</p>
            </div>
          )}

          {user?.apartment && (
            <div className="flex items-center">
              <Image src={HomeImg} alt="user" width={20} height={20} />

              <p className="text-base pl-2">{user?.apartment}</p>
            </div>
          )}
        </div>
      </Box>
    </Modal>
  );
}

export default BookingDetailsModal;
