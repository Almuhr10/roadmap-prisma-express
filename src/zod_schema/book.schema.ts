import { string, z } from "zod";

export const addBookSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "name is required !" })
      .min(2, "Name must be more than 2 char"),
    genre: z.enum(
      ["Mystery", "Horror", "Romance", "Novel"],
      string({
        required_error: "genre is required !",
        invalid_type_error:
          "This field must contain : Mystery, Horror, Romance or Novel",
      })
    ),
  }),
});

export const getBookSchema = z.object({
  query: z.object({
    id: z.string({ required_error: "Please send id in the params" }),
  }),
});

export const getBookByNameSchema = z.object({
  query: z.object({
    name: z.string({ required_error: "Please send name in the params" }),
  }),
});

export type BookSchemaType = z.infer<typeof getBookSchema>["query"];
