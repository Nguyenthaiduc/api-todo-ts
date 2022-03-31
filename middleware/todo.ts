import express,{Application,Response,Request,NextFunction} from 'express';
import createError  from 'http-errors'
import path from 'path'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import api from '../routes/todo'
const app = express()

//view engine setup

export const todoMiddleware = (app: Application) =>{
    app.use(morgan("dev"))
    app.use(express.urlencoded({extended: true}))

    app.use('/api/v1',api)
    //catch 404 and forward to error handler
    app.use(function(req:Request, res:Response,next:NextFunction){
        next(createError(404))
    })
    //error handler
    app.use(function(err:any, req:Request, res:Response, next:NextFunction){

        res.locals.message = err.message
        res.locals.err = req.app.get('env') === 'development' ? err : {}
        //render
        res.status(err.status || 500)
        res.render('error')
    })
    return app
}