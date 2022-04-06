import mongoose from 'mongoose';
const Schema = mongoose.Schema

//create schema todo namespace dùng để gom nhóm các table có chung một đặc điểm
const TodoSchema = new Schema({
    
    todo:{
        type: 'string',
        required:[true,'todo text field is required']
    },
    isDone:{
        type : Boolean,
        default: false
    }
    
})

//create model todo
const Todos = mongoose.model('todo',TodoSchema)
export default Todos