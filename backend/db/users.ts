import { eq } from "drizzle-orm";
import { db } from ".";
import { user as userTable } from "./schema/auth-schema";
import { startOfDay, isSameDay, subDays } from "date-fns";

export async function updateStats(userId: string, createdAt: Date) {
    const today = startOfDay(createdAt);
    const yesterday = subDays(today, 1);

    await db.transaction(async (tx) => {
        const [user] = await tx
            .select()
            .from(userTable)
            .where(eq(userTable.id, userId))
            .for("update");

        if (!user) {
            return;
        }

        const lastActive = user.lastActive;

        if (isSameDay(lastActive, today)) {
            return;
        }

        let streak = 1;
        if (isSameDay(lastActive, yesterday)) {
            streak = user.currentStreak + 1;
        }

        const longest = Math.max(streak, user.longestStreak);

        await tx
            .update(userTable)
            .set({
                lastActive: today,
                currentStreak: streak,
                longestStreak: longest,
            })
            .where(eq(userTable.id, userId));
    });
}
