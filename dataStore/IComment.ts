import { Comment } from "../types";
export default interface IComment {
  createComment(comment: Comment): Promise<Comment | undefined>;
  getComment(id: number): Promise<Comment | undefined>;
  listComments(PosId: number): Promise<Comment[]>;
  deleteComment(id: number): Promise<void>;
  updateComment(id: number, comment: object): Promise<Comment | undefined>;
}
