import { Request, Response } from 'express';
import { iDocument } from './document';
// import fs from 'fs-extra'; //No eliminar
// import path from 'path'; //No eliminar
import {create, deleteOne, getAll, getDocumentById} from "./document.service";
import {getFileS3, uploadS3} from "../aws/s3";

export let createDocument = async(req: Request, res: Response) => {
    try {
        const { title, description, event } = req.body;
        const respS3 = await uploadS3(req.file);
        const newDoc = {
            event: event,
            title: title,
            description: description,
            document: req.file?.path,
            mimeType: req.file?.mimetype,
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
        const docs = await getAll(req.params?.eventId);
        return res.status(200).send({'data': docs})
    } catch (error: any) {
        return res.status(500).send({error: error.message})
    }
}

export const downloadDocument = async (req: Request, res: Response): Promise<Response> => {
  try{
    const { documentId } = req.params;
    const document:iDocument|null = await getDocumentById(documentId);
    if(document){
      const fileData: Buffer = await getFileS3(document.awsKey);
      return res.status(200).type(document.mimeType).send(fileData);
    } else {
      return res.status(404).send('document not found');
    }
  } catch (error: any){
    return res.status(500).send({error: error.message})
  }
}
