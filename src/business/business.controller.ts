import { Request, Response } from 'express';
import {create, deleteOne, get, update} from "./business.service"

export let createBusiness = async(req: Request, res: Response) => {
    try{
        const business = await create(req.body);
        return res.status(200).send(business)
    } catch(error:any){
        return res.status(500).send({error: error.message})
    }
}

export let getBusiness = async(req: Request, res: Response) => {
    try {
        let id = req.params.id ? req.params.id : undefined;
        const business = await get(id);
        return res.status(200).send(business);
    } catch(error:any){
        return res.status(500).send({error: error.message})
    }
}

export let updateBusiness = async(req: Request, res: Response) => {
    try {
        const business = await update(req.body, req.params.id);
        return res.status(200).send(business)
    } catch(error:any){
        return res.status(500).send({error: error.message})
    }
}

export let deleteBusiness = async(req: Request, res: Response) => {
    try {
        const business = await deleteOne(req.params.id);
        return res.status(200).send(business)
    } catch(error:any){
        return res.status(500).send({error: error.message})
    }
}