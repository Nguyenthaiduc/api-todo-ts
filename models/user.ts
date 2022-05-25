
 import * as mongoose from 'mongoose';

 /**
  * Email regex
  */

 const emailRegex: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
 
 /**
  * tạo User Schema
  */
 const user: mongoose.Schema = new mongoose.Schema({
     //_id: mongoose.Schema.Types.ObjectId,
     email: {
         type: String,
         required: true,
         unique: true,
         match: emailRegex
     },
     password: {
         type: String,
         required: true
     }
 });
 
 
 export default mongoose.model('User', user);