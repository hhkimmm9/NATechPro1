import React, { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [emailInput, setEmailInput] = useState("");
  const [pwdInput, setPwdInput] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: emailInput,
        password: pwdInput,
      });

      console.log(response);

      if (!response?.error) {
        router.push(callbackUrl);
      } else {
        const err = JSON.parse(response.error);
        setError(err.message);
        console.log(err);
      }
    } catch (err) {
      console.log(JSON.stringify(err));
    } finally {
      if (rememberMe == true) {
        // cookie
      }
    }
  };

  const googleSignIn = async () => {
    try {
      await signIn("google", {
        redirect: true,
        callbackUrl: callbackUrl,
      });
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  };

  return (
    <div className="flex flex-col space-y-8 mt-6">
      {/* oauth */}
      <div className="flex flex-col gap-2 text-gray-600 w-min mx-auto">
        <button className="py-2 pl-4 pr-8 border-2 border-gray-300 rounded-full text-center whitespace-nowrap flex gap-2 items-center">
          <Image
            src="/images/logos/fb-logo.png"
            alt="Facebook Logo"
            width={20}
            height={20}
            className="object-contain"
          />
          <span>Continue with Facebook</span>
        </button>
        <button
          className="py-2 pl-4 pr-8 border-2 border-gray-300 rounded-full text-center whitespace-nowrap flex gap-2 items-center"
          onClick={googleSignIn}
        >
          <Image
            src="/images/logos/google-logo.png"
            alt="Google Logo"
            width={20}
            height={20}
            className="object-contain"
          />
          <span>Continue with Google</span>
        </button>
      </div>

      <div className="mx-auto text-gray-500 font-light flex flex-row items-center gap-2">
        <hr className="w-60" />
        <p>or</p>
        <hr className="w-60" />
      </div>

      <div className="text-gray-500 font-light flex flex-col gap-2">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {/* text input */}
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col">
              <label> Email </label>
              <input
                type="text"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="border p-1.5"
              />
            </div>
            <div className="flex flex-col">
              <label className="whitespace-nowrap"> Password </label>
              <input
                type="text"
                value={pwdInput}
                onChange={(e) => setPwdInput(e.target.value)}
                className="border p-1.5"
              />
            </div>
          </div>

          {error && (
            <span className="text-red-500 text-xs font-semibold">{error}</span>
          )}

          {/* checkboxes */}
          <div className="flex gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label> Remember me </label>
          </div>

          <button
            type="submit"
            className="bg-sky-600 w-min py-2 px-6 whitespace-nowrap rounded-full text-white hover:bg-sky-500 mx-auto"
          >
            {" "}
            Log in{" "}
          </button>
        </form>

        <div className="w-4/5 mx-auto text-center">
          <p className="text-sm">
            {" "}
            This form is protected by hCaptcha and its Privacy Policy and Terms
            of Service.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage
