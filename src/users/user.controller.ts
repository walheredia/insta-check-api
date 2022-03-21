import { Request, Response } from 'express';
import { get, update, logicalDelete} from "./user.service"

export let getUsers = async(req: Request, res: Response) => {
    try {
        console.log(req)
        let id = req.params.id ? req.params.id : undefined;
        const users = await get(id);
        return res.status(200).send(users);
    } catch(error:any){
        return res.status(500).send({error: error.message})
    }
}

export let updateUser = async(req: Request, res: Response) => {
    try {
        const user = await update(req.body, req.params.id);
        return res.status(200).send(user)
    } catch(error:any){
        return res.status(500).send({error: error.message})
    }
}

export let deleteUser = async(req: Request, res: Response) => {
    try {
        const user = await logicalDelete(req.params.id);
        return res.status(200).send(user)
    } catch(error:any){
        return res.status(500).send({error: error.message})
    }
}
