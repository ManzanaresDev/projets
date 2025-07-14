// models/Todo.js

import mongoose from "mongoose";

const { Schema, model } = mongoose;

const toDoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 150,
    },
    isCompleted: {
      type: Boolean,
      trim: true,
      maxlength: 50,
    },
    createdBy: {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const ToDo = model("ToDo", toDoSchema);

export default ToDo;
