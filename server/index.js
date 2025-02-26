import express from "express";

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json({ limit: "10MB" }));
app.get("/", (req, res) => {
  res.json({ message: "Welcome to tiffin's API" });
});
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Woooh! Not found!" });
});
app.listen(port, () => console.log(`Server listening on port: ${port}`));
