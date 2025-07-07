import { S3Client } from "@aws-sdk/client-s3";

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

if (!bucketRegion || !accessKey || !secretAccessKey) {
    throw new Error("Missing AWS S3 configuration in environment variables.");
}

export const s3Config = {
    bucketName,
    bucketRegion,
    accessKey,
    secretAccessKey
};

export const s3Client = new S3Client({
    credentials: {
        accessKeyId: accessKey as string,
        secretAccessKey: secretAccessKey as string
    },
    region: s3Config.bucketRegion as string
});