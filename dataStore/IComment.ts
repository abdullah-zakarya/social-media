import { Comment } from "../types";
export default interface IComment {
  createComment(post: Comment): Promise<Comment | undefined>;
  getComment(id: string): Promise<Comment | undefined>;
  listComments(PosId: string): Promise<Comment[]>;
  deleteComment(id: string): Promise<void>;
  updateComment(id: string, comment: Comment): Promise<Comment | undefined>;
}
