import jwt from 'jsonwebtoken'
import express, { Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()
const router = express.Router()


router.post('/login', (req:Request, res:Response) => {
    //Authenication
    //Authorization
    //{username : 'Test'}

    const data = req.body
    const accessToken = jwt.sign(data,process.env.JWT_SECRET,{ expiresIn: '45s'}) //45s expires
    res.json({accessToken})

})

export default router
