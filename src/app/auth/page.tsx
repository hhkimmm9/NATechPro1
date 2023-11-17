"use client";

import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

const AuthPage = () => {
  const { data: session } = useSession();
  
  // If a user is signed in but somehow they are redirected to page then send
  // them back to the landing page.
  const router = useRouter();
  if (session && session.user) {
    router.push("/");
  }

  const [hasAccount, setHasAccount] = useState(true);
  const searchParams = useSearchParams();

  // Determine if this page has to open either the login tab or register tab.
  useEffect(() => {
    searchParams.get("tab") == "register"
    ? setHasAccount(false) : setHasAccount(true);
  }, []);

  return (
    <div className="max-w-4xl flex flex-col p-14 mx-auto">
      <h1 className="text-center text-4xl font-bold">Create a new account</h1>

      <div className="
        max-w-xl
        mx-auto
        mt-10
        pb-10
        flex
        flex-col
        border
        rounded-xl
      bg-white
        shadow-md
      ">
        {/* login or signup tabs */}
        <div className="grid grid-cols-2 divide-x">
          <div onClick={() => setHasAccount(true)}
            className="text-center py-4 hover:bg-stone-50"
          >
            Login
          </div>
          <div onClick={() => setHasAccount(false)}
            className="text-center py-4 hover:bg-stone-50"
          >
            Sign up
          </div>
        </div>

        <hr className="text-gray-200" />

        <div className="px-10">
          { hasAccount ? <Login /> : <Register /> }
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
