import express from "express";
import {
  addUserHandler,
  getUserByIdHandler,
  getUsersHandler,
} from "../controller/user.controller";
import validate from "../middlewares/validate";
import { addUserSchema } from "../zod_schema/user.schema";

const router = express.Router();

router.get("/", getUsersHandler);
router.post("/", validate(addUserSchema), addUserHandler);
router.get("/:id", getUserByIdHandler);

export default router;