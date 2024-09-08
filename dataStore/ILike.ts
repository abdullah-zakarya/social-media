import { Like } from "../types";
export default interface ILike {
  createLike(like: Like): Promise<Like | undefined>;
  deleteLike(postId: number, userId: number): Promise<void>;
}
