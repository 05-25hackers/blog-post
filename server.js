const express = require("express");
const { database } = require("./config/db.js");
const authRoute = require("./routes/auth.routes.js");
const postRoute = require("./routes/posts.routes.js");
const app = express();
app.use(express.json());

async function start() {
  await database();

  app.use("/api/auth", authRoute);
  app.use("/api/posts", postRoute);

  app.listen(3000, () => console.log("http://localhost:3000"));
}
start();
