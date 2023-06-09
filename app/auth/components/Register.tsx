import React, { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";

const Register = () => {
  const [emailInput, setEmailInput] = useState("");
  const [pwdInput, setPwdInput] = useState("");
  const [confirmPwdInput, setConfirmPwdInput] = useState("");
  const [agreeCheckbox, setAgreeCheckbox] = useState(false);
  const [notifyCheckbox, setNotifyCheckbox] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {/* text input */}
        <div className="flex flex-col space-y-3">
          <div className="flex flex-col">
            <label>Email</label>
            <input
              type="text"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="border p-1.5"
            />
          </div>
          <div className="flex flex-col">
            <label className="whitespace-nowrap">
              {" "}
              Password <span>(6 Characters minimum)</span>{" "}
            </label>
            <input
              type="password"
              value={pwdInput}
              onChange={(e) => setPwdInput(e.target.value)}
              className="border p-1.5"
            />
          </div>
          <div className="flex flex-col">
            <label className="whitespace-nowrap"> Password confirmation </label>
            <input
              type="password"
              value={confirmPwdInput}
              onChange={(e) => setConfirmPwdInput(e.target.value)}
              className="border p-1.5"
            />
          </div>
        </div>

        {error && <span className="text-red-500 text-xs font-semibold">{error}</span>}

        {/* checkboxes */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-start">
            <input
              type="checkbox"
              checked={agreeCheckbox}
              onChange={(e) => setAgreeCheckbox(e.target.checked)}
              className="mt-1"
            />
            <label className="text-sm">
              <span>I agree to the </span>
              <a
                href="#"
                className="text-blue-500 hover:text-blue-600 hover:underline"
              >
                Terms of Service, General Terms and Conditions
              </a>
              <span> and </span>
              <a
                href="#"
                className="text-blue-500 hover:text-blue-600 hover:underline"
              >
                Privacy Policy
              </a>
              <span>.</span>
            </label>
          </div>

          <div className="flex gap-2">
            <input
              type="checkbox"
              checked={notifyCheckbox}
              onChange={(e) => setNotifyCheckbox(e.target.checked)}
            />
            <label className="text-sm">
              {" "}
              Notify me about new features and special offers.{" "}
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-sky-600 w-min py-2 px-6 whitespace-nowrap rounded-full text-white hover:bg-sky-500 mx-auto"
        >
          {" "}
          Sign up{" "}
        </button>
      </form>

      <div className="w-4/5 mx-auto text-center">
        <p className="text-xs">
          This form is protected by hCaptcha and its Privacy Policy and Terms of
          Service
        </p>
      </div>
    </div>
  );
};

export default Register;
