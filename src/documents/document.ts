import mongoose from 'mongoose';
import {documentDB, eventDB} from '../constants/entities.constants'
import {iEvent} from "../events/event";

export interface iDocument extends mongoose.Document{
    event: iEvent['_id'];
    title: string;
    description: string;
    document: string;
    mimeType: string;
    disabled: boolean;
    awsEtag: string;
    awsLocation: string;
    awsKey: string;
    awsBucket: string
    createdAt: Date;
    updatedAt: Date;
}

const DocumentSchema = new mongoose.Schema({
    event:{
        type:mongoose.Schema.Types.ObjectId,
        ref:eventDB,
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
    mimeType: {
      type: String
    },
    disabled: {
        type: Boolean,
        required: true,
        default: false
    },
    awsEtag: {
        type: String,
        required: true
    },
    awsLocation: {
        type: String,
        required: true
    },
    awsKey: {
        type: String,
        required: true
    },
    awsBucket: {
       type: String
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