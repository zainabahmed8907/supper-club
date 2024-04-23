import Image from "next/image";
import TickMark from "public/images/about_us/tick mark.png";

function AboutUsOptions() {
  return (
    <div
      className="pt-10
        w-full
        "
    >
      <h3 className="xl:text-2xl 4xl:text-3xl font-bold">Why Join Supperclub</h3>
      <div className="flex pt-10 lg:flex-row flex-col">
        <div className="xl:w-[17.5rem] 2xl:w-[26rem] 4xl:w-[32rem] 5xl:w-[35rem] pb-6 lg:pb-0 b-6">
          <Image src={TickMark} alt="" />

          <p
            className="pt-2 pb-3 font-bold 
            text-lg 5xl:text-3xl 4xl:text-2xl 3xl:text-xl 2xl:text-xl
          text-gray"
          >
            Simplicity
          </p>
          <div className="block ">
            <p className="text-sm  2xl:text-base 4xl:text-lg 5xl:text-xl">
              One membership entitles you to unlimited reservations at our 5
              star partners
            </p>
          </div>
        </div>
        <div className="xl:w-[17.5rem] 2xl:w-[26rem] 4xl:w-[32rem] 5xl:w-[35rem] pb-6 lg:pb-0 lg:ml-10">
          <Image src={TickMark} alt="" />
          <p className="pt-2 pb-3 font-bold text-lg text-gray  5xl:text-3xl 3xl:text-xl 2xl:text-xl">
            Convenience
          </p>
          <div className="block ">
            <p
              className="text-sm  2xl:text-base 4xl:text-lg 5xl:text-xl"
            >
              Make a reservation in a few seconds online
            </p>
          </div>
        </div>
        <div className="xl:w-[17.5rem] 2xl:w-[26rem] 4xl:w-[32rem] 5xl:w-[35rem] pb-6 lg:pb-0 lg:ml-10">
          <Image src={TickMark} alt="" />
          <p className="pt-2 pb-3 font-bold text-lg text-gray  5xl:text-3xl 3xl:text-xl  2xl:text-xl">
            Quality
          </p>
          <div className="block ">
            <p className="text-sm  2xl:text-base 4xl:text-lg 5xl:text-xl">
              We only partner with 5-star, premium restaurants, spas and hotels{" "}
            </p>
          </div>
        </div>
        <div className="xl:w-[17.5rem] 2xl:w-[26rem] 4xl:w-[32rem] 5xl:w-[35rem] pb-2 lg:pb-0 lg:ml-10">
          <Image src={TickMark} alt="" />
          <p className="pt-2 pb-3 font-bold text-lg text-gray  5xl:text-3xl 3xl:text-xl  2xl:text-xl">
            Exclusivity
          </p>
          <div className="block ">
            <p className="text-sm  2xl:text-base 4xl:text-lg 5xl:text-xl">
              Find places and amazing prices on SupperClub that are not
              available elsewhere{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsOptions;
