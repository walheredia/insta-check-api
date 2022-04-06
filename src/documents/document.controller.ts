import { Request, Response } from 'express';
import Document from './document';
// import fs from 'fs-extra'; //No eliminar
// import path from 'path'; //No eliminar
import {create, deleteOne, getAll} from "./document.service";
import {uploadS3} from "../aws/s3";

export let createDocument = async(req: Request, res: Response) => {
    try {
        const { title, description, entity } = req.body;
        const respS3 = await uploadS3(req.file);
        const newDoc = {
            entity: entity,
            title: title,
            description: description,
            document: req.file?.path,
            awsEtag: respS3.ETag,
            awsLocation: respS3.Location,
            awsKey: respS3.Key,
            awsBucket: respS3.Bucket
        };
        const document = await create(newDoc)
        return res.status(200).send({message: 'Document added successfully', data: document});
    } catch(error:any){
        return res.status(500).send({error: error.message})
    }
}

export let deleteDocument = async (req: Request, res:Response): Promise<Response> => {
    try{
        const { documentId } = req.params;
        const document = await deleteOne(documentId);
        // if(document){ //si quiséramos eliminar físicamente el documento
        //     await fs.unlink(path.resolve(document.document))
        // }
        return res.status(200).send({message: 'Document removed successfully', data: document})
    } catch(error:any){
        return res.status(500).send({error: error.message})
    }
}

export const getDocuments = async (req: Request, res: Response): Promise<Response> => {
    try {
        const docs = await getAll(req.params?.entityId);
        return res.status(200).send({'data': docs})
    } catch (error: any) {
        return res.status(500).send({error: error.message})
    }
}

export const downloadDocument = async (req: Request, res: Response): Promise<void> => {
    const fileName = req.params?.name;
    const directoryPath = "uploads/";
    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
        res.status(500).send({
            message: "Could not download the file. " + err,
        });
        }
    });
}
