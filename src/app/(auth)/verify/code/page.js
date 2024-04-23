import Spinner from "@/components/Spinner/Spinner";
import VerifyCode from "@/components/VerifyCode/VerifyCode";

async function verifyOauthCode(code) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_KEY}/auth/verify-oauth-code?code=${code}`,
      { cache: "no-store" }
    );
    return response.json();
  } catch (e) {
    return e;
  }
}
export default async function VerificationCode({ searchParams }) {

  
  let verifyData = null;
  if (searchParams?.code) {
    verifyData = await verifyOauthCode(searchParams?.code);
  }

  return verifyData && verifyData.data ? (
    <div className="container h-112">
      <div className="-mx-4 flex flex-wrap">
        <div className="w-full px-4">
          <Spinner />
          <VerifyCode data={verifyData.data} />
        </div>
      </div>
    </div>
  ) : null;
}
