import DistributorCard from "../DistributorCard/DistributorCard";
import MotherBabyImg from "public/images/distributors/mother_baby.png";
import Dubaiyye from "public/images/distributors/dubaieye.png";
import BusinessNews from "public/images/distributors/business_news.png";
import Zawya from "public/images/distributors/zawya.png";
import MidEast from "public/images/distributors/mid_east.png";
import TravelMarkets from "public/images/distributors/travel_markets.png";
import ExternalLink from "public/images/external-link-line.png";
import Link from "next/link";

function AsSeenOn() {
  return (
    <div
      className="w-full h-4/5 bg-secondary lg:py-14 py-10 px-2 xl:px-10 flex flex-col items-center 4xl:px-32 4xxl:px-56 5xl:px-86
      6xl:px-100 7xl:px-108 3xl:px-28 2xl:px-40 lg:px-32
     lg:mt-24 md:mt-36 mdb:mt-44 xl:mt-24 2xl:mt-28 mt-10"
    >
      <div className="flex flex-col items-center ">
        <p className="text-2xl xl:text-4xl font-bold">As Seen On</p>
        <div className="border-primary border-b-4 w-20 h-1 pb-2 pt-4"></div>
      </div>
      <div className="lg:w-1/2 md:w-full w-[17.8rem] xl:pt-4 pt-8 m-auto">
        <p className="text-center text-base  xl:text-lg">
          Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using Content here, content making.
        </p>
      </div>
      <div className="m-auto  sm:pl-20 lg:pl-0">
        <div className="flex flex-wrap justify-center xl:pt-16 pt-10 mdb:px-56 lg:px-20">
        <Link href="" className="w-1/2 xl:w-1/4 block" target="_blank">
            <DistributorCard
              img={Dubaiyye}
              altText="Dubaii"
              linkImage={ExternalLink}
            />
          </Link>
          <Link
            href="https://www.travelandmarkets.com/2022/09/15/supperclub-entitles-you-to-5-star-luxury-culinary-and-lifestyle-experiences-at-exceptional-rates/"
            className="w-1/2 xl:w-1/4"
            target="_blank"
          >
            <DistributorCard img={TravelMarkets} altText="travel markets" />
          </Link>
          <Link
            href="https://www.zawya.com/en/press-release/companies-news/introducing-supperclub-kbsn3wnk"
            className="w-1/2 xl:w-1/4"
            target="_blank"
          >
            <DistributorCard img={Zawya} altText="zawya" />
          </Link>

          <Link
            href="https://www.businessnewse.com/2022/09/16/supperclub-entitles-you-to-5-star-luxury-culinary-and-lifestyle-experiences-at-exceptional-rates/"
            className="w-1/2 xl:w-1/4"
            target="_blank"
          >
            <DistributorCard img={BusinessNews} altText="business news" />
          </Link>

          <Link
            href="https://mid-east.info/the-premium-membership-discount-platform-that-entitles-you-to-5-star-luxury-culinary-and-lifestyle-experiences-at-exceptional-rates/"
            className="w-1/2 xl:w-1/4"
            target="_blank"
          >
            <DistributorCard img={MidEast} altText="mid east" />
          </Link>

          <Link
            href="https://www.motherbabychild.com/2022/things-to-do/indulge-in-lavish-culinary-and-lifestyle-experiences-at-exceptional-rates-with-supperclub/"
            target="_blank"
            className="w-1/2 xl:w-1/4"
          >
            <DistributorCard img={MotherBabyImg} altText="mother baby image" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AsSeenOn;
