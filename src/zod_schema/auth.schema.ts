import { z } from "zod";

export const rigesterSchema = z.object({
  body: z.object({
    username: z.string({ required_error: "Username is required!" }).min(3),
    password: z.string({ required_error: "Password is required!" }).min(5),
    email: z.string({ required_error: "Email is required!" }),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    username: z.string({ required_error: "Username is required!" }),
    password: z.string({ required_error: "Password is required!" }),
    email: z.string({ required_error: "Email is required!" }),
  }),
});
