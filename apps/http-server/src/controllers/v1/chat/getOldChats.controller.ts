// Node Modules
import { prismaClient } from "@repo/db/client";
// Custom Modules
import catchErrors from "../../../utils/catchErrors";

// TODO: make authenticated endpoint
// TODO: add rate limiting every where
// TODO: room permissions, also make id of room complex
const getOldChatsHandler = catchErrors(async (req, res) => {
  const { roomId } = req.params;

  const messages = await prismaClient.chat.findMany({
    where: {
      roomId: parseInt(roomId!),
    },
    orderBy: {
      id: "asc",
    },
    take: 20,
  });

  return res.status(200).json({
    messages,
  });
});

export default getOldChatsHandler;
