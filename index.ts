import express, { Request, Response, Application } from 'express'
import morgan from 'morgan';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import api from './routes/todo'
import { errorHandler } from './controller/';
import auth from './middleware/authorization';
import cors from 'cors';
dotenv.config();

const app: Application = express();

//middleware
app.use(cors());
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api/v1', api)
app.use(errorHandler)
app.use('', auth)



// Connect mongo
const URI = process.env.MONGODB_URI
mongoose.connect(URI, {
  autoIndex: false
}, (err) => {
  if (err) throw err;
  console.log('Mongodb connection.')
})

//port
const port = process.env.PORT || 5000;


app.get('/', (req: Request, res: Response) => {
  res.send("Hello World")
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
});

