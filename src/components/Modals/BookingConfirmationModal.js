import { Modal, Box, TextField, Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRef, useState } from "react";
import {  useSelector } from "react-redux";
import CloseIcon from "public/images/offers/close-drawer.png";
import Image from "next/image";
import BackIcon from "public/images/offerDetails/back-icon.svg";
import BookingCreditsIccon from "public/images/offerDetails/booking-credits.svg";
import BitCoinCardIcon from "public/images/offerDetails/bitcoin-card.svg";
import okIcon from "public/images/offerDetails/ok.svg";
import axiosInstance from "@/store/services/config";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "24px",

  "@media screen and (max-width:1220px)": {
    width: "570px",
    marginInline: "30px",
    left: "42%",
    top: "50%",
    maxHeight: "400px",
    overflowY: "scroll",

    "&::-webkit-scrollbar": {
      width: "8px !important",
    },
  },
  "@media screen and (max-width:620px)": {
    width: "370px",
    margin: "20px",
    left: "44%",
    top: "50%",
    maxHeight: "400px",
    "&::-webkit-scrollbar": {
      width: "8px !important",
    },
  },
  "@media screen and (min-width:1320px)": {
    width: "580px",
    margin: "20px",
    left: "50%",
    paddingBottom: "3%",
    maxHeight: "34rem",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "2px !important",
    },
  },
  "@media screen and (min-width:1720px)": {
    width: "670px",
    margin: "20px",
    left: "50%",
    paddingBottom: "3%",

    maxHeight: "44rem",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "2px !important",
    },
  },
};
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5.5rem",
    borderRadius: 22, // Adjust the value to your preference
  },
  input: {
    borderRadius: "8px",
  },
}));

function BookingConfirmationModal({
  handleClose,
  open,
  handleBookingModal,
  amount,
}) {
  const classes = useStyles();
  const rootRef = useRef(null);
  const [paymentType, setPaymentType] = useState("");

  const { kids, endTime, endDate, offer, members, booking_cost } = useSelector(
    (state) => state.offer
  );

  const { user } = useSelector((state) => state.user);
  const route = useRouter();

  const isSubmitDisabled = paymentType == "";
  const walletPoints = user?.wallet?.points;
  const [passed, setPassed] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingfailed, setbookingFailed] = useState(false);
  const [failedMesg, setFailedMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const postBooking = async (data) => {
    setLoading(true);

    const bookingData = await axiosInstance
      .post(`/booking`, {
        offer: data.offer,
        endDate: data.endDate,
        members: data.members,
        kids: data.kids,
        endTime: data.endTime,
        paymentType: paymentType,
      })
      .then((response) => {
        if (response?.status == 201) {
          setBookingConfirmed(true);
        setTimeout(() => {
            handleClose();
          }, 4000);
        }

        setTimeout(() => {
          route.push(`/offers/booked_offer/${response?.data?.data?.id}`);
        }, 2800);

        return response;
      })
      .catch((err) => {
        setbookingFailed(true);
        setFailedMsg(err?.response?.data?.message);
      });
    setLoading(false);

    return bookingData;
  };

  const bookOffer = () => {
    if (booking_cost < walletPoints) {
      postBooking({
        kids: parseInt(kids),
        endTime: endTime,
        endDate: endDate,
        offer: offer,
        members: parseInt(members),
      });
    } else {
      setPassed(true);
    }
  };

  return (
    <Modal
      className={`2xl:h-40${classes.modal}`}
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
      <Box sx={{ ...style, width: 564 }}>
        {passed && (
          <Alert severity="error" className="mb-4">
            You do not have enough credits to book this offer
          </Alert>
        )}
        {bookingConfirmed && (
          <Alert severity="success" className="mb-4">
            Offer Purchased Successfully
          </Alert>
        )}
        {bookingfailed && (
          <Alert severity="error" className="mb-4">
            {failedMesg}
          </Alert>
        )}
        <div className="flex justify-between">
          <div className="flex">
            <Image
              src={BackIcon}
              alt="back icon"
              width={40}
              height={20}
              className="cursor-pointer mr-2"
              onClick={() => {
                handleBookingModal();
                handleClose();
              }}
            />
            <p className="lg:text-2xl 4xl:text-3xl text-textMain font-medium">
              Select Method
            </p>
          </div>
          <div>
            <Image
              src={CloseIcon}
              alt="close-icon"
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={handleClose}
            />
          </div>
        </div>

        <div className="pt-8">
          <p className="lg:text-base 4xl:text-lg text-textMain">
            Please select a payment method to continue booking
          </p>
        </div>

        <div className="pt-4">
          <div
            id="card"
            className={`flex justify-between items-center p-5 ${
              paymentType == "card" ? "bg-[#FCFAF7]" : "bg-white"
            } rounded-xl cursor-pointer`}
            onClick={() => setPaymentType("card")}
          >
            <div className="flex">
              <Image
                src={BitCoinCardIcon}
                alt="close-icon"
                width={34}
                height={34}
                className="cursor-pointer pr-3"
              />
              <p className="lg:text-base 4xl:text-lg text-textMain font-bold">
                PAY BY CARD
              </p>
            </div>
            <div>
              <Image
                src={okIcon}
                alt="ok"
                width={25}
                height={25}
                className={`${paymentType == "card" ? `block` : `hidden`}`}
              />
            </div>
          </div>

          <div
            id="credits"
            className={`flex justify-between items-center p-5 ${
              paymentType == "credits" ? "bg-[#FCFAF7]" : "bg-white"
            } rounded-xl cursor-pointer`}
            onClick={() => setPaymentType("credits")}
          >
            <div className="flex">
              <Image
                src={BookingCreditsIccon}
                alt="close-icon"
                width={34}
                height={34}
                className="cursor-pointer pr-3"
              />
              <p className="lg:text-base 4xl:text-lg text-textMain  font-bold">
                PAY BY BOOKING CREDITS
              </p>
            </div>
            <div>
              <Image
                src={okIcon}
                alt="ok"
                width={25}
                height={25}
                className={`${paymentType == "credits" ? `block` : `hidden`}`}
              />
            </div>
          </div>
          <p>{paymentType !== "credits"}</p>
          <div className="pt-10  flex justify-between items-center ">
            <p className="text-base font-bold">
              Booking Cost: {booking_cost} AED
            </p>
            <button
              onClick={() => {
                (paymentType == "credits" || paymentType == "card") &&
                  bookOffer();
              }}
              type="button"
              disabled={isSubmitDisabled || loading}
              className={`border-none ${
                !isSubmitDisabled ? "bg-primary" : "bg-primaryDisabled"
              }  rounded-3xl lg:px-16 md:px-16 px-6 py-3 text-white transition duration-300 hover:bg-buttonHover`}
            >
              {loading ? (
                <CircularProgress size={20} style={{ color: "#fff" }} />
              ) : (
                "Confirm"
              )}
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
export default BookingConfirmationModal;
