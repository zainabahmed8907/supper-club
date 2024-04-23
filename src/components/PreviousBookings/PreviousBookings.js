import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/styles";
import SettingsIcon from "public/images/dashboard/setting.svg";
import React, { Suspense, useRef, useState } from "react";

import BookingModal from "../Modals/BookingModal";
import BookingDetailsModal from "../Modals/BookingDetailsModal";
import BookingsTable from "../BookingsTable/BookingsTable";


export default function PreviousBookings({previousBookings}) {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingDetailsModalOpen, setBookingDetailsModalOpen] = useState(false);

  const [open, setOpen] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const anchorRef = useRef();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  const handleBookingModalOpen = () => setBookingModalOpen(true);
  const handleBookingModalClose = () => setBookingModalOpen(false);

  const handleBookingDetailsModalOpen = () => setBookingDetailsModalOpen(true);
  const handleBookingDetailsModalClose = () =>
    setBookingDetailsModalOpen(false);

  const handleClose = (event) => {
    setOpen(false);
  };
  const rowCount = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <BookingsTable
        id="156897"
        rowCount={rowCount}
        offerText="Enjoy 20% OFF the Total Bill of the Ala Carte Menu at Kimpo, Conrad Dubai"
        startDate="01/25/2024"
        startTime="8:00 pm"
        endDate="01/25/2024"
        endTime="8:00 pm"
        status="Paid"
        handleToggle={handleClick}
        anchorRef={anchorRef}
        tabPanel="2"
        handleBookingDetailsModalOpen={handleBookingDetailsModalOpen}
        handleBookingModalOpen={handleBookingModalOpen}
        previousBookings={previousBookings}
      ></BookingsTable>
      {bookingModalOpen && (
        <Suspense fallback={null}>
          <BookingModal
            handleClose={handleBookingModalClose}
            open={bookingModalOpen}
          />
        </Suspense>
      )}

      {bookingDetailsModalOpen && (
        <Suspense fallback={null}>
          <BookingDetailsModal
            open={bookingDetailsModalOpen}
            handleClose={handleBookingDetailsModalClose}
          />
        </Suspense>
      )}
    </>
  );
}
