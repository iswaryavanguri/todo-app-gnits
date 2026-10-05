const Todo = require("../models/Todo");

// GET /api/todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });

    res.status(200).json(todos);
  } catch (err) {
    console.error("GET TODOS ERROR:", err);

    res.status(500).json({
      message: "Failed to fetch todos",
      error: err.message,
    });
  }
};

// POST /api/todos
const createTodo = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Todo title is required",
      });
    }

    const todo = await Todo.create({
      title: title.trim(),
      completed: false,
    });

    res.status(201).json(todo);
  } catch (err) {
    console.error("CREATE TODO ERROR:", err);

    res.status(400).json({
      message: "Failed to create todo",
      error: err.message,
    });
  }
};

// PUT /api/todos/:id
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json(todo);
  } catch (err) {
    console.error("UPDATE TODO ERROR:", err);

    res.status(400).json({
      message: "Failed to update todo",
      error: err.message,
    });
  }
};

// DELETE /api/todos/:id
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (err) {
    console.error("DELETE TODO ERROR:", err);

    res.status(400).json({
      message: "Failed to delete todo",
      error: err.message,
    });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};