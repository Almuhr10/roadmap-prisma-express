import express from "express";
import {
  addNewClassRoom,
  getAllClassroom,
  getClassroomById,
} from "../controller/classroom.controller";
import {
  addNewStudent,
  getAllStudent,
  getAllStudentById,
} from "../controller/student.controller";
import {
  addNewTeacher,
  getAllTeacher,
  getTeacherById,
} from "../controller/teacher.controller";
import validate from "../middlewares/validate";
import {
  classroomSchema,
  studentSchema,
  teacherSchema,
} from "../zod_schema/school.schema";

const router = express.Router();

router.get("/teacher", getAllTeacher);
router.get("/student", getAllStudent);
router.get("/classroom", getAllClassroom);

router.get("/teacher/:id", validate(teacherSchema), getTeacherById);
router.get("/student/:id", validate(studentSchema), getAllStudentById);
router.get("/classroom/:id", validate(classroomSchema), getClassroomById);

router.post("/teacher", validate(teacherSchema), addNewTeacher);
router.post("/student", validate(studentSchema), addNewStudent);
router.post("/classroom", validate(classroomSchema), addNewClassRoom);

export default router;
