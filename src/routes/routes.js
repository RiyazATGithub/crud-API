const {
  Register,
  Login,
  userDetails,
  Update,
  Delete,
} = require("../controllers/users");

const { addTask, getTask } = require("../controllers/Task.js");
const { addSub } = require("../controllers/subtask.js");

const express = require("express");
const tokenVerify = require("../middleware/token.js");
const router = express.Router();

router.post("/register", Register);

router.post("/login", Login);

router.get("/userDetails/:id", tokenVerify, userDetails);

router.put("/update/:id", tokenVerify, Update);

router.delete("/delete/:id", tokenVerify, Delete);

router.post("/addTask", tokenVerify, addTask);

router.get("/getTask", tokenVerify, getTask);

router.post("/addsubtask/:id", addSub);

module.exports = router;
