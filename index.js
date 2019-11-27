require("dotenv").config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

let todoList = [{
        id: 1,
        task: 'learn Express',
        done: false
    },
    {
        id: 2,
        task: 'learn Express-Generator',
        done: false
    }
];

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send(todoList)
})

app.get('/:id', (req, res) => {
    try {
        const filteredTodo = todoList.find(item => item.id == req.params.id)
        res.send({
            message: 'Here is what you looking for',
            filteredTodo
        })
    } catch (error) {
        res.send(error)
    }
})

app.post('/', (req, res) => {
    try {
        let newId = todoList.length + 1
        let newTodo = {
            id: newId,
            task: req.body.task,
            done: false
        }
        todoList.push(newTodo)
        res.status(200).send({
            message: 'todo successfully added',
            todoList
        })
    } catch (error) {
        res.send(error)
    }

})

app.delete('/:id', (req, res) => {
    try {
        const idToDelete = req.params.id;
        let newTodo = todoList.filter(item => item.id !== parseInt(idToDelete))
        todoList = newTodo;

        res.status(200).send(todoList);
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})


app.put('/:id', (req, res) => {
    try {
        let getTodoToUpdate = todoList.findIndex(data => data.id == req.params.id);

        todoList.map(data => {
            if (data.id == req.params.id) {
                todoList[getTodoToUpdate].task = req.body.task
            }
        })
        res.send({
            message: 'data successfully update',
            todoList
        })

    } catch (error) {
        res.send(error)
    }

})

app.listen(process.env.PORT || 3000, () => {
    console.log('your server is running on port' + process.env.PORT)

})