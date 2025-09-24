import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(`PATH: ${req.path}`, err);

  console.log("Error Handler");

  return res.status(500).json("Internal Server Error");
  next();
};

export default errorHandler;
