import { toObjectId } from "../utils/utils";
import User from "./user";

export async function create(user: any){
    return await User.create(user);
}

export async function get(id?: string) {
    let filter:any = { disabled: false };
    if(id){
        filter._id = toObjectId(id)
    };

    return await User.find(filter).lean();
}
export async function update(user:any, id:string){
    return await User.updateOne({_id: toObjectId(id)}, { $set:
        {
            username: user.username,
            email: user.email
        }
    });
}

export async function logicalDelete(id:string){
    return await User.updateOne({_id: toObjectId(id)}, { $set: {disabled:true} });
}