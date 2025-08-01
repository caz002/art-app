import { Response } from "express";

export function respondWithJSON(
    res: Response,
    statusCode: number,
    payload: any
) {
    res.header("Content-Type", "application/json");
    res.status(statusCode);
    res.send(JSON.stringify(payload));
    res.end();
}

export function respondWithError(
    res: Response,
    statusCode: number,
    message: string
) {
    respondWithJSON(res, statusCode, { error: message });
}
