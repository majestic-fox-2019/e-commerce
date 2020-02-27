const unggah = require('unggah')

console.log('masuk gcs upload')

const storage = unggah.gcs({
  keyFilename: './keyfile-gcs.json',
  bucketName: 'ecommerce_product_hacktiv',
  rename: (req, file) => {
    return `${Date.now()}-${file.originalname}` // this is the default
  }
})

const upload = unggah({
  limits: {
    fileSize: 1e6 // in bytes
  },
  storage: storage // storage configuration for google cloud storage or S3
})

// console.log('uploadnya isinya adalah', upload)

module.exports = upload
