import { toObjectId } from "../utils/utils";
import Event, {iEvent} from "./event";

export async function create(event: any){
    return await Event.create(event);
}
export async function update(event:any, id:string){
    return await Event.updateOne({_id: toObjectId(id)}, { $set:
        {
            title: event.title,
            description: event.description,
            document: event.document
        }
    });
}
export async function getAll(entityId:string): Promise<iEvent[]> {
    return Event.find({entity: toObjectId(entityId)});
}

export async function deleteOne(id:string): Promise<any>{
    return Event.updateOne({_id: toObjectId(id)}, { $set: {disabled:true} });
}