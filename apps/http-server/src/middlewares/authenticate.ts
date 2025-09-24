// Node Modules
import { NextFunction, Request, Response } from "express";
// Custom Modules
import { verifyToken } from "../lib/jwt";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"] ?? "";
  // console.log("Token:", token);

  const decoded = verifyToken(token) as { userId: string };
  // console.log(decoded.userId)
  if (decoded) {
    req.userId = decoded.userId;

    next();
  } else {
    res.status(403).json({
      message: "unauthorized",
    });
  }
};

export default authenticate;
