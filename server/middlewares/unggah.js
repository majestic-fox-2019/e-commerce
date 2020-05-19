const unggah = require('unggah')

const storage = unggah.gcs({
  keyFilename: process.env.FILE_NAME_UNGGAH,
  bucketName: 'upload_image_skintype',
  rename: (req, file) => {
    return `${Date.now()}-${file.originalname}`  // this is the default
  }
})
const upload = unggah({
  storage: storage // storage configuration for google cloud storage or S3
})

module.exports = upload