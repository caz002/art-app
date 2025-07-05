import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client, s3Config } from "../config/s3";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

export const getSignedS3Url = async (imageKey : string, expiresIn = 3600) => {
    try {
        const command = new GetObjectCommand({
            Bucket: s3Config.bucketName,
            Key: imageKey
        });

        const signedUrl = await getSignedUrl(s3Client, command, {expiresIn : expiresIn});
        return signedUrl;
    } catch (error) {
        console.log(`getSignedS3Url Error: `, error instanceof Error ? error.message : "Unknown Error");
        throw error;
    }
}

export const putNewS3ImageObject = async (imageName : string, buffer : Buffer<ArrayBufferLike>, contentType: string) => {
    try {
        const command = new PutObjectCommand({
            Bucket: s3Config.bucketName,
            Key: imageName,
            Body: buffer,
            ContentType: contentType
        });

        await s3Client.send(command);
    } catch (error) {
        console.log(`S3 Upload Failed: `, error instanceof Error ? error.message : "Unknown Error");
        throw error;
    }
};