import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import isLoggedIn from "../../utils/isLoggedIn";
import Button from "@mui/material/Button";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) navigate("/");
  }, [navigate]);

  return (
    <div className="m-auto max-w-6xl p-3">
      <Button variant="contained" style={{ backgroundColor: "rgb(38,70,83)" }}>
        Create a board
      </Button>

      <div className="bg-col_background rounded-md mt-6 p-3">
        <input
          type="text"
          className="w-full rounded-md"
          placeholder="Search by board name"
        />
      </div>
    </div>
  );
};

export default Dashboard;
