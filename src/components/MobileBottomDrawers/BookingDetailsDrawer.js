import { SwipeableDrawer, Box } from "@mui/material";
import { styled } from "@mui/styles";
import dayjs from "dayjs";
import UserIcon from "/public/images/dashboard/user.svg";
import CallIcon from "/public/images/dashboard/call.svg";
import HomeIcon from "/public/images/dashboard/home-2.svg";
import SMSIcon from "/public/images/dashboard/sms.svg";
import Image from "next/image";

const Puller = styled("div")(({ theme }) => ({
  width: 60,
  height: 6,
  backgroundColor: "#DDDDDD",
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

function BookingDetailsDrawerMobile({
  detailsPopUpOpen,
  toggleDrawer,
  bookingdetails,
}) {
  return (
    <SwipeableDrawer
      open={detailsPopUpOpen}
      variant="persistent"
      anchor="bottom"
      onOpen={() => console.log()}
      onClose={toggleDrawer}
      className="w-[25.5rem]"
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
      <Puller onClick={toggleDrawer} />

      <Box>
        <div className="flex items-center pl-2 bg-[#F9FAFA] h-[3.5rem]">
          <p className="text-lg font-medium">Booking Details</p>
        </div>
        <div className="mt-8 pl-4">
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

        <div className="mt-5  border-solid border border-secondary50 block  rounded-lg m-4">
          <div className="flex w-full  border-solid border-b  border-secondary50 items-center ">
            <div className="py-[30px] pr-1 border-solid  border-r border-secondary50 w-2/3">
              <p className="text-sm xl:w-[14.9rem] 4xl:w-[30.9rem] block text-primary pl-2">
                <span className="font-bold text-dark">Item</span> <br />
                {bookingdetails[0]?.offer}
              </p>
            </div>
            <div className="flex justify-end">
              <p className="pt-[30px] pr-[12px] pb-[30px] pl-[30px] text-textMain text-sm font-medium">
                {bookingdetails[0]?.offerPoints} AED
              </p>
            </div>
          </div>

          <div className="flex w-full border-solid border-b border-secondary50">
            <div className="py-[30px] px-[12px]  border-solid border-r border-secondary50  w-2/3">
              <p className="text-sm font-bold xl:w-[14.9rem] 4xl:w-[30.9rem] block ">
                Subtotal
              </p>
            </div>
            <div className="flex justify-end ">
              <p className="pt-[30px] pr-[12px] pb-[30px] pl-[30px] text-textMain text-sm font-medium">
                {bookingdetails[0]?.subPoints} AED
              </p>
            </div>
          </div>

          <div className="flex w-full border-solid border-b border-secondary50">
            <div className="py-[30px] px-[12px]  border-solid border-r border-secondary50 w-2/3">
              <p className="text-sm font-bold xl:w-[14.9rem] 4xl:w-[30.9rem] block ">
                VAT
              </p>
            </div>
            <div className="flex justify-end">
              <p className="pt-[30px] pr-[12px] pb-[30px] pl-[30px] text-textMain text-sm font-medium">
                {" "}
                {bookingdetails[0]?.vat} AED
              </p>
            </div>
          </div>

          <div className="flex w-full border-solid border-b border-secondary50">
            <div className="py-[30px] px-[12px] w-2/3  border-solid border-r border-secondary50 ">
              <p className="text-sm font-bold xl:w-[14.9rem] 4xl:w-[30.9rem] block ">
                Booking Credit Used
              </p>
            </div>
            <div className="flex justify-end">
              <p className="pt-[30px] pr-[12px] pb-[30px] pl-[30px] text-textMain text-sm font-medium">
                {bookingdetails[0]?.creditsUsed} AED
              </p>
            </div>
          </div>

          <div className="flex  border-solid border-b border-secondary50 ">
            <div className="py-[30px] px-[12px]  border-solid border-r border-secondary50 w-2/3">
              <p className="text-sm font-bold xl:w-[14.9rem] 4xl:w-[30.9rem] block ">
                Total
              </p>
            </div>
            <div className="flex justify-end">
              <p className="pt-[30px] pr-[12px] pb-[30px] pl-[30px] text-textMain text-sm font-medium">
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

        <div className=" mt-6 p-4">
          <div className="flex items-center p-1">
            <Image src={UserIcon} alt="user" className="pr-2" width={30} height={30} />

            <p className="text-base p-1">Admirra John</p>
          </div>
          <div className="flex items-center p-1">
            <Image src={CallIcon} alt="call" className="pr-2" width={30} height={30} />
            <p>+971 332104118</p>
          </div>
          <div className="flex items-center p-1">
            <Image src={SMSIcon} alt="sms" className="pr-2" width={30} height={30}/>
            <p className="text-base">admirra@gmail.com</p>
          </div>
          <div className="flex items-center p-1">
            <Image src={HomeIcon} alt="home" className="pr-2" width={30} height={30}/>
            <p className="text-base ">54, 31b Street, Dubai</p>
          </div>
        </div>
      </Box>
    </SwipeableDrawer>
  );
}
export default BookingDetailsDrawerMobile;
