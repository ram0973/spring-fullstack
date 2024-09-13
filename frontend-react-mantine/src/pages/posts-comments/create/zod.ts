import z from "zod";

export const postCommentCreateSchema = z
  .object({
    content: z.string(),
    enabled: z.boolean(),
  });
