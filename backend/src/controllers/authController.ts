import { Request, Response } from "express";
import { BadRequestError, UserNotAuthenticatedError } from "../utils/errors";
import { respondWithJSON } from "../utils/json";
import { checkHashedPassword, hashPassword } from "../utils/auth/password";
import { addUser, findUserByEmail } from "../services/userService";
import { issueJWT } from "../utils/auth/jwt";

export async function handleRegister(req: Request, res: Response) {
    type parameters = {
        email: string;
        name: string;
        password: string;
    };

    let params: parameters = req.body;

    if (!params.email || !params.password || !params.name) {
        throw new BadRequestError("Missing required fields.");
    }

    const email = params.email; // we need to add verification to this
    const name = params.name;
    const password = params.password;

    const hashedPassword = await hashPassword(password);
    const newUser = await addUser({ email, name, hashedPassword });

    const accessToken = issueJWT(newUser.id);

    res.cookie("accessToken", accessToken, {
        path: "/",
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 10 * 60 * 1000,
    });

    respondWithJSON(res, 201, {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
    });
}
export async function handleLogin(req: Request, res: Response) {
    type parameters = {
        email: string;
        password: string;
    };

    let params: parameters = req.body;

    if (!params.email || !params.password) {
        throw new BadRequestError("Missing required fields.");
    }

    const email = params.email;
    const user = await findUserByEmail(email);

    // Do we have a user with this email?
    if (!user) {
        throw new UserNotAuthenticatedError("Invalid username or password");
    }

    const password = params.password;
    const hashedPassword = user.hashedPassword;

    const match = await checkHashedPassword(password, hashedPassword);

    // Does this request's password match with user's password?
    if (!match) {
        throw new UserNotAuthenticatedError("Invalid username or password!!");
    }

    // Return a JWT Token 1HR
    const accessToken = issueJWT(user.id);

    res.cookie("accessToken", accessToken, {
        path: "/",
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 10 * 60 * 1000,
    });

    respondWithJSON(res, 200, {
        id: user.id,
        name: user.name,
    });
}
export async function handleRefreshToken(req: Request, res: Response) {}
export async function handleLogout(req: Request, res: Response) {}
