import jwt from "jsonwebtoken";
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, //in ms
    httpOnly: true, // can't access via JS
    secure: process.env.NODE_ENV === "production", // true in prod
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });
};
