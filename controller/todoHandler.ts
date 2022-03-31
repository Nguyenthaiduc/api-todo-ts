import express, { Request, Response, NextFunction } from 'express';
import Todo from '../models/todo'
import createError  from 'http-errors'
export const getAllTodos = async (req: Request, res: Response) => {
    //tra ve tat ca du lieu cua todo
    try {
        const todos = await Todo.find({}, 'todo')

        if (!todos) {
            return res.status(400).json({
                success: false,
                message: 'Không thể nhận dữ liệu Todo',
                todos: [],
            })
        }
        //
        return res.status(200).json({
            success: true,
            message: 'Nhận dữ liệu Todo thành công',
            todos: todos
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}
//create Todo
export const createTodo = async (req: Request, res: Response) => {
    try {
        //todo được post từ request lên
        const { todo } = req.body
        const todos = await Todo.create({ todo })

        if (!todos) {
            return res.status(400).json({
                success: false,
                message: 'Problem Create Todo',
                todo: null,
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Tạo todo thành công',
            todo: todos,
        })
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message,
        })
    }
}
//Update todo using Method Put
export const updateTodo = async (req:Request, res:Response) => {
    try{
        const deleteTodo = await Todo.findOneAndUpdate({_id:req.params.id})

        if(!deleteTodo){
            return res.status(400).json({
                success: false,
                message:"Có lỗi xảy ra , Todo chưa được cập nhật",
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Cập nhật Todo thành công',
        })
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}
//Delete todo
export const deleteTodo = async (req:Request, res:Response) => {
    try{
        const deleteTodo = await Todo.findByIdAndDelete({_id:req.params.id})
        if(!deleteTodo){
            return res.status(400).json({
                success: false,
                message:'Có lỗi xảy ra , không thẻ xóa todo',
            })
        }
        return res.status(200).json({
            success: true,
            message : 'Xóa todo thành công'
        })
    }catch (err) {
        return res.status(400).json({
            success: false,
            message : err.message
        })
    }
}
export const getATodo = async (req: Request, res: Response)=>{
    try{
        const getTodo = await Todo.findById({_id:req.params.id})
        if(!getTodo){
            return res.status(400).json({
                success: false,
                message:"Không tìm thấy id",
            })
        }
        return res.status(200).json({
            success: true,
            todo: getTodo
        })
    }catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message,
        })
    }
}
export const createErrorStatus = (req:Request, res:Response,next:NextFunction) => {
    next(createError(404))
}
export const errorHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
    res.locals.message = err.message
        res.locals.err = req.app.get('env') === 'development' ? err : {}
        //render
        res.status(err.status || 500)
        res.render('error')
}