import bcrypt from "bcrypt";
import { config } from "../../config";

export async function hashPassword(password: string) {
    const saltRounds = config.jwt.saltRounds;
    const hashedPassword = bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export async function checkHashedPassword(
    password: string,
    hashedPassword: string
) {
    const match = bcrypt.compare(password, hashedPassword);
    return match;
}
