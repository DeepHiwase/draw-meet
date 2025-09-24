// Node Modules
import { Router } from "express";
// Controllers
import createChatHandler from "../../controllers/v1/chat/createChat.controller";
import getOldChatsHandler from "../../controllers/v1/chat/getOldChats.controller";


const router: Router = Router();

router.post("/", createChatHandler);// not important as it will be handled by ws server

// just get old messages from http-server - history // new messages from ws
router.get("/:roomId/", getOldChatsHandler)

export default router;