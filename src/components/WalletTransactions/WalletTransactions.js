import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles, styled } from "@mui/styles";
import React, { forwardRef } from "react";
import SpentCreditsIcon from "/public/images/dashboard/credits-spent.svg";
import TotalCredits from "/public/images/dashboard/total-credits.svg";
import Image from "next/image";
import noBookingCredit from "public/images/dashboard/no-booking-credit.svg";
import { useSelector } from "react-redux";
import ManageBillingBtn from "../ManageBillingBtn/ManageBillingBtn";

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

const WalletTransactions = forwardRef(
  ({ walletTransactions, handleScroll, wallet }, ref) => {
    const { user } = useSelector((state) => state.user);

    return (
      <TableContainer
        component={Paper}
        sx={{ paddingTop: 2 }}
        className="2xl:w-[66rem] lg:w-[60rem] smd:w-[40rem] max-h-[780px] h-[780px] overflow-y-acroll overflow-x-hidden shadow-none"
        ref={ref}
        onScroll={handleScroll}
      >
        {walletTransactions?.length > 0 ? (
          <>
            <div className="mx-6 pt-2 pb-14">
              <div className="w-[63.06rem] h-[6rem] border border-[#EDE2D0] bg-tablebg rounded-xl flex items-center">
                <div className="lg:w-[5px] lg:h-[3.46rem] bg-primary rounded-tr-lg rounded-br-lg"></div>
                <div className="lg:w-[23.7rem]">
                  <div className="lg:w-[11.7rem] pl-10">
                    <p className="lg:text-[1.12rem]">Booking Credits Summary</p>
                  </div>
                </div>
                <div className="flex items-center lg:w-[23.7rem]">
                  <Image
                    src={TotalCredits}
                    alt="total credits"
                    width={74}
                    height={74}
                  />
                  <div className="pl-8">
                    <p className="text-sm text-[#B8B8B8] pb-2">Total Credits</p>
                    <p className="lg:text-2xl text-[#33333] font-bold">
                      {wallet?.availableCredits} AED
                    </p>
                  </div>
                </div>
                <div className="flex items-center lg:w-[23.31rem]">
                  <Image
                    src={SpentCreditsIcon}
                    alt="total credits"
                    width={74}
                    height={74}
                  />
                  <div className="pl-8">
                    <p className="text-sm text-[#B8B8B8] pb-2">Credits Spent</p>
                    <p className="lg:text-2xl text-[#33333] font-bold">
                      {wallet?.creditsSpent} AED
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Table sx={{ minWidth: 700 }} aria-label="customized">
              <TableHead>
                <div className="px-6">
                  <p className="xl:text-[1.12rem] font-medium text-textMain pb-2">
                    Transaction History
                  </p>
                  <p className="border-t-4 w-[2.5rem] rounded-lg border-primary"></p>
                </div>
                <TableRow sx={{ pt: 32, pb: 20 }}>
                  <StyledTableCell
                    className=""
                    sx={{
                      flex: "1 0 0",
                    }}
                  >
                    <p className="w-[64px] py-[12px] px-[32px] text-gray">ID</p>
                  </StyledTableCell>
                  <StyledTableCell align="center" className="text-gray">
                    Date & Time
                  </StyledTableCell>
                  <StyledTableCell align="center" className="text-gray">
                    Activity
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{ padding: "20px 0", width: "20rem" }}
                  >
                    <p className="text-gray">Detail</p>
                  </StyledTableCell>
                  <StyledTableCell align="center" className="text-gray">
                    Amount
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody className="h-[8.0rem] overflow-y-auto ">
                {walletTransactions?.map((row, i) => (
                  <StyledTableRow
                    sx={{ height: "80px", width: "100%" }}
                    key={i}
                  >
                    <StyledTableCell
                      sx={{
                        flex: "1 0 0",
                      }}
                    >
                      <p className="w-[64px] py-[22px] px-[32px] text-sm text-gray">
                        {row._id.substr(row._id.length - 4)}
                      </p>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <p className=" leading-[22px] text-sm w-[16rem] text-gray">
                        {new Date(row.createdAt).toLocaleString()}
                      </p>
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{}}>
                      <p className="capitalize">
                        {row.activity.toLowerCase().replace("_", " ")}
                      </p>
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        fontSize: 14,
                        lineHeight: "22px",
                        width: "20rem",
                        color: "var(--Primary-Main-900-BaseColor, #C39D63)",
                      }}
                    >
                      <p>{row.title}</p>
                    </StyledTableCell>
                    <StyledTableCell align="center" className="w-[10rem] ">
                      <p>
                        {row.transactionType === "credit"
                          ? `+${row.totalPoints}AED`
                          : `-${row.totalPoints}AED`}
                      </p>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </>
        ) : (
          <div className="2xl:h-full flex flex-col justify-center items-center">
            {" "}
            <div className=" flex justify-center">
              <Image
                src={noBookingCredit}
                alt="no redits"
                width={200}
                height={200}
              />
            </div>
            <div className="w-[35.8rem] pt-6">
              <p className="text-base font-medium">
                Hi {user?.fullName}! It look’s like you haven’t subscribed to
                any membership yet. Earn credit points by becoming a member and
                avail our amazing offers.
              </p>
            </div>
            <div className="pt-5">
              <ManageBillingBtn />
            </div>
          </div>
        )}
      </TableContainer>
    );
  }
);

WalletTransactions.displayName = "WalletTransactions";

export default WalletTransactions;
