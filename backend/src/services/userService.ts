import { Prisma } from "@prisma/client";
import { BadGatewayError, ConflictError } from "../utils/errors";
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
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                throw new ConflictError("User already exists with this email.");
            }
        }
        throw new BadGatewayError("Upstream database unavailable");
    }
}

export async function findUserByEmail(email: string) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        return user;
    } catch (err) {
        throw new BadGatewayError("Upstream database unavailable");
    }
}
