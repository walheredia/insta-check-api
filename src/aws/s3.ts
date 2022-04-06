import S3 from 'aws-sdk/clients/s3';
import fs from 'fs'

let region = process.env.AWS_BUCKET_REGION || 'AWS_BUCKET_REGION_UNDEFINED';
let accessKeyId = process.env.AWS_ACCESS_KEY || 'AWS_ACCESS_KEY_UNDEFINED';
let secretAccessKey = process.env.AWS_SECRET_KEY || 'AWS_SECRET_KEY_UNDEFINED';

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

export let uploadS3 = async (file:any) => {
    const fileStream = fs.createReadStream(file.path);
    const response = await s3.upload({
        Bucket: process.env.AWS_BUCKET_NAME || 'AWS_BUCKET_NAME_UNDEFINED',
        Key: file.filename,
        Body: fileStream
    }).promise()
    return response;
};
