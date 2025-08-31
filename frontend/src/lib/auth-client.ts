import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    // baseURL: "http://localhost:3000",
});

type ErrorTypes = Partial<
    Record<
        keyof typeof authClient.$ERROR_CODES,
        {
            en: string;
            es: string;
        }
    >
>;

const errorCodes = {
    USER_ALREADY_EXISTS: {
        en: "user already registered",
        es: "usuario ya registrada",
    },
} satisfies ErrorTypes;

export const getErrorMessage = (code: string, lang: "en" | "es") => {
    if (code in errorCodes) {
        return errorCodes[code as keyof typeof errorCodes][lang];
    }
    return "";
};

export const { signIn, signUp, useSession } = createAuthClient();
