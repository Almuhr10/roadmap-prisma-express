import express from "express";
import {
  loginHandler,
  registerHandler,
} from "../controller/userAuth.controller";
import validate from "../middlewares/validate";
import { loginSchema, rigesterSchema } from "../zod_schema/auth.schema";

const router = express.Router();

router.post("/login", validate(loginSchema), loginHandler);
router.post("/register", validate(rigesterSchema), registerHandler);

export default router;
