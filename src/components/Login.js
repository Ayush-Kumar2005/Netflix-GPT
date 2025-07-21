import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { supabase } from "../utils/supabaseClient";
// import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  // const navigate = useNavigate();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };

  const handleButtonClick = async () => {
    const emailVal = email.current.value;
    const passwordVal = password.current.value;
    const nameVal = name?.current?.value || "";

    const message = isSignInForm
      ? checkValidData(emailVal, passwordVal)
      : checkValidData(emailVal, passwordVal, nameVal);
    if (message) {
      setErrorMessage(message);
      return;
    }

    setLoading(true);
    try {
      if (isSignInForm) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: emailVal,
          password: passwordVal,
        });

        if (error) {
          console.error("Sign in error:", error);
          setErrorMessage(error.message);
        } else {
          console.log("Signed in:", data);
          // navigate("/browse");
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: emailVal,
          password: passwordVal,
          options: {
            data: { name: nameVal },
            // Optional: auto redirect on email link
            emailRedirectTo: "http://localhost:3000/browse",
          },
        });

        if (error) {
          console.error("Sign up error:", error);
          setErrorMessage(error.message);
        } else {
          console.log("Signed up:", data);
          // navigate("/browse");
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          className="w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/7d2359a4-434f-4efa-9ff3-e9d38a8bde7f/web/IN-en-20250707-TRIFECTA-perspective_4faa9280-a2c5-4e07-aafc-a45ce43fea09_small.jpg"
          alt="bg-img"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      <Header />

      <form
        className="relative p-12 bg-black w-11/12 md:w-4/12 min-h-[500px] my-24 mx-auto text-white bg-opacity-60 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-bold text-3xl my-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Enter name"
            className="p-4 my-2 w-full bg-gray-800 bg-opacity-40 border border-white rounded-lg"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email"
          className="p-4 my-2 w-full bg-gray-800 bg-opacity-40 border border-white rounded-lg"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-2 w-full bg-gray-800 bg-opacity-40 border border-white rounded-lg"
        />

        <p className="text-red-600 text-sm">{errorMessage}</p>

        <button
          className="p-4 my-4 bg-red-700 w-full rounded-lg disabled:opacity-50"
          onClick={handleButtonClick}
          disabled={loading}
        >
          {loading
            ? isSignInForm
              ? "Signing in..."
              : "Signing up..."
            : isSignInForm
            ? "Sign In"
            : "Sign Up"}
        </button>

        <p className="text-xl text-center">OR</p>

        <button
          className="p-4 my-4 bg-gray-800 bg-opacity-80 w-full rounded-lg"
          type="button"
        >
          Use a sign-in code
        </button>

        {isSignInForm && (
          <div className="text-center text-lg">
            <a
              href="https://www.google.com"
              className="underline hover:text-gray-400"
            >
              Forgot password?
            </a>
          </div>
        )}

        <label className="flex items-center space-x-2 m-4">
          <input
            type="checkbox"
            className="w-4 h-4 accent-gray-600 cursor-pointer"
          />
          <span>Remember me</span>
        </label>

        <label className="flex items-center space-x-2 m-4">
          <p
            className="cursor-pointer hover:underline"
            onClick={toggleSignInForm}
          >
            {isSignInForm
              ? "New to Netflix? Sign up now"
              : "Already registered? Sign in now"}
          </p>
        </label>

        <p className="text-gray-400 text-left text-sm">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
        </p>

        <div className="w-full text-left">
          <p className="text-blue-600 text-sm underline cursor-pointer">
            Learn more
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
