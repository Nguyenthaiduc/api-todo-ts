
 import { verify } from 'jsonwebtoken';
 import dotenv from 'dotenv'
 dotenv.config()

 
 /**
  * JSON Web Token
  */
 export default (req, res, next) => {
     try {
         const token = req.headers.authorization.split(' ')[1];
 
         req.userData = verify(token, process.env.JWT_SECRET);
 
         next();
     } catch (error) {
         return res.status(401).json({ message: 'Auth failed', error });
     }
 };