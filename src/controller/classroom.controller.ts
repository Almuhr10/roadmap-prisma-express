import { Classroom } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../config/db";
import { classroomSchemaType } from "../zod_schema/school.schema";

export const getAllClassroom = async (req: Request, res: Response) => {
  try {
    const classroom = await prisma.classroom.findMany();
    return res.status(200).json(classroom);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error !" });
  }
};

export const getClassroomById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as Classroom;
    const classroom = await prisma.classroom.findFirst({
      where: { id },
    });
    return res.status(200).json(classroom);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error !" });
  }
};

export const addNewClassRoom = async (req: Request, res: Response) => {
  try {
    const newClassRoom = req.body as Classroom;
    await prisma.classroom.create({
      data: newClassRoom,
    });
    return res.status(201).json({ message: "New Classroom added !" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error !" });
  }
};
