import mongoose from 'mongoose'
import { projectDB, businessDB } from '../constants/entities.constants'
import { iBusiness } from '../business/business'
export interface iProjects extends mongoose.Document{
    business: iBusiness['_id'];
    title: string,
    description: string,
    disabled: boolean,
    createdAt: Date,
    updatedAt: Date,
}

const ProjectSchema = new mongoose.Schema({
    business:{
        type:mongoose.Schema.Types.ObjectId,
        ref:businessDB,
    },
    title: {
        type: String,
        required: true
    },
    description: {
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
    collection: projectDB, 
    timestamps: true
})

export const Projects = mongoose.model<iProjects>(projectDB, ProjectSchema)
export default Projects