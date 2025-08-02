import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import { config } from "../../config";
import { UserNotAuthenticatedError } from "../errors";

type payload = Pick<JwtPayload, "iss" | "sub" | "iat" | "exp">;

export function validateJWT(accessToken: string) {
    const privateKey = config.jwt.secret;
    let decodedToken: payload;
    try {
        decodedToken = jwt.verify(accessToken, privateKey) as payload;
    } catch (err) {
        throw new UserNotAuthenticatedError("Invalid Token");
    }

    const issuer = config.jwt.issuer;
    if (decodedToken.iss !== issuer) {
        throw new UserNotAuthenticatedError("Invalid Token");
    }

    // Do we have a user id?
    const userId = decodedToken.sub;
    if (!userId) {
        throw new UserNotAuthenticatedError("Invalid Token");
    }

    return userId;
}

export function issueJWT(userId: string) {
    const issueAtTime = Math.floor(Date.now() / 1000);
    const issuer = config.jwt.issuer;
    const defaultDuration = config.jwt.defaultDuration;
    const privateKey = config.jwt.secret;

    const jwtToken = jwt.sign(
        {
            iss: issuer,
            sub: userId, // subject
            iat: issueAtTime,
            exp: issueAtTime + defaultDuration,
        },
        privateKey
    );
    return jwtToken;
}
