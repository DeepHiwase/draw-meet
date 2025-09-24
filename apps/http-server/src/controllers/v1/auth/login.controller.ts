// Node Modules
import { LoginUserSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
// Custom Modules
import catchErrors from "../../../utils/catchErrors";
import { compareValue } from "../../../lib/bcrypt";
import { signToken } from "../../../lib/jwt";

const loginHandler = catchErrors(async (req, res) => {
  const { email, password } = LoginUserSchema.parse(req.body);

  const user = await prismaClient.user.findFirst({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error(`No User found with email ${email}`);
  }

  const isVerified = await compareValue(password, user.password);
  if (!isVerified) {
    throw new Error(`Wrong Email or password`);
  }

  const userId = user?.id;

  const token = signToken({ userId });

  return res.status(200).json({
    email: user.email,
    name: user.name,
    token,
  });
});

export default loginHandler;
