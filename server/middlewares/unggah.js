'use strict'
const unggah = require('unggah')
const path = require('path')

const storage = unggah.gcs({
    keyFilename: path.resolve(__dirname, '../key_file.json'),
    bucketName: 'product-silentatlantis',
    rename: (req, file) => {
        // console.log('masuk d unggah', file)
        return `${Date.now()}-${file.originalname}`
    }
})

const upload = unggah({
    limit: {
        filesize: 1e6
    },
    storage: storage
})


module.exports = upload