"use client";
import Image from "next/image";
import Link from "next/link";
import RightIcon from "public/images/distributors/rightIcon.png";
import lock from "public/images/lock.png";
import wallet from "public/images/wallet-money.png";

import styles from "./index.module.css";

function BenifitsTable() {
  return (
    <div className={styles.tableWrapper}>
      <table className="lg:w-[1180px] m-auto">
        <thead>
          <tr className="border-b-2 border-primary bg-white">
            <th className="text-start p-4 rounded-tl-3xl ">Benifits</th>
            <th className={`text-center ${styles.scrollable}`}>Gold</th>
            <th className={`text-center ${styles.scrollable}`}>Diamond</th>
            <th className={`rounded-tr-3xl text-center ${styles.scrollable}`}>
              Platinum
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="bg-white">
            <td className="lg:p-4 p-2 w-1/2 ">
              <div className="flex items-center">
                <Image src={wallet} alt="" className="mr-2" />
                <p> Booking Credit</p>
              </div>
            </td>
            <td className={`text-center ${styles.scrollable}`}>AED 50</td>
            <td className={`text-center ${styles.scrollable}`}>AED 100</td>
            <td className={`text-center ${styles.scrollable}`}>AED 250</td>
          </tr>
          <tr className="bg-rowbg">
            <td className={` text-start  lg:p-4 p-2  `}>
              <p className=" lg:w-full">Access to SupperClub Concierge</p>{" "}
            </td>
            <td className={`text-center ${styles.scrollable}`}>
              <Image src={RightIcon} alt="right icon" className="m-auto" />
            </td>
            <td className={`text-center ${styles.scrollable}`}>
              <Image src={RightIcon} alt="right icon" className="m-auto" />
            </td>
            <td className={`text-center ${styles.scrollable}`}>
              <Image src={RightIcon} alt="wrong icon" className="m-auto" />
            </td>
          </tr>
          <tr className="bg-white">
            <td className="sticky min-w-24 max-w-36 z-10 left-0 text-start  lg:p-4 p-2  ">
              <p className="lg:w-full">
                Unlimited Discounts for Unlimited Guests{" "}
              </p>
            </td>
            <td className={`text-center ${styles.scrollable}`}>
              <Image src={RightIcon} alt="right icon" className="m-auto" />
            </td>
            <td className={`text-center ${styles.scrollable}`}>
              <Image src={RightIcon} alt="right icon" className="m-auto" />
            </td>
            <td className={`text-center ${styles.scrollable}`}>
              <Image src={RightIcon} alt="wrong icon" className="m-auto" />
            </td>
          </tr>
          <tr className="bg-rowbg">
            <td className="sticky min-w-24 max-w-36 z-10 left-0 text-start  lg:p-4 p-2  ">
              <p className="lg:w-full">
                Exclusive Discounts Automatically on the Bill{" "}
              </p>
            </td>
            <td className={`text-center ${styles.scrollable}`}>
              <Image src={RightIcon} alt="right icon" className="m-auto" />
            </td>
            <td className={`text-center ${styles.scrollable}`}>
              <Image src={RightIcon} alt="right icon" className="m-auto" />
            </td>
            <td className={`text-center ${styles.scrollable}`}>
              <Image src={RightIcon} alt="wrong icon" className="m-auto" />
            </td>
          </tr>
          <tr className="bg-white">
            <td className="sticky min-w-24 max-w-36 z-10 left-0 text-start  lg:p-4 p-2 ">
              <p className="lg:w-full">One Membership for the Entire Family</p>{" "}
            </td>
            <td className={`text-center ${styles.scrollable}`}>
              <Image src={RightIcon} alt="right icon" className="m-auto" />
            </td>
            <td className={`text-center ${styles.scrollable}`}>
              <Image src={RightIcon} alt="right icon" className="m-auto" />
            </td>
            <td className={`text-center ${styles.scrollable}`}>
              <Image src={RightIcon} alt="wrong icon" className="m-auto" />
            </td>
          </tr>
          <tr className="bg-rowbg">
            <td className="sticky min-w-24 max-w-36 z-10 left-0 text-start  lg:p-4 p-2  ">
              <p className="lg:w-full">Brunch/Dinner Buffet for Two </p>
            </td>
            <td className={`text-center ${styles.scrollable}`}>
              <Image src={lock} alt="right icon" className="m-auto" />
            </td>
            <td className={`text-center ${styles.scrollable}`}>
              <Image src={lock} alt="right icon" className="m-auto" />
            </td>
            <td className={`text-center ${styles.scrollable}`}>
              <Image src={RightIcon} alt="wrong icon" className="m-auto" />
            </td>
          </tr>
          <tr className="bg-white">
            <td className="sticky min-w-24 max-w-36 z-10 left-0 text-start  lg:p-4 p-2  ">
              <p className="lg:w-full">Lunch/Dinner for Two (x2)</p>{" "}
            </td>
            <td className={`text-center ${styles.scrollable}`}>
              <Image src={lock} alt="right icon" className="m-auto" />
            </td>
            <td className={`text-center ${styles.scrollable}`}>
              <Image src={lock} alt="right icon" className="m-auto" />
            </td>
            <td className={`text-center ${styles.scrollable}`}>
              <Image src={RightIcon} alt="wrong icon" className="m-auto" />
            </td>
          </tr>
          <tr className="bg-white">
            <td
              className="sticky min-w-48 max-w-36 z-10 left-0 text-start  lg:p-4 p-2 bg-white
             rounded-bl-3xl"
            >
              {" "}
            </td>
            <td
              className={`text-center ${styles.scrollable} pr-6 lg:pr-0  pb-10`}
            >
              <p className="text-center text-2xl font-bold mb-1">AED 165</p>
              <div className="lg:w-full m-auto">
                <p className="text-center text-gray lg:text-base text-xs font-medium  mb-4 opacity-80">
                  6 Monts Access to All Offers
                </p>
              </div>
              <div className="flex justify-center items-center">
                <Link
                  href=""
                  className="lg:px-7 px-10 font-semibold py-2 bg-primary text-white text-center rounded-full lg:block hidden"
                >
                  Join Now{" "}
                </Link>

                <Link
                  href=""
                  className="lg:px-7 px-10 font-semibold py-2 bg-primary text-white text-center rounded-full block lg:hidden"
                >
                  Join{" "}
                </Link>
              </div>
            </td>
            <td
              className={`text-center ${styles.scrollable} pr-6 lg:pr-0  pb-10 `}
            >
              <p className="text-center text-2xl font-bold mb-1">AED 165</p>
              <div className="lg:w-full m-auto">
                <p className="text-center text-gray lg:text-base text-xs font-medium  mb-4 opacity-80">
                  12 Monts Access to All Offers
                </p>
              </div>
              <div className="flex justify-center items-center">
                <Link
                  href=""
                  className="lg:px-7 px-10 font-semibold py-2 bg-primary text-white text-center rounded-full lg:block hidden"
                >
                  Join Now{" "}
                </Link>

                <Link
                  href=""
                  className="lg:px-7 px-10 font-semibold py-2 bg-primary text-white text-center rounded-full block lg:hidden"
                >
                  Join{" "}
                </Link>
              </div>
            </td>
            <td
              className={`text-center ${styles.scrollable} rounded-br-3xl pr-6 lg:pr-0  pb-10`}
            >
              <p className="text-center text-2xl font-bold mb-1">AED 165</p>
              <div className="lg:w-full m-auto">
                <p className="text-center text-gray lg:text-base text-xs font-medium  mb-4 opacity-80">
                  12 Monts Access to All Offers
                </p>
              </div>
              <div className="flex justify-center items-center w-full">
                <Link
                  href=""
                  className="lg:px-7 px-10 font-semibold py-2 bg-primary text-white text-center rounded-full lg:block hidden"
                >
                  Join Now{" "}
                </Link>

                <Link
                  href=""
                  className="lg:px-7 px-10 font-semibold py-2 bg-primary text-white text-center rounded-full block lg:hidden"
                >
                  Join{" "}
                </Link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BenifitsTable;
