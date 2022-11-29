import { string, z } from "zod";

export const addUserSchema = z.object({
  body: z.object({
    username: z
      .string({ required_error: "username is required !" })
      .min(4, "username must be more than 4 characters"),
    password: z
      .string({ required_error: "password is required !" })
      .min(6, "password must be more than 6 characters"),
  }),
});

export const getUserSchema = z.object({
  query: z.object({
    id: z.string({ required_error: "Please send id in the params" }),
  }),
});

export type UserSchemaType = z.infer<typeof getUserSchema>["query"];
