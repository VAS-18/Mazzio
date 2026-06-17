import "dotenv/config";
import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World").status(200);
});

app.listen(3000, () => {
  console.log(process.env.DATABASE_URL);
});
