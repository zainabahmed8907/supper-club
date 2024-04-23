import Image from "next/image";

import RightIcon from "public/images/distributors/rightIcon.png";
import wrongIcon from "public/images/distributors/wrongicon.png";
function MemberShipTable() {
  return (
    <>
      <table
        className=" border-collapse border-b-2 border-r-2 border-l-2 lg:border-tableBorder 
      lg:block hidden rounded-bl-3xl rounded-tl-3xl rounded-tr-3xl rounded-br-3xl "
      >
        <thead>
          <tr className="bg-primary text-white text-sm xl:text-lg 3xl:text-xl font-normal">
            <td className="rounded-ss-3xl text-justify px-4  2xl:px-8 3xl:px-12">
              What makes us <br /> different?
            </td>
            <td className="text-center px-4  2xl:px-8 3xl:px-12">
              Exclusion 5 star <br />
              others
            </td>
            <td className="text-center px-4  2xl:px-8 3xl:px-12 ">
              Unlimited offer
              <br /> usage
            </td>
            <td className="text-center px-4  2xl:px-8 3xl:px-12">
              Unlimited guests <br />
              allowed
            </td>
            <td className="text-center px-4  2xl:px-8 3xl:px-12">
              No codes or vouchers <br />
              required
            </td>
            <td className="text-center p-3  rounded-tr-3xl">
              Seamless online <br /> bookings
            </td>
          </tr>
        </thead>
        <tbody>
          <tr
            className="lg:text-sm xl:text-sm 2xl:text-xl 3xl:text-2xl 
          font-normal p-8
          border border-tableBorder
          bg-tablebg"
          >
            <td
              className="font-bold text-sm xl:text-lg 3xl:text-xl
                        text-justify px-4  2xl:px-8 3xl:px-12

            "
            >
              Supperclub
            </td>
            <td className="p-8">
              <Image src={RightIcon} alt="right icon" className="m-auto" />
            </td>
            <td>
              <Image src={RightIcon} alt="right icon" className="m-auto" />
            </td>{" "}
            <td>
              <Image src={RightIcon} alt="right icon" className="m-auto" />
            </td>{" "}
            <td>
              <Image src={RightIcon} alt="right icon" className="m-auto" />
            </td>{" "}
            <td>
              <Image src={RightIcon} alt="right icon" className="m-auto" />
            </td>
          </tr>
          <tr className="lg:text-sm  xl:text-sm 2xl:text-xl 3xl:text-2xl font-normal p-8 rounded-br-3xl border-tableBorder">
            <td
              className="  font-bold  rounded-bl-3xl
            text-justify px-4  2xl:px-8 3xl:px-12
             text-sm xl:text-lg 3xl:text-xl"
            >
              Others
            </td>
            <td className="p-8">
              <Image src={wrongIcon} alt="right icon" className="m-auto" />
            </td>{" "}
            <td>
              <Image src={wrongIcon} alt="right icon" className="m-auto" />
            </td>{" "}
            <td>
              <Image src={wrongIcon} alt="right icon" className="m-auto" />
            </td>{" "}
            <td>
              <Image src={wrongIcon} alt="right icon" className="m-auto" />
            </td>{" "}
            <td>
              <Image src={wrongIcon} alt="right icon" className="m-auto" />
            </td>{" "}
          </tr>
        </tbody>
      </table>

      <table
        className="w-max md:w-100 border-collapse  
        m-auto  lg:pt-4  lg:hidden block rounded-bl-3xl
          rounded-br-3xl "
        id="shadow"
      >
        <thead>
          <tr className="bg-primary text-white font-normal pt-5 ">
            <td className="rounded-ss-3xl text-center p-3 text-[15px] w-[109px] md:w-full ">
              What makes us <br /> different?
            </td>
            <td className="text-center p-2 text-[15px]">Supperclub</td>
            <td className="text-center p-2 rounded-se-3xl text-[15px]">
              Others
            </td>
          </tr>
        </thead>
        <tbody>
          <tr className="border-2 border-[#FCFAF7] bg-white" id="tableShadow">
            <td className="px-5 w-[137.4px] md:w-full py-4 text-sm font-medium">
              Exclusion 5-star offers
            </td>
            <td className="bg-tablebg w-[94.31px] md:w-full">
              <Image src={RightIcon} alt="right icon" className="m-auto" />
            </td>
            <td className=" w-[94.31px] md:w-full">
              <Image src={wrongIcon} alt="right icon" className="m-auto" />
            </td>
          </tr>
          <tr className="border-2 border-[#FCFAF7] bg-white">
            <td className="px-5 w-[137.4px] py-4 text-sm font-medium">
              Unlimited offer usage
            </td>
            <td className="bg-tablebg  w-[94.31px]">
              <Image src={RightIcon} alt="right icon" className="m-auto" />
            </td>
            <td className=" w-[94.31px]">
              <Image src={wrongIcon} alt="right icon" className="m-auto" />
            </td>
          </tr>

          <tr className="border-2 border-[#FCFAF7] bg-white">
            <td className="px-5 w-[137.4px] py-4 text-sm font-medium">
              Unlimited guests allowed
            </td>
            <td className="bg-tablebg  w-[94.31px]">
              <Image src={RightIcon} alt="right icon" className="m-auto" />
            </td>
            <td className=" w-[94.31px]">
              <Image src={wrongIcon} alt="right icon" className="m-auto" />
            </td>
          </tr>
          <tr className="border-2 border-[#FCFAF7] bg-white">
            <td className="px-5 w-[137.4px] py-4 text-sm font-medium">
              No codes or vouchers required
            </td>
            <td className="bg-tablebg  w-[94.3px]">
              <Image src={RightIcon} alt="right icon" className="m-auto" />
            </td>
            <td className=" w-[94.31px]">
              <Image src={wrongIcon} alt="right icon" className="m-auto" />
            </td>
          </tr>
          <tr className="bg-white border-2 border-[#FCFAF7] ">
            <td className="px-5 w-[137.4px] py-4 text-sm font-medium">
              Seamless online bookings
            </td>
            <td className="bg-tablebg w-[94.3px]">
              <Image src={RightIcon} alt="right icon" className="m-auto " />
            </td>
            <td className=" w-[94.31px]">
              <Image src={wrongIcon} alt="right icon" className="m-auto" />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default MemberShipTable;
