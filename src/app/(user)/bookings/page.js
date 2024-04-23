"use client";
import PreviousBookings from "@/components/PreviousBookings/PreviousBookings";
import UpcomingBookingMobileView from "@/components/UpcomingBookingMobileView/UpcomingBookingContainer";
import UpcomingBookings from "@/components/UpcomingBookings/UpcomingBookings";
import { Alert, Tab, Tabs } from "@mui/material";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Loading from "./loading";
import { useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "@/store/services/config";
import BookingDetailsModal from "@/components/Modals/BookingDetailsModal";
import BookingModal from "@/components/Modals/BookingModal";
import DeleteItemModal from "@/components/Modals/DeleteItemModal";
import CancelBookingImage from "public/images/dashboard/cancel-booking.svg";
import { getBookings } from "@/store/services/booking.service";

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

export default function Bookings() {
  const [value, setValue] = useState("0");
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const router = useRouter();

  const params = useSearchParams();
  const booking_type = params.get("type");
  const bookingID = localStorage.getItem("bookingID");
  const slug = localStorage.getItem("offer_slug");
  const bookingRescheduleTitle = localStorage.getItem("bookingRescheduleSlug");
  const bookingSlug =
    bookingRescheduleTitle?.length > 0 &&
    bookingRescheduleTitle
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [previousBookings, setPreviousBookings] = useState([]);
  const [rescedulemodalOpen, setresceduleModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [bookingDetailsModalOpen, setBookingDetailsModalOpen] = useState(false);
  const [rescheduleTime, setRescheduleTime] = useState([]);
  const [disabledDay, setDisabledDay] = useState([]);
  const handleResceduleModalOpen = () => setresceduleModalOpen(true);
  const handleRescheduleModalClose = () => setresceduleModalOpen(false);
  const handleCancelModalOpen = () => setCancelModalOpen(true);
  const handleCancelModalClose = () => setCancelModalOpen(false);
  const handleBookingDetailsModalOpen = () => setBookingDetailsModalOpen(true);
  const handleBookingDetailsModalClose = () =>
    setBookingDetailsModalOpen(false);
  const [pageSize, setPageSize] = useState(1);
  const [pageNo, setPageNo] = useState(1);

  const [limit, setLimit] = useState(8);

  const containerRef = useRef();

  const bookings = async () => {
    const book = await getBookings(booking_type, pageSize, limit, pageNo);
    setUpcomingBookings(book?.data);
    setPreviousBookings(book?.data);
  };


  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = containerRef.current;

    // Check if user has scrolled to the bottom
    if (scrollTop + clientHeight >= scrollHeight) {
      if (pageNo <= upcomingBookings?.length) {
        setPageNo((prevPage) => prevPage + 1);
        setLimit((prev) => prev + 1);
        setPageSize((prev) => prev + 1);
      }
    }
  };

  //get offer details
  const getOffer = async () => {
    try {
      const offer = await axiosInstance.get(`/offer?slug=${bookingSlug}`);
      const data = offer.data;
      setRescheduleTime(data?.data?.data[0]?.attributes?.AvailableTime);
      setDisabledDay(data?.data?.data[0]?.attributes?.days?.data);

      return data;
    } catch (e) {
      console.log("error while fetching offer details", e);
    }
  };

  //delete Bookings
  const deleteBooking = useCallback(async () => {
    try {
      const response = await axiosInstance.delete(`/booking/${bookingID}`);

      const data = response.data;
      if (response.status == 200) {
        handleCancelModalClose();
        bookings();
        setShowSnackbar(true);
        setTimeout(() => {
          setShowSnackbar(false);
        }, 4000);

        localStorage.removeItem("bookingID");
      }

      return data;
    } catch (e) {
      throw e;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingID]);

  const bookingDetails = upcomingBookings?.filter(
    (booking) => booking?._id == bookingID
  );

  useEffect(() => {
    bookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteBooking, pageSize, limit, pageNo]);

  useEffect(() => {
    if (bookingSlug?.length > 0) {
      getOffer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingSlug]);


  return (
    <div className=" xl:ml-4    lg:w-11/12   lg:flex-row pb-10 ">
      {showSnackbar && (
        <Alert severity="success" className="mt-2 mb-2">
          Booking Cancelled successfully
        </Alert>
      )}

      <div className=" flex lg:flex-row lg:mx-4 mx-8 sticky pb-6 mt-10 scroll-smooth scroll appearance-none overflow-x-auto">
        <Tabs
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
            label="UPCOMING BOOKINGS"
            wrapped
            className="text-base font-medium"
            onClick={() => router.replace("/bookings?type=upcoming")}
          />
          <Tab
            value="1"
            label="PREVIOUS BOOKINGS"
            className="text-base font-medium"
            onClick={() => router.replace("/bookings?type=previous")}
          />
        </Tabs>
      </div>

      <TabPanel value={value} index={"0"}>
        <div className="lg:block hidden">
          <Suspense fallback={<Loading />}>
            <UpcomingBookings
              upcomingBookings={upcomingBookings}
              handleBookingDetailsModalOpen={handleBookingDetailsModalOpen}
              handleCancelModalOpen={handleCancelModalOpen}
              handleResceduleModalOpen={handleResceduleModalOpen}
              ref={containerRef}
              handleScroll={handleScroll}
            />
          </Suspense>
        </div>
        <div className="block lg:hidden">
          <UpcomingBookingMobileView
            upcomingBookings={upcomingBookings}
            bookingDetails={bookingDetails}
            bookings={bookings}
            rescheduleTime={rescheduleTime}
            cancelBooking={deleteBooking}
            disabledDay={disabledDay}
            ref={containerRef}
          />
        </div>
      </TabPanel>
      <TabPanel value={value} index={"1"}>
        <div className="lg:block hidden">
          <Suspense fallback={<Loading />}>
            <PreviousBookings previousBookings={previousBookings} />
          </Suspense>
        </div>
        <div className="block lg:hidden">
          {/* <UpcomingBookingMobileView upcomingBookings={upcomingBookings} bookingDetails={bookingDetails}/> */}
        </div>
      </TabPanel>

      {rescedulemodalOpen && (
        <Suspense fallback={null}>
          <BookingModal
            open={rescedulemodalOpen}
            handleClose={handleRescheduleModalClose}
            resceduleTime={rescheduleTime}
            bookings={bookings}
            disabledDay={disabledDay}
          />
        </Suspense>
      )}
      {cancelModalOpen && (
        <Suspense fallback={null}>
          <DeleteItemModal
            open={cancelModalOpen}
            handleClose={handleCancelModalClose}
            image={CancelBookingImage}
            cancelBooking={deleteBooking}
          />
        </Suspense>
      )}
      {bookingDetailsModalOpen && (
        <Suspense fallback={null}>
          <BookingDetailsModal
            open={bookingDetailsModalOpen}
            handleClose={handleBookingDetailsModalClose}
            bookingdetails={bookingDetails}
          />
        </Suspense>
      )}
    </div>
  );
}
