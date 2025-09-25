export type UserData = {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string;
    createdAt: string;
    updatedAt: string;
    bio: string;
    likes: string;
    occupation: string;
    longestStreak: number;
    currentStreak: number;
    activeDays: number;
};

export type Post = {
    imageUrl: string;
    id: number;
    userId: string;
    caption: string;
    imageKey: string;
    createdAt: string;
};
