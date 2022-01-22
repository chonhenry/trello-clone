import jwt_decode from "jwt-decode";

const verifyToken = (token: string) => {
  try {
    jwt_decode(token);
    return true;
  } catch (error) {
    return false;
  }
};

export default verifyToken;
