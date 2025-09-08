import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.log("No token in cookies");
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);        // Checks the client's token and the created signature if it's valid for authentication
    console.log("Token decoded:", decoded);
    req.user = decoded;                                   // Attach decoded user info to req, so routers can access req.user
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}