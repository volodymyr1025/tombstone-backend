const multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
const path = require("path");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const storage = multerS3({
  s3: s3Client,
  bucket: process.env.S3_BUCKET_NAME,
  acl: "public-read",
  metadata: (req, file, cb) => {
    console.log("File object in metadata:", file);
    cb(null, { fieldName: file.fieldname });
  },
  key: (req, file, cb) => {
    console.log("File object in key:", file);
    const fileName = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    console.log("Generated file key:", fileName);
    cb(null, fileName);
  },
});

const stoneUpload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
}).fields([
  { name: "frontImage", maxCount: 1 },
  { name: "leftImage", maxCount: 1 },
  { name: "rightImage", maxCount: 1 },
  { name: "backImage", maxCount: 1 },
  { name: "topImage", maxCount: 1 },
]);

module.exports = stoneUpload;
