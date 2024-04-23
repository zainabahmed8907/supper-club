"use client";
import BottomNavigationSheet from "@/components/BottomNavigationSheet/BottomNavigationSheet";
import Footer from "@/components/Footer/Footer";
import FooterSmall from "@/components/FooterSmall/FooterSmall";
import Hero from "@/components/Hero/Hero";
import IsAuthenticated from "@/components/IsAuthenticated/IsAuthenticated";
import NavBar from "@/components/NavBar/NavBar";
import StoreProvider from "@/components/StoreProvider/StoreProvider";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children, // will be a page or nested layout
}) {
  const pathname = usePathname();
 


  return (
    <StoreProvider>
      <IsAuthenticated>
        <NavBar showLogin />

        {pathname == "/login" ||
        pathname == "/signup" ||
        pathname == "/forgotpassword" ||
        pathname == "/verificationcode" ||
        pathname == "/resetpassword" ? (
          <>
            <Image
              layout="fill"
              src="/images/hero/hero.jpeg"
              alt="hero"
              className=" object-cover object-top brightness-90 "
            />
            <Hero extraClasses={"sp-bg-image"}>{children}</Hero>
            <FooterSmall />
          </>
        ) : (
          <>
            <div>{children}</div>
            <Footer />
          </>
        )}

      </IsAuthenticated>
    </StoreProvider>
  );
}
