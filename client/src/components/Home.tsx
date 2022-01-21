import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomepageBoard from "./HomepageBoard";
import Auth from "./Auth";

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const profile = localStorage.getItem("trello_clone_profile");
    let user;

    if (profile) {
      user = JSON.parse(profile);
      if (user.token) {
        navigate("/dashboard");
      }
    }
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
