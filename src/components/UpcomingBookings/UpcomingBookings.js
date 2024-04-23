import React, { forwardRef, useRef, useState } from "react";

import BookingsTable from "../BookingsTable/BookingsTable";


const UpcomingBookings = forwardRef(
  (
    {
      upcomingBookings,
  handleCancelModalOpen,
  handleResceduleModalOpen,
  handleBookingDetailsModalOpen,
  handleScroll

    },
    ref
  ) => {
    const [open, setOpen] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const anchorRef = useRef();
    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? "transition-popper" : undefined;
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleClick = (event) => {
      setAnchorEl(event?.currentTarget);
      setOpen((previousOpen) => !previousOpen);
    };
  
    return (
      <>
        <BookingsTable
          upcomingBookings={upcomingBookings}
          status="Rejected"
          handleToggle={handleClick}
          anchorRef={anchorRef}
          tabPanel="1"
          anchorEl={anchorEl}
          open={open}
          handleCancelModalOpen={handleCancelModalOpen}
          handleBookingDetailsModalOpen={handleBookingDetailsModalOpen}
          handleClose={handleClose}
          handleResceduleModalOpen={handleResceduleModalOpen}
          ref={ref}
          handleScroll={handleScroll}
        />
      </>
    );
  }
)

UpcomingBookings.displayName="UpcomingBookings";


export default UpcomingBookings;
