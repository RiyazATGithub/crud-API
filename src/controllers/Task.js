const { Task } = require("../models/toDo");
const user = require("../models/users.js");

const addTask = async (req, res) => {
  const { Taskname, Taskinfo } = req.body;

  try {
    const todo = await Task.create({
      userId: req.user.id,
      Taskname,
      Taskinfo,
    });
    res.status(200).json({ task: todo });
  } catch (err) {
    res.status(400).json({ message: `${err.message}` });
  }
};

const getTask = async (req, res) => {
  try {
    const get = await Task.findOne({ userId: req.user.id });
    console.log(get);

    res.status(200).json({ task: get });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addTask, getTask };
