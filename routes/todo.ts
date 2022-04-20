import express from 'express';
import {getAllTodos,createTodo,updateTodo,deleteTodo,getATodo} from '../controller/'
import authenToken from '../middleware/authenToken';
const router = express.Router();

//Get All Todo
router.get('/todos',getAllTodos)
router.post('/todos',createTodo)
router.patch('/todos/:id',authenToken,updateTodo)
router.delete('/todos/:id',authenToken,deleteTodo)
router.get('/todos/:id',getATodo)

export default router
