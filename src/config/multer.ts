import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import moment from 'moment';
import fs from 'fs'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = 'uploads';// `uploads`; //${yearMonthDay()}
        fs.mkdirSync(path, {recursive: true})
        return cb(null, path)
    },
    filename: (req, file, cb)=>{
        cb(null,   uuidv4() + path.extname(file.originalname));
    }
})

const yearMonthDay = ():string => { //2021/12/09
    const date = moment();
    console.log(`\\${date.format('YYYY').toString()}\\${date.format('MM').toString()}\\${date.format('DD').toString()}\\`)
    return `\\${date.format('YYYY').toString()}\\${date.format('MM').toString()}\\${date.format('DD').toString()}\\`;
}

export default multer({storage});