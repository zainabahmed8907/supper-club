import LoginForm from "@/components/LoginForm/LoginForm";
import StoreProvider from "@/components/StoreProvider/StoreProvider";

export default function Login({ searchParams }) {

  
  return (
    <>
  
      <div className="container pb-20 xl:-mt-14 2xl:-mt-0">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="shadow-three mx-auto max-w-[500px] rounded bg-[#fff2f20f] px-6 py-10 
            sm:p-[60px] backdrop-blur-2xl border-t-[3px] border-primary
            
            lg:h-[1rem] xl:h-[30rem] 3xl:h-[35rem] 4xl:h-[44.5rem] 4xxl:h-[50rem] overflow-auto">
              <h3 className="mb-3 text-center text-xl font-medium text-white dark:text-white sm:text-2xl">
                Hi, Welcome Back!
              </h3>
              <p className="mb-5 md:mb-11 text-center text-sm text-white font-normal ">
                Login into your account
              </p>
              <StoreProvider>
             <div className=" pr-2">
             <LoginForm loginFrom={searchParams?.from} />
             </div>
              </StoreProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
