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
