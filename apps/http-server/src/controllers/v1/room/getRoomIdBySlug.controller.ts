// Node Modules
import { prismaClient } from "@repo/db/client";
// Custom Modules
import catchErrors from "../../../utils/catchErrors";

const getRoomIdBySlugHandler = catchErrors(async (req, res) => {
  const { slug } = req.params as { slug: string };
  console.log(slug)
  const room = await prismaClient.room.findFirst({
    where: {
      slug: slug,
    },
  });
  console.log(room);
  console.log(room?.id);
  return res.status(200).json({
    roomId: room?.id,
  });
});

export default getRoomIdBySlugHandler;
