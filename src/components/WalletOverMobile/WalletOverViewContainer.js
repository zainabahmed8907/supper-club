import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserWallet } from "@/store/services/user.service";
import Spinner from "../Spinner/Spinner";
import WalletTransactionsCard from "./WalletTransactionsCard";

function WalletOvervieMobile() {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(5);
  const [pageNo, setPageNo] = useState(1);

  const [limit, setLimit] = useState(5);
  const { wallet, loading, walletTransactions } = useSelector(
    (state) => state.user
  );

  const ref = useRef();

  useEffect(() => {
    dispatch(
      getUserWallet({ pageSize: pageSize, limit: limit, pageNo: pageNo })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, pageSize, limit, pageNo]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = ref.current;


    // Check if user has scrolled to the bottom
    if (scrollTop + clientHeight >= scrollHeight) {
      if (pageSize <= walletTransactions?.length ) {
        setPageNo((prevPage) => prevPage + 1);
        setLimit((prev) => prev + 5);
        setPageSize((prev) => prev + 5);
      }
    }
  };


  return (
    <div
      className="xs:w-[24rem] xss:w-[21rem] md:w-[34rem] max-h-[57.2rem] h-[57.2rem]  overflow-y-scroll bg-white p-3 block m-auto"
      ref={ref}
      onScroll={handleScroll}
    >
      <WalletTransactionsCard
        walletTransactions={walletTransactions}
        wallet={wallet}
      />
      {loading ? <Spinner /> : ""}
    </div>
  );
}

export default WalletOvervieMobile;
