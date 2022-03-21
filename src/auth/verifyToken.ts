import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

interface iPayload {
    _id: string;
    iat: number;
    exp: number;
}

export const jwtValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('auth-token');
        if (!token) return res.status(401).json('Access Denied!');
        const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'defaultToken') as iPayload;
        req.userId = payload._id
        next();
    } catch(error:any){
        return res.status(500).send({error: error.message})
    }
}