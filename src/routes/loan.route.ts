import express from "express";
import {
  addLoanHandler,
  getLoanHandler,
  lendedBooks,
} from "../controller/loan.controller";
import validate from "../middlewares/validate";
import { addLoanSchema } from "../zod_schema/loan.schema";

const router = express.Router();

router.get("/", getLoanHandler);
router.get(`/user/loan/:userid`, lendedBooks);
router.post("/", validate(addLoanSchema), addLoanHandler);

export default router;
