// Node Modules
import { prismaClient } from "@repo/db/client";
// Custom Modules
import catchErrors from "../../../utils/catchErrors";
import { genSlug } from "../../../utils/genSlug";

const createChatHandler = catchErrors(async (req, res) => {
  const userId = req.userId;

  const room = await prismaClient.room.create({
    data: {
      slug: genSlug(),
      adminId: userId!,
    },
  });

  return res.json({
    roomId: room.id,
  });
});

export default createChatHandler;