import {
    CloudFrontClient,
    CreateInvalidationCommand,
} from "@aws-sdk/client-cloudfront";
import { config } from "../../config";
import { getSignedUrl } from "@aws-sdk/cloudfront-signer";

const cloudFront = new CloudFrontClient({
    region: config.aws.s3.bucketRegion,
    credentials: {
        accessKeyId: config.aws.s3.accessKey,
        secretAccessKey: config.aws.s3.secretAccessKey,
    },
});

export async function getCloudFrontSignedUrl(imageKey: string) {
    try {
        const signedUrl = getSignedUrl({
            url: "https://d1npmnr65yglaz.cloudfront.net/" + imageKey,
            dateLessThan: new Date(Date.now() + 1000 * 60 * 30), // 30 min
            privateKey: config.aws.cloudFront.privateKey,
            keyPairId: config.aws.cloudFront.keyPairId,
        });
        return signedUrl;
    } catch (err) {
        throw new Error("Cloudfront SignedUrl failed.");
    }
}

export async function invalidateCloudFrontImage(imageKey: string) {
    try {
        const invalidateParams = {
            DistributionId: config.aws.cloudFront.distributionId,
            InvalidationBatch: {
                CallerReference: imageKey,
                Paths: {
                    Quantity: 1,
                    Items: [`/${imageKey}`],
                },
            },
        };

        const invalidateCommand = new CreateInvalidationCommand(
            invalidateParams
        );
        await cloudFront.send(invalidateCommand);
    } catch (err) {
        throw new Error("Cloudfront Invalidation failed.");
    }
}
