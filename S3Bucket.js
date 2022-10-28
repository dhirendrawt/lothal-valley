const s3 = require('aws-sdk/clients/s3')
require('dotenv').config()
const fs = require('fs')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const S3 = new s3({
    region,
    accessKeyId,
    secretAccessKey
})

// Uploads a file to S3 Bucket.
function upload(file){
    const fileStream = fs.createReadStream(file.path)
    
    const uploadParams = {
        Bucket : bucketName ,
        Body : fileStream , 
        Key : file.filename
    }

    return S3.upload(uploadParams).promise()
}



// Downloads a file from S3 Bucket.

function download(fileKey){

    const downloadParams = {
        Key : fileKey,
        Bucket : bucketName
    }

    return S3.getObject(downloadParams).createReadStream()
}


exports.uploadFile = upload

exports.downloadFile = download