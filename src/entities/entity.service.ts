import { toObjectId } from "../utils/utils";
import Entity, {iEntity} from "./entity";
import {documentDB} from "../constants/entities.constants";
import {eventDB} from "../constants/entities.constants";
import {getPDF} from "../utils/printer.service";

export async function create(entity: any){
    return await Entity.create(entity);
}

export async function get(id?: string) {
    let filter:any = { disabled: false };
    if(id){
        filter._id = toObjectId(id)
    };
    const res = await Entity.aggregate([
        { $match: filter },
        {
            $lookup: {
                from: documentDB,
                localField: "_id",
                foreignField: "entity",
                as: "documents"
            }
        },
        {
            $lookup: {
                from: eventDB,
                localField: "_id",
                foreignField: "entity",
                as: "events"
            }
        }
    ]);
    return res;
}

export async function update(entity:any, id:string){
    return await Entity.updateOne({_id: toObjectId(id)}, entity);
}

export async function deleteOne(id:string){
    return await Entity.updateOne({_id: toObjectId(id)}, { $set: {disabled:true} });
}

export async function downloadQR(fileName:string, id?:string){
    let filter:any = { disabled: false };
    if(id){
        filter._id = toObjectId(id)
    };
    const entities = await Entity.find(filter)
    let content:any[] = [];
    for(let entity of entities){
        content.push(
            {
                qr: `${process.env.URL_API}/qr/${entity.strRandom}`,
                fit: 320
            },
            {
                text: `${entity.title}`,
                bold: true,
                fontSize: 16
            },
            {
                text: `${entity.description}`,
                bold: false,
                fontSize: 14,
                alignment: 'justify',
                margin: [0, 0, 0, 20]
            }
        )
    }
    getPDF(content, `downloads/${fileName}`);
}