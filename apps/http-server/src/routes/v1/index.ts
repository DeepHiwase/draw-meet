// Node Modules
import { Router } from "express";
// Routers
import authRoutes from "./auth.route";
import roomRoutes from "./room.route";
import chatRoutes from "./chat.route";
// Middlewares
import authenticate from "../../middlewares/authenticate";

const router: Router = Router();

router.get("/", (req, res) => {
  console.log("Api is live", {
    docs: "",
    version: "1.0.0",
    timestamp: new Date(Date.now()).toISOString(),
  });
  res.status(200).json({
    message: "API is live",
    docs: "",
    version: "1.0.0",
    timestamp: new Date(Date.now()).toISOString(),
  });
});

// Auth routes
router.use("/auth", authRoutes);

// protected routes
router.use("/rooms", authenticate, roomRoutes);

router.use("/chats", chatRoutes);

export default router;
