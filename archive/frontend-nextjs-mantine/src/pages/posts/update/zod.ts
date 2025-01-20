import z from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const postUpdateSchema = z
  .object({
    id: z.number(),
    title: z.string(),
    slug: z.string(),
    //category: z.string().nullable().optional(),
    // image: z.custom<File | undefined>()
    //   .refine(file => !file || file?.size <= MAX_FILE_SIZE, {message: "Max image size is 5MB."})
    //   .refine(file => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
    //     ".jpg, .jpeg, .png, .webp files are accepted only",
    //   ),
    image: z.string().nullable(),
    excerpt: z.string().nullable(),
    content: z.string(),
    //tagsInput: z.string().optional().array(),
    enabled: z.boolean(),
  });
