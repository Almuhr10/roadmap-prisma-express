import { Student } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../config/db";
import { studentSchemaType } from "../zod_schema/school.schema";

export const getAllStudent = async (req: Request, res: Response) => {
  try {
    const std = await prisma.student.findMany();
    return res.status(200).json(std);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error !" });
  }
};

export const addNewStudent = async (req: Request, res: Response) => {
  try {
    const newStudent = req.body as studentSchemaType["body"];
    await prisma.student.create({
      data: newStudent,
    });
    return res.status(201).json({ message: "New student added !" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error !" });
  }
};

export const getAllStudentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as studentSchemaType["params"];
    const student = await prisma.student.findFirst({
      where: { id },
    });
    return res.status(200).json(student);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error !" });
  }
};
