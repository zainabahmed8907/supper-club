import Image from "next/image";
import SpentCreditsIcon from "/public/images/dashboard/credits-spent.svg";
import TotalCredits from "/public/images/dashboard/total-credits.svg";

const WalletTransactionsCard = ({ walletTransactions, wallet }) => {
  return (
    <div>
      {walletTransactions?.length > 0 && (
        <>
          <div className="mx-2 pt-2 flex">
            <div
              className="xss:w-[26.75rem] xs:w-[30rem] h-[4.3rem]
             border border-[#EDE2D0] bg-tablebg rounded-xl flex items-center"
            >
              <div className="w-[5px] h-[25px] bg-primary rounded-tr-lg rounded-br-lg"></div>

              <div className="flex items-center w-1/2">
                <Image
                  src={TotalCredits}
                  alt="total credits"
                  width={50}
                  height={50}
                  className="p-2"
                />

                <div>
                  <p className="text-[10px] text-[#B8B8B8]">Total Credits</p>
                  <p className="xs:text-[18px] xss:text-[14px] text-[#33333] font-bold">
                    {wallet?.availableCredits} AED
                  </p>
                </div>
              </div>
              <div className="w-[2px] h-[35px] bg-secondary50 rounded-tr-lg rounded-br-lg"></div>

              <div className="flex items-center w-1/2">
                <Image
                  src={SpentCreditsIcon}
                  alt="total credits"
                  width={50}
                  height={50}
                  className="p-2"
                />
                <div>
                  <p className="text-[10px] text-[#B8B8B8]">Credits Spent</p>
                  <p className="xs:text-[18px]  xss:text-[14px]  text-[#33333] font-bold">
                    {wallet?.creditsSpent} AED
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <p className="mt-8 pl-2 text-[1.125rem] font-medium">
        Transaction History
      </p>
      <div className="ml-2 w-[40px] h-[5px] bg-primary mt-2"></div>

      {walletTransactions?.length > 0 &&
        walletTransactions?.map((w, i) => (
          <div
            className="xs:[21.7rem] h-auto border p-3
         border-solid border-secondary rounded-xl mt-8"
            key={w?._id}
          >
            <div className="pb-3 flex justify-between items-center">
              <div className="w-fit px-3 h-[1.5rem] rounded bg-[#EDE2D0] flex items-center">
                <p className="font-bold text-sm px-2 ">ID </p>
                <p className="text-sm"> {w?._id.substr(w?._id.length - 4)}</p>
              </div>
              <p className="font-medium">
                {w?.transactionType === "credit"
                  ? `+${w?.totalPoints}AED`
                  : `-${w?.totalPoints}AED`}
              </p>
            </div>
            <div className="pb-1 relative flex  items-center">
              <p className="text-xs font-medium leading-[1rem]">Activity</p>
              <p className="text-xs text-[#7E7E7E] pl-[6px]">
                {w?.activity.toLowerCase().replace("_", " ")}
              </p>
            </div>
            <div className="pb-3 w-[15.75rem]">
              <p className="text-[#7E7E7E] leading-[22px] text-xs line-clamp-2 text-ellipsis overflow-hidden">
              {w?.title}
              </p>
            </div>

            <div className=" flex items-center">
              <p className="text-xs font-medium  pr-3">Date & Time</p>
              <p className="text-xs text-[#7E7E7E] ">
                {" "}
                {new Date(w?.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};
export default WalletTransactionsCard;
