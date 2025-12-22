const express = require('express')
const {CREATE_COMMENT, DELETE_COMMENT} = require('../controllers/comments.controller.js')

const {
  CREATE_COMMENT,
  GET_COMMENTS,
  DELETE_COMMENT,
  UPDATE_COMMENT,
} = require("../controllers/comments.controller.js");
const { checkToken } = require("../middlewares/auth.middleware.js");

route.post('/post/:id/comment', checkToken, CREATE_COMMENT)
route.delete('/comment/:id', checkToken, DELETE_COMMENT)

route.get("/comments", GET_COMMENTS);

route.post("/post/:id/comment", checkToken, CREATE_COMMENT);
route.put("/comment/:id", checkToken, UPDATE_COMMENT);

route.delete("/comment/:id", checkToken, DELETE_COMMENT);

module.exports = route;
