"use client";

import { useParams } from "next/navigation";
import BookedOfferImg from "/public/images/offers/booked.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import axiosInstance from "@/store/services/config";
import dayjs from "dayjs";
import UserImg from "/public/images/dashboard/user.svg";
import PhoneImg from "/public/images/dashboard/call.svg";
import SMSimg from "/public/images/dashboard/sms.svg";
import HomeImg from "/public/images/dashboard/home-2.svg";
import { useSelector } from "react-redux";
import ViewMoreImg from "/public/images/offers/view-more.svg";
import Link from "next/link";

const BookedOffer = () => {
  const params = useParams();

  const [bookingdetails, setBookingDetails] = useState([]);
  const { user } = useSelector((state) => state?.user);

  const getBooking = async () => {
    try {
      const booking = await axiosInstance.get(`/booking/${params?.id}`);
      const data = booking?.data?.data;
      setBookingDetails(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBooking();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center w-full justify-center h-full">
        <Image src={BookedOfferImg} alt="booked_offer" className="mt-36" />
        <div
          className="mt-5 4xl:min-w-[25.7rem] 2xl:min-w-[20.5rem] 
        block m-auto rounded-lg"
        >
          <div className="flex flex-start items-center font-normal pb-4">
            <p className="text-base pr-3 font-bold">Order ID:</p>
            <p className="text-sm">{bookingdetails?.id}</p>
          </div>

          <div className="flex flex-start items-center font-normal pb-4">
            <p className="text-base pr-3 font-bold">Status:</p>
            <p className="text-sm text-textMain">{bookingdetails?.status}</p>
          </div>

          <div className="flex flex-start items-center font-normal pb-4">
            <p className="text-base pr-3 font-bold">Start Date:</p>
            <p className="text-sm">
              {dayjs(bookingdetails?.startDate).format("DD/MM/YYYY")}
              <span className="pr-2"> {bookingdetails?.startTime}</span>
            </p>
          </div>
        </div>

        <div
          className="mt-5 4xl:min-w-[25.7rem] 2xl:min-w-[20.5rem] min-h-[20.9rem] 
      block m-auto rounded-lg  mx-2"
        >
          <div className="flex lg:w-full  border-solid border rounded-t-xl  border-secondary50 items-center w-full">
            <div className="py-[20px] px-[12px]   border-solid  border-r border-secondary50">
              <p className="text-sm xl:w-[14.9rem] 4xl:w-[20.9rem] block text-primary w-f">
                <span className="font-bold text-dark">Item</span> <br />
                {bookingdetails?.offer}
              </p>
            </div>

            <div className="flex justify-end w-full">
              <p className="pt-[20px] pr-[12px] pb-[20px] pl-[20px] text-textMain text-sm font-medium">
                {bookingdetails?.offerPoints} AED
              </p>
            </div>
          </div>

          <div className="flex w-full border-solid border-b border-l border-r border-secondary50">
            <div className="py-[20px] px-[12px]  border-solid border-r border-secondary50 w-full ">
              <p className="text-sm font-bold xl:w-[14.9rem] 4xl:w-[20.9rem] w-full block ">
                Subtotal
              </p>
            </div>
            <div className="flex justify-end lg:w-full w-1/2">
              <p className="pt-[20px] pr-[12px] pb-[20px] pl-[20px] text-textMain text-sm font-medium">
                {bookingdetails?.subPoints} AED
              </p>
            </div>
          </div>

          <div className="flex w-full border-solid border-b border-l border-r  border-secondary50">
            <div className="py-[20px] px-[12px]  border-solid border-r border-secondary50 w-full">
              <p className="text-sm font-bold xl:w-[14.9rem] 4xl:w-[20.9rem] w-full block ">
                VAT
              </p>
            </div>
            <div className="flex justify-end lg:w-full w-1/2">
              <p className="pt-[20px] pr-[12px] pb-[20px] pl-[20px] text-textMain text-sm font-medium">
                {" "}
                {bookingdetails?.vat} AED
              </p>
            </div>
          </div>

          <div className="flex w-full border-solid border-b border-l border-r rounded-b-xl  border-secondary50">
            <div className="py-[20px] px-[12px]  border-solid border-r border-secondary50 w-full">
              <p className="text-sm font-bold xl:w-[14.9rem] 4xl:w-[20.9rem] block ">
                Total
              </p>
            </div>
            <div className="flex justify-end lg:w-full w-1/2">
              <p className="pt-[20px] pr-[12px] pb-[20px] pl-[20px] text-textMain text-sm font-medium">
                {" "}
                {bookingdetails?.totalPoints} AED
              </p>
            </div>
          </div>

          <p className="bg-secondary text-base font-bold pl-3 py-2 mt-8">
            Member Details
          </p>

          <div className="lg:min-w-[25.6rem] w-full lg:w-0  mt-6  lg:px-0">
            <div className="flex justify-between">
              <div className="text-base pb-2 flex items-center">
                <Image src={UserImg} alt="user" width={20} height={20} />
                <p className="pl-2">{user?.fullName}</p>
              </div>
              {user?.phone && (
                <div className="flex items-center">
                  <Image src={PhoneImg} alt="user" width={20} height={20} />

                  <p className="pl-2">{user?.phone}</p>
                </div>
              )}
            </div>
          </div>

          {user?.email && (
            <div className="flex items-center pb-2">
              <Image src={SMSimg} alt="user" width={20} height={20} />

              <p className="text-base pl-2">{user?.email}</p>
            </div>
          )}

          {user?.apartment && (
            <div className="flex items-center">
              <Image src={HomeImg} alt="user" width={20} height={20} />

              <p className="text-base pl-2">{user?.apartment}</p>
            </div>
          )}

          <Link href="/offers">
          <div className="flex justify-center items-center my-14">
            <p className="text-center text-primary text-[1.2rem] font-bold ">
              View More Offers
            </p>

            <Image src={ViewMoreImg} alt="viwe_more" width={50} height={50}  className="ml-8"/>
          </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BookedOffer;
