import React, { useEffect } from "react";
import isLoggedIn from "../../utils/isLoggedIn";
import { useNavigate } from "react-router-dom";

const Board: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) navigate("/");
  }, [navigate]);

  return <div>Board</div>;
};

export default Board;
