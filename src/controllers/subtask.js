const { Task, subTask } = require("../models/toDo");

const addSub = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const subTodo = await Task.findById(id);

    if (!subTodo) return res.status(500).json({ message: "Task not found" });

    const addSubtodo = await subTask.create({
      ...body,
      parentId: id,
    });
    await subTodo.save();

    res.status(200).json({ addSubtodo });
  } catch (err) {
    return res.status(500).json(`${err.message}`);
  }
};

module.exports = { addSub };
