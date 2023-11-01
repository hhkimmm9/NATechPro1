import React, { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";

const RegisterPage = () => {
  const [emailInput, setEmailInput] = useState("");
  const [pwdInput, setPwdInput] = useState("");
  const [confirmPwdInput, setConfirmPwdInput] = useState("");
  const [agreeCheckbox, setAgreeCheckbox] = useState(false);
  const [notifyCheckbox, setNotifyCheckbox] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pwdConfirm = pwdInput === confirmPwdInput;

    if (!pwdConfirm) {
      setError("Password does not match");
      return;
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_URL}/api/auth/register`, {
        email: emailInput,
        password: pwdInput,
      })
      .then((res) => {
        signIn();
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data);
      });
  };

  return (
    <div className="mt-6 text-gray-500 font-light flex flex-col gap-2">
      <form onSubmit={handleSubmit}>
        {/* text input */}
        <div className="flex flex-col space-y-3">
          <div className="flex flex-col space-y-1">
            <label>Email</label>
            <input
              type="text"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="p-1.5 border rounded-md"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="whitespace-nowrap">
              {" "}
              Password <span>(6 Characters minimum)</span>{" "}
            </label>
            <input
              type="password"
              value={pwdInput}
              onChange={(e) => setPwdInput(e.target.value)}
              className="p-1.5 border rounded-md"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="whitespace-nowrap"> Password confirmation </label>
            <input
              type="password"
              value={confirmPwdInput}
              onChange={(e) => setConfirmPwdInput(e.target.value)}
              className="p-1.5 border rounded-md"
            />
          </div>
        </div>

        {/* TODO: Move the error section beside the labels in the registration form for better visual alignment. */}
        <div className="h-6">
          {error && (
            <span className="text-red-500 text-xs font-semibold">{ error }</span>
          )}
        </div>

        {/* checkboxes */}
        <div className="my-4 flex flex-col gap-2 justify-start">
          <div className="flex gap-2 items-start">
            <input
              type="checkbox"
              checked={agreeCheckbox}
              onChange={(e) => setAgreeCheckbox(e.target.checked)}
              className="mt-1"
            />
            <label className="text-sm">
              <span>I agree to the </span>
              <Link href="#"
                className="text-blue-500 hover:text-blue-600 hover:underline"
              >Terms of Service, General Terms and Conditions</Link>
              <span> and </span>
              <Link href="#"
                className="text-blue-500 hover:text-blue-600 hover:underline"
              >Privacy Policy</Link>
              <span>.</span>
            </label>
          </div>

          <div className="flex gap-2">
            <input type="checkbox" checked={notifyCheckbox}
              onChange={(e) => setNotifyCheckbox(e.target.checked)}
            />
            <label className="text-sm">
              Notify me about new features and special offers.
            </label>
          </div>
        </div>

        <div className="w-min mx-auto flex flex-col">
          <button type="submit"
            className="bg-sky-600 w-min py-2 px-6 whitespace-nowrap rounded-full text-white hover:bg-sky-500 mx-auto"
          > Sign up </button>
        </div>
      </form>

      <div className="mt-4">
        <p className="text-center text-sm">
          This form is protected by hCaptcha and its Privacy Policy and Terms of Service
        </p>
      </div>
    </div>
  );
};

export default RegisterPage
