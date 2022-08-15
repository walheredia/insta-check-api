import { Request, Response } from 'express';
import {create, deleteOne, findOne, getAll} from "./follow.service"
import { getByStrRandom } from '../entities/entity.service';

export let createFollow = async(req: Request, res: Response) => {
    try{
        const user: string = req.body.user as string;
        const strRandom: string = req.body.strRandom as string;
        const entity = await getByStrRandom(strRandom);
        if (!entity) {
            return res.status(404).send('entity not found');
        } else {
            const newfollow = {
                user: user,
                entity: entity._id,
                strRandom: strRandom
            }
            const follow = await create(newfollow);
            return res.status(200).send(follow)
        }
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

export let getFollow = async(req: Request, res: Response) => {
    try {
        const strRandom: string = req.params.strRandom as string;
        const user: string = req.params.user as string;
        const follow = await findOne(user, strRandom);
        return res.status(200).send(follow);
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