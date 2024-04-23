import SignUpForm from "@/components/LoginForm/SignUpForm";
import { Suspense } from "react";

export default function SignUp() {
  return (
    <div className="container">
      <div className="-mx-4 flex flex-wrap">
        <div className="w-full px-4">
          <div
            className="shadow-three mx-auto max-w-[500px] rounded bg-[#fff2f20f] px-6 py-10 sm:p-[60px] backdrop-blur-2xl 
          border-t-[3px] border-primary xl:mb-10"
          >
            <h3 className="mb-3 text-center text-xl font-medium text-white dark:text-white sm:text-2xl">
              Get Started with SupperClub
            </h3>
            <p className="mb-5 md:mb-11 text-center text-sm text-white font-normal">
              Getting started is easy
            </p>
            <Suspense fallback={null}>
              <div className="lg:h-[10rem] xl:h-[10.8rem] 2xl:h-[18rem] 3xl:h-[20rem] 4xl:h-[30rem] 4xxl:h-[32rem] overflow-auto pr-2">
                <SignUpForm />
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
