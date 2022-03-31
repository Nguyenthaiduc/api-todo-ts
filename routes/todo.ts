import express from 'express';
import {getAllTodos,createTodo,updateTodo,deleteTodo} from '../controller/todoHandler'
const router = express.Router();

//Get All Todo
router.get('/todos',getAllTodos)
router.post('/todos',createTodo)
router.patch('/todos/:id',updateTodo)
router.delete('/todos/:id',deleteTodo)
