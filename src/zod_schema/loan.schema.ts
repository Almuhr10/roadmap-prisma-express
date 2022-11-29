import { string, z } from "zod";

export const addLoanSchema = z.object({
  body: z.object({
    user_ID: z
      .string({ required_error: "userId is required !" })
      .min(2, "userId must be more than 2 char"),
    book_ID: z
      .string({ required_error: "bookID is required !" })
      .min(2, "bookID must be more than 2 char"),
  }),
});

export const getOneLoanSchema = z.object({
  query: z.object({
    user_ID: z.string({ required_error: "Please send id in the params" }),
  }),
});

export const getOneLoanByNameSchema = z.object({
  query: z.object({
    name: z.string({ required_error: "Please send name in the params" }),
  }),
});

export type LoanSchemaType = z.infer<typeof getOneLoanSchema>["query"];
