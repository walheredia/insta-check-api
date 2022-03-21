import mongoose from 'mongoose'
import { entityDB } from '../constants/entities.constants'

export interface iEntity extends mongoose.Document{
    title: string,
    description: string,
    strRandom: string,
    disabled: boolean,
    createdAt: Date,
    updatedAt: Date,
}

const EntitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    strRandom: {
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
    collection: entityDB, 
    timestamps: true
})

export const Entity = mongoose.model<iEntity>(entityDB, EntitySchema)
export default Entity