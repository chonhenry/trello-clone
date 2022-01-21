import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

interface SignupForm {
  name: string;
  email: string;
  password: string;
}

export const signUp = async (formData: SignupForm) => {
  console.log("signUp api");
  return API.post("/user/signup", formData);
};
