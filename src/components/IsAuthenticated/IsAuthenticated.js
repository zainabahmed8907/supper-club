"use client";

import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import { useDispatch } from "react-redux";
import { getUserProfile } from "@/store/services/user.service";

const IsAuthenticated = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfile())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  }, [dispatch]);

  return isLoading ? <Spinner /> : children;
};

export default IsAuthenticated;
