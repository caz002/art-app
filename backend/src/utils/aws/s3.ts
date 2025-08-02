import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "../../config";
import {
    S3Client,
    GetObjectCommand,
    PutObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { BadGatewayError } from "../errors";

export const s3Client = new S3Client({
    credentials: {
        accessKeyId: config.aws.s3.accessKey,
        secretAccessKey: config.aws.s3.secretAccessKey,
    },
    region: config.aws.s3.bucketRegion,
});

export const getSignedS3Url = async (imageKey: string, expiresIn = 3600) => {
    try {
        const command = new GetObjectCommand({
            Bucket: config.aws.s3.bucketName,
            Key: imageKey,
        });

        const signedUrl = await getSignedUrl(s3Client, command, {
            expiresIn: expiresIn,
        });
        return signedUrl;
    } catch (error) {
        throw new BadGatewayError("Unable to get image url. Try again later.");
    }
};

export const putNewS3ImageObject = async (
    imageKey: string,
    buffer: Buffer<ArrayBufferLike>,
    contentType: string
) => {
    try {
        const command = new PutObjectCommand({
            Bucket: config.aws.s3.bucketName,
            Key: imageKey,
            Body: buffer,
            ContentType: contentType,
        });

        await s3Client.send(command);
    } catch (error) {
        throw new BadGatewayError("Unable to upload image. Try again later.");
    }
};

export const deleteS3ImageObject = async (imageKey: string) => {
    try {
        const command = new DeleteObjectCommand({
            Bucket: config.aws.s3.bucketName,
            Key: imageKey,
        });

        await s3Client.send(command);
    } catch (error) {
        throw new BadGatewayError("Unable to delete image. Try again later.");
    }
};
