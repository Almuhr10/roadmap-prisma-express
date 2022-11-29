import { Books } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/db";
import { BookSchemaType } from "../zod_schema/book.schema";

export const getBookHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.query) {
      let filter = {};
      if (req.query.name) {
        filter = { name: req.query.name?.toString() };
      }
      if (req.query.genre) {
        filter = { genre: req.query.genre?.toString() };
      }

      const books = await prisma.books.findMany({
        where: filter,
      });
      return res.status(200).json(books);
    }
    const books = await prisma.books.findMany();
    return res.status(200).json(books);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error !" });
  }
};
export const getOneBookHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query as BookSchemaType;
    const books = await prisma.books.findUnique({
      where: { id },
    });

    return res.status(200).json(books);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error !" });
  }
};

export const addBookHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newBook = req.body as Books;

    await prisma.books.create({
      data: newBook,
    });
    return res.status(201).json({ message: "New book added !" });
  } catch (error) {
    // const prismaError = error as PrismaClientKnownRequestError;
    // if (prismaError.code == "P2002") {
    //   return res.status(400).json({
    //     message: "Your phone number have been used before",
    //   });
    // }
    return res.status(500).json({
      message: "Server Error !",
    });
  }
};
