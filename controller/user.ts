
import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';

/**
 * User model
 */
import User from '../models/user';
import dotenv from 'dotenv'
dotenv.config()

/**
 *Dang Ky
 */
export const signUp = ({ body }, res) => {
    const { email, password } = body;

    User.find({ email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Mail exists'
                });
            } else {
                bcrypt.hash(password, 10, (error, hash:any) => {
                    if (error) {
                        return res.status(500).json({
                            error
                        });
                    } else {
                        const user = new User({
                           
                            email,
                            password: hash
                        });

                        user.save()
                            .then(_ => {
                                res.status(201).json({
                                    message: 'User created'
                                });
                            })
                            .catch(error => {
                                res.status(500).json({ error });
                            });
                    }
                });
            }
        });
};

/**
 * Dang Nhap
 */
export const login = ({ body }, res) => {
    const { email, password } = body;

    User.find({ email })
        .exec()
        .then((user: any) => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }

            bcrypt.compare(password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }

                if (result) {
                    const token = sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: '1h'
                        }
                    );

                    return res.status(200).json({
                        message: 'Auth successful',
                        token
                    });
                }

                res.status(401).json({
                    message: 'Auth failed'
                });
            });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

/**
 * Xoa Tai khoan
 */
export const remove = (req, res) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User deleted'
            });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};