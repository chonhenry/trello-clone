import verifyToken from "./verifyToken";

const isLoggedIn = () => {
  const profile = localStorage.getItem("trello_clone_profile");
  console.log("isLoggedIn");

  if (!profile) return false;

  const user = JSON.parse(profile);
  if (!user.token) {
    return false;
  }

  return verifyToken(user.token);
};

export default isLoggedIn;
