import { ObjectId } from "mongoose";

export let createRandomString = ():string => {
    let res:string = ''
    let characters:string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(let i = 0; i < 50; i++){
        res += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return createHashMD5(res);
}

export let createHashMD5 = (str:string):string => {
    let crypto = require('crypto');
    return crypto.createHash('md5').update(str).digest('hex');
}

export let toObjectId = (str:string):ObjectId => {
    var mongoose = require('mongoose');
    return mongoose.Types.ObjectId(str);
}