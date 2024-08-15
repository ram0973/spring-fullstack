import z from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const userCreateSchema = z
  .object({
    email: z.string().email({message: "Invalid email"}).max(255, "Title must not exceed 255 symbols"),
    firstName: z.string(),
    lastName: z.string(),
    avatar: typeof window === 'undefined' ? z.null() : z.instanceof(File)
      .refine(file => file?.size <= MAX_FILE_SIZE, {message: "Max image size is 5MB."})
      .refine(file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        ".jpg, .jpeg, .png, .webp, files are accepted only",
      ),
    enabled: z.boolean(),
    roles: z.string().optional().array(),
    password: z.string().min(6, {message: "Password must contain at least 6 symbols"}),
    confirm: z.string().min(6, {message: "Password confirmation must contain at least 6 symbols"}),
  })
  // IMPORTANT .partial()
  // https://github.com/colinhacks/zod/issues/479
  .partial().refine((data) => data.password === data.confirm, {
    message: "Password not match",
    path: ["confirm"],
  });

