import { forwardRef, useState } from "react";
import UpcomingBookingCard from "./UpcomingBookingCard";
import BookingDetailsDrawerMobile from "../MobileBottomDrawers/BookingDetailsDrawer";
import dayjs from "dayjs";
import RescheduleDrawerMobile from "../MobileBottomDrawers/RescheduleDetailsDrawer";
import CancelDrawerMobile from "../MobileBottomDrawers/CancelBookingDrawer";
import CancelBookingImg from "/public/images/dashboard/cancel-booking.svg";
import noItemsFound from "public/images/dashboard/no-booking-credit.svg";
import Image from "next/image";

const UpcomingBookingMobileView = forwardRef(
  (
    {
      upcomingBookings,
      bookingDetails,
      rescheduleTime,
      bookings,
      disableddDay,
      cancelBooking,
    },
    ref
  ) => {
    const [detailPopupOpen, setdetailPopupOpen] = useState(false);
    const [reschedulePopUpOpen, setReschedulePopUpOpen] = useState(false);
    const [deleteItemModalOpen, setDeleteModalOpen] = useState(false);

    const handleDetailPopuUpOpen = () => setdetailPopupOpen(true);
    const handleReschedulePopUpOpen = () => setReschedulePopUpOpen(true);
    const handleDeleteMOdalOpen = () => setDeleteModalOpen(true);

    const toggleDetailsDrawer = () => setdetailPopupOpen(false);

    const toggleRescheduleDrawer = () =>
      setReschedulePopUpOpen(!reschedulePopUpOpen);
    const toggleCancelDrawer = () => setDeleteModalOpen(!deleteItemModalOpen);

    const handleRescheduleDrawerClose = () => setReschedulePopUpOpen(false);
    const handleDeleteModalClose = () => setDeleteModalOpen(false);

    return (
      <div>
        <div className="xs:w-[24rem] xss:w-[21rem] md:w-[34rem] max-h-[57.2rem] h-[57rem] overflow-y-auto  bg-white p-3 block m-auto">
          {upcomingBookings?.length > 0 ? (
            upcomingBookings?.map((booking) => {
              return (
                <div key={booking?.id}>
                  <UpcomingBookingCard
                    id={booking?.id}
                    status={booking?.status}
                    mainText={booking?.offer}
                    startDate={dayjs(booking?.startDate).format(
                      "MM/DD/YYYY hh:mm a"
                    )}
                    endDate={dayjs(booking?.endDate).format(
                      "MM/DD/YYYY hh:mm a"
                    )}
                    bookingId={booking?._id}
                    bookingOffer={booking?.offer}
                    handleBookingDetailsPopUpOpen={handleDetailPopuUpOpen}
                    handleReschedulePopUpOpen={handleReschedulePopUpOpen}
                    handleCancelModalOpen={handleDeleteMOdalOpen}
                  />
                </div>
              );
            })
          ) : (
            <div className="h-1/2 flex flex-col justify-center items-center">
              {" "}
              <div className=" flex justify-center items-center">
                <Image
                  src={noItemsFound}
                  alt="no redits"
                  width={150}
                  height={150}
                />
              </div>
              <div className="w-full pt-6">
                <p className="text-base font-medium text-center">
                  At this time, you have no bookings scheduled. Discover our
                  offers and secure your desired option today!
                </p>
              </div>
            </div>
          )}
        </div>

        {detailPopupOpen && (
          <BookingDetailsDrawerMobile
            detailsPopUpOpen={detailPopupOpen}
            toggleDrawer={toggleDetailsDrawer}
            bookingdetails={bookingDetails}
          />
        )}
        {reschedulePopUpOpen && (
          <RescheduleDrawerMobile
            open={reschedulePopUpOpen}
            toggleDrawer={toggleRescheduleDrawer}
            rescheduleTime={rescheduleTime}
            bookings={bookings}
            handleClose={handleRescheduleDrawerClose}
            disabledDay={disableddDay}
          />
        )}
        {deleteItemModalOpen && (
          <CancelDrawerMobile
            open={deleteItemModalOpen}
            handleClose={handleDeleteModalClose}
            toggleDrawer={toggleCancelDrawer}
            image={CancelBookingImg}
            cancelBooking={cancelBooking}
          />
        )}
      </div>
    );
  }
);

UpcomingBookingMobileView.displayName = "UpcomingBookingMobileView";
export default UpcomingBookingMobileView;
