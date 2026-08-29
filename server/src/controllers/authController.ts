import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User';

export const register = async (req: Request, res: Response) => {
    const { userName, password } = req.body;

    try {
        const userExist = await User.findOne({ userName });

        if (userExist) {
            res.status(409).json({ message: 'A user with this name is already registered, please enter another one' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const userObj = {
            userName, 
            password: passwordHash
        }

        const user = await User.create(userObj);

        res.status(201).json({
            message: 'The user has been successfully registered',
            user : user
        })
    } catch (err) {
        console.error('Register Error:', err);
        res.status(500).json({ message: 'Server error when trying to register' });
    }
}

export const login = async (req: Request, res: Response) => {
    const { userName, password } = req.body;

    try {
        const user = await User.findOne({ userName });

        if(!user) {
            res.status(401).json({ message: 'Incorrect email or password' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(401).json({ message: 'Incorrect email or password' });
            return;
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' }
        )

        res.status(200).json({
            token,
            user: {
                userId: user.id,
                userName: user.userName
            }
        })
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ message: 'Server error when trying to log in' });
    }
}

