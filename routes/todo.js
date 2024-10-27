const { Router } = require("express");
const { adminMiddleware } = require("../middleware/user");
const { TodoModel } = require("../database");
const moment = require('moment');
const todoRouter = Router();

// todo Routes
todoRouter.post('/create', async (req, res) => {
    // Implement todo creation logic
    try {
        const {title, description, priority, date, progress, userId} = req.body;

        await TodoModel.create({
            title,
            description,
            priority,
            date: moment.utc(date),
            progress,
            userId
        })
        res.status(201).json({
            msg: `todo is created`
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error: something went wrong!",
            error: error.message || error,
        });
    }
});

todoRouter.put('/changeprogress', adminMiddleware, async (req, res) => {
    // Implement update todo  logic
    try {
        const { id, progress } = req.body;
    
        // Validate input
        if (!id || !progress) {
          return res.status(400).json({ message: 'Todo ID and new progress are required' });
        }
    
        // Find the todo by id and update its progress
        const updatedTodo = await TodoModel.findByIdAndUpdate(id, { progress }, { new: true });
    
        // Check if the todo was found and updated
        if (!updatedTodo) {
          return res.status(404).json({ message: 'Todo not found' });
        }
    
        res.status(200).json(updatedTodo);
      } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ message: 'Server error' });
      }
});

// todoRouter.delete('/', adminMiddleware, (req, res) => {
//     // Implement delete todo logic
// });

// todoRouter.delete('/:id', adminMiddleware, (req, res) => {
//     // Implement delete todo by id logic
// });


// todoRouter.get('/', adminMiddleware, (req, res) => {
//     // Implement fetching all todo logic
// });

// todoRouter.get('/:id', adminMiddleware, (req, res) => {
//     // Implement fetching todo by id logic
// });

module.exports = {
    todoRouter: todoRouter
}