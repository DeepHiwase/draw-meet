// Node Modules
import express from "express";
import cors from "cors";
// Router
import apiV1Routes from "./routes/v1";
// Middlewares
import errorHandler from "./middlewares/errorHandler";

// Initiate Express Instance
const app = express();

app.use(cors());
app.use(express.json());

(async () => {
  try {
    app.use("/api/v1", apiV1Routes);

    app.use(errorHandler);

    app.listen(4004, () => {
      console.log(
        `Server running in development mode on http://localhost:${4004}`
      );
    });
  } catch (err) {
    console.log("Error while starting the http server", err);

    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  }
})();
