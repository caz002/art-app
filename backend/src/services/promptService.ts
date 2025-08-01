import { BadGatewayError } from "../utils/errors";
import prisma from "../utils/prisma";

export const addDailyPrompt = async (newPrompt: string) => {
    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);

    try {
        const prompt = await prisma.prompt.create({
            data: {
                date: date,
                text: newPrompt,
            },
        });

        return prompt;
    } catch (error) {
        throw new BadGatewayError("Upstream database unavailable");
    }
};

export const getDailyPrompt = async () => {
    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);

    try {
        const prompt = await prisma.prompt.findFirst({
            where: {
                date: date,
            },
        });

        return prompt;
    } catch (error) {
        throw new BadGatewayError("Upstream database unavailable");
    }
};
