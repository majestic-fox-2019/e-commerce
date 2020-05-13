"use strict"

const unggah = require('unggah')
const storage = unggah.gcs({
    keyFilename: process.env.KEY_FILENAME,
    bucketName: process.env.BUCKET_NAME,
    rename: (req, file) => {
        return `${Date.now()}-${file.originalname}`
    }
})

const upload = unggah({
    limits: {
        fileSize: 1e6
    },
    storage: storage
})

module.exports = upload 