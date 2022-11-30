import { z } from "zod";

export const classroomSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required!" }).min(3),
  }),
  params: z.object({
    id: z.string(),
  }),
});
export type classroomSchemaType = z.infer<typeof classroomSchema>;

export const studentSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required!" }),
    age: z.string({ required_error: "Age is required!" }),
    major: z.string({ required_error: "Major is required!" }),
  }),
  params: z.object({
    id: z.string(),
  }),
});

export type studentSchemaType = z.infer<typeof studentSchema>;

export const teacherSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required!" }),
  }),
  params: z.object({
    id: z.string(),
  }),
});

export type teacherSchemaType = z.infer<typeof teacherSchema>;
