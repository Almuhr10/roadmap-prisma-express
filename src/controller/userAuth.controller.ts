import { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Request, Response } from "express";
import { prisma } from "../config/db";
import * as argon2 from "argon2";

export const loginHandler = async (req: Request, res: Response) => {
  const { username, password, email } = req.body as User;
  const user = await prisma.user.findUnique({
    where: { username },
  });
  if (!user) {
    return res
      .status(400)
      .json({ message: "Wrong username or password or email!" });
  }
  const isValidPassword = await argon2.verify(user.password, password);
  if (!isValidPassword) {
    return res
      .status(400)
      .json({ message: "Wrong username or password or email!" });
  }
  const isValidEmail = await prisma.user.findUnique({
    where: { email },
  });
  if (!isValidEmail) {
    return res
      .status(400)
      .json({ message: "Wrong username or password or email!" });
  }
  return res.status(200).json({ message: "Welcom back!" });
};

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const newUser = req.body as User;
    const hashedPassword = await argon2.hash(newUser.password);
    newUser.password = hashedPassword;
    await prisma.user.create({
      data: newUser,
    });
    return res.status(200).json({ message: "Welcom!!" });
  } catch (error) {
    console.log(error);
    const prismaError = error as PrismaClientKnownRequestError;
    return res.status(400).json({ message: prismaError.message });
  }
};
