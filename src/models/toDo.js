const mongoose = require("mongoose");
const user = require("../models/users");

const subTaskSchema = new mongoose.Schema(
  {
    parentId: {
      type: mongoose.Schema.ObjectId,
    },
    Taskname: {
      type: String,
      require: true,
    },
    Taskinfo: {
      type: String,
    },
    inprocess: {
      type: Boolean,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: user,
    },

    Taskname: {
      type: String,
      required: true,
    },

    Taskinfo: {
      type: String,
    },

    inStatus: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("task", taskSchema);
const subTask = mongoose.model("subtask", subTaskSchema);
module.exports = { Task, subTask };
