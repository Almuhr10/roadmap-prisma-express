import express from "express";
import {
  addMovieHandler,
  deleteMovieHandler,
  getMovieHandler,
  getOneMovieByNameHandler,
  getOneMovieHandler,
  updateMovieHandler,
} from "../controller/movie.controller";
import validate from "../middlewares/validate";
import {
  addMovieSchema,
  deleteMovieSchema,
  getOneMovieByNameSchema,
  getOneMovieSchema,
  updateMovieSchema,
} from "../zod_schema/movie.schema";

const router = express.Router();

router.get("/", getMovieHandler);
router.get("/one", validate(getOneMovieSchema), getOneMovieHandler);
router.get(
  "/:name",
  validate(getOneMovieByNameSchema),
  getOneMovieByNameHandler
);
router.post("/", validate(addMovieSchema), addMovieHandler);
router.put("/:id", validate(updateMovieSchema), updateMovieHandler);
router.delete("/:id", validate(deleteMovieSchema), deleteMovieHandler);

export default router;
