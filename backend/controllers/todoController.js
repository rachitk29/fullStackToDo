const todo = require("../models/todo");

exports.getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

exports.createTodo = async (req, res) => {
  const todo = new Todo({ text: req.body.text });
  const saved = await todo.save();
  res.json(saved);
};

exports.deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

exports.updateTodo = async (req, res) => {
  const updated = await todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};
