const express = require("express");
const {
  CREATE_POST,
  DELETE_POST,
} = require("../controllers/posts.controller.js");
const { checkToken } = require("../middlewares/auth.middleware.js");

const route = express.Router();

route.post("/post", checkToken, CREATE_POST);
route.delete("/post/:id", checkToken, DELETE_POST);
module.exports = route;
