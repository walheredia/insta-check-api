import { toObjectId } from "../utils/utils";
import Projects from "./projects";
import {entityDB} from "../constants/entities.constants";

export async function create(project: any){
    return await Projects.create(project);
}

export async function get(id?: string) {
    let filter:any = { disabled: false };
    if(id){
        filter._id = toObjectId(id)
    };
    const res = await Projects.aggregate([
        { $match: filter },
        {
            $lookup: {
                from: entityDB,
                localField: "_id",
                foreignField: "entity",
                as: "entities"
            }
        }
    ]);
    return res;
}

export async function update(project:any, id:string){
    return await Projects.updateOne({_id: toObjectId(id)}, project);
}

export async function deleteOne(id:string){
    return await Projects.updateOne({_id: toObjectId(id)}, { $set: {disabled:true} });
}