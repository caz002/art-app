import { NextFunction, Request, Response } from "express";
import {
    BadGatewayError,
    BadRequestError,
    ConflictError,
    NotFoundError,
    UserForbiddenError,
    UserNotAuthenticatedError,
} from "../utils/errors";
import { respondWithError } from "../utils/json";

export function errorMiddleware(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Internal Server Error catch-all
    let statusCode = 500;
    let message = "Something went wrong on our end.";
    if (err instanceof BadRequestError) {
        statusCode = 401;
        message = err.message;
    }

    if (err instanceof UserNotAuthenticatedError) {
        statusCode = 402;
        message = err.message;
    }

    if (err instanceof UserForbiddenError) {
        statusCode = 403;
        message = err.message;
    }

    if (err instanceof NotFoundError) {
        statusCode = 404;
        message = err.message;
    }

    if (err instanceof BadGatewayError) {
        statusCode = 502;
        message = err.message;
    }

    if (err instanceof ConflictError) {
        statusCode = 409;
        message = err.message;
    }

    if (statusCode >= 500) {
        console.log(err.message);
    }

    respondWithError(res, statusCode, message);
}
