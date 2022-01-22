import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomepageBoard from "./HomepageBoard";
import Auth from "./Auth";
import isLoggedIn from "../utils/isLoggedIn";

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-12/12 xl:bg-green- xl:w-auto xl:flex-row">
        <HomepageBoard />
        <Auth />
      </div>
    </div>
  );
};

export default Home;
