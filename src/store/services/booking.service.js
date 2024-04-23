import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./config";

//post booking
export const postBooking = async (data) => {
  const bookingData = await axiosInstance
    .post(`/booking`, {
      offer: data.offer,
      endDate: data.endDate,
      members: data.members,
      kids: data.kids,
      endTime: data.endTime,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => err);
  return bookingData;
};

//get bookings
export const getBookings = async (type, pageSize, limit, pageNo) => {
   try{
    const response=await axiosInstance
    .get(`/booking?type=${type}&pageSize=${pageSize}&limit=${limit}&page=${pageNo}`);
    const data=response.data;
    return data;
    
   }
   catch(e){
    console.log(e);

   }
    
};
