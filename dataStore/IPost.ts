import { Post } from "../types";
export default interface IPost {
  createPost(post: Post): Promise<Post | undefined>;
  getPost(id: string): Promise<Post | undefined>;
  deletePost(id: number): Promise<void>;
  updatePost(id: number, post: object): Promise<Post | undefined>;
}
