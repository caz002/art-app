import { Request, Response } from "express";
import { BadRequestError } from "../utils/errors";
import { respondWithJSON } from "../utils/json";
import { hashPassword } from "../utils/auth/password";
import { addUser } from "../services/userService";

export async function handleRegister(req: Request, res: Response) {
    type parameters = {
        email: string;
        name: string;
        password: string;
    };

    let params: parameters = req.body;

    if (!params.email || !params.password || !params.name) {
        throw new BadRequestError("Missing required email or password!");
    }

    const email = params.email;
    const name = params.name;
    const password = params.password;

    const hashedPassword = await hashPassword(password);
    const newUser = await addUser({ email, name, hashedPassword });

    respondWithJSON(res, 201, {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
    });
}
export async function handleLogin(req: Request, res: Response) {}
export async function handleRefreshToken(req: Request, res: Response) {}
export async function handleLogout(req: Request, res: Response) {}
