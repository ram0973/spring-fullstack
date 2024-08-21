import z from "zod";

export const userRoleUpdateSchema = z
  .object({
    role: z.string().max(255, "Title must not exceed 255 symbols"),
  });
