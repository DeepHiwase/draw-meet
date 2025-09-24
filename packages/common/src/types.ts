// Node Modules
import { z } from "zod";

export const RegisterUserSchema = z.object({
  email: z.email().min(3).max(255),
  password: z.string().min(6).max(255),
  name: z.string().min(1).max(255),
});

export const LoginUserSchema = z.object({
  email: z.email().min(3).max(255),
  password: z.string().min(6).max(255),
});

export const CreateRoomSchema = z.object({
  name: z.string().min(3).max(255),
});

export const CreateChatSchema = z.object({
  message: z.string(),
});
