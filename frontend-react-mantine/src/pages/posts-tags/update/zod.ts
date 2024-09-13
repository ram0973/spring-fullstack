import z from "zod";

export const postTagUpdateSchema = z
  .object({
    title: z.string(),
    slug: z.string(),
    enabled: z.boolean(),
  });
