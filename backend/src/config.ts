type Config = {
    db: DBConfig;
    app: APPConfig;
    jwt: JWTConfig;
    aws: AWSConfig;
    gemini: GeminiConfig;
};

type APPConfig = {
    port: number;
};

type DBConfig = {
    dbUrl: string;
    directUrl: string;
};

type JWTConfig = {
    saltRounds: number;
    defaultDuration: number;
    refreshDuration: number;
    secret: string;
    issuer: string;
};

type AWSConfig = {
    s3: {
        bucketName: string;
        bucketRegion: string;
        accessKey: string;
        secretAccessKey: string;
    };
    cloudFront: {
        bucketRegion: string;
        distributionId: string;
        privateKey: string;
        keyPairId: string;
    };
};

type GeminiConfig = {
    apiKey: string;
};

process.loadEnvFile();

const envOrThrow = (key: string) => {
    if (!process.env[key]) {
        throw Error(`Environmental ${key} is missing!`);
    }
    return process.env[key];
};

export const config: Config = {
    app: {
        port: Number(envOrThrow("PORT")),
    },
    db: {
        dbUrl: envOrThrow("DATABASE_URL"),
        directUrl: envOrThrow("DIRECT_URL"),
    },
    jwt: {
        saltRounds: 10,
        defaultDuration: 60 * 60 * 1000, // 1 HR
        refreshDuration: 60 * 86400, // 60 DAYS
        secret: envOrThrow("SECRET_KEY"),
        issuer: envOrThrow("ISSUER"),
    },
    aws: {
        s3: {
            bucketName: envOrThrow("BUCKET_NAME"),
            bucketRegion: envOrThrow("BUCKET_REGION"),
            accessKey: envOrThrow("ACCESS_KEY"),
            secretAccessKey: envOrThrow("SECRET_ACCESS_KEY"),
        },
        cloudFront: {
            bucketRegion: envOrThrow("CLOUDFRONT_BUCKET_REGION"),
            distributionId: envOrThrow("CLOUDFRONT_DISTRIBUTION_ID"),
            privateKey: envOrThrow("CLOUDFRONT_PRIVATE_KEY"),
            keyPairId: envOrThrow("CLOUDFRONT_KEY_PAIR_ID"),
        },
    },
    gemini: {
        apiKey: envOrThrow("GEMINI_API_KEY"),
    },
};
