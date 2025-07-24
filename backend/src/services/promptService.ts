import prisma from "../lib/prisma";

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
        console.log(
            `AddPrompt Error: `,
            error instanceof Error ? error.message : "Unknown Error"
        );
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
        console.log(
            `getPrompt Error: `,
            error instanceof Error ? error.message : "Unknown Error"
        );
    }
};
