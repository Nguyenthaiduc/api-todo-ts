import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const authenToken = (req:Request,res:Response,next:NextFunction) => {
    const authorizationHeader = req.headers['authorization']
    // Beaer [token]
    if(authorizationHeader == null) {
        res.sendStatus(401)
        
    }
    const token = authorizationHeader.split(' ')[1]
    if(!token){
        console.log("No token")
        res.json({
            msg: "Invalid token"
        })
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,data) => {
        console.log(err,data)
        if(err) res.sendStatus(403)
        next()
    })
}
export default authenToken