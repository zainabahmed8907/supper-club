"use client";
import { Accordion, Typography } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import Review from "./Review";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
function ReviewsList({ offerID }) {
  const [reviews, setReviews] = useState([]);


  const getReviews = async () => {
    if (offerID) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_KEY}/review/${offerID}`
        );
        const data = response.data?.data?.reviews;
        setReviews(data);
      } catch (e) {
        throw e;
      }
    }
  };
  useEffect(() => {
    getReviews();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offerID]);

  return (
    <div>
      <Accordion className="border-t border-[#E0E1E1]">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c5-content"
          id="panel1c5-header"
          className="bg-secondary py-1"
        >
          <Typography className="font-bold xl:text-[1.1rem] text-base  pl-4">
            Reviews
          </Typography>
        </AccordionSummary>
        {reviews?.length < 0 ? (
          <AccordionDetails className="lg:p-10 text-dark text-2xl">
            No Reviews yet
          </AccordionDetails>
        ) : (
          <AccordionDetails className="lg:p-10">
            {reviews?.map((review) => {
              return (
                <div key={review?._id}>
                  <Review
                    rating={review?.rating}
                    userName={review?.user?.fullName}
                    review={review?.review}
                    date={dayjs(review?.createdAt).format("MM/DD/YYYY")}
                    avatar={review?.user?.avatar}
                  />
                </div>
              );
            })}
          </AccordionDetails>
        )}
      </Accordion>
    </div>
  );
}

export default ReviewsList;
