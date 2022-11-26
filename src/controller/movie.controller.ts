import { Movie } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/db";
import {
  MovieSchemaType,
  GetOneMovieSchemaType,
  GetOneMovieByNameSchemaType,
} from "../zod_schema/movie.schema";

export const getMovieHandler = async (
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

      const movie = await prisma.movie.findMany({
        where: filter,
      });
      return res.status(200).json(movie);
    }
    const movies = await prisma.movie.findMany();
    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error !" });
  }
};
export const getOneMovieHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query as GetOneMovieSchemaType;
    const movie = await prisma.movie.findUnique({
      where: { id },
    });

    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error !" });
  }
};

export const getOneMovieByNameHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query as GetOneMovieByNameSchemaType;
    const movie = await prisma.movie.findUnique({
      where: { name },
    });
    console.log(movie);
    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error !" });
  }
};

export const addMovieHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newMovie = req.body as Movie;

    await prisma.movie.create({
      data: newMovie,
    });
    return res.status(201).json({ message: "New movie added !" });
  } catch (error) {
    const prismaError = error as PrismaClientKnownRequestError;
    if (prismaError.code == "P2002") {
      return res.status(400).json({
        message: "You phone number have been used before",
      });
    }
    return res.status(500).json({
      message: "Server Error !",
    });
  }
};

export const updateMovieHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newMovie = req.body as Movie;
    const { id } = req.params as MovieSchemaType;

    await prisma.movie.update({
      where: { id },
      data: newMovie,
    });
    return res.status(200).json({ message: "Movie updated" });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error !",
    });
  }
};

export const deleteMovieHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as MovieSchemaType;

    await prisma.movie.delete({
      where: { id },
    });
    return res.status(200).json({ message: "Movie Deleted !" });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error !",
    });
  }
};
