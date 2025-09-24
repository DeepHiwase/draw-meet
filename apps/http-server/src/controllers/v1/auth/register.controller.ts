// Node Modules
import { RegisterUserSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
// Custom Modules
import catchErrors from "../../../utils/catchErrors";
import { hashValue } from "../../../lib/bcrypt";

const registerHandler = catchErrors(async (req, res) => {
  const { email, password, name } = RegisterUserSchema.parse(req.body);

  const newUser = await prismaClient.user.create({
    data: {
      email: email,
      password: await hashValue(password),
      name: name,
    },
  });
  res.status(201).json(newUser);
  return;
});

export default registerHandler;
