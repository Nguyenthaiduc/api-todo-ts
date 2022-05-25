
 import * as express from 'express';
 import checkAuth from '../middleware/checkAuth';
 import { login, signUp, remove } from '../controller/user';
 
 const router: express.Router = express.Router();
 
 /**
  *Dang Nhap
  */
 router.post('/login', login);
 
 /**
  * Dang Ky
  */
 router.post('/signup', signUp);
 
 /**
  * Xoa tai khoan
  */
 router.delete('/:userId', checkAuth, remove);
 
 
 export default router;