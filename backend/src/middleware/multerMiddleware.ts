import multer, { FileFilterCallback } from "multer";
import { BadRequestError } from "../utils/errors";
export const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (
        request: Express.Request,
        file: Express.Multer.File,
        callback: FileFilterCallback
    ) => {
        const acceptedTypes = file.mimetype.split("/");

        if (acceptedTypes[0] === "image" || acceptedTypes[0] === "video") {
            callback(null, true);
        } else {
            callback(null, false);
            callback(
                new BadRequestError("Only images and videos formats allowed!")
            );
        }
    },
});
