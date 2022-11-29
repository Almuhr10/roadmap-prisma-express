import express from "express";
import { addBookHandler, getBookHandler } from "../controller/books.controller";
import validate from "../middlewares/validate";
import { addBookSchema } from "../zod_schema/book.schema";

const router = express.Router();

router.get("/", getBookHandler);
router.post("/", validate(addBookSchema), addBookHandler);

export default router;
