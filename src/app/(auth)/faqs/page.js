"use client";
import { Accordion, Typography } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useState } from "react";
import Link from "next/link";
import AboutUsForm from "@/components/AboutUsForm";

function FAQs() {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };
  return (
    <div>
      <div className="h-48 5xl:h-52 w-full flex items-center bg-secondary">
        <p
          className="text-primary font-semibold
                pt-20
              
                text-xl lg:text-2xl xl:text-4xl 3xl:text:5xl 
                pl-10 6xl:px-56 5xl:px-52 4xl:px-40 3xl:px-36 2xl:px-32 xl:px-28 lg:px-24"
        >
          FAQs
        </p>
      </div>

      <div className="6xl:px-56 5xl:px-52 4xl:px-40 3xl:px-36 2xl:px-32 xl:px-28 lg:px-24 px-10">
        <div>
          <div className="flex pt-12 xl:flex-row flex-col justify-between">
            <div>
              <h2 className="xl:text-4xl text-xl font-bold pb-4">HAVE ANY QUESTION?</h2>
              <p className="xl:w-4/5 xl:text-lg text-base text-textMain">
                Find quick answers to common questions. Contact us for further
                assistance.
              </p>
            </div>
            <div>
              <p className="xl:text-lg text-base text-textMain">
                Supperclubme Now Portal
                <br />
                Golden Mile 7, Palm Jumeirah
                <br />
                Dubai. UAE
                <br />
                <span className="text-primary underline">
                  support@supperclubme.com
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="pt-20">
          <Accordion
            className="border-t-2  border-secondary50 "
            transition="0.6s ease-in"
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="bg-secondary  h-12"
            >
              <Typography className="font-medium xl:text-lg text-base  pl-4">
                How does it work?
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="p-7">
              <p className="mb-4 leading-6 xl:text-base text-sm">
                1. JOIN: Purchase your membership and unlock all the special
                Supperclub discounts.
              </p>
              <p className="mb-4 leading-7 xl:text-base text-sm">
                {" "}
                2. BOOK: From the 5-Star Discounts section, choose the deal you
                want and complete your booking in a couple clicks. **You must be
                logged in to see the booking calendar**
              </p>
              <p className="mb-4 leading-7 xl:text-base text-sm">
                {" "}
                3. ENJOY: Show up and enjoy. When you are presented with the
                bill, you will notice you are only charged a portion of the
                normal price. This is the exclusive Supperclub pricing. No
                discussions, no vouchers, no codes. Simple and sophisticated.
              </p>
              <Link href="" className="text-primary underline">
                CLICK HERE for a short video explainer
              </Link>
            </AccordionDetails>
          </Accordion>

          <Accordion
            className="border-t-2  border-secondary50"
            transition="0.6s ease-in"
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="bg-secondary h-12"
            >
              <Typography className="font-medium xl:text-lg text-base pl-4">
                Why should I book using Supperclub??
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="p-7">
              <p className="mb-4 leading-7 xl:text-base text-sm">
                1. Most of the offers you will not be able to find anywhere else
              </p>
              <p className="mb-4 leading-7 xl:text-base text-sm">
                2. Every booking you make on Supperclub enters you in the
                monthly draw for a FREE experience (usually a brunch or pool &
                beach access worth over AED 150).
              </p>
              <p className="mb-4 leading-7 xl:text-base text-sm">
                3. You don’t have to spend time on the phone waiting or
                repeating yourself to make a reservation. Just book in a 3
                clicks on Supperclub instead.
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion
            className="border-t-2  border-secondary50"
            transition="0.6s ease-in"
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="bg-secondary h-12"
            >
              <Typography className="font-medium xl:text-lg text-base pl-4">
                I am a KIDZAPP user, what special benefits do I get?
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="p-7">
              <p className="mb-4 leading-7 xl:text-base text-sm">
                <strong>
                  {" "}
                  KIDZAPP users get unlimited access to selected Supperclub
                  offers without paying a membership fee. You will only pay per
                  offer that you would like to book and you can book it directly
                  from the KIDZAPP application.
                </strong>{" "}
                You may book as much as you want and bring along as many guests
                as you would like. Everybody in your party will receive the
                indicated discount and you simply pay the discounted Supperclub
                price at the venue.
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion
            className="border-t-2  border-secondary50"
            transition="0.6s ease-in"
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="bg-secondary h-12"
            >
              <Typography className="font-medium xl:text-lg text-base pl-4">
                I am a Mastercard customer, what special benefits do I get?
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="p-7">
              <p className="mb-4 leading-7 xl:text-base text-sm">
                <strong>
                  Mastercard customers (specifically World Elite card holders)
                  users get unlimited access to selected Supperclub offers
                  without paying a membership fee. You can book unlimited offers
                  directly from the url sent to you by Mastercard and Ten
                  Concierge.
                </strong>{" "}
                You may bring along as many guests as you would like and
                everybody in your party will receive the indicated discount. As
                with any Supperclub booking, complete the online booking and
                simply pay the discounted Supperclub price at the venue.
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion
            className="border-t-2  border-secondary50"
            transition="0.6s ease-in"
            expanded={expanded === "panel5"}
            onChange={handleChange("panel5")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="bg-secondary h-12"
            >
              <Typography className="font-medium xl:text-lg text-base pl-4">
                What is the booking fee?
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="p-7">
              <p className="mb-4 leading-7 xl:text-base text-sm text-primary">
                What is the booking fee?
              </p>
              <p className="mb-4 leading-7 xl:text-base text-sm">
                If you need to reschedule your booking, you can do that without
                incurring another booking fee by contacting the venue directly
                or email{" "}
                <span className="text-primary">
                  reservations@supperclubme.com
                </span>{" "}
                with your new date
              </p>
              <p className="mb-4 leading-7 xl:text-base text-sm">
                If the venue is unable to accept your booking and you do not
                want to reschedule for another date, you will receive a refund
                of your booking fee in the form of booking credit.
              </p>

              <p className="mb-4 leading-7 xl:text-base text-sm font-bold">
                How can I avoid the booking fee?
              </p>

              <p className="mb-4 leading-7 xl:text-base text-sm">
                If you are an avid Supperclub member and make at least 2
                bookings per month, you may want to consider upgrading to the
                Platinum membership{" "}
                <Link href="" className="text-primary">
                  here
                </Link>{" "}
                where you will receive AED 500 in booking credit.
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion
            className="border-t-2  border-secondary50"
            transition="0.6s ease-in"
            expanded={expanded === "panel6"}
            onChange={handleChange("panel6")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="bg-secondary h-12"
            >
              <Typography className="font-medium xl:text-lg text-base pl-4">
                What makes Supperclub different?
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="p-7">
              <ul className="mb-4 leading-7 xl:text-base text-sm list-disc">
                <li>
                  We only partner with 5-star, premium restaurants, spas and
                  hotels.
                </li>
                <li>
                  Most of our partner rates are exclusive to Supperclub and
                  cannot be found elsewhere.
                </li>
                <li>
                  Members have access to unlimited discounts all year. Want to
                  go the same brunch every weekend and pay half price with
                  Supperclub? Great. Please do that.
                </li>
                <li>
                  All guests accompanying a member receive the same Supperclub
                  discount. Bring your friends and neighbors, everybody is
                  getting the Supperclub price!
                </li>
                <li>
                  Members have no card to carry, no code to type, no voucher to
                  present. Once you make a booking from your Supperclub account,
                  the venue is expecting you and knows to charge you the special
                  Supperclub discounted price.
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>

          <Accordion
            className="border-t-2  border-secondary50"
            transition="0.6s ease-in"
            expanded={expanded === "panel7"}
            onChange={handleChange("panel7")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="bg-secondary h-12"
            >
              <Typography className="font-medium xl:text-lg text-base pl-4">
                How many bookings can I make? How many guests per booking? Any
                limitations on discounts per booking?
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="p-7">
              <p className="mb-4 leading-7 xl:text-base text-sm  font-bold">
                How many bookings can I make?
              </p>
              <p className="mb-4 leading-7 xl:text-base text-sm">
                Unlimited. Your membership gives you full access to make as many
                reservations as often as you would like.
              </p>
              <p className="mb-4 leading-7 xl:text-base text-sm font-bold">
                How many guests in my booking will get the Supperclub discount?{" "}
              </p>

              <p className="mb-4 leading-7 xl:text-base text-sm">
                ALL guests accompanying a Supperclub member in the same
                reservation get the same discount!
              </p>

              <p className="mb-4 leading-7 xl:text-base text-sm font-bold">
                How many guests can I book for at once?
              </p>
              <p className="mb-4 leading-7 xl:text-base text-sm">
                Most Supperclub offers allow for unlimited guests in the same
                booking and others have a maximum of 8 or 10 people per booking.
                If you have a large gathering and want to double check the venue
                can accomodate you before booking, email us at
                reservations@supperclubme.com We will let you know if your venue
                can accept your large booking at the Supperclub price or we may
                give you some alternative venues.
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion
            className="border-t-2  border-secondary50"
            transition="0.6s ease-in"
            expanded={expanded === "panel8"}
            onChange={handleChange("panel8")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="bg-secondary h-12"
            >
              <Typography className="font-medium xl:text-lg text-base pl-4">
                Do I have to book on Supperclub to get the discount? Can I book
                directly with the venue?
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="p-7">
              <p className="mb-4 leading-7 xl:text-base text-sm">
                <strong>
                  The <i>only</i> way to get the Supperclub discount is by
                  booking on Supperclub.{" "}
                </strong>{" "}
                Once you book, the venue receives an email with your contact
                information and that verifies you as a Supperclub member
                entitled to the discount.
              </p>
              <p className="mb-4 leading-7 xl:text-base text-sm">
                Unlimited. Your membership gives you full access to make as many
                reservations as often as you would like.
              </p>
              <p className="mb-4 leading-7 xl:text-base text-sm font-bold">
                How do you book on Supperclub?
              </p>

              <ol className="mb-4 leading-7 xl:text-base text-sm">
                <li>
                  Login{" "}
                  <Link href="" className="text-primary">
                    here
                  </Link>
                </li>
                <li>
                  Check your offers{" "}
                  <Link href="" className="text-primary">
                    here
                  </Link>
                </li>
                <li>
                  Complete you booking from the calender under the offer of your
                  choice
                </li>
              </ol>

              <p className="mb-4 leading-7 xl:text-base text-sm font-bold">
                Not a member yet? Join{" "}
                <Link href="" className="text-primary">
                  {" "}
                  here
                </Link>
              </p>
              <p className="mb-4 leading-7 xl:text-base text-sm">
                If you do show up without having pre-booked on Supperclub, you
                will be requested to log into your Supperclub account on the
                spot and complete a booking. This is how the Supperclub partner
                will verify you are a member.
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion
            className="border-t-2  border-secondary50"
            transition="0.6s ease-in"
            expanded={expanded === "panel9"}
            onChange={handleChange("panel9")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="bg-secondary h-12"
            >
              <Typography className="font-medium xl:text-lg text-sm pl-4">
                What is COMPLIMYSTERY?
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="p-7">
              <p className="mb-4 leading-7 xl:text-base text-sm">
                COMPLIMYSTERY is a Supperclub coined term for mystery bookings
                that will receive a complimentary experience for 2 people! Every
                month, one lucky person that has completed a paid booking on
                Supperclub will receive a complimentary dinner for 2 people!
                Click here for more information.
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion
            className="border-t-2  border-secondary50"
            transition="0.6s ease-in"
            expanded={expanded === "panel10"}
            onChange={handleChange("panel10")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="bg-secondary h-12"
            >
              <Typography className="font-medium xl:text-lg text-base pl-4">
                Will my membership automatically renew?
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="p-7">
              <p className="mb-4 leading-7 xl:text-base text-sm">
                Yes, your membership will automatically renew, unless you opt
                out. To opt out at any time, simply go to your dashboard and
                toggle the auto renewal switch. Keep in mind membership fees are
                non-refundable once charged.
              </p>
              <p className="mb-4 leading-7 xl:text-base text-sm">
                To make the most of your membership, contact
                reservations@supperclubme.com for some ideas of where to book
                some great offers or check
                <Link href="" className="text-primary">
                  here.
                </Link>
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion
            className="border-t-2  border-secondary50"
            transition="0.6s ease-in"
            expanded={expanded === "panel11"}
            onChange={handleChange("panel11")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="bg-secondary h-12"
            >
              <Typography className="font-medium xl:text-lg text-base pl-4">
                When will my membership expire?
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="p-7">
              <p className="mb-4 leading-7 xl:text-base text-sm">
                Your membership is valid from the date you sign up plus the
                total months included in your membership.
              </p>
              <p className="mb-4 leading-7 xl:text-base text-sm">
                For example, if you join with the 6 month membership on March
                13, you will have access until September 13th of that same year.
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion
            className="border-t-2  border-secondary50"
            transition="0.6s ease-in"
            expanded={expanded === "panel12"}
            onChange={handleChange("panel12")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="bg-secondary h-12"
            >
              <Typography className="font-medium xl:text-lg text-base pl-4">
                When will my membership expire?
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="p-7">
              <p className="mb-4 leading-7 xl:text-base text-sm">
                Once you make a booking, in most cases the Supperclub partner
                venue will usually call or email you to re-confirm your
                reservation details. In rare cases, if your selected date is
                fully booked, the venue with notify you and your can choose
                another date directly with them.
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion
            className="border-t-2  border-secondary50"
            transition="0.6s ease-in"
            expanded={expanded === "panel13"}
            onChange={handleChange("panel13")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="bg-secondary h-12"
            >
              <Typography className="font-medium xl:text-lg text-base pl-4">
                When will my membership expire?
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="p-7">
              <p className="mb-4 leading-7 xl:text-base text-sm">
                To reschedule your booking, you can contact the venue directly
                or email{" "}
                <span className="text-primary">
                  reservations@supperclubme.com
                </span>{" "}
                with your new date.
              </p>
              <p className="mb-4 leading-7 xl:text-base text-sm">
                For any cancellations, the booking fee paid will be returned to
                the members account as booking credit to be used towards the
                next booking.
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion
            className="border-t-2  border-secondary50"
            transition="0.6s ease-in"
            expanded={expanded === "panel14"}
            onChange={handleChange("panel14")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="bg-secondary h-12"
            >
              <Typography className="font-medium xl:text-lg text-base pl-4">
                Why cant I make a booking for some offers? Are there blackout
                days?
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="p-7">
              <p className="mb-4 leading-7 xl:text-base text-sm">
                Once you become a member, you will see the booking calenders for
                each offer and you can make as many reservations as you would
                like.
              </p>
              <p className="mb-4 leading-7 xl:text-base text-sm">
                If you can see the calender but certain dates are blocked out,
                that is simply because the offer is unavailable for booking on
                those days. If you think the calender booking options are
                incorrect for any offer, please let us know at{" "}
                <span className="text-primary">
                  reservations@supperclubme.com
                </span>{" "}
                and we will double check it for you.{" "}
              </p>
              <p className="mt-8 leading-7 xl:text-base text-sm">
                We do our best to ensure most offers are valid all the time,
                excluding public holidays.
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion
            className="border-t-2  border-secondary50"
            transition="0.6s ease-in"
            expanded={expanded === "panel15"}
            onChange={handleChange("panel15")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="bg-secondary h-12"
            >
              <Typography className="font-medium xl:text-lg text-base pl-4">
                Do you have an affiliate program?
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="p-7">
              <p className="mb-4 leading-7 xl:text-base text-sm">
                Yes. You will earn 30AED for every 12 month membership purchase
                and 20AED for every 6 month memberhip purchased using your
                unique referral link. Not applicable to purchases using promo
                codes. Payouts are applicable on paid full price memberships.
              </p>
              <p className="mb-4 leading-7 xl:text-base text-sm">
                If you can see the calender but certain dates are blocked out,
                that is simply because the offer is unavailable for booking on
                those days. If you think the calender booking options are
                incorrect for any offer, please let us know at{" "}
                <span className="text-primary">
                  reservations@supperclubme.com
                </span>{" "}
                and we will double check it for you.{" "}
              </p>
              <p className="mb-8 leading-7 xl:text-base text-sm">
                There is no limit on your earnings from affiliate sales. You may
                earn as much or as frequently as you would like. For more
                information about the affiliate program, check
                <Link href="" className="text-primary">
                  here.
                </Link>
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion
            className="border-t-2  border-secondary50"
            transition="0.6s ease-in"
            expanded={expanded === "panel16"}
            onChange={handleChange("panel16")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="bg-secondary h-12"
            >
              <Typography className="font-medium xl:text-lg text-base pl-4">
                Need Help? Contact Us
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="p-7">
              <p className="mb-4 leading-7 xl:text-base text-sm">
                For questions about becoming a member or general inquiries email{" "}
                <span className="text-primary">support@supperclubme.com</span>
              </p>
              <p className="mb-4 leading-7 xl:text-base text-sm">
                FFor help with bookings, email{" "}
                <span className="text-primary">
                  reservations@supperclubme.com
                </span>
              </p>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>

      <AboutUsForm />
    </div>
  );
}

export default FAQs;
