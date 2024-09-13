import z from "zod";

export const postCategoryUpdateSchema = z
  .object({
    title: z.string().max(255, "Title must not exceed 255 symbols"),
    slug: z.string().max(255, "Title must not exceed 255 symbols"),
  });
