import { Post } from "../types";
export default interface IPost {
  createPost(post: Post): Post | undefined;
  getPost(id: string): Post | undefined;
  deletePost(id: string): Post | undefined;
  updatePost(id: string): Post | undefined;
}
