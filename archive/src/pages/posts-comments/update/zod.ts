import z from "zod";

export const postCommentUpdateSchema = z
  .object({
    content: z.string(),
    enabled: z.boolean(),
  });
