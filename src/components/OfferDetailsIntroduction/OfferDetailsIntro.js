"use client";
import { marked } from "marked";
import BookingModal from "../Modals/BookingModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import BookingConfirmationModal from "../Modals/BookingConfirmationModal";
import { getUserProfile } from "@/store/services/user.service";

function OfferDetailsIntro({
  short_desc,
  availableTime,
  offer_id,
  amount,
  disableDays,
}) {
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();

  const [bookingConfirmationModalOpen, setBookingConfirmationModalOpen] =
    useState(false);
  const html =
    short_desc?.length > 0 &&
    marked(short_desc, { headerIds: false, mangle: false });

  const { auth, user } = useSelector((state) => state.user);

  const searchParams = useSearchParams();

  const isPayment = searchParams.get("payment");
  const isSubscriber = user?.subscription;

  const handleBookingModalOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => setModalOpen(false);

  const handleConfirmationModalOpen = () =>
    setBookingConfirmationModalOpen(true);

  const handleConfirmationModalClose = () => {
    setBookingConfirmationModalOpen(false);
  };

  const handleOfferButtonClick = () => {
    if (auth && user?.subscription?.status == "active") {
      setModalOpen(true);
    } else {
      router.push("/memberships");
    }
  };

  useEffect(() => {
    if (isPayment && isPayment === "success") {
      const interval = setInterval(() => {
        dispatch(getUserProfile())
          .then((data) => {
            if (
              data?.payload?.data?.data &&
              data?.payload?.data?.data?.subscription
            ) {
              // dispatch(setUser(data.data));
              clearInterval(interval);
            }
          })
          .catch((err) => {
            console.error("Error fetching user profile", err);
            clearInterval(interval);
          });
      }, 1000);
    }
  }, [isPayment, dispatch]);

  // TO BE USED LATER
  // const listenSSE = (user) => {
  //   const eventSource = new EventSource(
  //     `${process.env.NEXT_PUBLIC_API_KEY}/user/${user._id}/sse`
  //   );
  //   console.info("Listenting on SEE", eventSource);
  //   return eventSource;
  // };

  // useEffect(() => {
  //   if (user) {
  //     if (!isUserAvailable) {
  //       setIsUserAvailable(true);
  //     }
  //   }
  // }, [user]);

  // useEffect(() => {
  //   let event;
  //   if (isUserAvailable) {
  //     event = listenSSE(user);
  //     event.onmessage = ({ data }) => {
  //       console.log("EVENT FIRE FROM SSE", JSON.parse(data));
  //       const eventData = JSON.parse(data);
  //       if (eventData.type === 'user-subscription') {
  //         setUser(eventData.data);
  //       }
  //     };
  //     event.onerror = (event) => {
  //       console.error("EVENT ERROR FROM SSE", event);
  //     };
  //     event.onopen = (event) => {
  //       console.log("EVENT OPEN FROM SSE", event);
  //     };
  //   }
  //   return () => {
  //     if (event) {
  //       event.close();
  //     }
  //   };
  // }, [isUserAvailable]);

  useEffect(() => {
    if (searchParams?.get("payment") && isSubscriber) {
      setModalOpen(true);
    }
  }, [searchParams, isSubscriber]);

  return (
    <div>
      <div className="flex xl:flex-row lg:flex-row mdb:flex-row flex-col">
        <div className="w-full order-2 lg:order-1 xl:order-1 mdb:order-1">
          {html ? (
            <article
              dangerouslySetInnerHTML={{ __html: html }}
              className="prose lg:prose-base  prose-sm w-full lg:mt-0 pt-3"
            />
          ) : (
            <article>{short_desc}</article>
          )}
        </div>

        <button
          className="bg-gray rounded-3xl  py-2 text-white lg:w-52 mdb:w-48 w-full h-12 text-sm lg:order-2 xl:order-2 mdb:order-2 order-1 cursor-pointer"
          onClick={handleOfferButtonClick}
        >
          Book this Offer
        </button>
      </div>

      {modalOpen && (
        <BookingModal
          open={modalOpen}
          handleClose={handleClose}
          availableTime={availableTime}
          handleConfirmationModalOpen={handleConfirmationModalOpen}
          offer_id={offer_id}
          amount={amount}
          disabledDay={disableDays}
        />
      )}
      {bookingConfirmationModalOpen && (
        <BookingConfirmationModal
          open={bookingConfirmationModalOpen}
          handleBookingModal={handleBookingModalOpen}
          handleClose={handleConfirmationModalClose}
          amount={amount}
        />
      )}
    </div>
  );
}

export default OfferDetailsIntro;
