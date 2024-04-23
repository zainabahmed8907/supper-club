import QRCode from "public/images/download_options/QR code.png";
import AppleStore from "public/images/download_options/apple_Store.png";
import GooglePlay from "public/images/download_options/google_play.png";
import mobile from "public/images/download_options/mobile.png";
import ellipse from "public/images/download_options/ellipse.png";

import Image from "next/image";
export default function DownloadOptionsSection() {
    return (
        <div className="mt-2 bg-gradient-to-b bg from-black to-primary w-full h-108 flex justify-between">
            <div className="flex flex-col justify-end pb-20 -mt-20">
                <p className="text-white text-2xl xl:text-4xl font-bold pl-20">
                    What are you <br /> waiting for?
                </p>
                <p className="mt-4 text-sm xl:text-xl pl-20 text-white font-normal">
                    Download the app now
                </p>
                <div className="flex pl-20 pt-4">
                    <div className="pr-3">
                        <Image src={QRCode} alt="qr code" />
                    </div>
                    <div className="mt-2">
                        <p className="text-xs xl:text-sm text-white">Available in </p>
                        <p className="text-white text-lg xl:text-2xl mt-1 font-bold">Dubai</p>
                        <p className="text-white text-lg xl:text-2xl font-bold">Abu Dhabi</p>
                        <p className="text-xs xl:text-sm text-white mt-1">United Arab Emirates </p>

                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="w-106 h-102 bg-white rounded-full -mt-20">
                    <Image src={mobile} alt="mobile" className="m-auto pl-20" width={635} />
                </div>
            </div>
            <div className="flex flex-col justify-end pb-20 pr-10 ">
                <div className="w-48 rounded-xl bg-white flex px-4 py-2">
                    <Image src={GooglePlay} alt="google play icon" className="mr-2" />
                    <div>
                        <p className="text-xs text-gray">GET IT ON</p>
                        <p className="text-xl font-semibold">
                            Google Play
                        </p>
                    </div>
                </div>
                <div className="w-48 rounded-xl bg-white flex px-4 py-2 mt-4">
                    <Image src={AppleStore} alt="google play icon" className="mr-2" />
                    <div>
                        <p className="text-xs text-gray">GET IT ON</p>
                        <p className="text-xl font-semibold">
                            App Store
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
