import z from "zod";

export const loginSchema = z
  .object({
    email: z.string().email({message: "Invalid email"}).max(255, "Title must not exceed 255 symbols"),
    password: z.string().min(6, {message: "Password must contain at least 6 symbols"}),
    rememberMe: z.boolean().optional()
  });
  // IMPORTANT .partial()
  // https://github.com/colinhacks/zod/issues/479

