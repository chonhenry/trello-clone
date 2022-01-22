import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

interface SignupForm {
  name: string;
  email: string;
  password: string;
}

interface LoginForm {
  email: string;
  password: string;
}

export const signUp = (formData: SignupForm) => {
  return API.post("/user/signup", formData);
};

export const login = (formData: LoginForm) => {
  return API.post("/user/signin", formData);
};
