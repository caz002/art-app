// Use to store any Type Values to free up space in main components
// Can remove file later if we figure out how to retrieve the types using Drizzle/Tanstack Query functions

export type UserData = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  bio: string | null;
  likes: string | null;
  occupation: string | null;
};

export type UserProfileData = {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string;
    createdAt: string;
    updatedAt: string;
    bio: string | null;
    likes: string | null;
    occupation: string | null;
  };
  posts: {
    imageUrl: string;
    id: number;
    userId: string;
    caption: string;
    imageKey: string;
    createdAt: string;
  }[];
};
