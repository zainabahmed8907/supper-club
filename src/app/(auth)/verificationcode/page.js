import VerificationCodeForm from "@/components/LoginForm/VerificationCodeForm";
import StoreProvider from "@/components/StoreProvider/StoreProvider";

export default function VerificationCode() {
  return (
    <>
      <div className="container h-112">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="shadow-three mx-auto max-w-[500px] rounded bg-[#fff2f20f] px-6 py-10 sm:p-[60px] backdrop-blur-2xl border-t-[3px] border-primary">
              <h3 className="mb-3 text-center text-xl font-medium text-white dark:text-white sm:text-2xl">
                Email Verification Code
              </h3>
              <p className="mb-5 md:mb-11 text-center text-sm text-white font-normal ">
                Enter the code we just sent to your Mail
              </p>
              <StoreProvider>
                <VerificationCodeForm />
              </StoreProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
