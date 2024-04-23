import { Avatar } from "@mui/material";
import Image from "next/image";
import InvertedCommasImg from "public/images/inverted_commas.png";
import Testimonial from "public/images/membership_carousel/testimonial.png";

function CarouselCard() {
    return (
        <div className="p-10 2xl:p-12 3xl:p-12">
            <div className="w-[18.7rem] md:w-[22.5rem] lg:h-[24.1rem] lg:w-100 2xl:w-100  4xl:w-[32.5rem] 3xl:w-104
            5xl:w-106 6xl:w-112 7xl:w-116 border-tableBorder border-2 rounded-3xl pt-10 bg-cardbg cursor-pointer">
                <div className="px-8 py-8">
                    <div className="-mt-32" >
                        <Image src={Testimonial} alt="" />
                    </div>
                    <div>
                        <p className="font-bold xl:text-lg 3xl:text-xl">Ama Amopamah</p>
                        <p className="text-gray xl:text-lg 3xl:text-xl">CEO & Founder Inc</p>
                    </div>
                    <div className="pt-4 pb-4">
                        <Image src={InvertedCommasImg} alt="commas" />
                    </div>
                    <div className="text-sm text-gray">
                        <p className="xl:text-lg text-base">
                            AOC at Sofitel JBR is our favourite brunch for a long time & their
                            promos on other platforms are not as good as the one that you have.
                            Since my membership is good for the entire group, I’ll renew my
                            membership just for that brunch alone!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CarouselCard;
