import express,{Request,Response,Application} from 'express';
import logger from 'morgan';
const app = express();
const port : number = 5000

//view engine
export = function(app : Application){
    app.use(logger("Something a Wrong View Engine"));
    app.use(express.json())
    app.use(express.urlencoded({ extended : true }));
}

app.get('/', (req:Request, res:Response) => {
    res.send("Hello World")
})

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
});