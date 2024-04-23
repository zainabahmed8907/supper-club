import React from "react";

function StoryBanner() {
    return (
        <div className=" bg-footerBg w-full h-120 xl:h-98 2xl:h-100 3xl:h-103 5xl:h-112">
            <div className="xl:px-20 2xl:px-32 4xl:px-40 6xl:px-56 px-4">
                <h4
                    className="pt-16 font-bold
               text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 5xl:text-5xl
               text-primary
                "
                >
                    Our Story
                </h4>
                <h3
                    className="text-white 
                    font-bold
                    pt-5 5xl:pt-12 4xl:pt-13
               text-2xl xl:text-4xl 3xl:text-5xl 5xl:text-7xl
               w-4/5 xl:w-3/5
                "
                >
                    SUPPERCLUB WAS CREATED TO BREAK THE MOULD.
                </h3>
                <div className="flex justify-between lg:flex-row flex-col">
                    <p
                        className="text-white
                        pt-6 5xl:pt-16
                xl:text-base  4xl:text-lg 5xl:text-2xl
                w-4/5 xl:w-3/5
                "
                    >
                        SupperClub was created to be very different to what was available in
                        the market. With so many online platforms offering endless discount
                        options, it can be overwhelming. Now, with a single SupperClub
                        membership, you are entitled to dine and indulge at 5-star partner
                        venues at exceptional rates. No vouchers, no codes, no cards. Nobody
                        needs to know you are paying less than the table next to you.
                        <br />
                        Discreet, seamless and very very sophisticated.
                    </p>
                    <div className="flex lg:justify-end lg:items-end flex-col items-start
                    text-white pr-20 pt-10 lg:pt-0
                   text-base xl:text-base 2xl:text-lg 4xl:text-xl 5xl:text-3xl">
                        <p>SupperClubme New Portal</p>
                        <p>Golden Mile 7, Palm Jumeirah</p>
                        <p>Dubai, UAE</p>
                        <p className="text-primary underline">support@supperclubme.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoryBanner;
