const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
const express = require('express');
// Middleware to parse JSON bodies
// In-memory storage for todos
let todos = [];

// GET /todos - Retrieve all todo items
app.get('/todos', (req, res) => {
  res.json(todos);
});

// GET /todos/:id - Retrieve a specific todo item
app.get('/todos/:id', (req, res) => {
  const { id } = req.params;
  const todo = todos.find(t => t.id === parseInt(id));
  
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ error: 'Todo item not found' });
  }
});

// POST /todos - Create a new todo item
app.post('/todos', (req, res) => {
  const { task } = req.body;
  
  if (!task) {
    return res.status(400).json({ error: 'Task is required' });
  }

  const newTodo = {
    id: todos.length + 1,
    task,
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /todos/:id - Update an existing todo item
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;
  const todo = todos.find(t => t.id === parseInt(id));
  
  if (!todo) {
    return res.status(404).json({ error: 'Todo item not found' });
  }

  if (task !== undefined) {
    todo.task = task;
  }
  
  if (completed !== undefined) {
    todo.completed = completed;
  }
  
  todo.updatedAt = new Date().toISOString();
  res.json(todo);
});

// DELETE /todos/:id - Delete a todo item
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = todos.length;
  todos = todos.filter(t => t.id !== parseInt(id));
  
  if (todos.length === initialLength) {
    return res.status(404).json({ error: 'Todo item not found' });
  }
  
  res.status(204).send();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});