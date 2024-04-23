import Image from "next/image";
import SettingsIcon from "public/images/dashboard/setting.svg";
import { useState } from "react";
import BookingsPopper from "../BookingsPopper/BookingPopperMobile";
function UpcomingBookingCard({
  id,
  status,
  mainText,
  startDate,
  endDate,
  handleBookingDetailsPopUpOpen,
  handleReschedulePopUpOpen,
  handleCancelModalOpen,
  bookingId,
  bookingOffer,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleToggle = (e) => {
    setAnchorEl(e?.target);
  };
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <div className="h-[11.5rem]  md:w-[32.5rem] border p-3 border-solid border-secondary rounded-xl mt-3">
        <div className="pb-3 flex justify-between items-center">
          <div className="w-fit px-3 h-[1.5rem] rounded bg-[#EDE2D0] flex items-center">
            <p className="font-bold text-sm px-2 ">ID </p>
            <p className="text-sm">{id}</p>
          </div>
          <Image
            src={SettingsIcon}
            alt="options icon"
            onClick={(e) => {
              handleToggle(e);

              localStorage.setItem("bookingID", bookingId);
              localStorage.setItem("bookingRescheduleSlug", bookingOffer);
            }}
          />
        </div>
        <div className="pb-3 relative flex  items-center">
          <p className="text-base font-medium leading-[1rem]">Status</p>
          <p
            className={`px-2 py-1 text-sm font-bold rounded-[4px]
                    ${
                      status == "REJECTED"
                        ? `text-[#D93F21]`
                        : status == "PENDING"
                        ? ` text-[#DD9B4E]`
                        : status == "CONFIRMED"
                        ? ` text-[#16C098]`
                        : status == "CANCELLED"
                        ? ` text-[#7E7E7E]`
                        : ""
                    }`}
          >
            {status}
          </p>
        </div>
        <div className="pb-3 w-[15.75rem]">
          <p className="text-primary leading-[22px] text-sm line-clamp-2 text-ellipsis overflow-hidden">
            {mainText}
          </p>
        </div>

        <div className="w-[16.438rem] flex justify-between">
          <div>
            <p className="text-base font-medium leading-[16px]">Start Date</p>
            <p className="text-xs text-[#7E7E7E] pt-1">{startDate}</p>
          </div>
          <div>
            <p className="text-base font-medium leading-[16px]">End Date</p>
            <p className="text-xs text-[#7E7E7E] pt-1">{endDate}</p>
          </div>
        </div>
      </div>

      <BookingsPopper
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleBookingDetailsModalOpen={handleBookingDetailsPopUpOpen}
        handleResceduleModalOpen={handleReschedulePopUpOpen}
        handleCancelModalOpen={handleCancelModalOpen}
        open={open}
      />
    </>
  );
}

export default UpcomingBookingCard;
