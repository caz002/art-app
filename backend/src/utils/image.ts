import sharp from "sharp";

export async function resizeImageBuffer(
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
