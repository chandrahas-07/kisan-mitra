const s3 = require("../config/s3");

const {
  PutObjectCommand,
} = require("@aws-sdk/client-s3");

async function uploadFile(file) {

  if (!file) {
    throw new Error("No file provided.");
  }

  const key = `${Date.now()}-${file.originalname}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
  );

  return {
    key,
    url: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
  };
}

module.exports = {
  uploadFile,
};