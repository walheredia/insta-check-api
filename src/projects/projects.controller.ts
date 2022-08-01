import { Request, Response } from 'express';
import {create, deleteOne, get, update} from "./projects.service"

export let createProjects = async(req: Request, res: Response) => {
    try{
        const project = await create(req.body);
        return res.status(200).send(project)
    } catch(error:any){
        return res.status(500).send({error: error.message})
    }
}

export let getProjects = async(req: Request, res: Response) => {
    try {
        let id = req.params.id ? req.params.id : undefined;
        const project = await get(id);
        return res.status(200).send(project);
    } catch(error:any){
        return res.status(500).send({error: error.message})
    }
}

export let updateProject = async(req: Request, res: Response) => {
    try {
        const business = await update(req.body, req.params.id);
        return res.status(200).send(business)
    } catch(error:any){
        return res.status(500).send({error: error.message})
    }
}

export let deleteProject = async(req: Request, res: Response) => {
    try {
        const project = await deleteOne(req.params.id);
        return res.status(200).send(project)
    } catch(error:any){
        return res.status(500).send({error: error.message})
    }
}