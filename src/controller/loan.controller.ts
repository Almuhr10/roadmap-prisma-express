import { Loan } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
// import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/db";
import { LoanSchemaType } from "../zod_schema/loan.schema";

export const getLoanHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loans = await prisma.loan.findMany();
    return res.status(200).json(loans);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error !" });
  }
};
// export const getOneLoanHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { user_ID } = req.query as LoanSchemaType;
//     const loan = await prisma.loan.findUnique({
//       where: { user_ID },
//     });

//     return res.status(200).json(loan);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Server Error !" });
//   }
// };

export const addLoanHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newLoan = req.body as Loan;

    await prisma.loan.create({
      data: newLoan,
    });
    return res.status(201).json({ message: "New loan added !" });
  } catch (error) {
    // const prismaError = error as PrismaClientKnownRequestError;
    // if (prismaError.code == "P2002") {
    //   return res.status(400).json({
    //     message: "Your phone number have been used before",
    //   });
    // }
    const prismaError = error as PrismaClientKnownRequestError;
    res.status(400).json({
      message: prismaError.message,
    });
    // return res.status(500).json({
    //   message: "Server Error !",
    // });
  }
};

export const lendedBooks = async (req: Request, res: Response) => {
  try {
    const { user_ID } = req.params as Loan;

    const getLendedUserBooks = await prisma.user.findUnique({
      where: { id: user_ID },
      select: {
        username: true,
        loan: true,
      },
    });

    return res.status(200).json(getLendedUserBooks);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "server error !",
    });
  }
};
