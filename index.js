const express = require("express");
require("dotenv").config();
const noteRouter = require("./router/note.js");
const userRouter = require("./router/user.js");
const notFound = require("./middle-ware/not-found.js");

const app = express();
app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/note", noteRouter);

app.use(notFound);
app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
