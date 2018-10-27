const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/todos', async (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        // _creator: req.user._id
    });

    try {
        const doc = await todo.save();
        res.send(doc);
    } catch(e) {
        res.status(400).send(e);
    }

});

app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.send({todos});
    } catch(e) {
        res.status(400).send(e);
    }
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app}