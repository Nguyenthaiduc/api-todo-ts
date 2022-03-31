import express from 'express';

const app = express();
const port : number = 5000

app.get('/', (req, res) => {})

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
});