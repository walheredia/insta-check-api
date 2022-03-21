import { toObjectId } from "../utils/utils";
import Document, {iDocument} from "./document";

export async function create(document: any){
    return await Document.create(document);
}

export async function getAll(entityId:string): Promise<iDocument[]> {
    return Document.find({entity: toObjectId(entityId)});
}

export async function deleteOne(id:string): Promise<any>{
    return Document.updateOne({_id: toObjectId(id)}, { $set: {disabled:true} });
}