import { string, z } from "zod";

export const addMovieSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "name is required !" })
      .min(2, "Name must be more than 2 char"),
    genre: z.enum(
      ["Drama", "Action", "Comedy"],
      string({
        required_error: "genre is required !",
        invalid_type_error: "This field must contain : Drama, Action or Comedy",
      })
    ),
    rating: z
      .number({
        required_error: "rating is required ",
        invalid_type_error: "rating must be a number",
      })
      .min(1, "rating must be between 1 to 5")
      .max(5, "rating must be between 1 to 5"),
    duration: z
      .number({
        required_error: "duration is required ",
        invalid_type_error: "duration must be a number",
      })
      .min(60, "duration must be more than 60"),
  }),
});

export const updateMovieSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "name is required !" })
      .min(2, "Name must be more than 2 char"),
    genre: z.enum(
      ["Drama", "Action", "Comedy"],
      string({
        required_error: "genre is required !",
        invalid_type_error: "This field must contain : Drama, Action or Comedy",
      })
    ),
    rating: z
      .number({
        required_error: "rating is required ",
        invalid_type_error: "rating must be a number",
      })
      .min(1, "rating must be between 1 to 5")
      .max(5, "rating must be between 1 to 5"),
    duration: z
      .number({
        required_error: "duration is required ",
        invalid_type_error: "duration must be a number",
      })
      .min(60, "duration must be more than 60"),
  }),
  params: z.object({
    id: z.string({ required_error: "Please send id in the params" }),
  }),
});

export const deleteMovieSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "Please send id in the params" }),
  }),
});

export const getOneMovieSchema = z.object({
  query: z.object({
    id: z.string({ required_error: "Please send id in the params" }),
  }),
});

export const getOneMovieByNameSchema = z.object({
  query: z.object({
    name: z.string({ required_error: "Please send name in the params" }),
  }),
});

export type MovieSchemaType = z.infer<typeof updateMovieSchema>["params"];

export type GetOneMovieSchemaType = z.infer<typeof getOneMovieSchema>["query"];

export type GetOneMovieByNameSchemaType = z.infer<
  typeof getOneMovieByNameSchema
>["query"];
