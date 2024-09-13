import z from "zod";

export const postTagCreateSchema = z
  .object({
    title: z.string(),
    slug: z.string(),
    enabled: z.boolean(),
  });
