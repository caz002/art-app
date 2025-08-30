import { v4 as uuidv4 } from "uuid";
import {
    S3Client,
    GetObjectCommand,
    PutObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { HTTPException } from "hono/http-exception";

export const s3Client = new S3Client({
    region: process.env.BUCKET_REGION!,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY!,
        secretAccessKey: process.env.SECRET_ACCESS_KEY!,
    },
});

export const putNewS3ImageObject = async (
    imageKey: string,
    buffer: Buffer<ArrayBufferLike>,
    contentType: string
) => {
    const command = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME!,
        Key: imageKey,
        Body: buffer,
        ContentType: contentType,
    });
    return await s3Client.send(command);
};

export const deleteS3ImageObject = async (imageKey: string) => {
    const command = new DeleteObjectCommand({
        Bucket: process.env.BUCKET_NAME!,
        Key: imageKey,
    });
    return await s3Client.send(command);
};

export async function uploadImageToS3(buffer: Buffer, mimeType: string) {
    const imageKey = uuidv4();
    const s3Response = await putNewS3ImageObject(imageKey, buffer, mimeType);

    if (!s3Response?.ETag) {
        throw new HTTPException(500, { message: "Invalid S3 response" });
    }

    return imageKey;
}
