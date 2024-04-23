import { SwipeableDrawer, Box, TextField, Snackbar } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import axiosInstance from "@/store/services/config";

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
    width: '100%',
    height: "90%", // Set the height of the drawer to cover the entire viewport
  },
}));

function RescheduleDrawerMobile({
  open,
  toggleDrawer,
  rescheduleTime,
  bookings,
  handleClose,
  disabledDay
}) {
  const classes = useStyles();

  const [bookingUpdateAlert, setBookingUpdateAlert] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    endTime: "",
  });
  const updateBookingFormData = {
    endDate: selectedDate,
    endTime: formData.endTime,
  };
  const isSubmitUpdateDisabled = Object.values(updateBookingFormData).some(
    (value) => value === ""
  );
  const bookingId = localStorage.getItem("bookingID");
  const [selectedTimeID, setSelectedTimeID] = useState(null);


  //   const days=offer_detail?.data?.data[0]?.attributes?.days?.data;

  //     const disabledDays =
  //     disabledDay.length > 0 && disabledDay?.map((day) => day.id);
  //   const restrictDay = (date) => {
  //       return disabledDays?.some((day) => day == dayjs(date).day());
  //     };
  const handleBookingUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.patch(`/booking/${bookingId}`, {
        endDate: selectedDate,
        endTime: formData.endTime,
      });
      const data = response.data;
      if (response.status == 200) {
        setBookingUpdateAlert(true);
        bookings();
        localStorage.removeItem("bookingID");
        handleClose()
      }
      return data;
    } catch (e) {
      throw e;
    }
  };

  
  const handleTimeSlotClick = (itemId) => {
    setSelectedTimeID(itemId);
  };


  const disabledDays = disabledDay?.map(day => day?.attributes?.Title);

  const shouldDisableDate = (date) => {
    const dayName = dayjs(date).format('dddd');
    return !disabledDays?.includes(dayName); // Check if the day is included in the disabled days array
  };



  return (
    <SwipeableDrawer
      open={open}
      variant="persistent"
      anchor="bottom"
      onOpen={() => console.log()}
      onClose={toggleDrawer}
      className="w-[25.5rem] h-[70%]"
      classes={{
        paper: classes.drawerPaper,
      }}
      sx={{
        "& .MuiDrawer-paper": {
          maxWidth: "100vw",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
          maxHeight:"70%",
          overflow:"scroll"
        },
      }}
    >
      <Snackbar
        open={bookingUpdateAlert}
        autoHideDuration={6000}
        message="Booking Updated"
      />

      <Puller onClick={toggleDrawer} />

      <Box>
        <div className="h-18 bg-[#F9FAFA] p-4">
          <p className="text-[15px] font-medium">Choose a new date & time</p>
        </div>
        <form
          className="mt-8 lg:max-h-80 2xl:max-h-96 overflow-y-auto overflow-x-hidden"
          onSubmit={handleBookingUpdate}
        >
          <div className="flex justify-between mt-8 flex-wrap">
            <div className={"-mt-4"}>
              <label className="text-base font-bold pl-4">Select Date</label>
              <br />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                className="pl-4 xss:w-[25.4rem] xs:w-[28.7rem]"
                  name="endDate"
                  value={selectedDate}
                  disablePast
                  onChange={(e) => {
                    setSelectedDate(dayjs(e).format("YYYY-MM-DD"));
                  }}
                  //shouldDisableDate={restrictDay}
                  sx={{
                    "& .MuiInputBase-input": {
                      padding: 0,
                    },
                    "& .MuiOutlinedInput-root   ": {
                      borderRadius: "8px !important",
                      backgroundColor: "#F9FAFA",
                      padding: "13px !important",
                      marginTop: ".5rem",
                      maxWidth:"88%"
                    },
                    "& .MuiPickersDay-root.selected ": {
                      border: "none !important",
                      background: "#C39D630",
                    },
                   
                  }}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              </LocalizationProvider>
            </div>
          </div>

          <div className="flex justify-between mt-8 items-center p-4">
            <p className="text-base font-bold">Select Time</p>
            <p className="text-xs text-textMain font-normal lg:pr-10 xl:pr-5">
              Times are in Asia/Dubai
            </p>
          </div>

          <div className="flex gap-2 flex-wrap h-auto pl-4">
            {rescheduleTime?.length > 0 &&
              rescheduleTime?.map((availableTime) => (
                <input
                  value={dayjs(availableTime?.Time, "HH:mm:ss").format(
                    "h:mm A"
                  )}
                  key={availableTime?.id}
                  defaultValue={dayjs(availableTime?.Time, "HH:mm:ss").format(
                    "h:mm A"
                  )}
                  name="endTime"
                  className={`xss:w-[6.7rem] xs:w-[12.2rem] rounded-lg border text-center  p-3 mr-1  mt-6 cursor-pointer ${
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

          <div className="mt-12 flex justify-between items-center pr-2 pl-4">
            <button
              type="button"
              className={`border-2 bg-white border-primary  mr-3
               w-[10.75rem]
               rounded-3xl p-3 text-black transition duration-300 hover:bg-buttonHover hover:text-white`}
              onClick={handleClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`border-none  bg-primary   w-[10.75rem]
              rounded-3xl p-3 text-white
                  ${
                    !isSubmitUpdateDisabled
                      ? "bg-primary"
                      : "bg-primaryDisabled"
                  } `}
              disabled={isSubmitUpdateDisabled}
            >
              Update
            </button>
          </div>
        </form>
      </Box>
    </SwipeableDrawer>
  );
}
export default RescheduleDrawerMobile;
