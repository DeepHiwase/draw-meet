// Node Modules
import { Router } from "express";
// Controllers
import createRoomHandler from "../../controllers/v1/room/createRoom.controller";
import getRoomIdBySlugHandler from "../../controllers/v1/room/getRoomIdBySlug.controller";

const router: Router = Router();

router.post("/create", createRoomHandler);

router.get("/:slug", getRoomIdBySlugHandler);

// router.get(":/roomId", getMessagesByRoomIdHandler)

export default router;
