import { toObjectId } from "../utils/utils";
import Event from "./event";
import {documentDB} from "../constants/entities.constants";

export async function create(event: any){
    return await Event.create({disabled: false, ...event});
}
export async function update(event:any, id:string){
    return await Event.updateOne({_id: toObjectId(id)}, { $set:
        {
            title: event.title,
            description: event.description,
            eventDate: event.eventDate
        }
    });
}
export async function get(id?: string) {
    let filter:any = { disabled: false };
    if(id){
        filter._id = toObjectId(id)
    };
    const res = await Event.aggregate([
        { $match: filter },
        {
            $lookup: {
                from: documentDB,
                localField: "_id",
                foreignField: "event",
                as: "documents"
            }
        }
    ]);
    return res;
}
export async function getAll(entity: string) {
    let filter:any = { disabled: false, entity: toObjectId(entity) };
    const res = await Event.aggregate([
        { $match: filter }
    ]);
    return res;
}
export async function deleteOne(id:string): Promise<any>{
    return Event.updateOne({_id: toObjectId(id)}, { $set: {disabled:true} });
}