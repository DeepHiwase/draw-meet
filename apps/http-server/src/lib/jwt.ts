// Node Modules
import jwt from "jsonwebtoken";
import config from "@repo/configs/config";

export const signToken = (token: { userId: string }) =>
  jwt.sign(token, config.JWT_SECRET);

export const verifyToken = (token: string) =>
  jwt.verify(token, config.JWT_SECRET);
