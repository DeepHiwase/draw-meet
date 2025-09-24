// Node Modules
import { prismaClient } from "@repo/db/client";
// Custom Modules
import catchErrors from "../../../utils/catchErrors";
import { genSlug } from "../../../utils/genSlug";

const createRoomHandler = catchErrors(async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    console.log("No userId");
    return;
  }

  const user = await prismaClient.user.findFirst({
    where: {
      id: userId,
    },
  });

  const room = await prismaClient.room.create({
    data: {
      slug: genSlug(),
      adminId: user?.id!,
    },
  });

  return res.json({
    roomId: room.id,
  });
});

export default createRoomHandler;
