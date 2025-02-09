"use client";
import Link from "next/link";
import Popup from "./PopupTwo";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { setAuthStatus } from "@/store/Features/authStatus";
import { removeUserProfile } from "@/store/Features/userProfile";
import { signOut } from "next-auth/react";

/**Functional Component for session timeout*/
function SessionTimeout() {
  const timeoutPopup = useSelector((state: RootState) => state.timeoutPopup);
  const dispatch = useDispatch();
  const router = useRouter();
  const resetAuth = async (redirectTo = "/auth/login") => {
    dispatch(removeUserProfile());
    dispatch(setAuthStatus(false));
    await signOut({ redirect: false });
    router.replace(redirectTo);
  };
  return (
    <Popup isOpen={timeoutPopup} onClose={resetAuth}>
      <div className="max-h-[700px] min-w-[320px] max-w-[700px] bg-white p-5 sm:min-w-[560px]">
        <h4 className="mb-10 font-clashSemiBold text-xl text-[#140B31] sm:text-3xl">
          Session Timed out
        </h4>
        <svg
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mb-10"
        >
          <path
            d="M12.1966 6.86508L9.17991 3.84842C13.189 1.08101 18.0414 -0.193186 22.8929 0.247531C27.7444 0.688247 32.2878 2.81598 35.7326 6.2605C39.1773 9.70502 41.3054 14.2483 41.7465 19.0997C42.1875 23.9512 40.9137 28.8037 38.1466 32.813L35.1362 29.8026C37.1308 26.6106 37.9847 22.8369 37.5587 19.0972C37.1326 15.3575 35.4517 11.8725 32.7902 9.21103C30.1287 6.54954 26.6438 4.86862 22.9041 4.44256C19.1643 4.0165 15.3885 4.87046 12.1966 6.86508ZM38.4237 38.4255L35.7591 41.0901L32.8153 38.1442C28.8063 40.9093 23.955 42.1817 19.105 41.7401C14.255 41.2986 9.71315 39.1711 6.26937 35.7275C2.8256 32.284 0.697738 27.7423 0.255849 22.8924C-0.186041 18.0424 1.086 13.1909 3.85074 9.18175L0.913242 6.24425L3.57574 3.57758L6.26324 6.26925L9.21532 9.213L18.9174 18.9213V10.5838H22.0424V21.5213L31.4174 27.0838L29.8549 29.6463L29.3257 29.3297L38.4237 38.4255ZM29.807 35.1338L17.7382 23.0672L6.86741 12.1963C4.87279 15.3883 4.01883 19.162 4.44489 22.9017C4.87094 26.6415 6.55186 30.1264 9.21335 32.7879C11.8748 35.4494 15.3598 37.1303 19.0995 37.5564C22.8392 37.9824 26.615 37.1285 29.807 35.1338Z"
            fill="#381F8C"
          />
        </svg>
        <p className="mx-auto mb-4 max-w-[400px] font-satoshiBold text-base font-bold text-[#140B31] sm:text-xl">
          Oh No! You are being timed out due to inactivity. Login again to
          continue.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={() => resetAuth()}>
            <Link
              href="/auth/login"
              className="rounded-full bg-[#381F8C] px-5 py-2 font-bold text-[#EBE9F4]"
            >
              Login
            </Link>
          </button>
          <button onClick={() => resetAuth("/home")}>
            <Link
              href="/home"
              className="rounded-full border-[0.5px] border-[#381F8C] px-5 py-2 font-bold text-[#381F8C]"
            >
              Sign out
            </Link>
          </button>
        </div>
        <hr className="my-5" />
        <p className="text-sm text-[#546276]">
          Need help?{" "}
          <Link href="/contact-us" className="text-[#FE9B07]">
            Contact Us
          </Link>
        </p>
      </div>
    </Popup>
  );
}

export default SessionTimeout;
