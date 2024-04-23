import Image from "next/image";
import { useState } from "react";
import Spinner from "../Spinner/Spinner";
import Icon from "public/images/dashboard/export.svg";
import { getBillingPortLink } from "@/store/services/user.service";

function ManageBillingBtn({}) {
  const [loading, setLoading] = useState(false);

  const getBillingLink = async () => {
    setLoading(true);
    try {
      const response = await getBillingPortLink();
      if (response?.data?.url) {
        window.open(response.data?.url, "_blank");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <button
      className="flex justify-center w-[14.68rem] h[2.75rem] bg-primary text-center text-white text-lg font-bold p-[.427rem] rounded-full items-center"
      onClick={() => getBillingLink()}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          <p className="mr-2"> Manage Billing</p>
          <Image src={Icon} alt="manage bolling" />
        </>
      )}
    </button>
  );
}

export default ManageBillingBtn;
