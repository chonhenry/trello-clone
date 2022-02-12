import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import * as api from "../api";
import { useAuth } from "../hooks/useAuth";

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
  const { setUser } = useAuth();

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
      if (setUser) {
        setUser({
          name: data.newUser.name,
          email: data.newUser.email,
          _id: data.newUser._id,
        });
      }
      localStorage.setItem(
        "trello_clone_token",
        JSON.stringify({ token: data.token })
      );
      navigate("/dashboard");
      return;
    } catch (error: any) {
      setError(error.response.data.message);
      return;
    }
  };

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = loginForm;

    try {
      const { data } = await api.login({ email, password });
      setError("");
      if (setUser) {
        setUser({
          name: data.result.name,
          email: data.result.email,
          _id: data.result._id,
        });
      }
      localStorage.setItem(
        "trello_clone_token",
        JSON.stringify({ token: data.token })
      );
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
              className="mt-1 w-full p-2 rounded border border-solid border-gray-300 focus:ring-0 focus:border-green"
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
              className="mt-1 w-full p-2 rounded border border-solid border-gray-300 focus:ring-0 focus:border-green"
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
              className="mt-1 w-full p-2 rounded border border-solid border-gray-300 focus:ring-0 focus:border-green"
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
              className="mt-1 w-full p-2 rounded border border-solid border-gray-300 focus:ring-0 focus:border-green"
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
              className="bg-green w-full mb-3 py-2 text-white rounded"
            >
              Sign Up
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
            <span className="text-dark_green">Email</span>
            <input
              className="mt-1 w-full p-2 rounded border border-solid border-gray-300 focus:ring-0 focus:border-green"
              type="email"
              name="email"
              value={loginForm.email}
              onChange={handleLoginChange}
              required
            />
          </label>

          <label className="block mb-3">
            <span className="text-dark_green">Password</span>
            <input
              className="mt-1 w-full p-2 rounded border border-solid border-gray-300 focus:ring-0 focus:border-green"
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
              className="bg-green mb-3 py-3 w-full text-white rounded"
            >
              Login
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
