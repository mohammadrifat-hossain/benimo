export type UserProfileType = {
  id: string;
  name: string;
  email: string;
  password: string | null; 
  image: string;
  emailVerified: Boolean | null; 
  createdAt: string;
  verified?: boolean
} | null

export type CommentType = {
  id: string;
  content: string;
  createdAt: Date;
  postId: string; 
  authorId: string;
}

export type PostType = {
  id: string;
  content: string;
  imageUrl: string;
  createdAt: Date | string;
  authorId: string;
}

export type NotificationType = {
  id: string; // Assuming the MongoDB ObjectId will be handled as a string in TypeScript
  userId: string; // Same as above, ObjectId as string
  createdAt: Date; // DateTime in Prisma maps to Date in TypeScript
  notification: string;
  redirectUrl: string;
  seen: boolean;
};

export type StoryType = {
  _id: string;
  userId: string;
  userName: string;
  userImage: string;
  createdAt: Date | string; // or Date if you prefer to work with Date objects
  imageUrl: string;
  __v: number;
}