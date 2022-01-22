import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import * as api from "../api";

const inititalSignUp = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const inititalLogin = {
  email: "",
  password: "",
};

const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [siginUpForm, setSiginUpForm] = useState(inititalSignUp);
  const [loginForm, setLoginForm] = useState(inititalLogin);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = siginUpForm;

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setError("");

    try {
      const { data } = await api.signUp({ name, email, password });
      setError("");
      localStorage.setItem("trello_clone_profile", JSON.stringify(data));
      navigate("/dashboard");
      return;
    } catch (error: any) {
      setError(error.response.data.message);
      return;
    }
  };

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("login");
    const { email, password } = loginForm;

    try {
      const { data } = await api.login({ email, password });
      setError("");
      localStorage.setItem("trello_clone_profile", JSON.stringify(data));
      navigate("/dashboard");
      return;
    } catch (error: any) {
      setError(error.response.data.message);
      return;
    }
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSiginUpForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="bg-white p-10 rounded h-auto" style={{ width: "360px" }}>
      {isSignUp ? (
        <form autoComplete="off" onSubmit={handleSubmitSignUp}>
          <label className="block mb-3">
            <span className="">Your Name</span>
            <input
              className="mt-1 w-full p-2 rounded border border-solid border-gray-300 focus:ring-0 focus:border-yellow_ochre"
              type="text"
              name="name"
              value={siginUpForm.name}
              onChange={handleSignUpChange}
              required
            />
          </label>

          <label className="block mb-3">
            <span className="">Email</span>
            <input
              className="mt-1 w-full p-2 rounded border border-solid border-gray-300 focus:ring-0 focus:border-yellow_ochre"
              type="email"
              name="email"
              value={siginUpForm.email}
              onChange={handleSignUpChange}
              required
            />
          </label>

          <label className="block mb-3">
            <span className="">Password</span>
            <input
              className="mt-1 w-full p-2 rounded border border-solid border-gray-300 focus:ring-0 focus:border-yellow_ochre"
              type="password"
              name="password"
              value={siginUpForm.password}
              onChange={handleSignUpChange}
              required
            />
          </label>

          <label className="block mb-3">
            <span className="">Confirm Password</span>{" "}
            <input
              className="mt-1 w-full p-2 rounded border border-solid border-gray-300 focus:ring-0 focus:border-yellow_ochre"
              type="password"
              name="confirmPassword"
              value={siginUpForm.confirmPassword}
              onChange={handleSignUpChange}
              required
            />
          </label>

          {error.length > 0 && <div className="text-red-500 mb-3">{error}</div>}

          <div className="w-full text-center">
            <button
              type="submit"
              className="bg-cool_gray w-full mb-3 py-2 text-yellow_ochre rounded"
            >
              Sign Up
            </button>
          </div>

          <div className="w-full text-center">
            <button
              type="button"
              className="bg-cool_gray w-full mb-3 py-2 text-yellow_ochre rounded"
            >
              <GoogleIcon /> Sign Up with Google
            </button>
          </div>

          <div
            className="text-center hover:cursor-pointer"
            onClick={() => {
              setError("");
              setIsSignUp(false);
            }}
          >
            Already have an account? Login
          </div>
        </form>
      ) : (
        <form autoComplete="off" onSubmit={handleSubmitLogin}>
          <label className="block mb-3">
            <span className="text-cool_gray">Email</span>
            <input
              className="mt-1 w-full p-2 rounded border border-solid border-gray-300 focus:ring-0 focus:border-yellow_ochre"
              type="email"
              name="email"
              value={loginForm.email}
              onChange={handleLoginChange}
              required
            />
          </label>

          <label className="block mb-3">
            <span className="text-cool_gray">Password</span>
            <input
              className="mt-1 w-full p-2 rounded border border-solid border-gray-300 focus:ring-0 focus:border-yellow_ochre"
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleLoginChange}
              required
            />
          </label>

          {error.length > 0 && <div className="text-red-500 mb-3">{error}</div>}

          <div className="w-full text-center">
            <button
              type="submit"
              className="bg-cool_gray mb-3 py-3 w-full text-yellow_ochre rounded"
            >
              Login
            </button>
          </div>

          <div className="w-full text-center">
            <button
              type="submit"
              className="bg-cool_gray mb-3 py-3 w-full text-yellow_ochre rounded"
            >
              <GoogleIcon /> Login with Google
            </button>
          </div>

          <div
            className="text-center hover:cursor-pointer"
            onClick={() => {
              setError("");
              setIsSignUp(true);
            }}
          >
            Don't have an account? Create one
          </div>
        </form>
      )}
    </div>
  );
};

export default Auth;
