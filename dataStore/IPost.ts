import { Post } from "../types";
export default interface IPost {
  createPost(post: Post): Promise<Post | undefined>;
  getPost(id: string): Promise<Post | undefined>;
  deletePost(id: string): Promise<void>;
  updatePost(id: string, post: Post): Promise<Post | undefined>;
}
