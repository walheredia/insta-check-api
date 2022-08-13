import mongoose from 'mongoose';
import {eventDB, entityDB, userDB} from '../constants/entities.constants'
import {iEntity} from "../entities/entity";
import { iUser } from '../users/user';
//import {iDocument} from "../documents/document";

export interface iEvent extends mongoose.Document{
    entity: iEntity['_id'];
    user: iUser['_id'];
    title: string;
    description: string;
    eventDate: Date;
    priority: String;
    disabled: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const EventSchema = new mongoose.Schema({
    entity:{
        type:mongoose.Schema.Types.ObjectId,
        ref:entityDB,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:userDB,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
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
    collection: eventDB,
    timestamps: true
})

export const Event = mongoose.model<iEvent>(eventDB, EventSchema)
export default Event