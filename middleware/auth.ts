// import config from 'config'
// import { NextFunction, Request, Response } from 'express'
// import jwt from 'jsonwebtoken'


// export interface IGetUserAuthInfoRequest extends Request {
//     user: string // or any other type
// }
// const auth = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
//     const token = req.header('x-auth-token')

//     //check for token
//     if (!token) {
//         res.status(401).json({
//             msg: "No Token , "
//         })
//     }
//     try {
//         //verify Token
//         const decoded = jwt.verify(token, config.get('jwtSecret'))
//         //add user  payload
//         req.user = decoded
//         next()
//     }catch (err) {
//         res.status(400).json({
//             msg : "Token not valid",
//         })
//     }
// }
// export default auth