import { Request, Response } from 'express';
import User, { iUser } from '../users/user';
import jwt from 'jsonwebtoken';

export const createUser = async (req: Request, res: Response) => {
    try {
        const user: iUser = new User({
            business: req.body.business,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
        user.password = await user.encryptPassword(user.password)
        const userSaved = await user.save();

        //token
        const token: string = jwt.sign({_id: userSaved._id}, process.env.TOKEN_SECRET || 'defaultToken');
        return res.header('auth-token', token).json(userSaved)
    }
    catch(error:any){
        return res.status(500).send({error: error.message})
    }
}

export const logIn = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user)
            return res.status(400).json('Email or password incorrect!');
        const correctPassword:boolean = await user.validatePassword(req.body.password);
        if (!correctPassword)
            return res.status(400).json('Email or password incorrect!');
        const token: string = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET || 'defaultToken', {
            expiresIn: process.env.AUTH_EXPIRES//seconds
        });
        return res.header('auth-token', token).json(user)
    }
    catch(error:any){
        return res.status(500).send({error: error.message})
    }
}

export const profile = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.userId, {password: 0})
        if(!user)
            return res.status(404).json('User not found!');
        return res.json(user)
    }
    catch(error:any){
        return res.status(500).send({error: error.message})
    }

}