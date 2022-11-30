import express from "express";
import cors from "cors";
import schoolRouter from "./routes/school.route";
import "dotenv/config";
import authRouter from "./routes/auth.route";
import { connectDB } from "./config/db";
import bodyParser from "body-parser";
const app = express();

// Config
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1/school", schoolRouter);
app.use("/api/v1/users", authRouter);

const start = (): void => {
  try {
    app.listen(3333, () => {
      console.log("Server started on port 3333");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
start();
