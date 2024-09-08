import { Like } from "../types";
export default interface ILike {
  createLike(like: Like): Promise<Like | undefined>;
  deleteLike(postId: string, userId: string): Promise<void>;
}
