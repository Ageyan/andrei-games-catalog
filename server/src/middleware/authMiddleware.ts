import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

            req.user = decoded as {userId : string};

            next();
        } catch (err) {
            res.status(401).json({ message: 'Authorization denied, token invalid' });
            return;
        }
    }

    if (!token) {
        res.status(401).json({
            message: 'Admin not authorized, token missing'
        });
        return;
    }
}