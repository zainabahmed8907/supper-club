import { Modal, Box, TextField, Snackbar, Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CloseIcon from "public/images/offers/close-drawer.png";
import Image from "next/image";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { usePathname } from "next/navigation";

// import {
//   Unstable_NumberInput as BaseNumberInput,
//   numberInputClasses,
// } from '@mui/base/Unstable_NumberInput';

import dayjs, { Dayjs } from "dayjs";
import { sendFormValues } from "@/store/reducers/offer.slice";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "@/lib/useDebounce";
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
  borderRadius: 3,

  "@media screen and (max-width:1220px)": {
    width: "570px",
    marginInline: "30px",
    left: "42%",
    top: "50%",
    maxHeight: "480px",
    overflowY: "scroll",

    "&::-webkit-scrollbar": {
      width: "8px !important",
    },
  },
  "@media screen and (max-width:620px)": {
    width: "370px",
    marginInline: "30px",
    left: "42%",
    top: "50%",
    maxHeight: "480px",
    overflowY: "scroll",

    "&::-webkit-scrollbar": {
      width: "8px !important",
    },
  },
  "@media screen and (max-width:380px)": {
    width: "340px",
    marginInline: "30px",
    left: "42%",
    top: "50%",
    maxHeight: "480px",
    overflowY: "scroll",

    "&::-webkit-scrollbar": {
      width: "8px !important",
    },
  },
  "@media screen and (min-width:1320px)": {
    width: "580px",
    margin: "20px",
    left: "50%",
    paddingBottom: "4%",
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
    borderRadius: 8, // Adjust the value to your preference
  },
  input: {
    borderRadius: "8px",
  },
}));

function BookingModal({
  handleClose,
  open,
  availableTime,
  handleConfirmationModalOpen,
  offer_id,
  amount,
  resceduleTime,
  bookings,
  disabledDay,
}) {
  const classes = useStyles();
  const rootRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    kids: "",
    endTime: "",
    members: 1,

    offer: offer_id,
  });
  const updateBookingFormData = {
    endDate: selectedDate,
    endTime: formData.endTime,
  };

  const path = usePathname();
  const [selectedTimeID, setSelectedTimeID] = useState(null);
  const [bookingUpdateAlert, setBookingUpdateAlert] = useState(false);
  const [bookingUpdateFailedAlert, setBookingUpdateFailedAlert] =
    useState(false);

  const [bookingUpdateFailedMsg, setBookingUpdateFailedMsg] = useState(false);

  const { offer, kids, members, endTime, endDate } = useSelector(
    (state) => state.offer
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const isSubmitDisabled = Object.values(formData).every(
    (value) => value === ""
  );

  const isSubmitUpdateDisabled = Object.values(updateBookingFormData).some(
    (value) => value === ""
  );

  const kidsCount = useDebounce(formData.kids, 1000);

  const membersCount = useDebounce(formData.members, 1000);

  const bookingId = localStorage.getItem("bookingID");

  let booking_cost = useMemo(() => {
    let bookingCost;
    if (parseInt(kidsCount) > 0) {
      bookingCost = (parseInt(kidsCount) + parseInt(membersCount)) * amount;
    } else {
      bookingCost = parseInt(membersCount) * amount;
    }
    return bookingCost;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [membersCount, kidsCount]);



  const disabledDays = disabledDay?.map(day => day?.attributes?.Title);

  const shouldDisableDate = (date) => {
    const dayName = dayjs(date).format('dddd');
    return !disabledDays?.includes(dayName); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();

    handleConfirmationModalOpen();
    dispatch(
      sendFormValues({
        offer: offer_id,
        kids: kidsCount,
        members: membersCount,
        endTime: formData.endTime,
        endDate: selectedDate,
        booking_cost: booking_cost,
      })
    );
  };

  const handleBookingUpdate = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const response = await axiosInstance.patch(`/booking/${bookingId}`, {
          endDate: selectedDate,
          endTime: formData.endTime,
        });
        const data = response.data;
        if (response.status == 200) {
          setTimeout(() => {
            handleClose();
          }, 4000);
          setBookingUpdateAlert(true);
          bookings();
          localStorage.removeItem("bookingID");
        }
        return data;
      } catch (e) {
        setBookingUpdateFailedAlert(true);
        setBookingUpdateFailedMsg(e?.response?.data?.message);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bookingId, formData.endTime, selectedDate]
  );
  const handleBooking = (e) => {
    if (path == "/bookings") {
      handleBookingUpdate(e);
    } else {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTimeSlotClick = (itemId) => {
    setSelectedTimeID(itemId);
  };

  useEffect(() => {
    if (
      members?.length > 0 ||
      members > 0 ||
      (kids?.length > 0 && endDate.length)
    ) {
      setFormData({
        ...formData,
        kids: kids,
        members: members,
        offer: offer,
        endTime: endTime,
      });
    }

    //setSelectedDate(dayjs(endDate).format("YYYY-MM-DD").toString());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members, kids]);

  return (
    <>
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
          {bookingUpdateAlert && (
            <Alert severity="success" className="mb-2">
              Booking Updated successfully
            </Alert>
          )}
          {bookingUpdateFailedAlert && (
            <Alert severity="error" className="mb-2">
              {bookingUpdateFailedMsg}
            </Alert>
          )}
          <div className="flex justify-between">
            {path == "/bookings" ? (
              <p className="text-2xl font-medium">Choose a new date & time</p>
            ) : (
              <p className="text-2xl font-medium">Offer Booking</p>
            )}
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

          <div>
            <form
              className="mt-8 lg:max-h-80 2xl:max-h-96 overflow-y-auto overflow-x-hidden"
              onSubmit={handleBooking}
            >
              <div className="lg:flex justify-between lg:pr-5">
                {path !== "/bookings" && (
                  <div>
                    <label htmlFor="members" className="text-base font-bold">
                      Members
                    </label>
                    <br />
                    <input
                    type="number"
                      name="members"
                      defaultValue={1}
                      value={formData.members}
                      onChange={handleInputChange}
                      placeholder="Enter members count"
                      className="border border-secondary50
                       p-3 lg:w-[14.7rem] 3xl:w-[18.3rem] 4xl:w-[17.6rem]  w-full mt-2 rounded-lg bg-secondary"
                    />
                  </div>
                )}

                {path !== "/bookings" && (
                  <div className="mt-4 lg:mt-0">
                    <label className="text-base font-bold" htmlFor="kids">
                      Kids (6-12 years)
                    </label>
                    <br />
                    <input
                      type="number"
                      value={formData.kids}
                      onChange={handleInputChange}
                      name="kids"
                      placeholder="Enter kids count"
                      className="border border-secondary50 p-3 lg:w-[14.7rem] 3xl:w-[18.3rem] 4xl:w-[17.6rem] w-full
                       mt-2 rounded-lg bg-secondary"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-8 flex-wrap">
                <div className={path == "/bookings" && "-mt-4"}>
                  <label className="text-base font-bold ">Select Date</label>
                  <br />

                
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      name="endDate"
                      value={selectedDate}
                      disablePast
                      onChange={(e) => {
                        setSelectedDate(dayjs(e)?.format("YYYY-MM-DD"));
                      }}
                      shouldDisableDate={shouldDisableDate}
                    
                  
                      sx={{
                        "& .MuiInputBase-input": {
                          padding: 0,
                        },
                        "& .MuiOutlinedInput-root   ": {
                          borderRadius: "8px !important",
                          backgroundColor: "#F9FAFA",
                          padding: "13px !important",
                          marginTop: ".5rem",
                          width: path == "/bookings" ? "32.5rem" : "15rem",
                        },
                        "& .MuiPickersDay-root.selected ": {
                          border: "none !important",
                          background: "#C39D630",
                        },
                        "@media screen and (max-width:1280px)": {
                          "& .MuiOutlinedInput-root   ": {
                            width: "100%",
                            minWidth:"31.8rem"
                          },
                        },
                        "@media screen and (max-width:620px)": {
                          "& .MuiOutlinedInput-root   ": {
                            width: "100%",
                            minWidth:"19.5rem"
                          },
                        },
                        "@media screen and (max-width:380px)": {
                          "& .MuiOutlinedInput-root   ": {
                            width: "100%",
                            minWidth:"17.5rem"
                          },
                        },
                        "@media screen and (min-width:1420px)": {
                          "& .MuiOutlinedInput-root   ": {
                            width: "31.5rem",
                          },
                        },
                        "@media screen and (min-width:1720px)": {
                          "& .MuiOutlinedInput-root   ": {
                            width: "37.4rem",
                          },
                        },
                      }}
                      renderInput={(params) => (
                        <TextField {...params} helperText={null} />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </div>

              <div className="flex justify-between mt-8 items-center">
                <p className="text-base font-bold">Select Time</p>
                <p className="text-xs text-textMain font-normal lg:pr-10 xl:pr-5">
                  Times are in Asia/Dubai
                </p>
              </div>

              <div className="flex flex-wrap ">
                {availableTime?.length > 0 ?
                  availableTime?.map((availableTime) => {
                    const defaultTime = availableTime?.Time;

                    return (
                      <input
                        value={dayjs(availableTime?.Time, "HH:mm:ss").format(
                          "h:mm A"
                        )}
                        key={availableTime?.id}
                        defaultValue={defaultTime}
                        name="endTime"
                        className={`lg:w-[10.15rem] xs:w-[5.9rem] w-[8rem]
                      3xl:w-[12.4rem] 4xl:w-[12.27rem] rounded-lg border  p-3 mr-1  mt-6 cursor-pointer text-center ${
                        selectedTimeID === availableTime?.id ||
                        defaultTime == endTime
                          ? "bg-[#FCFAF7] text-dark border-tableBorder"
                          : "bg-white border-[#E0E1E1]"
                      }`}
                        onClick={() => {
                          handleTimeSlotClick(availableTime?.id);
                          setFormData((prevData) => ({
                            ...prevData,
                            endTime: availableTime.Time,
                          }));
                        }}
                      />
                    );
                  }):<div className="flex justify-center my-4"><p className="lg:text-lg text-base text-center font-bold">No Time Available for 
                  this Offer, book another one! </p></div>}
                {resceduleTime?.length > 0 &&
                  resceduleTime?.map((availableTime) => (
                    <input
                      value={dayjs(availableTime?.Time, "HH:mm:ss").format(
                        "h:mm A"
                      )}
                      key={availableTime?.id}
                      defaultValue={dayjs(
                        availableTime?.Time,
                        "HH:mm:ss"
                      ).format("h:mm A")}
                      name="endTime"
                      className={`lg:w-[8.15rem] 
                 2xl:w-[10.4rem] 4xl:w-[12.27rem] rounded-lg border  p-3 mr-1  mt-6 cursor-pointer ${
                   selectedTimeID === availableTime?.id
                     ? "bg-[#FCFAF7] text-dark border-tableBorder"
                     : "bg-white border-[#E0E1E1]"
                 }`}
                      onClick={() => {
                        handleTimeSlotClick(availableTime?.id);
                        setFormData((prevData) => ({
                          ...prevData,
                          endTime: availableTime.Time,
                        }));
                      }}
                    />
                  ))}
              </div>

              <div className="lg:mt-12 mt-5 md:flex justify-between items-center pr-2">
                {path == "/bookings" ? (
                  <button
                    type="button"
                    className={`border-solid border border-primary bg-white mr-3 ${
                      path == "/bookings"
                        && "xl:w-[15rem] 4xl:w-[16.6rem]"
                        
                    } rounded-3xl p-3 text-black transition duration-300 hover:bg-buttonHover hover:text-white
                    xl:w-[15rem] 4xl:w-[16.6rem] w-48 sm:w-76
                    `}
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                ) : (
                  <p className="text-base font-bold">
                    Booking Cost:{booking_cost}
                    AED
                  </p>
                )}
                <button
                  type="submit"
                  className={`border-none  ${
                    !isSubmitDisabled ? "bg-primary" : "bg-primaryDisabled"
                  }
                  ${
                    !isSubmitUpdateDisabled
                      ? "bg-primary"
                      : "bg-primaryDisabled"
                  } ${
                    path == "/bookings" 
                      ? "xl:w-[15rem]  4xl:w-[16.6rem]"
                      : "xl:w-[15rem] 4xl:w-[16.6rem] w-full sm:w-56 mt-4 lg:mt-0"
                  } rounded-3xl lg:p-3 p-2 ${"text-white"} cursor-pointer`}
                  disabled={
                    path == "/bookings"
                      ? isSubmitUpdateDisabled
                      : isSubmitDisabled
                  }
                >
                  {path == "/bookings" ? "Update " : "Book Now"}
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
}
export default BookingModal;
