const multer = require("multer")
const fs = require("fs")
const path = require("path")

const uploadPath = path.join(__dirname, "..", "uploaads", "images")

if(!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, {recursive: true})
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const uniqueFilename = Math.random() * 1000 + "_" + Date.now() + ext
    cb (null, uniqueFilename)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp"
  ]
  if(!allowedTypes.includes(file.mimetype)){
    cb(new Error("allowed types (png, jpg, jpeg, webp) are required"))
  }
  cb(null, true)
}

module.exports = multer({
  storage,
  fileFilter,
  limits: {fileSize: 1024 * 1024 * 5}
})