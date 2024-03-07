export type UserProfileType = {
  id: string;
  name: string;
  email: string;
  password: string | null; 
  image: string;
  emailVerified: Boolean | null; 
  createdAt: string; 
} | null

export type CommentType = {
  id: string;
  content: string;
  createdAt: Date;
  postId: string; 
  authorId: string;
}