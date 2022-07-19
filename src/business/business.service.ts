import { toObjectId } from "../utils/utils";
import Business from "./business";

export async function create(entity: any){
    return await Business.create(entity);
}

export async function get(id?: string) {
    let filter:any = { disabled: false };
    if(id){
        filter._id = toObjectId(id)
    };
    const res = await Business.aggregate([
        { $match: filter }
    ]);
    return res;
}

export async function update(business:any, id:string){
    return await Business.updateOne({_id: toObjectId(id)}, business);
}

export async function deleteOne(id:string){
    return await Business.updateOne({_id: toObjectId(id)}, { $set: {disabled:true} });
}