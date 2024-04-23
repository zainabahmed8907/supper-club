import ResetPasswordForm from "@/components/LoginForm/ResetPassword";
import StoreProvider from "@/components/StoreProvider/StoreProvider";

export default function ForgotPassword() {
  return (
    <>
      <div className="container h-112">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="shadow-three mx-auto max-w-[500px] rounded bg-[#fff2f20f] px-6 py-10 sm:p-[60px] backdrop-blur-2xl border-t-[3px] border-primary">
              <h3 className="mb-3 text-center text-xl font-medium text-white dark:text-white sm:text-2xl">
                Reset Password
              </h3>
              <p className="mb-5 md:mb-11 text-center text-sm text-white font-normal ">
               Please set your new password
              </p>
              <StoreProvider>
                <ResetPasswordForm />
              </StoreProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
