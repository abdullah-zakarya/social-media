import { Comment } from "../types";
export default interface IComment {
  createComment(post: Comment): Comment | undefined;
  getComment(id: string): Comment | undefined;
  listComments(PosId: string): Comment[];
  deleteComment(id: string): Comment | undefined;
  updateComment(id: string): Comment | undefined;
}
