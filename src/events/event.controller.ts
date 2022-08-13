import { Request, Response } from 'express';
import { get, getAll, create, update, deleteOne} from "./event.service"

export let createEvent = async(req: Request, res: Response) => {
    try {
        const { title, description, entity, eventDate } = req.body;
        const newEvent = {
          eventDate: eventDate,
          entity: entity,
          title: title,
          description: description
        };
        const event = await create(newEvent)
        return res.status(200).send({message: 'Event added successfully', data: event});
    } catch(error:any){
        return res.status(500).send({error: error.message})
    }
}

export let getEvents = async(req: Request, res: Response) => {
    try {
        const entity: string = req.query.entity as string;
        const events = await getAll(entity);
        return res.status(200).send(events);
    } catch(error:any){
        return res.status(500).send({error: error.message})
    }
}
export let getEvent = async(req: Request, res: Response) => {
    try {
        const id = req.params.id ? req.params.id : undefined;
        const events = await get(id);
        return res.status(200).send(events);
    } catch(error:any){
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