const express = require("express");
const {
  CREATE_POST,
  GET_POSTS,
  DELETE_POST,
  UPDATE_POST,
  CREATE_COMMENT,
  DELETE_COMMENT,
} = require("../controllers/posts.controller.js");
const { checkToken } = require("../middlewares/auth.middleware.js");

const route = express.Router();

route.post("/post", checkToken, CREATE_POST);
route.get("/post", GET_POSTS);
route.delete("/post/:id", checkToken, DELETE_POST);
route.put("/post/:id", checkToken, UPDATE_POST);
route.post("/post/:id/comment", checkToken, CREATE_COMMENT);
route.delete("/comment/:id", checkToken, DELETE_COMMENT);
module.exports = route;
