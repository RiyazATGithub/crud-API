const mongoose = require("mongoose");
const Task = new mongoose.Schema({
  Taskname: {
    type: String,
    required: true,
  },

  Taskinfo: {
    type: String,
  },

  status: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
  },
  completedAt: {
    type: Date,
  },
  subTask: {
    type: schema.types.ObjectId,
    ref: subTask,
  },
});

const subTask = new mongoose.Schema(
  {
    subtaskName: {
      type: String,
      required: true,
    },
    subTaskInfo: {
      type: string,
    },
    inProcess: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
    createdBy: { type: schema.types.ObjectId, ref: Task },
  },
  {
    timestamps: true,
  }
);
