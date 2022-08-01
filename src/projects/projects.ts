import mongoose from 'mongoose'
import { projectDB } from '../constants/entities.constants'

export interface iProjects extends mongoose.Document{
    title: string,
    description: string,
    disabled: boolean,
    createdAt: Date,
    updatedAt: Date,
}

const ProjectSchema = new mongoose.Schema({
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