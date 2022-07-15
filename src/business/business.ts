import mongoose from 'mongoose'
import { businessDB } from '../constants/entities.constants'

export interface iBusiness extends mongoose.Document{
    name: string,
    cuit: string,
    disabled: boolean,
    createdAt: Date,
    updatedAt: Date,
}

const BusinessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cuit: {
        type: String,
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
    collection: businessDB, 
    timestamps: true
})

export const Business = mongoose.model<iBusiness>(businessDB, BusinessSchema)
export default Business