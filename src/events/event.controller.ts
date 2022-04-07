import { Request, Response } from 'express';
import { getAll, create, update, deleteOne} from "./event.service"

export let createEvent = async(req: Request, res: Response) => {
    try {
        const { title, description, entity, document } = req.body;
        const newEvent = {
            entity: entity,
            title: title,
            description: description,
            document: document
        };
        const event = await create(newEvent)
        return res.status(200).send({message: 'Event added successfully', data: event});
    } catch(error:any){
        return res.status(500).send({error: error.message})
    }
}


export const getEvents = async (req: Request, res: Response): Promise<Response> => {
    try {
        const docs = await getAll(req.params?.entityId);
        return res.status(200).send({'data': docs})
    } catch (error: any) {
        return res.status(500).send({error: error.message})
    }
}
export let updateEvent = async(req: Request, res: Response) => {
    try {
        const event = await update(req.body, req.params.id);
        return res.status(200).send(event)
    } catch(error:any){
        return res.status(500).send({error: error.message})
    }
}
export let deleteEvent = async(req: Request, res: Response) => {
    try {
        const event = await deleteOne(req.params.id);
        return res.status(200).send(event)
    } catch(error:any){
        return res.status(500).send({error: error.message})
    }
}