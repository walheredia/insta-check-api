import { Request, Response } from 'express';
import {create, deleteOne, getAll} from "./follow.service"

export let createFollow = async(req: Request, res: Response) => {
    try{
        const follow = await create(req.body);
        return res.status(200).send(follow)
    } catch(error:any){
        return res.status(500).send({error: error.message})
    }
}

export let getFollows = async(req: Request, res: Response) => {
    try {
        const user: string = req.query.user as string;
        const follows = await getAll(user);
        return res.status(200).send(follows);
    } catch(error:any){
        return res.status(500).send({error: error.message})
    }
}

export let deleteFollow = async(req: Request, res: Response) => {
    try {
        const follow = await deleteOne(req.params.id);
        return res.status(200).send(follow)
    } catch(error:any){
        return res.status(500).send({error: error.message})
    }
}