import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/postsRoutes.js";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import mezmursRouter from "./routes/mezmurs.js";
//import http from "http";

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

//const PORT = http.createServer(process.env.PORT || 8000);
const PORT = process.env.PORT || 8000;
app.use(cors({
  'Access-Contol-Allow-Origin': '*',
  'Access-Contol-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Contol-Allow-Headers': 'Content-Type, Access-Contol-Allow-Headers, x-test'
//  origin: "http://localhost:3000",
}));

//http://localhost:5000/posts
app.get("/", (req, res) => {
  res.send("Hello World!!, That is the new idea");
});

app.use("/posts", postRoutes);
app.use("/user", userRoutes);
app.use("/mezmur", mezmursRouter);

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
  //  useCreateIndex: true,
    useUnifiedTopology: true,
  //  useFindAndModify: false
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} is not connect`));
