"use client";
import OffersOptions from "@/components/OfferOptions/OfferOptions";
import OfferPageBanner from "@/components/OfferPageBanner/OfferPageBanner";
import RestaurantsCarousel from "@/components/NewRestaurants/RestaurantsCarousel";
import OfferFields from "@/components/OfferFields/OfferFields";
import { Suspense, useState, useEffect } from "react";
import Lazyloader from "@/components/LazyLoader/LazyLoader";
import { useSelector } from "react-redux";
import axiosInstance from "@/store/services/config";
import { fetchDynamicContent } from "@/lib/utils";

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { filteredOffers } = useSelector((state) => state.offer);
  const { searchedOffers } = useSelector((state) => state.offer);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const [favOffers, setFavOffers] = useState([]);
  const [mainBanner, setMainBanner] = useState(null);



  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_KEY
        }/offer?pageNo=${page}&pageSize=${10}`,
        {
          next: {
            revalidate: 10,
          },
        }
      );
      const offer_data = await response.json();

      setOffers((prev) => [...prev, ...offer_data?.data?.data]);

      setTotalPages(offer_data?.data?.meta?.pagination?.pageCount);
      setTotalRestaurants(offer_data?.data?.meta?.pagination?.total);
      if (page == offer_data?.data?.meta?.pagination?.pageCount) {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getFavoriteOffers = async () => {
    try {
      const response = await axiosInstance.get("/user/saved-offers");
      const data = response.data;
      setFavOffers(data?.data);

      return data;
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
    if (page == totalPages) {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    getFavoriteOffers();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      // Load more data when the user has scrolled to a certain point above the bottom
      if (scrollHeight - scrollTop - clientHeight < 1200) {
        setPage(page + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchContent = async (pathname) => {
    try {
      const content = await fetchDynamicContent(pathname);
      const mainBanner = content?.data?.data?.find(
        (content) => content?.attributes?.Type === "OFFER_BANNER"
      );
      const mediaType = mainBanner?.attributes?.Banner?.data?.attributes?.mime?.includes('video') ? 'video' : 'image';
      mainBanner.mediaType = mediaType;
      setMainBanner(mainBanner);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchContent("offers");
  }, []);

  return (
    <div className="pt-20">
      <Suspense fallback={null}>
        <OfferPageBanner
          media={mainBanner?.attributes?.Banner?.data?.attributes?.url}
          mediaType={mainBanner?.mediaType || 'image'}
          title={mainBanner?.attributes?.Title?.replace('\\n', '<br />')}
        />
      </Suspense>

      <Suspense fallback={null}>
        <OffersOptions />
      </Suspense>

      <OfferFields totalRestaurants={totalRestaurants} />

      <Suspense
        fallback={
          <div className="w-full m-auto">
          </div>
        }
      >
        <Lazyloader
          offers={offers}
          filteredOffers={filteredOffers}
          searchedOffers={searchedOffers}
          loading={loading}
          favOffers={favOffers}
        />
      </Suspense>

      <div className="border-t-4  border-secondary ml-28 mr-28 xl:mb-24"></div>

      <div className="lg:pl-20 2xl:pl-40 3xl:pl-44 4xl:pl-60 4xxl:pl-72 5xl:pl-98 7xl:pl-104 ml-5 mt-12 xl:mb-52 mb-40 ">
        <p className="text-3xl font-bold">New On SupperClub</p>
        <div className="border-primary border-b-4 w-20 h-1 pb-6"></div>
        <div className="flex 4xl:justify-center xl:ml-4 2xl:ml-4 3xl:-ml-0 ml-32">
          <Suspense fallback={null}>
            <RestaurantsCarousel />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
