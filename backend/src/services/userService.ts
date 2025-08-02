import { BadGatewayError } from "../utils/errors";
import prisma from "../utils/prisma";

interface newUser {
    email: string;
    name: string;
    hashedPassword: string;
}

export async function addUser(newUser: newUser) {
    try {
        const user = await prisma.user.create({
            data: newUser,
        });

        return user;
    } catch (err) {
        throw new BadGatewayError("Upstream database unavailable");
    }
}
