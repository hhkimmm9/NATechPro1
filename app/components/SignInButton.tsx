import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const SignInButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <button
        className="bg-red-600 rounded-2xl py-2 px-6 text-white whitespace-nowrap"
        onClick={() => signOut()}
      >
        {session.user.email}
      </button>
    );
  }
  return (
    <button
      className="bg-sky-600 rounded-2xl py-2 px-6 text-white whitespace-nowrap"
      onClick={() => signIn()}
    >
      Sign up
    </button>
  );
};

export default SignInButton;
