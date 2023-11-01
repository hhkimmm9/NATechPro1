"use client"

import React, { useState, useEffect } from "react";
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

  // reactive to the remember me checkbox
  // .... 이거 로그인 버튼 눌렸을 ㄸㅐ만..
  useEffect(() => {
    if (rememberMe && emailInput) {
      localStorage.setItem("rememberUserId", emailInput)
    }

    else {
      if (localStorage.getItem("rememberUserId"))
        localStorage.removeItem("rememberUserId", emailInput)
    }
  }, [rememberMe])

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
    <>
      {/* oauth */}
      <div className="w-min mx-auto my-8 flex flex-col gap-2 text-gray-600">
        {/* google */}
        <button
          className="
            py-2 pr-8 pl-4
            flex gap-2 items-center
            border border-gray-300
            rounded-full
            text-center whitespace-nowrap
          hover:bg-stone-50 hover:scale-110 duration-100
          "
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

      {/* divider */}
      <div className="
        mx-auto
        flex flex-row items-center gap-2
        font-light text-gray-500
      ">
        <hr className="w-60" />
        <p>or</p>
        <hr className="w-60" />
      </div>

      {/* input fields */}
      <div className="my-6 flex flex-col gap-2 text-gray-500 font-light">
        <form onSubmit={handleSubmit}>
          {/* text input */}
          <div className="flex flex-col space-y-3">
            {/* email */}
            <div className="flex flex-col space-y-1">
              <label> Email </label>
              <input
                type="text"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="p-1.5 border rounded-md"
              />
            </div>
            {/* pwd */}
            <div className="flex flex-col space-y-1">
              <label className="whitespace-nowrap"> Password </label>
              <input
                type="text"
                value={pwdInput}
                onChange={(e) => setPwdInput(e.target.value)}
                className="p-1.5 border rounded-md"
              />
            </div>
          </div>

          {/* checkboxes */}
          <div className="my-2 flex gap-2 items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label> Remember me </label>
          </div>

          {/* TODO: Move the error section beside the labels in the login form for better visual alignment. */}
          <div className="h-6">
            { error && (
              <span className="text-xs font-medium text-red-600">{ error }</span>
            )}
          </div>

          <div className="w-min mx-auto flex flex-col">
            <button type="submit"
              className="
                px-4 py-1.5
                rounded-full bg-sky-600
                font-medium text-white whitespace-nowrap
                hover:scale-125 hover:font-semibold duration-100 hover:bg-sky-500
            "> Log in </button>
          </div>
        </form>

        <div className="mt-4">
          <p className="text-center text-sm">
            This form is protected by hCaptcha and its Privacy Policy and Terms of Service.
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage
