import mongoose from 'mongoose';
import {documentDB, entityDB} from '../constants/entities.constants'
import {iEntity} from "../entities/entity";

export interface iDocument extends mongoose.Document{
    entity: iEntity['_id'];
    title: string;
    description: string;
    document: string;
    disabled: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const DocumentSchema = new mongoose.Schema({
    entity:{
        type:mongoose.Schema.Types.ObjectId,
        ref:entityDB,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    document: {
        type: String
    },
    disabled: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
}, {
    collection: documentDB,
    timestamps: true
})

export const Document = mongoose.model<iDocument>(documentDB, DocumentSchema)
export default Document