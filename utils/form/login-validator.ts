import z from "zod"

export const signInSchema = z.object({
  email: z
    .string({ message: "Email address is required" })
    .trim()
    .pipe(z.email({ message: "Invalid email address" })),

  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(32, { message: "Password must be no more than 32 characters long" }),
})

export const signUpSchema = signInSchema.extend({
  username: z
    .string({ message: "Username is required" })
    .min(2, { message: "Username must be at least 2 characters long" }),
})
