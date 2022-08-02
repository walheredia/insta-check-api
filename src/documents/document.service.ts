import { toObjectId } from "../utils/utils";
import Document, {iDocument} from "./document";

export async function create(document: any){
    return await Document.create(document);
}

export async function getAll(eventId:string): Promise<iDocument[]> {
    return Document.find({event: toObjectId(eventId)});
}

export async function deleteOne(id:string): Promise<any>{
    return Document.updateOne({_id: toObjectId(id)}, { $set: {disabled:true} });
}

export async function getDocumentById(documentId:string): Promise<iDocument | null> {
  return Document.findOne({_id: toObjectId(documentId)});
}