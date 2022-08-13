import mongoose from 'mongoose'
import { followDB, entityDB, userDB } from '../constants/entities.constants'
import { iEntity } from '../entities/entity'
import { iUser } from '../users/user';

export interface iFollow extends mongoose.Document{
    entity: iEntity['_id'];
    user: iUser['_id'];
}

const FollowSchema = new mongoose.Schema({
    entity:{
        type:mongoose.Schema.Types.ObjectId,
        ref:entityDB,
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:userDB,
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
    collection: followDB, 
    timestamps: true
})

export const Follow = mongoose.model<iEntity>(entityDB, FollowSchema)
export default Follow