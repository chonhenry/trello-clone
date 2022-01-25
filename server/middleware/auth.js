import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  const token = req.headers["bearer-token"];

  if (!token || token.length === 0) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decodedData = jwt.verify(token, secret);
    req.userId = decodedData?.id;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

export default auth;
