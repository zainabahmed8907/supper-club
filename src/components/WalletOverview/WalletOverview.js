import React, { useEffect, useRef, useState } from "react";
import WalletTransactions from "../WalletTransactions/WalletTransactions";
import { useDispatch, useSelector } from "react-redux";
import { getUserWallet } from "@/store/services/user.service";
import Spinner from "../Spinner/Spinner";

function WalletOverview() {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(5);
  const [pageNo, setPageNo] = useState(1);

  const [limit, setLimit] = useState(5);
  const { wallet, loading, walletTransactions } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(
      getUserWallet({ pageSize: pageSize, limit: limit, pageNo: pageNo })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, limit, pageNo]);

  // useEffect(() => {

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [loading]);
  const containerRef = useRef(null);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = containerRef.current;


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
    <div>
      <WalletTransactions
        loading={loading}
        walletTransactions={walletTransactions}
        wallet={wallet}
        ref={containerRef}
        handleScroll={handleScroll}
      />
      {loading ? <Spinner /> : ""}
    </div>
  );
}

export default WalletOverview;
