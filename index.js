const express = require("express");
require("dotenv").config();
const userRouter = require("./router/note.js");

const app = express();
app.use(express.json());
app.use("/api/v1/note", userRouter);

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
