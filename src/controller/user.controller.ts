import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/db";
import { UserSchemaType } from "../zod_schema/user.schema";

export const addUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let newUser = req.body as User;
    await prisma.user.create({
      data: newUser,
    });
    return res.status(201).json({ message: "New user added !" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      message: "Server Error !",
    });
  }
};

export const getUsersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error !" });
  }
};

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as UserSchemaType;
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error !" });
  }
};
