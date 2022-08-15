import { Request, Response } from 'express';
import {create, deleteOne, downloadQR, get, update, getChilds} from "./entity.service"
import { createRandomString } from '../utils/utils';


export let createEntity = async(req: Request, res: Response) => {
    try{
        req.body.strRandom = createRandomString();
        const entity = await create(req.body);
        return res.status(200).send(entity)
    } catch(error:any){
        return res.status(500).send({error: error.message})
    }
}

export let getEntities = async(req: Request, res: Response) => {
    try {
        let id = req.params.id ? req.params.id : undefined;
        const entities = await get(id);
        return res.status(200).send(entities);
    } catch(error:any){
        return res.status(500).send({error: error.message})
    }
}
export let getEntityChilds = async(req: Request, res: Response) => {
    try {
        let id = req.params.id ? req.params.id : undefined;
        const entities = await getChilds(id);
        return res.status(200).send(entities);
    } catch(error:any){
        return res.status(500).send({error: error.message})
    }
}

export let updateEntity = async(req: Request, res: Response) => {
    try {
        const entity = await update(req.body, req.params.id);
        return res.status(200).send(entity)
    } catch(error:any){
        return res.status(500).send({error: error.message})
    }
}

export let deleteEntity = async(req: Request, res: Response) => {
    try {
        const entity = await deleteOne(req.params.id);
        return res.status(200).send(entity)
    } catch(error:any){
        return res.status(500).send({error: error.message})
    }
}

export const printQR = async (req: Request, res: Response) => {
    try{
        let id = req.params.id ? req.params.id : undefined;
        let fileName:string = `${createRandomString()}.pdf`;
        await downloadQR(fileName, id)
        return res.status(200).send({
            'message': 'file ready to download',
            'fileName': fileName
        })
    }catch(error:any){
        return res.status(500).send({error: error.message})
    }
}

export const downloadFile = async (req: Request, res: Response): Promise<void> => {
    const fileName = req.params?.name;
    const directoryPath = "downloads/";
    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
        res.status(500).send({
            message: "Could not download the file. " + err,
        });
        }
    });
}