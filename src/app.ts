import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";

import { Request, Response, NextFunction } from "express";
import { databaseConnection } from "./connection/database";

import route from "./route";

const app = express();
dotenv.config();

if (process.env.NODE_ENV === "dev") {
  databaseConnection(process.env.MONGODB_URL || "mongodb://localhost/arda");
}

app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to LIVE API." });
});

app.use("/api", route);

app.use((req: Request, res: Response, next: NextFunction): void => {
  const error = new Error("Not found!");
  next(error);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({
    error: {
      message: `API says ${error.message}`,
    },
  });
  next();
});

app.listen(3000, () => console.log("listening at port 3000"));

export default app;
