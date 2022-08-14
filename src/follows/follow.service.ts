import { toObjectId } from "../utils/utils";
import Follow, {iFollow} from "./follow";
import { entityDB } from "../constants/entities.constants";

export async function create(follow: any){
    
    return await Follow.create(follow);
}

export async function deleteOne(id:string){
    return await Follow.updateOne({_id: toObjectId(id)}, { $set: {disabled:true} });
}

export async function getAll(user: string) {
    let filter:any = { disabled: false, user: toObjectId(user) };
    const res = await Follow.aggregate([
        { $match: filter },
        {
            $lookup: {
                from: entityDB,
                localField: "entity",
                foreignField: "_id",
                as: "entity"
            }
        }
    ]);
    return res;
}

export async function findOne(user: string, strRandom: string) {
    let filter:any = { disabled: false, user: toObjectId(user), strRandom: strRandom };
    const res = await Follow.findOne(filter);
    return res;
}