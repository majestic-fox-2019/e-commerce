const unggah = require("unggah")

const storage = unggah.s3({
    endpoint: 's3.ap-southeast-1.amazonaws.com',
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
    bucketName: process.env.bucketName
})

const upload = unggah({
    limits: {
        fileSize: 1e6 // in bytes
    },
    storage: storage
})

module.exports = upload