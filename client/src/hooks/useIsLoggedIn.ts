import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import verifyToken from "../utils/verifyToken";

export default function useIsLoggedIn() {
  const navigate = useNavigate();

  useEffect(() => {
    const profile = localStorage.getItem("trello_clone_profile");
    let user;

    if (profile) {
      user = JSON.parse(profile);
      if (!user.token) {
        return;
      }
    }

    if (verifyToken(user.token)) navigate("/dashboard");
  }, [navigate]);
}
