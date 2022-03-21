import mongoose from 'mongoose';
import { userDB } from '../constants/users.constants';
import bcrypt from 'bcryptjs'

export interface iUser extends mongoose.Document{
    username: string;
    email: string;
    password: string;
    disabled: boolean;
    createdAt: Date;
    updatedAt: Date;
    encryptPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    disabled: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
}, {
    collection: userDB, 
    timestamps: true
})

UserSchema.methods.encryptPassword = async(password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt)
}

UserSchema.methods.validatePassword = async function(password:string): Promise<boolean>{
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model<iUser>(userDB, UserSchema)
export default User
