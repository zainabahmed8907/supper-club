import React from "react";

export default function Spinner() {
  return (
    <div className=" flex justify-center items-center">
       <div
      className="w-20 h-20 animate-spin rounded-full border-10 border-solid border-primary
       border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
    </div>
  );
}
