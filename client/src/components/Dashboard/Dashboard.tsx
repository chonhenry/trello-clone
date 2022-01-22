import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import isLoggedIn from "../../utils/isLoggedIn";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) navigate("/");
  }, [navigate]);

  return (
    <div>
      <Navbar />
      Dashboard
    </div>
  );
};

export default Dashboard;
