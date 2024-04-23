import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/styles";
import SettingsIcon from "public/images/dashboard/setting.svg";
import React, { Suspense, forwardRef, useRef, useState } from "react";
import EyeIcon from "public/images/dashboard/eye.svg";
import noItemsFound from "public/images/dashboard/no-booking-credit.svg";
import Image from "next/image";
import BookingsPopper from "../BookingsPopper/BookingsPopper";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontSize: 16,
    fontWeight: 700,
    tableLayout: "fixed",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: 0,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "rgba(195, 157, 99, 0.05)",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const BookingsTable = forwardRef(
  (
    {
      handleToggle,
      upcomingBookings,
      tabPanel,
      handleBookingDetailsModalOpen,
      handleBookingModalOpen,
      previousBookings,
      anchorEl,
      handleClose,
      handleCancelModalOpen,
      handleResceduleModalOpen,
      open,
      handleScroll,
      id,
    },
    ref
  ) => {
    return (
      <TableContainer
        component={Paper}
        sx={{ paddingTop: 5 }}
        className="2xl:w-[66rem] lg:w-[60rem] smd:w-[40rem] min-h-[780px] h-[780px] shadow-none"
        onScroll={handleScroll}
      >
        {upcomingBookings?.length > 0 || previousBookings?.length > 0 ? (
          <Table sx={{ minWidth: 700 }} aria-label="customized" ref={ref}>
            <TableHead>
              <TableRow sx={{ pt: 20, pb: 20 }}>
                <StyledTableCell
                  className=""
                  sx={{
                    flex: "1 0 0",
                  }}
                >
                  <p className="w-[64px] py-[12px] px-[32px] text-black">ID</p>
                </StyledTableCell>
                <StyledTableCell sx={{ padding: "20px 0" }}>
                  <p className="ml-28">Offer</p>
                </StyledTableCell>
                <StyledTableCell align="center">Start Date</StyledTableCell>
                <StyledTableCell align="center">End Date</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody className="h-[8.0rem] overflow-y-auto ">
              {upcomingBookings?.map((booking, i) => (
                <StyledTableRow
                  sx={{ height: "80px", width: "100%" }}
                  key={booking?._id}
                >
                  <StyledTableCell
                    sx={{
                      flex: "1 0 0",
                    }}
                  >
                    <p className="w-[64px] py-[22px] px-[32px]">
                      {booking?.id}
                    </p>
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      fontSize: 14,
                      lineHeight: "22px",
                      width: "16rem",
                      color: " var(--Primary-Main-900-BaseColor, #C39D63)",
                    }}
                  >
                    <p className=" leading-[22px] text-sm w-[16rem]   ">
                      {booking?.offer}
                    </p>
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{}}>
                    <p>
                      {booking?.startDate?.substr(0, 10)} <br />{" "}
                      {booking?.startTime}
                    </p>
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      padding: "20px ",
                    }}
                  >
                    <p>
                      {booking?.endDate?.substr(0, 10)} <br />{" "}
                      {booking?.endTime}
                    </p>
                  </StyledTableCell>
                  <StyledTableCell align="center" className="w-[4rem] ">
                    <p
                      className={`px-2 py-1 text-sm font-bold rounded-[4px]
                      ${
                        booking?.status == "REJECTED"
                          ? `bg-[#d93f2133] text-[#D93F21]`
                          : booking?.status == "PENDING"
                          ? `bg-[#dd9b4e33] text-[#DD9B4E]`
                          : booking?.status == "CONFIRMED"
                          ? `bg-[#16c09833] text-[#16C098]`
                          : booking?.status == "CANCELLED"
                          ? `bg-[#7e7e7e33] text-[#7E7E7E]`
                          : ""
                      }`}
                    >
                      {booking?.status}
                    </p>
                  </StyledTableCell>
                  <StyledTableCell align="center ">
                    {tabPanel == "1" && (
                      <div className="flex  justify-center">
                        <Image
                          src={SettingsIcon}
                          width={24}
                          height={24}
                          alt="settingd-icon"
                          className="cursor-pointer"
                          onClick={(e) => {
                            handleToggle(e);
                            localStorage.setItem("bookingID", booking?._id);
                            localStorage.setItem(
                              "bookingRescheduleSlug",
                              booking?.offer
                            );
                          }}
                        />
                      </div>
                    )}
                    {tabPanel == "2" && (
                      <div className="flex  justify-center">
                        <Image
                          src={EyeIcon}
                          width={24}
                          height={24}
                          alt="eye-icon"
                          className="cursor-pointer"
                          onClick={() => handleBookingDetailsModalOpen()}
                        />
                        <button
                          type="button"
                          onClick={() => handleBookingModalOpen()}
                          className="ml-3 bg-transparent border-0 text-primary cursor-pointer"
                        >
                          Book Again
                        </button>
                      </div>
                    )}
                  </StyledTableCell>
                  <Suspense>
                    <BookingsPopper
                      anchorEl={anchorEl}
                      handleClose={handleClose}
                      handleBookingDetailsModalOpen={
                        handleBookingDetailsModalOpen
                      }
                      handleCancelModalOpen={handleCancelModalOpen}
                      handleResceduleModalOpen={handleResceduleModalOpen}
                      open={open}
                      id={id}
                    />
                  </Suspense>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="xl:h-full flex flex-col justify-center items-center">
            {" "}
            <div className=" flex justify-center">
              <Image
                src={noItemsFound}
                alt="no redits"
                width={200}
                height={200}
              />
            </div>
            <div className="w-[35.8rem] pt-6">
              <p className="text-base font-medium text-center">
                At this time, you have no bookings scheduled. Discover our
                offers and secure your desired option today!
              </p>
            </div>
          </div>
        )}
      </TableContainer>
    );
  }
);

BookingsTable.displayName = "BookingsTable";

export default BookingsTable;
