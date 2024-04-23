"use client";

import Image from "next/image";
import Ellipse from "public/images/offerDetails/ellipse.png";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";
import axiosInstance from "@/store/services/config";

function ReviewForm({ offerId }) {
  const { user } = useSelector((state) => state.user);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [name, setName] = useState(user?.fullName);
  const [email, setEmail] = useState(user?.email);

  const [error, setError] = useState(false);
  const [errorText, setErrortext] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const addRating = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/review/${offerId}`, {
        rating,
        review,
      });
      setSuccessAlert(true);
      setSuccessMsg(response?.data?.message);

      setTimeout(() => {
        setRating(0);
        setReview("");
        setSuccessAlert(false);
        setSuccessMsg("");
      }, 4000);
      return response.data;
    } catch (e) {
      setError(true);
      setErrortext(e?.response?.data?.message);

      setTimeout(() => {
        setError(false);
        setErrortext("");
        setName("");
        setEmail("");
        setRating(0);
        setReview("");
      }, 4000);

      console.log(e);
    }
  };

  const isSubmitDisabled = rating == 0 && review == "";

  return (
    <div className="mt-20 ">
      {successAlert && (
        <Alert severity="success" className="mb-4 text-center lg:w-1/2 w-full">
          {successMsg}
        </Alert>
      )}
      {error && (
        <Alert severity="error" className="mb-4 text-center lg:w-1/2 w-fulls">
          {errorText}
        </Alert>
      )}
      <div>
        <p className="lg:text-4xl text-2xl font-semibold">Rate and Review</p>
        <div className="border-primary  border-b-4 w-20 h-1 pb-2 pt-4"></div>
      </div>
      <div className="mt-6">
        <p className="text-base">
          We would love to hear about your experience with SupperClub.
        </p>
      </div>
      <div className="mt-6 flex items-center">
        <p className="font-bold">Add your Rating</p>
        <Rating
          className="pl-4"
          value={rating}
          name="rating"
          onChange={(e, newVal) => {
            setRating(newVal);
          }}
        />
      </div>
      <div className="form w-11/12 mt-7">
        <form onSubmit={addRating}>
          <div className="flex xl:flex-row lg:flex-col flex-col ">
            <div className="flex flex-col">
              <label className="mb-2 font-bold">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="outline-none bg-secondary border-2 border-secondary50 5xl:w-120 4xxl:w-116 3xl:w-106 lg:w-104 md:w-116 w-80 p-3 rounded-lg"
              />
            </div>
            <div className="flex flex-col xl:ml-5 lg:ml-0 xl:mt-0 lg:mt-5 mt-5">
              <label className="mb-2 font-bold">Email</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="outline-none border-2 border-secondary50 bg-secondary 5xl:w-120 4xxl:w-116  3xl:w-108 lg:w-104 md:w-116  w-80 p-3 rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-col mt-10">
            <label className="mb-2 font-bold">Write a review</label>
            <textarea
              rows="5"
              name="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="outline-none border-2 border-secondary50 bg-secondary 5xl:w-[97rem]  4xxl:w-[89rem]   3xl:w-135 lg:w-[63.5rem]  md:w-116 w-80 p-3 rounded-lg resize-none"
            ></textarea>
          </div>

          <div className="mt-10 flex lg:flex-row flex-col justify-between lg:items-center items-start 5xl:w-[97rem]  4xxl:w-[89rem]   3xl:w-135 lg:w-[63.5rem] w-full lg:pb-44">
            <p className="font-bold">
              Note: Your email address will not be published
            </p>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitDisabled}
                className={` ${
                  !isSubmitDisabled ? "bg-primary" : "bg-primaryDisabled"
                } w-40 rounded-3xl p-3 text-white lg:mt-0 mt-5`}
              >
                Submit
              </button>
            </div>
          </div>

          <div className="xl:flex justify-end  absolute  right-0 hidden w-96 -mt-64">
          <Image src={Ellipse} alt="ellipse" width={350} height={300} />
        </div>
        </form>
       
      </div>

      <div className="flex justify-end w-screen lg:hidden">
        <Image src={Ellipse} alt="ellipse" width={150} />
      </div>
    </div>
  );
}

export default ReviewForm;

