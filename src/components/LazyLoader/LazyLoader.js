"use client";
import { useEffect } from "react";
import OfferCard from "../OfferCards/OfferCard";
import { ThreeDots } from "react-loader-spinner";

export default function Lazyloader({
  offers,
  filteredOffers,
  searchedOffers,
  loading,
  favOffers,
}) {
  const filterApplied = localStorage.getItem("filterApplied");

  const FilteredResults = ({ filtered_offers }) => {
    return (
      <>
        {filtered_offers?.length > 0 &&
          filtered_offers.map((o) => {
            const slug = o?.attributes?.slug;

            const logo =
              o?.attributes?.Restaurant?.data?.attributes?.Logo?.data;
            const restaurant_name =
              o?.attributes?.Restaurant?.data?.attributes?.Name;
            return (
              <OfferCard
                key={o?.id}
                img={`${o?.attributes?.Cover?.data?.attributes?.formats?.small?.url}`}
                altText="sherton"
                icon={logo}
                width={194}
                height={64}
                cardText={o?.attributes?.Title}
                slug={slug}
                restaurantName={restaurant_name}
                id={o?.id}
              />
            );
          })}
      </>
    );
  };

  const SearchResults = ({ searched_offers }) => {
    return (
      <>
        {searched_offers?.offers?.length > 0 &&
          searched_offers?.offers?.map((o) => {
            const slug = o?.attributes?.slug;

            const logo =
              o?.attributes?.Restaurant?.data?.attributes?.Logo?.data;
            const restaurant_name =
              o?.attributes?.Restaurant?.data?.attributes?.Name;
            return (
              <OfferCard
                key={o?.id}
                img={`${o?.attributes?.Cover?.data?.attributes?.formats?.small?.url}`}
                altText="sherton"
                icon={logo}
                width={194}
                height={64}
                cardText={o?.attributes?.Title}
                slug={slug}
                restaurantName={restaurant_name}
                id={o?.id}
              />
            );
          })}
      </>
    );
  };

  useEffect(() => {
    const clearLocalStorage = () => {
      localStorage.removeItem("filterApplied");
    };

    window.addEventListener("beforeunload", clearLocalStorage);

    return () => {
      window.removeEventListener("beforeunload", clearLocalStorage);
    };
  }, []);

  const AllOffers = ({ all_offers }) => {
    return (
      <>
        {all_offers?.length > 0 &&
          all_offers.map((o) => {
            const slug = o?.attributes?.slug;
            const logo =
              o?.attributes?.Restaurant?.data?.attributes?.Logo?.data;
            const restaurant_name =
              o?.attributes?.Restaurant?.data?.attributes?.Name;
            const coloredText =
              o?.attributes?.Title?.includes("Buy 1 Get 1 Free") &&
              "Buy 1 Get 1 Free";
            const cardText = o?.attributes?.Title?.replace(
              /Buy 1 Get 1 Free/g,
              ""
            );

            return (
              <OfferCard
                key={o?.id}
                img={`${o?.attributes?.Cover?.data?.attributes?.formats?.small?.url}`}
                altText="sherton"
                icon={logo}
                width={194}
                height={64}
                cardText={cardText}
                slug={slug}
                restaurantName={restaurant_name}
                id={o?.id}
                favOffer={favOffers}
                coloredText={coloredText}
              />
            );
          })}
      </>
    );
  };

  return (
    <>
      <div className="mb-20 ">
        <div
          className="mt-10 flex lg:px-20 md:px-4 xl:px-20 2xl:px-40 3xl:px-56 4xl:px-60 4xxl:px-[20rem] 
        5xl:px-[25.5rem] 7xl:px-[32rem] 7xl:-ml-10   w-full  px-2 flex-col md:flex-row items-center flex-wrap justify-center"
        >
          {filteredOffers && searchedOffers?.length < 0 && (
            <FilteredResults filtered_offers={filteredOffers} />
          )}

          {searchedOffers && filteredOffers?.length <= 0 && (
            <SearchResults searched_offers={searchedOffers} />
          )}

          {searchedOffers?.offers?.length <= 0 ?  <div>
              <p className="text-lg font-bold">No Results Found</p>
            </div>:
            (filteredOffers?.length <= 0 && filterApplied) && (
            <div>
              <p className="text-lg font-bold">No Results Found</p>
            </div>
            )}

          {!filterApplied &&
            filteredOffers?.length <= 0 &&
            searchedOffers?.length <= 0 && <AllOffers all_offers={offers} />}
        </div>
      </div>

      {loading && (
        <div>
          <div className="flex justify-center">
            <ThreeDots
              visible={true}
              height="60"
              width="60"
              color="#C39D63"
              radius="9"
              ariaLabel="three-dots-loading"
            />
          </div>
        </div>
      )}
    </>
  );
}
