import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/postsRoutes.js";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import mezmursRouter from "./routes/mezmurs.js";
import indexRouter from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";

//import http from "http";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("directorz name", __dirname);

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 8000;
app.use(cors({
  'Access-Contol-Allow-Origin': '*',
  'Access-Contol-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Contol-Allow-Headers': 'Content-Type, Access-Contol-Allow-Headers, x-test'
}));

app.get("/", (req, res) => {
  res.send("Hello World!!, That is the new idea");
});

app.use('/', indexRouter);
app.use("/posts", postRoutes);
app.use("/user", userRoutes);
app.use("/mezmur", mezmursRouter);

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
   useCreateIndex: true,
    useUnifiedTopology: true,
   useFindAndModify: false
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} is not connect`));