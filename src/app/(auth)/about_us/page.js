import AboutUsForm from "@/components/AboutUsForm";
import AboutUsOptions from "@/components/AboutUsOptions/AboutUsOptions";
import StoryBanner from "@/components/StoryBanner/StoryBanner";
import { Suspense } from "react";

function AboutUs() {
  return (
    <div >
      <div className="h-48 5xl:h-52 w-full flex items-center">
        <p
          className="text-primary font-semibold
                pt-20
                xl:px-20 2xl:px-32 4xl:px-40 6xl:px-56 px-4
                text-xl lg:text-2xl xl:text-4xl 3xl:text:5xl 5xl:text-5xl
                 "
        >
          Get To Know Us
        </p>
      </div>
      <Suspense>
        <StoryBanner />
      </Suspense>

      <Suspense>
      <div className="xl:px-20 2xl:px-32 4xl:px-40 6xl:px-56 px-4">
        <AboutUsOptions />
        </div>
      </Suspense>
      <Suspense>
        <AboutUsForm />
      </Suspense>
    </div>
  );
}

export default AboutUs;
