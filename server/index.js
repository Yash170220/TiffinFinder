import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Authorization"
  );
  next();
});

app.use(express.json({ limit: "10MB" }));
app.get("/", (req, res) => {
  res.json({ message: "Welcome to tiffin's API" });
});
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Woooh! Not found!" });
});

const startServer = async () => {
  try {
    mongoose.connect(process.env.MONGO_CONNECT).then(() => {
      app.listen(port, () =>
        console.log(`Database connected and Server listening on port: ${port}`)
      );
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
