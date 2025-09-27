// api/index.ts
import { handle } from "hono/vercel";
import app from "../backend/app";

export const GET = handle(app);
export const POST = handle(app);
export const ALL = handle(app);
