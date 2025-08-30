import sharp from "sharp";

async function resizeImageBuffer(
    buffer: Buffer<ArrayBufferLike>,
    height: number,
    width: number
) {
    const resizedImageBuffer = await sharp(buffer)
        .resize({
            height: height,
            width: width,
            fit: "contain",
        })
        .toBuffer();
    return resizedImageBuffer;
}

export async function processImage(file: File) {
    const arrayBuffer = await file.arrayBuffer();
    const resizedBuffer = await resizeImageBuffer(
        Buffer.from(arrayBuffer),
        800,
        800
    );
    return resizedBuffer;
}
